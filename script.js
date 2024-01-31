import * as THREE from 'three';
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


 let scene,camera,renderer,controls,enviroment,bike,loader;

function init(){

    scene = new THREE.Scene();
   
   //CAMERA 
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   camera.position.set(0,-8,6);
   camera.lookAt(new THREE.Vector3(0,-8,0));
   
   
   //RENDERER 
    renderer = new THREE.WebGLRenderer({antialias: true});
   renderer.setSize( window.innerWidth, window.innerHeight );
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
   document.querySelector('#modelcontainer').append( renderer.domElement );
   
   
   //CONTROLS
    controls = new OrbitControls(camera,renderer.domElement);
   
   //BACKGROUND TEXTURES
   const cubeTextures =[
       './Images/px.jpg',
       './Images/nx.jpg',
       './Images/py.jpg',
       './Images/ny.jpg',
       './Images/pz.jpg',
       './Images/nz.jpg'
   ]
   
    enviroment = new THREE.CubeTextureLoader().load(cubeTextures);
   scene.background = enviroment;
   
   //3D MODEL LOAD
   const Calgeometry = new THREE.BoxGeometry(4,8,0.2);
   const Caltexture = new THREE.TextureLoader().load('Cal.png');
   const Calmterial = new THREE.MeshBasicMaterial({map:Caltexture});
   const Calmesh = new THREE.Mesh(Calgeometry,Calmterial);

   scene.add(Calmesh);
   
    };
   
    init();

    const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0,8,0)

light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 100;
scene.add(light);

//ANIMATION
const animate =()=>{
requestAnimationFrame(animate);
controls.update();
renderer.render(scene,camera);
};

animate();

//RESPONSIVE
window.addEventListener('resize', ()=>{
	camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
				render();
	
	});

    function render() {
        renderer.render( scene, camera );
    }



    

