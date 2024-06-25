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
  context.fillStyle = "white";
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

  const textTexture = createTextTexture();

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={textTexture} emissive="#fc6603" />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas
      camera={{ position: [3, 0, 0.1] }}
      style={{ height: "100vh", backgroundColor: "#a83275" }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere />
      <OrbitControls
        enablePan={false}
        rotateSpeed={0.5}
        maxDistance={40}
        minDistance={4}
      />
    </Canvas>
  );
};

export default App;
