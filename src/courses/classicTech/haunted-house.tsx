import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

import doorColorTextureImage from "../../static/textures/door/color.jpg";
import doorAlphaTextureImage from "../../static/textures/door/alpha.jpg";
import doorHeightTextureImage from "../../static/textures/door/height.jpg";
import doorNormalTextureImage from "../../static/textures/door/normal.jpg";
import doorMetalnessTextureImage from "../../static/textures/door/metalness.jpg";
import doorRoughnessTextureImage from "../../static/textures/door/roughness.jpg";
import doorAmbientOcclusionImage from "../../static/textures/door/ambientOcclusion.jpg";

import bricksColorTextureImage from "../../static/textures/bricks/color.jpg";
import bricksNormalTextureImage from "../../static/textures/bricks/normal.jpg";
import bricksRoughnessTextureImage from "../../static/textures/bricks/roughness.jpg";
import bricksAmbientOcclusionImage from "../../static/textures/bricks/ambientOcclusion.jpg";

import grassColorTextureImage from "../../static/textures/grass/color.jpg";
import grassNormalTextureImage from "../../static/textures/grass/normal.jpg";
import grassRoughnessTextureImage from "../../static/textures/grass/roughness.jpg";
import grassAmbientOcclusionImage from "../../static/textures/grass/ambientOcclusion.jpg";

function HauntedHouse() {
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

    // Fog
    const fog = new THREE.Fog("#262837", 1, 15);
    scene.fog = fog;

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const doorColorTexture = textureLoader.load(doorColorTextureImage);
    const doorAlphaTexture = textureLoader.load(doorAlphaTextureImage);
    const doorAmbientOcclusionTexture = textureLoader.load(
      doorAmbientOcclusionImage
    );
    const doorHeightTexture = textureLoader.load(doorHeightTextureImage);
    const doorNormalTexture = textureLoader.load(doorNormalTextureImage);
    const doorMetalnessTexture = textureLoader.load(doorMetalnessTextureImage);
    const doorRoughnessTexture = textureLoader.load(doorRoughnessTextureImage);

    const bricksColorTexture = textureLoader.load(bricksColorTextureImage);
    const bricksNormalTexture = textureLoader.load(bricksNormalTextureImage);
    const bricksRoughnessTexture = textureLoader.load(
      bricksRoughnessTextureImage
    );
    const bricksAmbientOcclusionTexture = textureLoader.load(
      bricksAmbientOcclusionImage
    );

    const grassColorTexture = textureLoader.load(grassColorTextureImage);
    const grassNormalTexture = textureLoader.load(grassNormalTextureImage);
    const grassRoughnessTexture = textureLoader.load(
      grassRoughnessTextureImage
    );
    const grassAmbientOcclusionTexture = textureLoader.load(
      grassAmbientOcclusionImage
    );

    grassColorTexture.repeat.set(8, 8);
    grassAmbientOcclusionTexture.repeat.set(8, 8);
    grassNormalTexture.repeat.set(8, 8);
    grassRoughnessTexture.repeat.set(8, 8);

    grassColorTexture.wrapS = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
    grassNormalTexture.wrapS = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

    grassColorTexture.wrapT = THREE.RepeatWrapping;
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
    grassNormalTexture.wrapT = THREE.RepeatWrapping;
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

    /**
     * House
     */
    // Group
    const house = new THREE.Group();
    scene.add(house);

    // Walls
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({
        // color: "#ac8e82",
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
      })
    );
    walls.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
    );

    walls.position.y = 1.25;
    house.add(walls);

    // Roof
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.5, 1, 4),
      new THREE.MeshStandardMaterial({ color: "#b35f45" })
    );
    roof.position.y = 2.5 + 0.5;
    roof.rotation.y = Math.PI * 0.25;
    house.add(roof);

    // Door
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
      new THREE.MeshStandardMaterial({
        // color: "#aa7b7b",
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
      })
    );
    door.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
    );
    door.position.y = 1;
    door.position.z = 2 + 0.01;
    house.add(door);

    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
    const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush1.scale.set(0.5, 0.5, 0.5);
    bush1.position.set(0.8, 0.2, 2.2);

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush2.scale.set(0.25, 0.25, 0.25);
    bush2.position.set(1.4, 0.1, 2.1);

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush3.scale.set(0.4, 0.4, 0.4);
    bush3.position.set(-0.8, 0.1, 2.2);

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
    bush4.scale.set(0.15, 0.15, 0.15);
    bush4.position.set(-1, 0.05, 2.6);

    house.add(bush1, bush2, bush3, bush4);

    // Graves
    const graves = new THREE.Group();
    scene.add(graves);

    const graveGeometery = new THREE.BoxGeometry(0.6, 0.8, 0.2);
    const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 6;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const grave = new THREE.Mesh(graveGeometery, graveMaterial);
      grave.position.set(x, 0.3, z);
      grave.rotation.y = (Math.random() - 0.5) * 0.4;
      grave.rotation.z = (Math.random() - 0.5) * 0.4;
      grave.castShadow = true;
      graves.add(grave);
    }

    // Temporary sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({ roughness: 0.7 })
    );
    sphere.position.y = 1;
    scene.add(sphere);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        color: "#a9c388",
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
      })
    );
    floor.geometry.setAttribute(
      "uv2",
      new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
    );
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = 0;
    scene.add(floor);

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
    gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
    scene.add(ambientLight);

    // Directional light
    const moonLight = new THREE.DirectionalLight("#ffffff", 0.12);
    moonLight.position.set(4, 5, -2);
    gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
    gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
    gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
    gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
    scene.add(moonLight);

    // Door light
    const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
    doorLight.position.set(0, 2.2, 2.7);
    house.add(doorLight);

    // Ghosts
    const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
    scene.add(ghost1);
    const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
    scene.add(ghost2);
    const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
    scene.add(ghost3);

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
    camera.position.x = 4;
    camera.position.y = 2;
    camera.position.z = 5;
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
    renderer.setClearColor("#262837");

    /**
     * Shadows
     */
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    moonLight.castShadow = true;
    doorLight.castShadow = true;
    ghost1.castShadow = true;
    ghost2.castShadow = true;
    ghost3.castShadow = true;

    walls.castShadow = true;
    bush1.castShadow = true;
    bush2.castShadow = true;
    bush3.castShadow = true;
    bush4.castShadow = true;

    floor.receiveShadow = true;

    // optimize the shadow maps
    doorLight.shadow.mapSize.width = 256;
    doorLight.shadow.mapSize.height = 256;
    doorLight.shadow.camera.far = 7;

    ghost1.shadow.mapSize.width = 256;
    ghost1.shadow.mapSize.height = 256;
    ghost1.shadow.camera.far = 7;

    ghost2.shadow.mapSize.width = 256;
    ghost2.shadow.mapSize.height = 256;
    ghost2.shadow.camera.far = 7;

    ghost3.shadow.mapSize.width = 256;
    ghost3.shadow.mapSize.height = 256;
    ghost3.shadow.camera.far = 7;

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update ghosts
      const ghost1Angle = elapsedTime * 0.5;
      ghost1.position.x = Math.cos(ghost1Angle) * 4;
      ghost1.position.z = Math.sin(ghost1Angle) * 4;
      ghost1.position.y = Math.sin(elapsedTime * 3);

      const ghost2Angle = -elapsedTime * 0.32;
      ghost2.position.x = Math.cos(ghost2Angle) * 5;
      ghost2.position.z = Math.sin(ghost2Angle) * 5;
      ghost2.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

      const ghost3Angle = -elapsedTime * 0.18;
      ghost3.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
      ghost3.position.z =
        Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
      ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);

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

export default HauntedHouse;
