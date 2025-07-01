import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  mousePosition: { x: number; y: number };
}

// Custom shader for enhanced particles similar to Figma's approach
const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uSize;
  attribute float aScale;
  attribute vec3 aRandomness;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Mouse attraction effect
    vec2 mouseDistance = uMouse - modelPosition.xy;
    float mouseLength = length(mouseDistance);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseLength) * 0.3;
    
    modelPosition.xy += normalize(mouseDistance) * mouseInfluence;
    
    // Wave animation
    modelPosition.z += sin(uTime + modelPosition.x * 4.0) * 0.1 * aRandomness.x;
    modelPosition.z += cos(uTime * 0.7 + modelPosition.y * 3.0) * 0.1 * aRandomness.y;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
  }
`;

const particleFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uTime;
  
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    
    // Color mixing based on position and time
    vec3 mixedColor = mix(uColor1, uColor2, sin(uTime * 0.5) * 0.5 + 0.5);
    mixedColor = mix(mixedColor, uColor3, cos(uTime * 0.3) * 0.5 + 0.5);
    
    gl_FragColor = vec4(mixedColor, strength);
  }
`;

const InteractiveParticles: React.FC<ParticleSystemProps> = ({ mousePosition }) => {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  // Generate particles in a sophisticated pattern
  const [positions, scales, randomness] = useMemo(() => {
    const count = 1500; // Optimized count for performance
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);
    
    // Create multiple layers of particles with different patterns
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (i < count * 0.6) {
        // Main distributed particles
        positions[i3] = (Math.random() - 0.5) * 8;
        positions[i3 + 1] = (Math.random() - 0.5) * 6;
        positions[i3 + 2] = (Math.random() - 0.5) * 3;
      } else if (i < count * 0.8) {
        // Circular pattern particles
        const angle = (i / count) * Math.PI * 2 * 3;
        const radius = 2 + Math.random() * 2;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius;
        positions[i3 + 2] = (Math.random() - 0.5) * 2;
      } else {
        // Grid-based particles for structure
        const gridSize = Math.sqrt(count * 0.2);
        const row = Math.floor((i - count * 0.8) / gridSize);
        const col = (i - count * 0.8) % gridSize;
        positions[i3] = (col - gridSize / 2) * 0.3;
        positions[i3 + 1] = (row - gridSize / 2) * 0.3;
        positions[i3 + 2] = Math.random() - 0.5;
      }
      
      scales[i] = Math.random() * 0.8 + 0.2;
      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }
    
    return [positions, scales, randomness];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uSize: { value: 3 },
      uColor1: { value: new THREE.Color('#028090') }, // Primary teal
      uColor2: { value: new THREE.Color('#4D96FF') }, // Secondary blue
      uColor3: { value: new THREE.Color('#FF6F61') }, // Accent coral
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current) {
      uniforms.uTime.value = state.clock.elapsedTime;
      
      // Convert mouse position to world coordinates
      uniforms.uMouse.value.x = (mousePosition.x / window.innerWidth) * viewport.width - viewport.width / 2;
      uniforms.uMouse.value.y = -(mousePosition.y / window.innerHeight) * viewport.height + viewport.height / 2;
      
      // Subtle rotation
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={randomness.length / 3}
          array={randomness}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Geometric shapes layer similar to Figma
const GeometricShapes: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.z = state.clock.elapsedTime * 0.02;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Floating geometric elements */}
      <mesh position={[-3, 2, 0]}>
        <ringGeometry args={[0.3, 0.5, 6]} />
        <meshBasicMaterial color="#028090" transparent opacity={0.1} />
      </mesh>
      
      <mesh position={[3, -1, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.4, 0.1]} />
        <meshBasicMaterial color="#4D96FF" transparent opacity={0.08} />
      </mesh>
      
      <mesh position={[0, 3, -1]}>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshBasicMaterial color="#FF6F61" transparent opacity={0.12} />
      </mesh>
    </group>
  );
};

interface FigmaStyleCanvasProps {
  className?: string;
  quality?: 'high' | 'medium' | 'low';
}

const FigmaStyleCanvas: React.FC<FigmaStyleCanvasProps> = ({ 
  className = '', 
  quality = 'high' 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'medium' | 'low'>(quality);

  useEffect(() => {
    // Detect mobile devices for performance optimization
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={
          performanceMode === 'low' ? [0.5, 1] : 
          performanceMode === 'medium' ? [1, 1.5] : 
          isMobile ? [1, 1.5] : [1, 2]
        }
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          // Optimize WebGL settings for performance
          if (performanceMode === 'low') {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
          }
        }}
      >
        <InteractiveParticles mousePosition={mousePosition} />
        {!isMobile && performanceMode !== 'low' && <GeometricShapes />}
      </Canvas>
    </div>
  );
};

export default FigmaStyleCanvas;