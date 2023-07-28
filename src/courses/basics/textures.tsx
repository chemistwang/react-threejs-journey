import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Textures() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    /**
     * Textures
     */
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
      console.log("start...");
    };
    loadingManager.onLoad = () => {
      console.log("load...");
    };
    loadingManager.onProgress = () => {
      console.log("progress...");
    };
    loadingManager.onError = () => {
      console.log("error...");
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);

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

    colorTexture.repeat.x = 2;
    colorTexture.repeat.y = 3;

    // colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.wrapS = THREE.MirroredRepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;

    colorTexture.offset.x = 0.5;
    colorTexture.offset.y = 0.5;

    colorTexture.rotation = Math.PI / 4;

    colorTexture.center.x = 0.5;
    colorTexture.center.y = 0.5;

    // colorTexture.minFilter = THREE.NearestFilter;
    colorTexture.magFilter = THREE.NearestFilter;

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // Scene
    const scene = new THREE.Scene();

    // Red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    // const geometry = new THREE.SphereGeometry(1, 32, 32);
    console.log(geometry.attributes.uv, "uv");
    const material = new THREE.MeshBasicMaterial({
      // map: colorTexture,
      // map: checker1024ImageTexture,
      map: checker8ImageTexture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(1, 1, 1);
    scene.add(camera);

    const controls = new OrbitControls(camera, currentDom);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom as HTMLCanvasElement,
    });
    renderer.setSize(sizes.width, sizes.height);

    const tick = () => {
      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
      controls.update();
    };
    tick();
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Textures;
