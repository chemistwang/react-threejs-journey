import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function RealisticRender() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    THREE.ColorManagement.enabled = false;

    /**
     * Debug
     */
    const gui = new dat.GUI();
    const debugObject = {
      envMapIntensity: 5,
    };

    // Scene
    const scene = new THREE.Scene();

    /**
     * Loaders
     */
    const gltfLoader = new GLTFLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    /**
     * Update all materials
     */
    const updateAllMaterials = () => {
      scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          // child.material.envMap = environmentMap;
          child.material.envMapIntensity = debugObject.envMapIntensity;
          child.material.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    };

    /**
     * Environment map
     */
    const environmentMap = cubeTextureLoader.load([
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/px.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/nx.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/py.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/ny.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/pz.jpg`,
      `${process.env.PUBLIC_URL}/textures/environmentMaps/0/nz.jpg`,
    ]);

    scene.background = environmentMap;
    scene.environment = environmentMap;

    gui
      .add(debugObject, "envMapIntensity")
      .min(0)
      .max(10)
      .step(0.001)
      .onChange(() => {
        updateAllMaterials();
      });

    /**
     * Models
     */
    gltfLoader.load(
      `${process.env.PUBLIC_URL}/models/FlightHelmet/glTF/FlightHelmet.gltf`,
      (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.position.set(0, -4, 0);
        gltf.scene.rotation.y = Math.PI * 0.5;
        scene.add(gltf.scene);
        updateAllMaterials();

        gui
          .add(gltf.scene.rotation, "y")
          .min(-Math.PI)
          .max(Math.PI)
          .step(0.001)
          .name("rotation");
      }
    );

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    /**
     * Lights
     */
    const directionLight = new THREE.DirectionalLight("#ffffff", 1);
    directionLight.position.set(0.25, 3, -2.25);
    directionLight.castShadow = true;
    directionLight.shadow.camera.far = 15;
    // directionLight.shadow.mapSize.set(1024, 1024);
    directionLight.shadow.mapSize.set(256, 256);
    // directionLight.shadow.normalBias = 0.05;
    scene.add(directionLight);

    const directionLightCameraHelper = new THREE.CameraHelper(
      directionLight.shadow.camera
    );
    scene.add(directionLightCameraHelper);

    gui
      .add(directionLight, "intensity")
      .min(0)
      .max(10)
      .step(0.001)
      .name("lightIntensity");
    gui
      .add(directionLight.position, "x")
      .min(-5)
      .max(5)
      .step(0.001)
      .name("lightX");
    gui
      .add(directionLight.position, "y")
      .min(-5)
      .max(5)
      .step(0.001)
      .name("lightY");
    gui
      .add(directionLight.position, "z")
      .min(-5)
      .max(5)
      .step(0.001)
      .name("lightZ");

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(4, 5, 4);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, currentDom);
    // controls.target.y = 3.5;
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom as HTMLCanvasElement,
      antialias: true,
    });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    gui
      .add(renderer, "toneMapping", {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping,
      })
      .onFinishChange(() => {
        renderer.toneMapping = Number(
          renderer.toneMapping
        ) as THREE.ToneMapping;
        updateAllMaterials();
      });

    gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      gui.destroy();
    };
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default RealisticRender;
