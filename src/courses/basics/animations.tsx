import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useOutletContext } from "react-router-dom";
import gsap from "gsap";

function Animations() {
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

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom,
    });
    renderer.setSize(sizes.width, sizes.height);

    gsap.to(mesh.position, {
      duration: 1,
      delay: 1,
      x: 3,
    });

    // Clock
    const clock = new THREE.Clock();
    // Animations
    const tick = () => {
      // Clock
      const elapsedTime = clock.getElapsedTime();
      // Update objects
      // mesh.rotation.y = elapsedTime;
      // mesh.position.y = Math.sin(elapsedTime);
      // mesh.position.x = Math.cos(elapsedTime);
      /** */
      camera.position.y = Math.sin(elapsedTime);
      camera.position.x = Math.cos(elapsedTime);
      camera.lookAt(mesh.position);

      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default Animations;
