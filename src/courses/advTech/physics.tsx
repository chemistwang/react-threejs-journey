import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

import EnvMapPX from "../../static/textures/environmentMaps/0/px.jpg";
import EnvMapNX from "../../static/textures/environmentMaps/0/nx.jpg";
import EnvMapPY from "../../static/textures/environmentMaps/0/py.jpg";
import EnvMapNY from "../../static/textures/environmentMaps/0/ny.jpg";
import EnvMapPZ from "../../static/textures/environmentMaps/0/pz.jpg";
import EnvMapNZ from "../../static/textures/environmentMaps/0/nz.jpg";

// import CANNON from "cannon";
import * as CANNON from "cannon-es";

import hitSounds from "../../static/sounds/hit.mp3";

function Physics() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    THREE.ColorManagement.enabled = false;

    // Scene
    const scene = new THREE.Scene();

    /**
     * Sounds
     */
    const hitSound = new Audio(hitSounds);
    const playHitSound = (collision: any) => {
      const impactStrength = collision.contact.getImpactVelocityAlongNormal();
      // console.log(collision.contact.getImpactVelocityAlongNormal());
      if (impactStrength > 1.5) {
        hitSound.volume = Math.random();
        hitSound.currentTime = 0;
        hitSound.play();
      }
    };

    /**
     * Debug
     */
    const gui = new dat.GUI();
    const debugObject = {
      createSphere: () => {
        createSphere(Math.random() * 0.5, {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3,
        });
      },
      createBox: () => {
        createBox(Math.random(), Math.random(), Math.random(), {
          x: (Math.random() - 0.5) * 3,
          y: 3,
          z: (Math.random() - 0.5) * 3,
        });
      },
      reset: () => {
        for (const object of objectsToUpdate) {
          // Remove body
          object.body.removeEventListener("collide", playHitSound);
          // world.remove(object.body);
          world.removeBody(object.body);

          // Remove mesh
          scene.remove(object.mesh);
        }
      },
    };
    gui.add(debugObject, "createSphere");
    gui.add(debugObject, "createBox");
    gui.add(debugObject, "reset");

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const cubeTextureLoader = new THREE.CubeTextureLoader();

    const environmentMapTexture = cubeTextureLoader.load([
      EnvMapPX,
      EnvMapNX,
      EnvMapPY,
      EnvMapNY,
      EnvMapPZ,
      EnvMapNZ,
    ]);

    /**
     * Physics
     */
    // World
    const world = new CANNON.World();
    world.gravity.set(0, -9.8, 0);
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;

    // Materials
    const concreteMaterial = new CANNON.Material("concrete");
    const plasticMaterial = new CANNON.Material("plastic");
    const defaultMaterial = new CANNON.Material("default");

    // const concreatePlasticContactMaterial = new CANNON.ContactMaterial(
    //   concreteMaterial,
    //   plasticMaterial,
    //   {
    //     friction: 0.1,
    //     restitution: 0.7,
    //   }
    // );
    const defaultContactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.7,
      }
    );
    // world.addContactMaterial(concreatePlasticContactMaterial);
    world.addContactMaterial(defaultContactMaterial);
    world.defaultContactMaterial = defaultContactMaterial;

    // Sphere
    // const sphereShape = new CANNON.Sphere(0.5);
    // const sphereBody = new CANNON.Body({
    //   mass: 1,
    //   position: new CANNON.Vec3(0, 3, 0),
    //   shape: sphereShape,
    //   // material: plasticMaterial,
    //   // material: defaultMaterial,
    // });
    // sphereBody.applyLocalForce(
    //   new CANNON.Vec3(150, 0, 0),
    //   new CANNON.Vec3(0, 0, 0)
    // );
    // world.addBody(sphereBody);

    // Floor
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body();
    // floorBody.material = concreteMaterial;
    floorBody.material = defaultMaterial;
    floorBody.mass = 0;
    floorBody.addShape(floorShape);
    world.addBody(floorBody);
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
    );

    /**
     * Test sphere
     */
    // const sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(0.5, 32, 32),
    //   new THREE.MeshStandardMaterial({
    //     metalness: 0.3,
    //     roughness: 0.4,
    //     envMap: environmentMapTexture,
    //     envMapIntensity: 0.5,
    //   })
    // );
    // sphere.castShadow = true;
    // sphere.position.y = 0.5;
    // scene.add(sphere);

    /**
     * Floor
     */
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#777777",
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

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
    camera.position.set(-3, 3, 3);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, currentDom);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom as HTMLCanvasElement,
    });
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Utils
     */
    const objectsToUpdate: any[] = [];

    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
    });

    const createSphere = (radius: any, position: any) => {
      // Three.js mesh
      const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      mesh.scale.set(radius, radius, radius);
      mesh.castShadow = true;
      mesh.position.copy(position);
      scene.add(mesh);

      // Cannon.js body
      const shape = new CANNON.Sphere(radius);
      const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defaultMaterial,
      });
      body.position.copy(position);
      body.addEventListener("collide", playHitSound);
      world.addBody(body);

      // Save in objects to update
      objectsToUpdate.push({
        mesh: mesh,
        body: body,
      });
    };

    createSphere(0.5, { x: 0, y: 3, z: 0 });

    // Box
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
    });

    const createBox = (width: any, height: any, depth: any, position: any) => {
      // Three.js mesh
      const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      mesh.scale.set(width, height, depth);
      mesh.castShadow = true;
      mesh.position.copy(position);
      scene.add(mesh);

      // Cannon.js body
      const shape = new CANNON.Box(
        new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)
      );
      const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defaultMaterial,
      });
      body.position.copy(position);
      body.addEventListener("collide", playHitSound);
      world.addBody(body);

      // Save in objects to update
      objectsToUpdate.push({
        mesh: mesh,
        body: body,
      });
    };

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let oldElapsedTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - oldElapsedTime;
      oldElapsedTime = elapsedTime;

      // Update physics world
      // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);

      world.step(1 / 60, deltaTime, 3);

      // console.log(sphereBody.position.y);
      // sphere.position.x = sphereBody.position.x;
      // sphere.position.y = sphereBody.position.y;
      // sphere.position.z = sphereBody.position.z;
      // sphere.position.copy(sphereBody.position as any);

      for (const object of objectsToUpdate) {
        object.mesh.position.copy(object.body.position);
        object.mesh.quaternion.copy(object.body.quaternion);
      }

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

export default Physics;
