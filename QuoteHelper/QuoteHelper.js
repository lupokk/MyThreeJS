/**
 * @author Alberto Schiassi / https://github.com/lupokk
 *
 * Creates quote for displaying the size of an 3d object in technical drawing style
 *
 * Parameters:
 *  dir - Vector3
 *  origin - Vector3
 *  length - Number
 *  value - String
 *  color - color in hex value
 *  headLength - Number
 *  headWidth - Number
 *  parameters - Array
 */

THREE.QuoteHelper = function (dir, origin, length, value, color, headLength, headWidth, parameters) {

   THREE.Object3D.call(this);

   this.direction = dir.normalize();

   if (color === undefined) color = 0xffff00;
   if (length === undefined) length = 1;
   if (headLength === undefined) headLength = 0.2 * length;
   if (headWidth === undefined) headWidth = 0.2 * headLength;
   if (parameters === undefined) parameters = { font: 'helvetiker', size: 8 };

   this.position = origin;

   var lineGeometry = new THREE.Geometry();
   lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
   lineGeometry.vertices.push(new THREE.Vector3(0, 1, 0));

   this.line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: color }));
   this.line.matrixAutoUpdate = false;
   this.add(this.line);

   var upConeGeometry = new THREE.CylinderGeometry(0, 0.5, 1, 5, 1);
   upConeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -0.5, 0));

   this.upCone = new THREE.Mesh(upConeGeometry, new THREE.MeshBasicMaterial({ color: color }));
   this.upCone.matrixAutoUpdate = false;
   this.add(this.upCone);

   var downConeGeometry = new THREE.CylinderGeometry(0.5, 0, 1, 5, 1);
   downConeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0.5, 0));

   this.downCone = new THREE.Mesh(downConeGeometry, new THREE.MeshBasicMaterial({ color: color }));
   this.downCone.matrixAutoUpdate = false;
   this.add(this.downCone);

   this.textGeometry = new THREE.ShapeGeometry(THREE.FontUtils.generateShapes(value, parameters));
   this.textValue = new THREE.Mesh(this.textGeometry, new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide }));

   this.textValue.updateMatrixWorld = function () {
      if (this.matrixWorldNeedsUpdate === true || force === true) {
         this.setRotationFromQuaternion(camera.quaternion);
         this.updateMatrix();
         this.matrixWorld.copy(this.matrix);
         this.matrixWorldNeedsUpdate = false;
         force = true;
      }

      for (var i = 0, l = this.children.length; i < l; i++) {
         this.children[i].updateSpriteWorld(force);
      }

   };

   this.textValue.updateMatrix();
   this.add(this.textValue)

   this.setDirection(this.direction);
   this.setLength(length, headLength, headWidth);

};

THREE.QuoteHelper.prototype = Object.create(THREE.Object3D.prototype);

THREE.QuoteHelper.prototype.setDirection = function (dir) {

   this.setRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir));

}

THREE.QuoteHelper.prototype.setLength = function (length, headLength, headWidth) {

   if (headLength === undefined) headLength = 0.2 * length;
   if (headWidth === undefined) headWidth = 0.2 * headLength;

   this.line.scale.set(1, length, 1);
   this.line.updateMatrix();

   this.upCone.scale.set(headWidth, headLength, headWidth);
   this.upCone.position.y = length;
   this.upCone.updateMatrix();

   this.downCone.scale.set(headWidth, headLength, headWidth);
   this.downCone.position.y = 0;
   this.downCone.updateMatrix();

   this.textValue.position = this.direction.clone().multiplyScalar(length / 2).add(this.position);
   this.textValue.scale.set(headWidth * 0.2, headLength * 0.2, headWidth * 0.2);
   this.textGeometry.computeBoundingBox();
   var textHeight = this.textGeometry.boundingBox.max.y - this.textGeometry.boundingBox.min.y;
};

THREE.QuoteHelper.prototype.setColor = function (color) {

   this.line.material.color.set(color);
   this.upCone.material.color.set(color);
   this.downCone.material.color.set(color);
   this.textValue.material.color.set(color);
};
