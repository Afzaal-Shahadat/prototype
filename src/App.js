import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const createTextTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  // Fill the canvas background with black
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw orange text on the canvas (aligned to the center)
  context.font = "Bold 30px Arial";
  context.fillStyle = "orange";
  context.textAlign = "center"; // Align center for the text
  context.textBaseline = "middle";
  context.fillText("universal", canvas.width / 2, canvas.height / 2);

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  return texture;
};

const Sphere = () => {
  const meshRef = useRef();
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleWheel = (event) => {
      setScale((prevScale) => Math.max(0.1, prevScale + event.deltaY * -0.001));
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  const handleClick = () => {
    const randomRotation = [
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
      Math.random() * 2 * Math.PI,
    ];
    setRotation(randomRotation);
  };

  const textTexture = createTextTexture();

  return (
    <mesh ref={meshRef} onClick={handleClick}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={textTexture} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere />
      <OrbitControls
        enableZoom={true}
        maxDistance={10} // Maximum zoom-out distance
        minDistance={1} // Minimum zoom-in distance
      />
    </Canvas>
  );
};

export default App;
