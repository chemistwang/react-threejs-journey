import { useEffect, useRef } from "react";
import * as THREE from "three";

function FullscreenResizing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const containerDom = containerRef.current;
    const currentDom = ref.current;
    if (!containerDom || !currentDom) return;

    // Scene
    const scene = new THREE.Scene();

    // Red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Sizes
    const sizes = {
      width: containerDom.offsetWidth || 800,
      height: containerDom.offsetHeight || 600,
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
    renderer.render(scene, camera);

    window.addEventListener("resize", () => {
      // console.log(
      //   containerDom.offsetWidth,
      //   containerDom.offsetHeight,
      //   containerDom.clientWidth,
      //   containerDom.clientHeight
      // );
      // Update camera
      camera.aspect = containerDom.offsetWidth / containerDom.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerDom.offsetWidth, containerDom.offsetHeight);
      // 设置渲染器的像素比例
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      <canvas ref={ref} />
    </div>
  );
}

export default FullscreenResizing;
