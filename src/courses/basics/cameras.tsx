import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Cameras() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    // Scene
    const scene = new THREE.Scene();

    // Red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // mesh.position.set(1, 1, 1);

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // // Cursor
    // const cursor = {
    //   x: 0,
    //   y: 0,
    // };
    // window.addEventListener("mousemove", (event: any) => {
    //   cursor.x = event.clientX / sizes.width - 0.5;
    //   cursor.y = -(event.clientY / sizes.height - 0.5);
    // });

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      1,
      1000
    );

    // const aspectRatio = sizes.width / sizes.height;
    // const camera = new THREE.OrthographicCamera(
    //   -1 * aspectRatio,
    //   1 * aspectRatio,
    //   1,
    //   -1,
    //   0.1,
    //   100
    // );
    camera.position.x = 2;
    camera.position.y = 2;
    camera.position.z = 3;

    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, currentDom);
    controls.enableDamping = true;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom,
    });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      // mesh.rotation.y = elapsedTime;
      // Update camera
      // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
      // camera.position.z = Math.cos(cursor.y * Math.PI * 2) * 3;
      // camera.position.y = cursor.y * 5;
      // camera.lookAt(mesh.position);
      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
      controls.update();
    };
    tick();
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Cameras;
