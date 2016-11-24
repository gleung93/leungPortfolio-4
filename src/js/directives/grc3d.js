leungPortfolio.directive("grc3d", function() {
  return{
    restrict: 'EA',
    replace: true,
    link: function(scope, elem, attrs) {
      var letterforms = [
        //G
        {"src": "views/models/g/g1.obj", "name": "g1"},
        {"src": "views/models/g/g2.obj", "name": "g2"},
        {"src": "views/models/g/g3.obj", "name": "g3"},
        {"src": "views/models/g/g4.obj", "name": "g4"},
        {"src": "views/models/g/g5.obj", "name": "g5"},
        {"src": "views/models/g/g6.obj", "name": "g6"},
        {"src": "views/models/g/g7.obj", "name": "g7"},
        {"src": "views/models/g/g8.obj", "name": "grod1"},
        {"src": "views/models/g/g9.obj", "name": "grod2"},
        {"src": "views/models/g/g10.obj", "name": "gball1"},
        {"src": "views/models/g/g11.obj", "name": "gball2"},
        {"src": "views/models/g/g12.obj", "name": "gball3"},
        {"src": "views/models/g/g13.obj", "name": "gball3"},
        {"src": "views/models/g/g14.obj", "name": "gball3"},

        //R
        {"src": "views/models/r/r1.obj", "name": "r1"},
        {"src": "views/models/r/r2.obj", "name": "r2"},
        {"src": "views/models/r/r3.obj", "name": "r3"},
        {"src": "views/models/r/r4.obj", "name": "r4"},
        {"src": "views/models/r/r5.obj", "name": "r5"},
        {"src": "views/models/r/r6.obj", "name": "r6"},
        {"src": "views/models/r/r7.obj", "name": "r7"},
        {"src": "views/models/r/r8.obj", "name": "r8"},
        {"src": "views/models/r/r9.obj", "name": "r9"},
        {"src": "views/models/r/r10.obj", "name": "r9"},
        {"src": "views/models/r/r11.obj", "name": "r9"},
        {"src": "views/models/r/r12.obj", "name": "r9"},
        {"src": "views/models/r/r13.obj", "name": "r9"},

        //C
        {"src": "views/models/c/c1.obj", "name": "c1"},
        {"src": "views/models/c/c2.obj", "name": "c2"},
        {"src": "views/models/c/c3.obj", "name": "c3"},
        {"src": "views/models/c/c4.obj", "name": "c4"},
        {"src": "views/models/c/c5.obj", "name": "c5"},
        {"src": "views/models/c/c6.obj", "name": "cball1"},
        {"src": "views/models/c/c7.obj", "name": "cball2"},
        {"src": "views/models/c/c8.obj", "name": "crod1"},
        {"src": "views/models/c/c9.obj", "name": "crod2"},
        {"src": "views/models/c/c10.obj", "name": "crod2"},
        {"src": "views/models/c/c11.obj", "name": "crod2"},
        {"src": "views/models/c/c12.obj", "name": "crod2"},

        //D
        {"src": "views/models/d/d1.obj", "name": "d1"},
        {"src": "views/models/d/d2.obj", "name": "d2"},
        {"src": "views/models/d/d3.obj", "name": "d3"},
        {"src": "views/models/d/d4.obj", "name": "d4"},
        {"src": "views/models/d/d5.obj", "name": "dball1"},
        {"src": "views/models/d/d6.obj", "name": "dball2"},
        {"src": "views/models/d/d7.obj", "name": "drod1"},
        {"src": "views/models/d/d8.obj", "name": "drod1"}

      ];

      // Set up the scene, camera, and renderer as global variables.
      var renderer,
      mouse,
      scene,
      camera;

      init();
      animate();

      //Mouse default
      var mouseX = 0, mouseY = 0;

      var startLooking = false;
      var objectArray = [];

      //Button center
      var buttonTop, buttonHeight, buttonCenter;

      //heroWidth
      var heroWidth = document.getElementById("threeHero").offsetWidth;
      var heroheight = document.getElementById("threeHero").offsetHeight;

      //for camera position
      var windowHalfX = heroWidth / 2;
      var windowSeventy = heroWidth*.38;
      var windowHalfY = heroheight / 2;

      // Sets up the scene.
      function init() {

        // Create the scene and set the scene size.
        scene = new THREE.Scene();
        var WIDTH = document.getElementById("threeHero").offsetWidth,
            HEIGHT = document.getElementById("threeHero").offsetHeight;


        // Create a renderer and add it to the DOM.
        renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(WIDTH, HEIGHT);
        document.getElementById('threeHero').appendChild(renderer.domElement);

        renderer.setClearColor( 0xffffff, 1);

        // Create a camera, zoom it out from the model a bit, and add it to the scene.
        camera = new THREE.PerspectiveCamera(44.096, WIDTH / HEIGHT, 0.1, 20000);
        //camera.position.set(0,-70,1100);
        //camera.lookAt(new THREE.Vector3(0,-70,0));
        camera.position.set(0,0,-1100);
        scene.add(camera);


        // Create an event listener that resizes the renderer with the browser window.
        window.addEventListener('resize', function() {
          console.log("resize");
          var WIDTH = document.getElementById("threeHero").offsetWidth,
              HEIGHT = document.getElementById("threeHero").offsetHeight;
          windowHalfX = WIDTH / 2;
          windowSeventy = WIDTH*.38;
          windowHalfY = HEIGHT / 2;
          renderer.setSize(WIDTH, HEIGHT);
          camera.aspect = WIDTH / HEIGHT;
          camera.updateProjectionMatrix();
        });

        //Add a light
        var light = new THREE.HemisphereLight( 0xffffff, 0x7a7a7a, .9 );
        //var light = new THREE.AmbientLight( 0xffffff );
        scene.add( light );

        //define material
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading });
        //var material = new THREE.MeshLambertMaterial( { color: 0xffffff, emisive: 0xffffff } );
        var materialSelected = new THREE.MeshPhongMaterial({color: 0xff0000, shading: THREE.FlatShading });

        // loader
        var loader = new THREE.OBJLoader();
        var onObject = function(object) {
          object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
              child.material = material;
            }

        });

      //All object properties. Note: position can't be moved from 0,0 or breathing animation will break
       object.scale.x = .5;
       object.scale.y = .5;
       object.scale.z = .5;
       object.rotation.x = .10;
       scene.add( object );
       objectArray.push(object);

      };

      //Loop through json and load each obj
      for (var key in letterforms) {
        if (letterforms.hasOwnProperty(key)) {
        loader.load(letterforms[key].src, onObject);
        }
      }

      var cameraIn =

            new TWEEN.Tween( camera.position )
             .to({ z:1375 }, 5000)
            .easing(TWEEN.Easing.Cubic.Out)
            .delay( 200 )
            .start()
            .onStart(function(){
             breathAnimation();
              console.log(objectArray);
            }).onComplete(function(){
              document.getElementById("threeHero").addEventListener( 'mousemove', onHeroMouseMove, true );


            });

          var cameraOut =

            new TWEEN.Tween( camera.position )
            .to({ z:-1100 }, 4000)
            .easing(TWEEN.Easing.Cubic.Out)
            .delay( 0 );

      }//end init

      document.onkeydown = checkKey;

        function checkKey(e) {
          e = e || window.event;
          if (e.keyCode == '39') {
            cancelAnimationFrame( animationRequest );
          }
          if (e.keyCode == '37') {
            window.location.href = 'page2.html';
          }

        }

      function breathAnimation(){
        console.log(objectArray);

        for ( var i = 0; i < objectArray.length; i++ ) {

          var randomX = Math.floor(Math.random() * 21) - 10;
          var randomY = Math.floor(Math.random() * 21) - 10;
          var randomZ = Math.floor(Math.random() * 21) - 10;
          var randomDelay = Math.floor((Math.random() * 3000) + 1);


          var forward =
          new TWEEN.Tween(objectArray[i].position)
          .to({ x:randomX, y:randomY, z:randomZ },3500)
          .repeat(Infinity)
          .delay(randomDelay)
          .yoyo(true)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .start();

        }

      }

      function onHeroMouseMove( event ) {

          startLooking = true;
          //for camera rotation
          mouseX = 1.0*(event.clientX - ((document.getElementById("threeHero").offsetWidth)/2));
          mouseY = 1.0*(event.clientY - ((document.getElementById("threeHero").offsetHeight)/2));



        }

      // Renders the scene and updates the render as needed.
      var animationRequest;
      function animate() {

        animationRequest = requestAnimationFrame(animate);

        var materialSelected = new THREE.MeshPhongMaterial({color: 0x61A80F, shading: THREE.FlatShading });
        var materialWireframe = new THREE.MeshPhongMaterial({ wireframe: true });


        if (startLooking == true) {
          camera.position.x += ( mouseX - camera.position.x ) * 0.026;
          camera.position.y += ( - (mouseY) - camera.position.y ) * 0.026;
          var totalMouse = -((Math.abs(mouseX)+Math.abs(mouseY))/1)+1375+0;
          camera.position.z += ( totalMouse - camera.position.z ) * 0.026;
          camera.lookAt(new THREE.Vector3(0,0,0));

        }

        TWEEN.update();
        // Render the scene.
        renderer.render(scene, camera);



      }
    }
  } 
});
