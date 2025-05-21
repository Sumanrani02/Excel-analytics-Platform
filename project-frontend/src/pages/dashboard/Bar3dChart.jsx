import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Bar3DChart = ({ data }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const width = 400;
    const height = 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Bars
    const maxData = Math.max(...data.datasets[0].data);

    data.datasets[0].data.forEach((value, index) => {
      const geometry = new THREE.BoxGeometry(0.3, value / maxData * 2, 0.3);
      const material = new THREE.MeshStandardMaterial({
        color: data.datasets[0].backgroundColor[index % data.datasets[0].backgroundColor.length],
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = index - data.datasets[0].data.length / 2;
      cube.position.y = (value / maxData) * 1; // Raise so it sits on "floor"
      scene.add(cube);
    });

    // Animate
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [data]);

  return <div ref={mountRef}></div>;
};

export default Bar3DChart;
