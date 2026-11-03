import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural 3D Mechanical Assembly that decomposes into Neural Network nodes
export function MechanicalNeuralModel({ 
  deconstruct = 0, // 0 = Pure Mechanical Assembly, 1 = Fully Deconstructed Neural Web
  mode = 'hybrid', // 'cad', 'neural', 'hybrid'
  isInteracting = false 
}) {
  const groupRef = useRef();
  const rotorRef = useRef();
  const gearRingRef = useRef();
  const gimbalXRef = useRef();
  const gimbalYRef = useRef();
  const neuralNodesRef = useRef();
  const particlesRef = useRef();
  const linesRef = useRef();

  // Generate procedural neural nodes and synaptic connections
  const { nodePositions, neuralConnections, particlePositions } = useMemo(() => {
    const nodeCount = 38;
    const positions = [];
    
    // Seeded pseudo-random coordinates clustered around the core and radiating outward
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.4 + (i % 5) * 0.35;
      
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      positions.push(new THREE.Vector3(x, y, z));
    }

    // Connect close neighbors to form a neural mesh
    const connections = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < 1.35) {
          connections.push(positions[i].x, positions[i].y, positions[i].z);
          connections.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    // Particle cloud coordinates (code streams / digital dust)
    const pCount = 300;
    const pCoords = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      const r = 2.0 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 3;
      pCoords[i] = Math.cos(angle) * r;
      pCoords[i + 1] = height;
      pCoords[i + 2] = Math.sin(angle) * r;
    }

    return {
      nodePositions: positions,
      neuralConnections: new Float32Array(connections),
      particlePositions: pCoords
    };
  }, []);

  // Turbine blade geometries
  const bladeCount = 12;
  const blades = useMemo(() => {
    const items = [];
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      items.push({
        angle,
        key: i
      });
    }
    return items;
  }, []);

  // Planetary satellite gears
  const satelliteGears = useMemo(() => {
    return [0, 1, 2, 3].map((idx) => {
      const angle = (idx / 4) * Math.PI * 2;
      const dist = 1.15;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        key: idx
      };
    });
  }, []);

  // Animation frame loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Base subtle rotation
    if (groupRef.current && !isInteracting) {
      groupRef.current.rotation.y = t * 0.12;
    }

    // Mechanical components spin at synchronized mechanical ratios
    if (rotorRef.current) {
      rotorRef.current.rotation.z = -t * 1.4;
    }

    if (gearRingRef.current) {
      gearRingRef.current.rotation.z = t * 0.45;
    }

    if (gimbalXRef.current) {
      gimbalXRef.current.rotation.x = Math.sin(t * 0.4) * 0.35;
      gimbalXRef.current.rotation.y = t * 0.25;
    }

    if (gimbalYRef.current) {
      gimbalYRef.current.rotation.y = -t * 0.2;
      gimbalYRef.current.rotation.z = Math.cos(t * 0.35) * 0.25;
    }

    // Particle swirl (neural code stream)
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.08;
      particlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  // Calculate dynamic decomposition offsets
  const explodeFactor = THREE.MathUtils.clamp(deconstruct, 0, 1);
  const mechanicalOpacity = mode === 'neural' ? 0.2 : (1 - explodeFactor * 0.45);
  const neuralOpacity = mode === 'cad' ? 0.15 : (0.3 + explodeFactor * 0.7);

  return (
    <group ref={groupRef} scale={[1.15, 1.15, 1.15]}>
      
      {/* ======================================================== */}
      {/* 1. CENTRAL DRIVE SHAFT & ENERGY CORE                     */}
      {/* ======================================================== */}
      <group position={[0, 0, 0]}>
        {/* Core Cylinder / Titanium Shaft */}
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 2.2, 32]} />
          <meshStandardMaterial 
            color="#0ea5e9" 
            metalness={0.9} 
            roughness={0.2} 
            wireframe={mode === 'cad'}
            transparent
            opacity={mechanicalOpacity}
          />
        </mesh>

        {/* Inner Glowing Plasma Sphere */}
        <mesh scale={1 + explodeFactor * 0.3}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial 
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.8 + Math.sin(deconstruct * 3) * 0.5}
            roughness={0.1}
            wireframe={mode === 'cad'}
          />
        </mesh>

        {/* Inner Core Halo Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 32]} />
          <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. ARTICULATED TURBINE ROTOR & BLADES                    */}
      {/* Expands along Z-axis during decomposition                */}
      {/* ======================================================== */}
      <group 
        ref={rotorRef} 
        position={[0, 0, 0.4 + explodeFactor * 0.9]}
      >
        {/* Rotor Central Hub */}
        <mesh>
          <cylinderGeometry args={[0.48, 0.48, 0.22, 24]} />
          <meshStandardMaterial 
            color="#38bdf8" 
            metalness={0.85} 
            roughness={0.25}
            transparent
            opacity={mechanicalOpacity}
          />
        </mesh>

        {/* 12 Aerodynamic Turbine Blades */}
        {blades.map((b) => (
          <group 
            key={b.key} 
            rotation={[0, 0, b.angle]} 
            position={[0, 0, 0]}
          >
            <mesh 
              position={[0.75 + explodeFactor * 0.4, 0, 0]} 
              rotation={[0.35, 0, -0.15]}
            >
              <boxGeometry args={[0.65, 0.16, 0.04]} />
              <meshStandardMaterial 
                color="#00f0ff"
                emissive="#0284c7"
                emissiveIntensity={0.3}
                metalness={0.95}
                roughness={0.15}
                wireframe={mode === 'cad'}
                transparent
                opacity={mechanicalOpacity}
              />
            </mesh>
          </group>
        ))}

        {/* Rotor Rim Wireframe */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.25 + explodeFactor * 0.4, 0.02, 16, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. PLANETARY GEAR SYSTEM & CAD CARRIER                   */}
      {/* Expands backwards along Z-axis during decomposition      */}
      {/* ======================================================== */}
      <group 
        ref={gearRingRef} 
        position={[0, 0, -0.4 - explodeFactor * 0.9]}
      >
        {/* Outer Ring Gear with CAD Teeth Accents */}
        <mesh>
          <torusGeometry args={[1.45 + explodeFactor * 0.3, 0.08, 16, 64]} />
          <meshStandardMaterial 
            color="#64748b" 
            metalness={0.9} 
            roughness={0.3}
            transparent
            opacity={mechanicalOpacity}
          />
        </mesh>

        {/* 4 Satellite Planetary Pinions */}
        {satelliteGears.map((gear) => (
          <group 
            key={gear.key} 
            position={[
              gear.x * (1 + explodeFactor * 0.5), 
              gear.y * (1 + explodeFactor * 0.5), 
              0
            ]}
          >
            <mesh>
              <cylinderGeometry args={[0.24, 0.24, 0.18, 18]} />
              <meshStandardMaterial 
                color="#0ea5e9"
                metalness={0.8}
                roughness={0.25}
                wireframe={mode === 'cad'}
                transparent
                opacity={mechanicalOpacity}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 4. DUAL GIMBAL CALIPER RINGS (CAD MEASUREMENT SYSTEM)    */}
      {/* Expands radially during decomposition                    */}
      {/* ======================================================== */}
      <group ref={gimbalXRef}>
        <mesh scale={1 + explodeFactor * 0.65}>
          <torusGeometry args={[1.75, 0.03, 16, 64]} />
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#7c3aed"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.2}
            transparent
            opacity={mechanicalOpacity * 0.9}
          />
        </mesh>
      </group>

      <group ref={gimbalYRef}>
        <mesh 
          rotation={[Math.PI / 2, 0, 0]} 
          scale={1 + explodeFactor * 0.8}
        >
          <torusGeometry args={[1.95, 0.03, 16, 64]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#0891b2"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={mechanicalOpacity * 0.85}
          />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. DECOMPOSED NEURAL NETWORK NODES & SYNAPTIC CONNECTIONS*/}
      {/* Emerge vibrantly as deconstruct increases                 */}
      {/* ======================================================== */}
      <group ref={neuralNodesRef}>
        {/* Synaptic Axon Connection Lines */}
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position"
              count={neuralConnections.length / 3}
              array={neuralConnections}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#a855f7" 
            transparent 
            opacity={neuralOpacity * 0.55} 
            linewidth={1} 
          />
        </lineSegments>

        {/* Neural Nodes (Spheres) */}
        {nodePositions.map((pos, idx) => {
          // Dynamic offset as core decomposes outward
          const currentPos = [
            pos.x * (1 + explodeFactor * 0.6),
            pos.y * (1 + explodeFactor * 0.6),
            pos.z * (1 + explodeFactor * 0.6)
          ];
          const isCoreNode = idx % 3 === 0;

          return (
            <group key={idx} position={currentPos}>
              <mesh>
                <sphereGeometry args={[isCoreNode ? 0.07 : 0.045, 16, 16]} />
                <meshStandardMaterial 
                  color={isCoreNode ? '#00f0ff' : '#d946ef'} 
                  emissive={isCoreNode ? '#00f0ff' : '#a855f7'}
                  emissiveIntensity={1.2 + explodeFactor * 1.5}
                  roughness={0.2}
                  transparent
                  opacity={neuralOpacity}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ======================================================== */}
      {/* 6. AMBIENT CODE STREAM PARTICLES                         */}
      {/* ======================================================== */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.035} 
          color="#38bdf8" 
          transparent 
          opacity={0.6 + explodeFactor * 0.3}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ======================================================== */}
      {/* 7. CAD TARGET CROSSHAIRS (ENGINEERING OVERLAY)            */}
      {/* ======================================================== */}
      {mode !== 'neural' && (
        <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[2.1, 2.12, 4]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
          </mesh>
        </group>
      )}

    </group>
  );
}
