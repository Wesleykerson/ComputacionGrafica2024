var scene = null;
var camera = null;
var renderer = null;
var controls = null;
var light = null;
var cube1 = null;
var cube2 = null;
var createdObjects = [];  // Arreglo para almacenar los objetos creados

function startScene() {
    scene = new THREE.Scene(),
        scene.background = new THREE.Color(0xb4bac9);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 10);
    controls.update();

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    camera.position.z = 5;
    

    //createLight(directionalLight);


const texture = new THREE.TextureLoader().load('../src/img/facesImage/uv_test_bw_1024.png');
//cajas con material(ajedrez)
const geometryBox1 = new THREE.BoxGeometry( 1, 1, 1 ); 
const materialBox1 = new THREE.MeshBasicMaterial( {color:0xfdffff, map:texture, side: THREE.DoubleSide} ); 
 cube1 = new THREE.Mesh( geometryBox1, materialBox1 ); 

cube1.position.x = -2;
cube1.position.y = 2;

scene.add( cube1 );

var materialCube =[new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face1.jpg'), side:THREE.DoubleSide} ),
                   new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face2.png'), side:THREE.DoubleSide} ),
                   new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face3.jpg'), side:THREE.DoubleSide} ),
                   new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face4.jpg'), side:THREE.DoubleSide} ),
                   new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face5.png'), side:THREE.DoubleSide} ),
                   new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load('../src/img/facesImage/face6.jpg'), side:THREE.DoubleSide} )
];

//Caja con material(Material por caja)
const geometryBox2 = new THREE.BoxGeometry( 1, 1, 1 ); 
cube2 = new THREE.Mesh(geometryBox2, materialCube)


cube2.position.x = 2;
cube2.position.y = 2;

scene.add( cube2 );

const texture2 = new THREE.TextureLoader().load('../src/img/facesImage/pngwing.com.png');
const geometry = new THREE.PlaneGeometry( 100, 100 );
const material = new THREE.MeshBasicMaterial( { map:texture2,
                                                side:THREE.DoubleSide,
                                                color:0xffffff,
                                                transparent:true } );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

plane.position.z = 5;

animate();

}
    function createLight(typeLight) {
        switch (typeLight) {
            case "ambient":
                light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
                scene.add( light );
                break;

            case "directionalLight":
                light = new THREE.DirectionalLight( 0xffffff, 2 );
                scene.add( light );
                break;
    
            case "pointLight":
                light = new THREE.PointLight( 0xff0000, 1, 100 );
                light.position.set( 50, 50, 50 );
                scene.add( light );
                break;

            case "spotLight":
                light = new THREE.SpotLight( 0xffffff );
                spotLight.position.set( 100, 1000, 100 );
                scene.add( light )
                break;
            default:
            
     }
    

    //pointlight + helper
    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 100);// color, intensidad, rango
    pointLight.position.set(13, 13, 13);
    scene.add(pointLight);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    scene.add(pointLightHelper);  
}


// Animación de la escena
function animate() {
    requestAnimationFrame(animate);

    
    cube1.rotation.y += 0.01;

    cube2.rotation.y += 0.01;


    controls.update();
    renderer.render(scene, camera);
}


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mostrar los inputs dinámicos según la figura seleccionada
function showInputs(geometryDraw) {
    const formContainer = document.getElementById("input-form");
    formContainer.innerHTML = '';  // Limpiar los inputs anteriores

    switch (geometryDraw) {
        case 'Box':
            formContainer.innerHTML = `
                <label for="width">Width:</label>
                <input type="number" id="width" value="3">
                <label for="height">Height:</label>
                <input type="number" id="height" value="3">
                <label for="depth">Depth:</label>
                <input type="number" id="depth" value="3">
                <button class="btn btn-success mt-2" onclick="createGeometry('Box')">Create Box</button>`;
            break;
        case 'Torus':
            formContainer.innerHTML = `
                <label for="radius">Radius:</label>
                <input type="number" id="radius" value="2">
                <label for="tube">Tube:</label>
                <input type="number" id="tube" value="0.8">
                <label for="radialSegments">Radial Segments:</label>
                <input type="number" id="radialSegments" value="32">
                <label for="tubularSegments">Tubular Segments:</label>
                <input type="number" id="tubularSegments" value="100">
                <button class="btn btn-success mt-2" onclick="createGeometry('Torus')">Create Torus</button>`;
            break;
        case 'Cone':
            formContainer.innerHTML = `
                <label for="radius">Radius:</label>
                <input type="number" id="radius" value="2">
                <label for="height">Height:</label>
                <input type="number" id="height" value="3">
                <label for="radialSegments">Radial Segments:</label>
                <input type="number" id="radialSegments" value="60">
                <button class="btn btn-success mt-2" onclick="createGeometry('Cone')">Create Cone</button>`;
            break;
    }
}

// Crear geometría usando los valores ingresados
function createGeometry(geometryDraw) {
    var randomColor = +('0x' + Math.floor(Math.random() * 16777215).toString(16));
    var geometryFigure = null;

    switch (geometryDraw) {
        case 'Box':
            const width = parseFloat(document.getElementById('width').value);
            const height = parseFloat(document.getElementById('height').value);
            const depth = parseFloat(document.getElementById('depth').value);
            geometryFigure = new THREE.BoxGeometry(width, height, depth);
            drawObjects(geometryFigure, randomColor);
            break;
        case 'Torus':
            const radius = parseFloat(document.getElementById('radius').value);
            const tube = parseFloat(document.getElementById('tube').value);
            const radialSegments = parseFloat(document.getElementById('radialSegments').value);
            const tubularSegments = parseFloat(document.getElementById('tubularSegments').value);
            geometryFigure = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
            drawObjects(geometryFigure, randomColor);
            break;
        case 'Cone':
            const coneRadius = parseFloat(document.getElementById('radius').value);
            const coneHeight = parseFloat(document.getElementById('height').value);
            const coneRadialSegments = parseFloat(document.getElementById('radialSegments').value);
            geometryFigure = new THREE.ConeGeometry(coneRadius, coneHeight, coneRadialSegments);
            drawObjects(geometryFigure, randomColor);
            break;
    }
}
//basic
function drawObjects(geometryFigure, col) {
    const materialBasic = new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.5, metalness: 0.5, wireframe: true });
    const objectDrawBasic = new THREE.Mesh(geometryFigure, materialBasic);
   
    const materialStandard = new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.5, metalness: 0.5, wireframe: false });
    const objectDrawStandard = new THREE.Mesh(geometryFigure, materialStandard);

    const MeshNormalMaterial = new THREE.MeshPhysicalMaterial({ color: col, opacity: 0.5, wireframe: false, transparent: false  });
    const objectDrawMesh = new THREE.Mesh(geometryFigure, MeshNormalMaterial);
    
    const MeshLamberMaterial = new THREE.MeshPhysicalMaterial({ color: col, emissive:0xff0000, emissiveIntensity: 1  });
    const objectDrawLamber = new THREE.Mesh(geometryFigure, MeshLamberMaterial);
    

    scene.add(objectDrawLamber);
    createdObjects.push(objectDrawLamber); 
}


// Eliminar todas las geometrías creadas
function deleteGeometry() {
    for (let i = 0; i < createdObjects.length; i++) {
        scene.add(objectDraw);
    }
}
