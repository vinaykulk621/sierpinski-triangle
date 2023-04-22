"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Triangle = () => {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
    controlsRef.current = new OrbitControls(
      cameraRef.current,
      rendererRef.current.domElement
    );
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const controls = controlsRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.after(renderer.domElement);

    const vertices = [
      new THREE.Vector3(0, 200, 0),
      new THREE.Vector3(-200, -200, -200),
      new THREE.Vector3(-200, -200, 200),
      new THREE.Vector3(200, -200, -200),
      new THREE.Vector3(200, -200, 200),
    ];

    // Define starting point
    let point = new THREE.Vector3(0, 0, 0);

    // Define number of iterations
    const num_iterations = 100000;

    // Define scale factor
    const scale = 0.5;

    // Define function to render point
    const renderPoint = function (point) {
      const geometry = new THREE.SphereGeometry(1, 10, 10);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffffff"),
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(point.x, point.y, point.z);
      scene.add(sphere);
    };

    // Plot Chaos Game
    let i = 0;
    const plotPoint = function () {
      const vertex = vertices[Math.floor(Math.random() * 5)];
      point.addVectors(point, vertex).multiplyScalar(scale);
      renderPoint(point);
      i++;
      if (i < num_iterations) {
        setTimeout(plotPoint, 0.5);
      }
    };
    plotPoint();

    // Set camera position and render scene
    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 5.4;
      renderer.render(scene, camera);
    };

    animate();
  }, []);
};

export default Triangle;
