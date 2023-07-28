import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

function RaycasterAndMouseEvents() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    THREE.ColorManagement.enabled = false;

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
     * Objects
     */
    const object1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#ff0000" })
    );
    object1.position.x = -2;

    const object2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#ff0000" })
    );

    const object3 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: "#ff0000" })
    );
    object3.position.x = 2;

    scene.add(object1, object2, object3);

    /**
     * Raycaster
     */
    const raycaster = new THREE.Raycaster();
    const rayOrigin = new THREE.Vector3(-3, 0, 0);
    const rayDirection = new THREE.Vector3(10, 0, 0);
    console.log(rayDirection.length(), "before normalize");
    rayDirection.normalize();
    console.log(rayDirection.length(), "after normalize");

    raycaster.set(rayOrigin, rayDirection);

    const intersect = raycaster.intersectObject(object2);
    console.log(intersect);

    const intersects = raycaster.intersectObjects([object1, object2, object3]);
    console.log(intersects);

    /**
     * Mouse
     */
    const mouse = new THREE.Vector2();
    currentDom.addEventListener("mousemove", (_event) => {
      // mouse.x = _event.clientX / sizes.width;
      // mouse.y = _event.clientY / sizes.height;
      mouse.x = (_event.offsetX / sizes.width) * 2 - 1;
      mouse.y = -(_event.offsetY / sizes.height) * 2 + 1;
    });
    currentDom.addEventListener("click", (_event) => {
      if (currentIntersect) {
        switch (currentIntersect.object) {
          case object1:
            console.log("click on object 1");
            break;
          case object2:
            console.log("click on object 2");
            break;
          case object3:
            console.log("click on object 3");
            break;
          default:
            break;
        }
      }
    });

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
    camera.position.z = 3;
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

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    let currentIntersect: any = null;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate objects
      object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
      object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
      object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

      // Cast a ray
      raycaster.setFromCamera(mouse, camera);

      // const rayOrigin = new THREE.Vector3(-3, 0, 0);
      // const rayDirection = new THREE.Vector3(1, 0, 0);
      // rayDirection.normalize();
      // raycaster.set(rayOrigin, rayDirection);

      const objectstoTest = [object1, object2, object3];
      const intersects = raycaster.intersectObjects(objectstoTest);

      for (const object of objectstoTest) {
        object.material.color.set("#ff0000");
      }

      for (const intersect of intersects) {
        (intersect.object as any).material.color.set("#0000ff");
      }

      if (intersects.length) {
        if (currentIntersect === null) {
          console.log("mouse enter");
        }

        currentIntersect = intersects[0];
      } else {
        if (currentIntersect) {
          console.log("mouse leave");
        }
        currentIntersect = null;
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

export default RaycasterAndMouseEvents;
