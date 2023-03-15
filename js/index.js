// copyright João Sousa 2023 //

setTimeout(() => { // loading...
  try {
    initIntersectionObserver();
  } catch (error) {
    console.log("página sem intersectionObserver");
  }
  document.body.style.opacity = "1";
}, 300);

//3d stuff
var scene, cube

init();
animate();

function init() {
    scene = new THREE.Scene();

    createRenderer();
    createCamera();
    
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
    } else {
      var geometry = new THREE.BoxGeometry(size, size, size);
      var material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
      var cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      scene.add(cube);
    }
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

}

function addSkyBox(nome) {
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

const cbox = document.querySelectorAll(".uiBotao");

 for (let i = 0; i < cbox.length; i++) {
     cbox[i].addEventListener("mouseover", function() {
     cbox[i].parentElement.classList.toggle("painelHover");
     });
 }

 for (let i = 0; i < cbox.length; i++) {
    cbox[i].addEventListener("mouseout", function() {
    cbox[i].parentElement.classList.toggle("painelHover");
    });
}

// window.onscroll = function () { scrollFunction() };
// function scrollFunction() {
// 	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
// 		topBar.classList.add("topGlass");
// 	} else {
//     topBar.classList.remove("topGlass");
// 	}
// }