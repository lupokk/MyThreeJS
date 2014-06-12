MyThreeJS
=========

My ThreeJS is the repository in which there are utilities for threejs created by me. 

The first utility is QuoteHepler for displaying the size of an 3d object in technical drawing style:


<h3>Example:</h3>


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

