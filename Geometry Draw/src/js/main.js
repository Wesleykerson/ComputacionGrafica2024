
//creation of basic elements
var scene = null,
    camera = null,
    renderer = null,
    controls = null;
 
const size = 20,
    divisions = 20;
 
function startScene() {
    // Scene, Camera, Renderer
    scene  = new THREE.Scene();
    scene.background = new THREE.Color(0x095d94);
    camera = new THREE.PerspectiveCamera( 75,  // Angulo de Vision (Abajo o Arriba)
                                        window.innerWidth / window.innerHeight,// Relación Aspecto (16:9)
                                        0.1, // Mas Cerca (no renderiza)
                                        1000); // Mas lejos
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("app")});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
 
 //Orbit COntrol
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 10);
    controls.update();

 //grid helper

 const gridHelper = new THREE.GridHelper( size, divisions );
 scene.add( gridHelper );

//create a box
//createGeometry('Torus');
    //const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //const material = new THREE.MeshBasicMaterial({ color: 0x28093b });
    //const cube = new THREE.Mesh( geometry, material );
    //scene.add( cube );
 
    camera.position.z = 5;
    animate();

    //Luz
const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

//point light
const pointlight = new THREE.PointLight( 0xfafbfb, 1, 100 );
pointlight.position.set( 0, 3, 3 );
scene.add( light );


const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
}
 
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
    renderer.render( scene, camera );

}

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function createGeometry(geometryDraw){
    var geometryFigure = null;

    switch (geometryDraw){ 
        case 'Box':
            geometryFigure = new THREE.BoxGeometry( 1, 1, 1 );
            break;
        case 'Torus':
            geometryFigure = new THREE.TorusGeometry( 2, 1, 23, 100 ); 
            break;
        case 'Cone':
            geometryFigure = new THREE.ConeGeometry( 1, 7, 32 ); 
            break;

    }

    

    const material = new THREE.MeshStandardMaterial({ color: 0x75efef, 
        transparent:true,
        opacity:1, 
        wireframe:false, 
        roughness:0.5, 
        metalness:0.5 });


    const objectDraw = new THREE.Mesh( geometryFigure, material ); scene.add (objectDraw);
    scene.add(objectDraw);

    
}




