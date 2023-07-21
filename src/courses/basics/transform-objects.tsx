import { useEffect, useRef } from "react";
import * as THREE from "three";

function TransformObjects() {
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

    /**
     * length
     * distanceTo
     * normalize
     */
    // console.log(mesh.position.length());
    // console.log(mesh.position.distanceTo(new THREE.Vector3(0, 1, 2)));
    // mesh.position.normalize();
    // console.log(mesh.position.length());

    // Position
    // mesh.position.x = 0.7;
    // mesh.position.y = -0.6;
    // mesh.position.z = 1;
    mesh.position.set(0.7, -0.6, 1);

    // Scale
    // mesh.scale.x = 2;
    // mesh.scale.y = 0.25;
    // mesh.scale.z = 0.5;
    mesh.scale.set(2, 0.25, 0.5);

    // Rotation
    mesh.rotation.reorder("YXZ");
    mesh.rotation.x = Math.PI * 0.25;
    mesh.rotation.y = Math.PI * 0.25;

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // Sizes
    const sizes = {
      width: currentDom.offsetWidth || 800,
      height: currentDom.offsetHeight || 600,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    camera.position.z = 3;
    // camera.position.y = 1;
    // camera.position.x = 1;
    scene.add(camera);
    // camera.lookAt(new THREE.Vector3(3, 0, 0));
    // camera.lookAt(mesh.position);
    console.log(mesh.position.distanceTo(camera.position));

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: currentDom,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  }, []);

  return <canvas style={{ width: "100%", height: "100%" }} ref={ref} />;
}

export default TransformObjects;
