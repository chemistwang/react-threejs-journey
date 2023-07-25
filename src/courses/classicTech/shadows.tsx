import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import bakedShadowImage from "../../static/textures/bakedShadow.jpg";
import simpleShadowImage from "../../static/textures/simpleShadow.jpg";

function Shadows() {
  const ref = useRef<HTMLCanvasElement>(null);
  THREE.ColorManagement.enabled = false;

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    /**
     * Debug
     */
    const gui = new dat.GUI();

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // Scene
    const scene = new THREE.Scene();

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const bakedShadow = textureLoader.load(bakedShadowImage);
    const simpleShadow = textureLoader.load(simpleShadowImage);

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(2, 2, -1);
    gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
    gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
    gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
    gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
    scene.add(directionalLight);

    directionalLight.castShadow = true;
    console.log(directionalLight.shadow);
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 6;
    directionalLight.shadow.camera.top = 2;
    directionalLight.shadow.camera.right = 2;
    directionalLight.shadow.camera.bottom = -2;
    directionalLight.shadow.camera.left = -2;
    // directionalLight.shadow.radius = 10;

    const directionalLightCameraHelper = new THREE.CameraHelper(
      directionalLight.shadow.camera
    );
    directionalLightCameraHelper.visible = false;
    scene.add(directionalLightCameraHelper);

    // Spot light
    const spotlight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3);
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    spotlight.shadow.camera.fov = -30;
    spotlight.shadow.camera.near = 1;
    spotlight.shadow.camera.far = 6;

    spotlight.position.set(0, 2, 2);
    scene.add(spotlight);
    scene.add(spotlight.target);

    const spotLightCameraHelper = new THREE.CameraHelper(
      spotlight.shadow.camera
    );
    spotLightCameraHelper.visible = false;
    scene.add(spotLightCameraHelper);

    // Point light
    const pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 0.1;
    pointLight.shadow.camera.far = 5;
    pointLight.position.set(-1, 1, 0);
    scene.add(pointLight);

    const pointLightCameraHelper = new THREE.CameraHelper(
      pointLight.shadow.camera
    );
    pointLightCameraHelper.visible = false;
    scene.add(pointLightCameraHelper);

    /**
     * Materials
     */
    const material = new THREE.MeshStandardMaterial();
    material.roughness = 0.7;
    gui.add(material, "metalness").min(0).max(1).step(0.001);
    gui.add(material, "roughness").min(0).max(1).step(0.001);

    /**
     * Objects
     */
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      material
    );
    sphere.castShadow = true;

    // const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({
        map: bakedShadow,
      })
    );
    plane.rotation.x = -Math.PI * 0.5;
    plane.position.y = -0.5;
    plane.receiveShadow = true;

    scene.add(sphere, plane);

    const sphereShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow,
      })
    );
    sphereShadow.rotation.x = -Math.PI * 0.5;
    sphereShadow.position.y = plane.position.y + 0.01;
    scene.add(sphereShadow);

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
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, currentDom);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom as HTMLCanvasElement,
    });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // renderer.shadowMap.enabled = true;
    renderer.shadowMap.enabled = false;

    // renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update the sphere
      sphere.position.x = Math.cos(elapsedTime) * 1.5;
      sphere.position.z = Math.sin(elapsedTime) * 1.5;
      sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

      // Update the shadow
      sphereShadow.position.x = sphere.position.x;
      sphereShadow.position.z = Math.sin(elapsedTime) * 1.5;
      sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3;

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

export default Shadows;
