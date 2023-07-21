import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import colorTextureImage from "./textures/door/color.jpg";
import alphaTextureImage from "./textures/door/alpha.jpg";
import heightTextureImage from "./textures/door/height.jpg";
import normalTextureImage from "./textures/door/normal.jpg";
import metalnessTextureImage from "./textures/door/metalness.jpg";
import roughnessTextureImage from "./textures/door/roughness.jpg";
import ambientOcclusionTextureImage from "./textures/door/ambientOcclusion.jpg";
import checker1024Image from "./textures/checkerboard-1024x1024.png";
import checker8Image from "./textures/checkerboard-8x8.png";
import matcapTextureImage from "./textures/matcaps/1.png";
import gradients3Image from "./textures/gradients/3.jpg";

import EnvMapPX from "./textures/environmentMaps/0/px.jpg";
import EnvMapNX from "./textures/environmentMaps/0/nx.jpg";
import EnvMapPY from "./textures/environmentMaps/0/py.jpg";
import EnvMapNY from "./textures/environmentMaps/0/ny.jpg";
import EnvMapPZ from "./textures/environmentMaps/0/pz.jpg";
import EnvMapNZ from "./textures/environmentMaps/0/nz.jpg";

import * as dat from "dat.gui";

function Materials() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

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

    const matcapTextureTexture = textureLoader.load(matcapTextureImage);

    const gradients3Texture = textureLoader.load(gradients3Image);
    gradients3Texture.minFilter = THREE.NearestFilter;
    gradients3Texture.magFilter = THREE.NearestFilter;

    const environmentMapTexture = cubeTextureLoader.load([
      EnvMapPX,
      EnvMapNX,
      EnvMapPY,
      EnvMapNY,
      EnvMapPZ,
      EnvMapNZ,
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
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Materials;
