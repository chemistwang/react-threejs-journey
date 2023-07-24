import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import colorTextureImage from "../textures/door/color.jpg";
import alphaTextureImage from "../textures/door/alpha.jpg";
import heightTextureImage from "../textures/door/height.jpg";
import normalTextureImage from "../textures/door/normal.jpg";
import metalnessTextureImage from "../textures/door/metalness.jpg";
import roughnessTextureImage from "../textures/door/roughness.jpg";
import ambientOcclusionTextureImage from "../textures/door/ambientOcclusion.jpg";
import checker1024Image from "../textures/checkerboard-1024x1024.png";
import checker8Image from "../textures/checkerboard-8x8.png";

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
    const colorTexture = textureLoader.load(colorTextureImage);
    const alphaTexture = textureLoader.load(alphaTextureImage);
    const heightTexture = textureLoader.load(heightTextureImage);
    const normalTexture = textureLoader.load(normalTextureImage);
    const metalnessTexture = textureLoader.load(metalnessTextureImage);
    const roughnessTexture = textureLoader.load(roughnessTextureImage);
    const ambientOcclusionTexture = textureLoader.load(
      ambientOcclusionTextureImage
    );
    const checker1024ImageTexture = textureLoader.load(checker1024Image);
    const checker8ImageTexture = textureLoader.load(checker8Image);

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
