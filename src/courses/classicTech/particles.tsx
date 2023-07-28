import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

function Particles() {
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
     * Textures
     */
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/particles/2.png`
    );

    /**
     * Particles
     */
    // Geometry
    // const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 20000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    console.log(particlesGeometry.attributes.position.array);

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      // color: "#ff88cc",
      transparent: true,
      alphaMap: particleTexture,
      // alphaTest: 0.001,
      // depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Cube
    // const cube = new THREE.Mesh(
    //   new THREE.BoxGeometry(),
    //   new THREE.MeshBasicMaterial()
    // );
    // scene.add(cube);

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

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update particles
      // particles.rotation.y = -elapsedTime * 0.02;

      // You should avoid this technic because updating the whole attribute on each frame is bad for performances
      // By using a custom shader
      // The best way to animate particles is to create our own shader
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3];
        const positions = particlesGeometry.attributes.position
          .array as Array<number>;
        positions[i3 + 1] = Math.sin(elapsedTime + x);
      }
      particlesGeometry.attributes.position.needsUpdate = true;

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

export default Particles;
