import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

function Materials() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    const colorTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/color.jpg`
    );
    const alphaTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/alpha.jpg`
    );
    const heightTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/height.jpg`
    );
    const normalTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/normal.jpg`
    );
    const metalnessTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/metalness.jpg`
    );
    const roughnessTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/roughness.jpg`
    );
    const ambientOcclusionTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/door/ambientOcclusion.jpg`
    );
    const checker1024ImageTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/checkerboard-1024x1024.png`
    );
    const checker8ImageTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/checkerboard-1024x1024.png`
    );

    const matcapTextureTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/matcaps/1.png`
    );

    const gradients3Texture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/gradients/3.jpg`
    );
    gradients3Texture.minFilter = THREE.NearestFilter;
    gradients3Texture.magFilter = THREE.NearestFilter;

    const environmentMapTexture = cubeTextureLoader.load([
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/px.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/nx.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/py.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/ny.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/pz.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/nz.jpg`,
    ]);

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // Scene
    const scene = new THREE.Scene();

    /**
     * Objects
     */
    // MeshBasicMaterial
    // const materials = new THREE.MeshBasicMaterial();
    // materials.map = colorTexture;
    // materials.color = new THREE.Color(0xff0000);
    // materials.wireframe = true;

    // materials.transparent = true;
    // materials.opacity = 0.5;

    // materials.alphaMap = alphaTexture;

    // materials.side = THREE.FrontSide;
    // materials.side = THREE.BackSide;
    // materials.side = THREE.DoubleSide;

    // MeshNormalMaterial
    // const materials = new THREE.MeshNormalMaterial();
    // materials.wireframe = true;
    // materials.flatShading = true;

    // MeshMatcapMaterial
    // const materials = new THREE.MeshMatcapMaterial();
    // materials.matcap = matcapTextureTexture;

    // MeshDepthMaterial
    // const materials = new THREE.MeshDepthMaterial();

    // MeshLambertMaterial
    // const materials = new THREE.MeshLambertMaterial();
    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.set(2, 3, 4);
    // scene.add(pointLight);

    // MeshPhongMaterial
    // const materials = new THREE.MeshPhongMaterial();
    // materials.shininess = 1000;
    // materials.specular = new THREE.Color(0xff0000);
    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.set(2, 3, 4);
    // scene.add(pointLight);

    // MeshToonMaterial
    // const materials = new THREE.MeshToonMaterial();
    // materials.gradientMap = gradients3Texture;
    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.set(2, 3, 4);
    // scene.add(pointLight);

    // MeshStandardMaterial
    // const materials = new THREE.MeshStandardMaterial();
    // materials.metalness = 0.45;
    // materials.roughness = 0.65;
    // materials.map = colorTexture;
    // materials.aoMap = ambientOcclusionTexture;
    // materials.aoMapIntensity = 1;
    // materials.displacementMap = heightTexture;
    // materials.displacementScale = 0.05;
    // materials.metalnessMap = metalnessTexture;
    // materials.roughnessMap = roughnessTexture;
    // materials.normalMap = normalTexture;
    // materials.normalScale.set(0.5, 0.5);
    // materials.transparent = true;
    // materials.alphaMap = alphaTexture;

    // MeshStandardMaterial - Environment Map
    const materials = new THREE.MeshStandardMaterial();
    materials.metalness = 0.7;
    materials.roughness = 0.2;
    materials.envMap = environmentMapTexture;

    // materials.wireframe = true;
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    /**
     * Debug
     */
    const gui = new dat.GUI();
    gui.add(materials, "roughness").min(0).max(1).step(0.001);
    gui.add(materials, "metalness").min(0).max(1).step(0.001);
    gui.add(materials, "aoMapIntensity").min(0).max(10).step(0.001);
    gui.add(materials, "displacementScale").min(0).max(10).step(0.001);

    // const sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(0.5, 16, 16),
    //   materials
    // );
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      materials
    );
    sphere.position.x = -1.5;
    sphere.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
    );

    // const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materials);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 100, 100),
      materials
    );
    plane.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
    );

    // const torus = new THREE.Mesh(
    //   new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    //   materials
    // );
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 64, 128),
      materials
    );
    torus.position.x = 1.5;
    torus.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
    );

    scene.add(sphere, plane, torus);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    const controls = new OrbitControls(camera, currentDom);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom as HTMLCanvasElement,
    });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      // sphere.rotation.y = 0.1 * elapsedTime;
      // plane.rotation.y = 0.1 * elapsedTime;
      // torus.rotation.y = 0.1 * elapsedTime;

      // sphere.rotation.x = 0.15 * elapsedTime;
      // plane.rotation.x = 0.15 * elapsedTime;
      // torus.rotation.x = 0.15 * elapsedTime;

      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
      controls.update();
    };
    tick();
    return () => {
      gui.destroy();
    };
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Materials;
