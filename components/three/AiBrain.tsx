import * as THREE from 'three';
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, Float, MeshDistortMaterial, Environment } from '@react-three/drei';

interface Node {
  position: [number, number, number];
  connections: number[];
  size: number;
  type: 'input' | 'hidden' | 'output';
}

const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState<number | null>(null);
  const { mouse } = useThree();

  const { nodes, connections } = useMemo(() => {
    const nodes: Node[] = [];
    const connections: Array<[number, number]> = [];

    // Create neural network layers
    const layers = [
      { count: 6, z: -2, type: 'input' as const },
      { count: 8, z: 0, type: 'hidden' as const },
      { count: 4, z: 2, type: 'output' as const }
    ];

    let nodeIndex = 0;
    const layerNodes: number[][] = [];

    layers.forEach((layer, layerIdx) => {
      const layerNodeIndices: number[] = [];
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const radius = layer.count > 4 ? 1.5 : 1;
        nodes.push({
          position: [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            layer.z
          ],
          connections: [],
          size: 0.08 + Math.random() * 0.04,
          type: layer.type
        });
        layerNodeIndices.push(nodeIndex);
        nodeIndex++;
      }
      layerNodes.push(layerNodeIndices);
    });

    // Create connections between layers
    for (let l = 0; l < layerNodes.length - 1; l++) {
      layerNodes[l].forEach(nodeA => {
        layerNodes[l + 1].forEach(nodeB => {
          if (Math.random() > 0.3) { // 70% chance of connection
            connections.push([nodeA, nodeB]);
            nodes[nodeA].connections.push(nodeB);
          }
        });
      });
    }

    return { nodes, connections };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      // Subtle mouse interaction
      groupRef.current.rotation.x = mouse.y * 0.1;
      groupRef.current.rotation.z = mouse.x * 0.05;
    }
  });

  const getNodeColor = (type: string, isHovered: boolean) => {
    if (isHovered) return '#FFD700';
    switch (type) {
      case 'input': return '#00D4FF';
      case 'hidden': return '#9333EA';
      case 'output': return '#FF6B35';
      default: return '#FFFFFF';
    }
  };

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map(([startIdx, endIdx], idx) => {
        const start = nodes[startIdx].position;
        const end = nodes[endIdx].position;
        return (
          <Line
            key={idx}
            points={[start, end]}
            color={hovered === startIdx || hovered === endIdx ? '#FFD700' : '#4A5568'}
            lineWidth={hovered === startIdx || hovered === endIdx ? 3 : 1}
            transparent
            opacity={0.6}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <mesh
          key={idx}
          position={node.position}
          onPointerEnter={() => setHovered(idx)}
          onPointerLeave={() => setHovered(null)}
        >
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshStandardMaterial
            color={getNodeColor(node.type, hovered === idx)}
            emissive={getNodeColor(node.type, hovered === idx)}
            emissiveIntensity={hovered === idx ? 0.5 : 0.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Floating geometric shapes */}
      <FloatingGeometry />
      
      {/* Central core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#9333EA"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>
    </group>
  );
};

const FloatingGeometry: React.FC = () => {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
      scale: 0.1 + Math.random() * 0.2,
      type: Math.floor(Math.random() * 4),
      speed: 0.5 + Math.random() * 1.5
    }));
  }, []);

  return (
    <>
      {shapes.map((shape, idx) => (
        <Float
          key={idx}
          speed={shape.speed}
          rotationIntensity={2}
          floatIntensity={1}
          position={shape.position}
        >
          {shape.type === 0 && (
            <mesh rotation={shape.rotation}>
              <boxGeometry args={[shape.scale, shape.scale, shape.scale]} />
              <meshStandardMaterial
                color="#00D4FF"
                emissive="#00D4FF"
                emissiveIntensity={0.3}
                transparent
                opacity={0.7}
                wireframe
              />
            </mesh>
          )}
          {shape.type === 1 && (
            <mesh rotation={shape.rotation}>
              <tetrahedronGeometry args={[shape.scale]} />
              <meshStandardMaterial
                color="#FF6B35"
                emissive="#FF6B35"
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}
          {shape.type === 2 && (
            <mesh rotation={shape.rotation}>
              <octahedronGeometry args={[shape.scale]} />
              <meshStandardMaterial
                color="#9333EA"
                emissive="#9333EA"
                emissiveIntensity={0.4}
                transparent
                opacity={0.6}
                wireframe
              />
            </mesh>
          )}
          {shape.type === 3 && (
            <mesh rotation={shape.rotation}>
              <icosahedronGeometry args={[shape.scale]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={0.2}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
        </Float>
      ))}
    </>
  );
};

const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Color gradient
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AiBrainScene: React.FC = () => {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
      <directionalLight position={[0, 10, 5]} intensity={0.5} />
      
      <NeuralNetwork />
      <ParticleField />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

const AiBrain: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <AiBrainScene />
    </Canvas>
  );
};

export default AiBrain;
