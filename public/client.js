import * as THREE from '/build/three.module.js';
//console.log(THREE);
import {GLTFLoader} from '/jsm/loaders/GLTFLoader.js';
//console.log(GLTFLoader);
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
//console.log(OrbitControls);
//import {GUI} from 'dat.gui';
//console.log(GUI);


let scene;
let camera;
let renderer;
let house;
let model_container = document.querySelector('.web-gl');
//anim
let mixer;

const init = ()=>{
    scene = new THREE.Scene();
    //console.log(scene);
    const fov = 40;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    //console.log(camera);
    camera.position.set(0,0,25);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: model_container
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    //белый фон
    renderer.setClearColor(0xffffff, 0);
    //черный фон
    //scene.background = new THREE.Color( 0xf2c552 );
    //управление моделью
    const controls = new OrbitControls(camera, renderer.domElement);
    
   

    //основной свет и добавление в сцену
    const ambientLight = new THREE.AmbientLight(0xe6e6e6, 2);
    scene.add(ambientLight);
    //точечный свет и позиционирование
    const spotLight = new THREE.SpotLight(0xffc7c7, 1);
    spotLight.position.set(0, -3, 15);
    //помошник
   // const spotLightHelper = new THREE.SpotLightHelper(spotLight, 1 , 0x00ff00);

    scene.add(spotLight);
   // scene.add(spotLightHelper);
   
    // графический интерфейс
    //const gui = new GUI();
    //const redLight = gui.addFolder("RedLight");
    //redLight.add(spotLight.position, 'x', -30, 30, 1);

    

    const loader = new GLTFLoader();
    loader.load('./model/scene.glb', (gltf)=>{
        house = gltf.scene.children[0];
        house.scale.set(0.15,0.15,0.15);
        house.position.set(0, 0, -7);
        house.rotation.z = -1.6;
       // house.rotation.x = Math.PI / -2;
        scene.add(gltf.scene);
        //anim
        mixer = new THREE.AnimationMixer(house);
        const clips = gltf.animations;
        console.log(gltf.animations);
        //const clip = new THREE.AnimationClip.findByName(clips, 'Scene');
        //const action = mixer.ClipAction(clip);
        //action.play();
        clips.forEach(function(clip){
            const action = mixer.clipAction(clip);
            action.play();
        });
    });

    
    

    animate();
    //console.log(renderer);
}

const render = ()=>{
    renderer.render(scene, camera);
}

const clock = new THREE.Clock();
const animate = ()=>{
    if(mixer)
        mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
    render();

}

const windowResize = ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
window.addEventListener('resize', windowResize , false);

window.onload = init;

