import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
import { gsap } from "gsap";

function DebugUI() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const currentDom = ref.current;
    if (!currentDom) return;

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // Scene
    const scene = new THREE.Scene();

    // Red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      // wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    /**
     * Debug
     */
    const parameters = {
      color: 0xff0000,
      spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
      },
    };

    const gui = new dat.GUI();
    // gui.add(mesh.position, "x", -3, 3, 0.01);
    // gui.add(mesh.position, "y", -3, 3, 0.01);
    // gui.add(mesh.position, "z", -3, 3, 0.01);
    gui.add(mesh.position, "x").min(-3).max(3).step(0.01);
    gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
    gui.add(mesh.position, "z").min(-3).max(3).step(0.01).name("cube z");

    gui.add(mesh, "visible");

    gui.add(material, "wireframe");

    gui.addColor(parameters, "color").onChange((val) => {
      material.color.set(parameters.color);
    });
    gui.add(parameters, "spin");

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

    const tick = () => {
      // Render
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
      controls.update();
    };
    tick();

    return () => {
      gui.destroy();
    };
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default DebugUI;
