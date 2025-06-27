import * as THREE from 'three';
import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Line, Float, MeshDistortMaterial, Environment, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Error Boundary Component
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

// Holographic Shader Material
const HolographicMaterial = shaderMaterial(
  {
    time: 0,
    fresnelPower: 2.0,
    rimPower: 0.5,
    color1: new THREE.Color('#9333EA'),
    color2: new THREE.Color('#00D4FF'),
    color3: new THREE.Color('#FF6B35'),
  },
  // Vertex shader
  `
    uniform float time;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float fresnelPower;
    uniform float rimPower;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec3 color3;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Fresnel effect
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), fresnelPower);
      
      // Animated stripes
      float stripes = sin(vPosition.y * 10.0 + time * 2.0) * 0.5 + 0.5;
      stripes = pow(stripes, 3.0);
      
      // Color mixing based on position and time
      vec3 color = mix(color1, color2, sin(time * 0.5) * 0.5 + 0.5);
      color = mix(color, color3, stripes);
      
      // Rim lighting
      float rim = 1.0 - max(dot(normal, viewDir), 0.0);
      rim = pow(rim, rimPower);
      
      // Final color
      vec3 finalColor = color * (fresnel + rim * 2.0);
      
      gl_FragColor = vec4(finalColor, fresnel * 0.8 + 0.2);
    }
  `
);

extend({ HolographicMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    holographicMaterial: any;
  }
}

// Pulsing Node Component
const PulsingNode: React.FC<{
  position: [number, number, number];
  size: number;
  color: string;
  isHovered: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}> = ({ position, size, color, isHovered, onPointerEnter, onPointerLeave }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const pulseScale = 1 + Math.sin(time * 3 + position[0] + position[1]) * 0.2;
      meshRef.current.scale.setScalar(pulseScale);
      
      // Add subtle rotation
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isHovered ? 2.5 : 1.0}
        metalness={0.8}
        roughness={0.2}
        toneMapped={false}
      />
    </mesh>
  );
};

// Data Flow Particle Component
const DataFlowParticle: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  delay: number;
  isActive: boolean;
}> = ({ start, end, speed, delay, isActive }) => {
  const particleRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (particleRef.current && isActive) {
      const time = state.clock.elapsedTime;
      const adjustedTime = (time * speed + delay) % 2;
      const progress = adjustedTime > 1 ? 2 - adjustedTime : adjustedTime;
      
      particleRef.current.position.lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        progress
      );
      
      // Fade in/out effect
      const material = particleRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.sin(progress * Math.PI) * 0.8;
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial
        color="#00D4FF"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

interface Node {
  position: [number, number, number];
  connections: number[];
  size: number;
  type: 'input' | 'hidden' | 'output';
}

const NeuralNetwork: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const hologramRef = useRef<any>(null!);
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

    // Update holographic material
    if (hologramRef.current) {
      hologramRef.current.time = state.clock.elapsedTime;
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
      {/* Connections with Data Flow */}
      {connections.map(([startIdx, endIdx], idx) => {
        const start = nodes[startIdx].position;
        const end = nodes[endIdx].position;
        const isHighlighted = hovered === startIdx || hovered === endIdx;
        
        return (
          <group key={idx}>
            <Line
              points={[start, end]}
              color={isHighlighted ? '#FFD700' : '#4A5568'}
              lineWidth={isHighlighted ? 3 : 1}
              transparent
              opacity={0.6}
            />
            <DataFlowParticle
              start={start}
              end={end}
              speed={0.5 + Math.random() * 1.0}
              delay={idx * 0.1}
              isActive={Math.random() > 0.7}
            />
          </group>
        );
      })}

      {/* Nodes */}
      {nodes.map((node, idx) => (
        <PulsingNode
          key={idx}
          position={node.position}
          size={node.size}
          color={getNodeColor(node.type, hovered === idx)}
          isHovered={hovered === idx}
          onPointerEnter={() => setHovered(idx)}
          onPointerLeave={() => setHovered(null)}
        />
      ))}

      {/* Floating geometric shapes */}
      <FloatingGeometry />
      
      {/* Central holographic core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
          <holographicMaterial 
            ref={hologramRef}
            transparent
            side={THREE.DoubleSide}
          />
        </Sphere>
      </Float>

      {/* Floating 3D Text */}
      <FloatingText />
      
      {/* Skill Orbs */}
      <SkillOrbs />
    </group>
  );
};

// Floating Text Component
const FloatingText: React.FC = () => {
  return (
    <>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.8}>
        <Text
          position={[0, 3, -1]}
          fontSize={0.5}
          color="#00D4FF"
          anchorX="center"
          anchorY="middle"
        >
          GAGANDEEP SINGH
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={1.2}
            toneMapped={false}
          />
        </Text>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <Text
          position={[0, 2.2, -0.8]}
          fontSize={0.25}
          color="#9333EA"
          anchorX="center"
          anchorY="middle"
        >
          GENAI EXPERT
          <meshStandardMaterial
            color="#9333EA"
            emissive="#9333EA"
            emissiveIntensity={0.8}
            toneMapped={false}
          />
        </Text>
      </Float>

      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1.0}>
        <Text
          position={[0, -3.2, -1.2]}
          fontSize={0.18}
          color="#FF6B35"
          anchorX="center"
          anchorY="middle"
        >
          AI • ML • NLP • LLM
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={0.9}
            toneMapped={false}
          />
        </Text>
      </Float>
    </>
  );
};

// Skill Orbs Component
const SkillOrbs: React.FC = () => {
  const skills = useMemo(() => [
    { name: 'Python', color: '#FFD43B', position: [3, 1.5, -2] },
    { name: 'TensorFlow', color: '#FF6B35', position: [-3, 1.8, -1.5] },
    { name: 'PyTorch', color: '#EE4C2C', position: [2.5, -1.2, -2.2] },
    { name: 'OpenAI', color: '#00D4FF', position: [-2.8, -1.5, -1.8] },
    { name: 'LangChain', color: '#9333EA', position: [3.2, 0.5, 1.5] },
    { name: 'AWS', color: '#FF9900', position: [-3.5, 0.8, 1.2] },
  ], []);

  return (
    <>
      {skills.map((skill, idx) => (
        <Float
          key={skill.name}
          speed={0.5 + Math.random() * 1.0}
          rotationIntensity={1}
          floatIntensity={0.5}
        >
          <group position={skill.position as [number, number, number]}>
            <Sphere args={[0.15, 16, 16]}>
              <meshStandardMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={0.5}
                transparent
                opacity={0.8}
                toneMapped={false}
              />
            </Sphere>
            <Text
              position={[0, -0.4, 0]}
              fontSize={0.08}
              color={skill.color}
              anchorX="center"
              anchorY="middle"
                >
              {skill.name}
              <meshBasicMaterial
                color={skill.color}
                transparent
                opacity={0.9}
              />
            </Text>
          </group>
        </Float>
      ))}
    </>
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
                emissiveIntensity={1.2}
                transparent
                opacity={0.7}
                wireframe
                toneMapped={false}
              />
            </mesh>
          )}
          {shape.type === 1 && (
            <mesh rotation={shape.rotation}>
              <tetrahedronGeometry args={[shape.scale]} />
              <meshStandardMaterial
                color="#FF6B35"
                emissive="#FF6B35"
                emissiveIntensity={1.0}
                transparent
                opacity={0.8}
                toneMapped={false}
              />
            </mesh>
          )}
          {shape.type === 2 && (
            <mesh rotation={shape.rotation}>
              <octahedronGeometry args={[shape.scale]} />
              <meshStandardMaterial
                color="#9333EA"
                emissive="#9333EA"
                emissiveIntensity={1.3}
                transparent
                opacity={0.6}
                wireframe
                toneMapped={false}
              />
            </mesh>
          )}
          {shape.type === 3 && (
            <mesh rotation={shape.rotation}>
              <icosahedronGeometry args={[shape.scale]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={1.1}
                metalness={0.8}
                roughness={0.2}
                toneMapped={false}
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
  const { mouse } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    const colors = new Float32Array(3000 * 3);
    const originalPositions = new Float32Array(3000 * 3);
    
    for (let i = 0; i < 3000; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      
      // Enhanced color gradient with more variety
      const color = new THREE.Color();
      const hue = 0.6 + Math.random() * 0.3;
      color.setHSL(hue, 0.8, 0.4 + Math.random() * 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors, originalPositions };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;

      // Mouse interaction with particles
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const originalX = particles.originalPositions[i];
        const originalY = particles.originalPositions[i + 1];
        
        const mouseInfluence = 0.5;
        const distance = Math.sqrt(
          Math.pow(originalX - mouse.x * 5, 2) + 
          Math.pow(originalY - mouse.y * 5, 2)
        );
        
        if (distance < 2) {
          const force = (2 - distance) * mouseInfluence;
          positions[i] = originalX + (mouse.x * force);
          positions[i + 1] = originalY + (mouse.y * force);
        } else {
          positions[i] = THREE.MathUtils.lerp(positions[i], originalX, 0.05);
          positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], originalY, 0.05);
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={3000}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={3000}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AiBrainScene: React.FC = () => {
  const [enablePostProcessing, setEnablePostProcessing] = useState(true);

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
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

      {enablePostProcessing && (
        <ThreeErrorBoundary 
          fallback={null}
        >
          <EffectComposer multisampling={0}>
            <Bloom 
              intensity={1.2}
              luminanceThreshold={0.5}
              luminanceSmoothing={0.7}
            />
            <ChromaticAberration 
              blendFunction={BlendFunction.NORMAL} 
              offset={new THREE.Vector2(0.0005, 0.0012)} 
            />
            <Noise 
              blendFunction={BlendFunction.SOFT_LIGHT} 
              opacity={0.02} 
            />
          </EffectComposer>
        </ThreeErrorBoundary>
      )}
    </>
  );
};

const AiBrain: React.FC = () => {
  return (
    <ThreeErrorBoundary
      fallback={
        <div className="flex items-center justify-center h-full text-slate-600 dark:text-slate-400">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <div>AI Brain Loading...</div>
          </div>
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AiBrainScene />
      </Canvas>
    </ThreeErrorBoundary>
  );
};

export default AiBrain;
