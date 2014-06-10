MyThreeJS
=========

My ThreeJS is the repository in which there are utilities for threejs created by me. 

The first utility is QuoteHepler showing the size of an object style 3d technical drawing:

<!DOCTYPE html>
<html lang="en">
<head>
   <title>Test QuoteHelper</title>
   <meta charset="utf-8">
   <style>
      body
      {
         font-family: Monospace;
         background-color: #f0f0f0;
         margin: 0px;
         overflow: hidden;
      }
   </style>
</head>
<body>

   <script src="https://rawgithub.com/mrdoob/three.js/master/build/three.js"></script>
   <script src="https://rawgithub.com/mrdoob/three.js/master/examples/js/controls/TrackballControls.js"></script>
   <script src="https://rawgithub.com/mrdoob/three.js/master/examples/js/renderers/SoftwareRenderer.js"></script>
   <script src="https://rawgithub.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.js"></script>
   <script src="QuoteHelper.js"></script>
   <script>

      var container;

      var camera, controls, scene, renderer;

      var cube;

      init();
      animate();

      function init() {

         container = document.createElement('div');
         document.body.appendChild(container);

         var info = document.createElement('div');
         info.style.position = 'absolute';
         info.style.top = '10px';
         info.style.width = '100%';
         info.style.textAlign = 'center';
         container.appendChild(info);

         camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 4000);
         camera.position.z = 400;

         controls = new THREE.TrackballControls(camera);

         scene = new THREE.Scene();

         var geometry = new THREE.BoxGeometry(200, 200, 200);

         for (var i = 0; i < geometry.faces.length; i += 2) {

            var hex = Math.random() * 0xffffff;
            geometry.faces[i].color.setHex(hex);
            geometry.faces[i + 1].color.setHex(hex);

         }

         cube = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors }));
         scene.add(cube);

         var quote = new THREE.QuoteHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(-120, -100, 120), 200, '124', 0xff0000, 10, 10);
         scene.add(quote);

         var quote = new THREE.QuoteHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(-100, -100, 120), 200, '567', 0x00ff00, 10, 10);
         scene.add(quote);

         var quote = new THREE.QuoteHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(-120, -100, -100), 200, '890', 0x0000ff, 10, 10);
         scene.add(quote);

         if (window.WebGLRenderingContext)
            renderer = new THREE.WebGLRenderer({ antialias: true });
         else
            renderer = new THREE.CanvasRenderer();

         renderer.setClearColor(0xffffff, 1);
         renderer.setSize(window.innerWidth, window.innerHeight);

         container.appendChild(renderer.domElement);

         window.addEventListener('resize', onWindowResize, false);

      }

      function onWindowResize() {

         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();

         renderer.setSize(window.innerWidth, window.innerHeight);

      }

      function animate() {

         requestAnimationFrame(animate);

         render();
      }

      function render() {
         controls.update();

         renderer.render(scene, camera);
      }

   </script>
</body>
</html>

