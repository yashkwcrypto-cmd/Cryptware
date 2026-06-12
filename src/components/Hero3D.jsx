import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';

// Define the core tech stack data
const TECH_DATA = [
  { text: "React", color: "#61DAFB", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { text: "Node", color: "#339933", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { text: "AWS", color: "#FF9900", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { text: "Figma", color: "#F24E1E", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { text: "HTML5", color: "#E34F26", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { text: "CSS3", color: "#1572B6", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { text: "JS", color: "#F7DF1E", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { text: "Angular", color: "#DD0031", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
  { text: ".NET", color: "#512BD4", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" },
  { text: "Java", color: "#e4e4ebff", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { text: "Azure", color: "#0089D6", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { text: "Flutter", color: "#02569B", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { text: "Kotlin", color: "#7F52FF", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" },
  { text: "Android", color: "#3DDC84", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg" },
  { text: "Apple", color: "#999999", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" },
  { text: "MongoDB", color: "#47A248", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
];

const PremiumObject = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      const baseRotationX = time * 0.1;
      const baseRotationY = time * 0.15;

      // Cursor interaction
      const targetRotationX = (state.pointer.y * Math.PI) / 4;
      const targetRotationY = (state.pointer.x * Math.PI) / 4;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, baseRotationX - targetRotationX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, baseRotationY + targetRotationY, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshPhysicalMaterial
          color="#06A3DA"
          emissive="#06A3DA"
          emissiveIntensity={0.3}
          roughness={0.05}
          metalness={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const _scale = new THREE.Vector3();

const TechBlock = ({ position, text, color, logoUrl }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [speed] = useState(() => 1.5 + Math.random() * 1.5);
  const [rotIntensity] = useState(() => 0.8 + Math.random() * 1.2);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = time * 0.1;
      // Reuse pre-allocated vector — no GC pressure
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(_scale.set(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <Float speed={speed} rotationIntensity={rotIntensity} floatIntensity={1.5}>
      <group position={position}>
        <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} castShadow>
          <RoundedBox args={[0.35, 0.35, 0.35]} radius={0.06} smoothness={4}>
            <meshStandardMaterial
              color={hovered ? "#ffffff" : color}
              roughness={0.2}
              metalness={0.8}
              emissive={hovered ? color : "#000000"}
              emissiveIntensity={hovered ? 0.8 : 0.2}
            />
          </RoundedBox>
          <Html position={[0, 0, 0.185]} transform center distanceFactor={1.0}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', filter: hovered ? 'none' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))' }}>
              <img src={logoUrl} alt={text} style={{ width: '46px', height: '46px', objectFit: 'contain', marginBottom: '6px' }} />
              <span style={{ fontWeight: '900', fontSize: '13px', fontFamily: 'sans-serif', color: hovered ? '#000000' : '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{text}</span>
            </div>
          </Html>
          <Html position={[0, 0, -0.185]} transform center distanceFactor={1.0} rotation={[0, Math.PI, 0]}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', filter: hovered ? 'none' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))' }}>
              <img src={logoUrl} alt={text} style={{ width: '46px', height: '46px', objectFit: 'contain', marginBottom: '6px' }} />
              <span style={{ fontWeight: '900', fontSize: '13px', fontFamily: 'sans-serif', color: hovered ? '#000000' : '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{text}</span>
            </div>
          </Html>
        </mesh>
      </group>
    </Float>
  );
};

// Responsive container that automatically scales to prevent elements from going out of window
const ResponsiveScene = () => {
  const { viewport } = useThree();
  const groupRef = useRef();

  // Dynamically calculate positions in a perfect orbital wave
  const orbitalPositions = useMemo(() => {
    const radius = 3.2; // Base orbit radius
    return TECH_DATA.map((tech, i) => {
      const angle = (i / TECH_DATA.length) * Math.PI * 2;
      // Create a wavy orbit so they aren't all on one flat plane
      const y = Math.sin(angle * 4) * 1.5;
      return {
        ...tech,
        pos: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ]
      };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gently rotate the entire orbital galaxy over time
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      // Slight parallax tilt based on cursor
      const targetTiltX = (state.pointer.y * Math.PI) / 8;
      const targetTiltY = (state.pointer.x * Math.PI) / 8;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.02);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -targetTiltY, 0.02);
    }
  });

  // Increase the scene scale on narrower screens so the 3D object stays prominent.
  const scale = viewport.width < 7 ? 1.1 : Math.min(1.2, viewport.width / 7.5);

  return (
    <group scale={scale} ref={groupRef}>
      <PremiumObject />
      {orbitalPositions.map((tech, i) => (
        <TechBlock key={i} position={tech.pos} text={tech.text} color={tech.color} logoUrl={tech.logoUrl} />
      ))}
    </group>
  );
};

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#06A3DA" />
        <Sparkles count={30} scale={14} size={1.5} speed={0.3} opacity={0.25} color="#06A3DA" />

        <ResponsiveScene />
      </Canvas>
    </div>
  );
}
