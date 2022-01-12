// copyright João Sousa 2022 //
setTimeout(() => {
    document.body.style.opacity = "1";
}, 500);

//3d stuff
var scene, cube

init();
animate();

function init() {
    scene = new THREE.Scene();

    createRenderer();
    createCamera();
    createLights();


    fundo = addSkyBox("zeus");

    window.addEventListener('resize', onWindowResize, false);

}

function createCamera() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 0;
    camera.position.y = 0;
    camera.position.x = 100;
    camera.lookAt(scene.position);

}

function createRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

}

function createCube(size, x, y, z, image = null) { //tamanho cordenadas e textura

    if (image) {
      var jtexture = new THREE.TextureLoader().load(image);
      var cube = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), new THREE.MeshBasicMaterial({ map: jtexture }));
      cube.position.set(x, y, z);
      scene.add(cube);
      return cube;
    } else {
      var geometry = new THREE.BoxGeometry(size, size, size);
      var material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
      var cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      scene.add(cube);
      return cube;
    }
      
  }

  function createLights() {
    //set to true to view light positions
    var helpers = false;
  
    light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(5, 5, 30).normalize();
    scene.add(light1);
  
    //Add helper to view light positionse	
    if (helpers) {
      light1.helper = new THREE.DirectionalLightHelper(light1, 50);
      scene.add(light1.helper);
    }
  
    light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-1, -1, -5).normalize();
    scene.add(light2);
  
    //Add helper to view light position
    if (helpers) {
      light2.helper = new THREE.DirectionalLightHelper(light2, 50);
      scene.add(light2.helper);
    }
  
    return true;
  }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);


    fundo.rotation.y += 0.002;


    // cube.rotation.x += -0.007;
    // cube.rotation.y += -0.007;
    // cube.rotation.z += -0.007;


    // cube1.rotation.y += -0.007;
    // cube2.rotation.y += -0.007;
    // cube3.rotation.y += -0.007;
    // cube1.rotation.z += -0.007;
    // cube2.rotation.z += -0.007;
    // cube3.rotation.z += -0.007;

}

function addSkyBox(nome) {
    //skybox

    var ext = "jpg"

    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load('/img/skyBox/' + nome + '/' + nome + '_ft.' + ext);
    let texture_bk = new THREE.TextureLoader().load('/img/skyBox/' + nome + '/' + nome + '_bk.' + ext);
    let texture_up = new THREE.TextureLoader().load('/img/skyBox/' + nome + '/' + nome + '_up.' + ext);
    let texture_dn = new THREE.TextureLoader().load('/img/skyBox/' + nome + '/' + nome + '_dn.' + ext);
    let texture_rt = new THREE.TextureLoader().load('/img/skyBox/' + nome + '/' + nome + '_rt.' + ext);
    let texture_lf = new THREE.TextureLoader().load('/img/skyBox/' + nome + '/' + nome + '_lf.' + ext);

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.name = nome
    scene.add(skybox);
    return skybox

}