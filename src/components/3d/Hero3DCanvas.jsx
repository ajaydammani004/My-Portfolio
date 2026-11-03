import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { MechanicalNeuralModel } from './MechanicalNeuralModel';
import * as THREE from 'three';

// Performance & FPS Tracking component inside Canvas
function FPSMonitor({ onFpsUpdate }) {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current += 1;
    const now = performance.now();
    if (now - lastTime.current >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / (now - lastTime.current));
      onFpsUpdate(currentFps);
      frameCount.current = 0;
      lastTime.current = now;
    }
  });

  return null;
}

// Subtle camera rig that moves slightly with mouse pointer
function CameraRig({ mousePos }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mousePos.current.x * 0.8,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      3.2 + mousePos.current.y * 0.6,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Hero3DCanvas({ 
  deconstruct = 0, 
  mode = 'hybrid',
  onFpsChange
}) {
  const [isInteracting, setIsInteracting] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePos.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full select-none cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 3.2, 5.2], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 1.8)]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
      >
        <Suspense fallback={null}>
          <FPSMonitor onFpsUpdate={onFpsChange || (() => {})} />
          <CameraRig mousePos={mousePos} />

          {/* Lighting Rig */}
          <ambientLight intensity={0.4} />
          
          {/* Cyan Key Light (Industrial CAD look) */}
          <directionalLight 
            position={[5, 6, 4]} 
            intensity={1.8} 
            color="#00f0ff" 
          />
          
          {/* Purple Fill / Rim Light (Neural glow) */}
          <directionalLight 
            position={[-5, -4, -3]} 
            intensity={1.2} 
            color="#a855f7" 
          />

          {/* Center Core Point Light */}
          <pointLight 
            position={[0, 0, 0]} 
            intensity={2.5} 
            distance={8} 
            color="#38bdf8" 
          />

          {/* Gentle Floating Motion */}
          <Float 
            speed={2} 
            rotationIntensity={0.2} 
            floatIntensity={0.4} 
            floatingRange={[-0.1, 0.1]}
          >
            <MechanicalNeuralModel 
              deconstruct={deconstruct} 
              mode={mode} 
              isInteracting={isInteracting} 
            />
          </Float>

          {/* User Orbital Controls */}
          <OrbitControls 
            enableZoom={true} 
            minDistance={3.5} 
            maxDistance={8.5} 
            enablePan={false}
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 4}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
