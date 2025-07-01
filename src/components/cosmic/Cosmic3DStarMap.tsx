/**
 * KnouxCore 3D Cosmic Star Map - خريطة النجوم الكونية ثلاثية الأبعاد
 * نظام ملاحة تفاعلي ثلاثي الأبعاد مع ذكاء اصطناعي متطور
 */

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

// ===============================
// Types & Interfaces
// ===============================

interface CelestialObject {
  id: string;
  name: string;
  position: [number, number, number];
  type: "star" | "planet" | "station" | "nebula" | "wormhole" | "asteroid";
  size: number;
  color: string;
  faction?: string;
  threat_level: "safe" | "caution" | "danger" | "unknown";
  resources?: string[];
  description?: string;
}

interface Route {
  id: string;
  start: string;
  end: string;
  points: [number, number, number][];
  type: "safe" | "dangerous" | "optimal" | "quantum";
  distance: number;
  travel_time: number;
}

interface Cosmic3DStarMapProps {
  objects: CelestialObject[];
  routes: Route[];
  selectedObject?: CelestialObject | null;
  activeRoute?: Route | null;
  onObjectSelect: (object: CelestialObject) => void;
  onRouteSelect: (route: Route) => void;
  cameraPosition?: [number, number, number];
  showLabels?: boolean;
  showRoutes?: boolean;
  animationSpeed?: number;
}

// ===============================
// 3D Object Components
// ===============================

const CelestialBody: React.FC<{
  object: CelestialObject;
  isSelected: boolean;
  onClick: () => void;
}> = ({ object, isSelected, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (isSelected) {
        meshRef.current.scale.setScalar(
          1 + Math.sin(state.clock.elapsedTime * 3) * 0.1,
        );
      }
    }
  });

  const getObjectGeometry = () => {
    switch (object.type) {
      case "star":
        return <sphereGeometry args={[object.size, 32, 32]} />;
      case "planet":
        return <sphereGeometry args={[object.size * 0.8, 24, 24]} />;
      case "station":
        return <boxGeometry args={[object.size, object.size, object.size]} />;
      case "nebula":
        return <sphereGeometry args={[object.size * 2, 16, 16]} />;
      case "wormhole":
        return (
          <torusGeometry args={[object.size, object.size * 0.3, 16, 32]} />
        );
      default:
        return <sphereGeometry args={[object.size, 16, 16]} />;
    }
  };

  const getObjectMaterial = () => {
    const baseColor = new THREE.Color(object.color);

    if (object.type === "star") {
      return (
        <meshBasicMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.5}
        />
      );
    } else if (object.type === "nebula") {
      return (
        <meshBasicMaterial
          color={baseColor}
          transparent
          opacity={0.3}
          emissive={baseColor}
          emissiveIntensity={0.2}
        />
      );
    } else if (object.type === "wormhole") {
      return (
        <meshBasicMaterial
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.8}
        />
      );
    }

    return (
      <meshPhongMaterial
        color={baseColor}
        emissive={isSelected ? baseColor : new THREE.Color(0x000000)}
        emissiveIntensity={isSelected ? 0.3 : 0}
        shininess={100}
      />
    );
  };

  const getThreatIndicator = () => {
    if (object.threat_level === "danger") {
      return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[object.size * 1.5, 16, 16]} position={[0, 0, 0]}>
            <meshBasicMaterial
              color="#ff0000"
              transparent
              opacity={0.1}
              wireframe
            />
          </Sphere>
        </Float>
      );
    }
    return null;
  };

  return (
    <group position={object.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {getObjectGeometry()}
        {getObjectMaterial()}
      </mesh>

      {getThreatIndicator()}

      {/* Object Label */}
      {(isSelected || hovered) && (
        <Text
          position={[0, object.size + 2, 0]}
          fontSize={1}
          color={object.color}
          anchorX="center"
          anchorY="middle"
        >
          {object.name}
        </Text>
      )}

      {/* Selection Ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[object.size * 2, 0.1, 8, 64]} />
          <meshBasicMaterial
            color={object.color}
            emissive={object.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

const RouteVisualization: React.FC<{
  route: Route;
  isActive: boolean;
  onClick: () => void;
}> = ({ route, isActive, onClick }) => {
  const lineRef = useRef<THREE.Line>(null);
  const [animated, setAnimated] = useState(false);

  useFrame((state) => {
    if (lineRef.current && isActive) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  const getRouteColor = () => {
    switch (route.type) {
      case "safe":
        return "#00ffd5";
      case "dangerous":
        return "#ff4444";
      case "optimal":
        return "#7c3aed";
      case "quantum":
        return "#ff1493";
      default:
        return "#ffffff";
    }
  };

  const points = route.points.map((point) => new THREE.Vector3(...point));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line ref={lineRef} geometry={geometry} onClick={onClick}>
      <lineBasicMaterial
        color={getRouteColor()}
        transparent
        opacity={isActive ? 0.8 : 0.4}
        linewidth={isActive ? 3 : 1}
      />
    </line>
  );
};

const CosmicBackground: React.FC = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Add cosmic fog
    scene.fog = new THREE.Fog(0x000015, 50, 1000);

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    return () => {
      scene.remove(ambientLight);
      scene.remove(directionalLight);
    };
  }, [scene]);

  return (
    <>
      <Stars
        radius={300}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Cosmic Nebula Background */}
      <mesh position={[0, 0, -100]}>
        <planeGeometry args={[500, 500]} />
        <meshBasicMaterial color="#1a0025" transparent opacity={0.3} />
      </mesh>
    </>
  );
};

// ===============================
// Camera Controls
// ===============================

const CameraController: React.FC<{
  target?: CelestialObject;
  position?: [number, number, number];
}> = ({ target, position }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (target) {
      camera.lookAt(...target.position);
    }
  }, [camera, target]);

  useEffect(() => {
    if (position) {
      camera.position.set(...position);
    }
  }, [camera, position]);

  return null;
};

// ===============================
// Main Component
// ===============================

const Cosmic3DStarMap: React.FC<Cosmic3DStarMapProps> = ({
  objects,
  routes,
  selectedObject,
  activeRoute,
  onObjectSelect,
  onRouteSelect,
  cameraPosition = [0, 0, 50],
  showLabels = true,
  showRoutes = true,
  animationSpeed = 1,
}) => {
  const [viewMode, setViewMode] = useState<
    "explore" | "navigation" | "tactical"
  >("explore");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleObjectClick = useCallback(
    (object: CelestialObject) => {
      onObjectSelect(object);
    },
    [onObjectSelect],
  );

  const handleRouteClick = useCallback(
    (route: Route) => {
      onRouteSelect(route);
    },
    [onRouteSelect],
  );

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-cyan-400">Loading Star Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        style={{ background: "transparent" }}
      >
        <CosmicBackground />

        <CameraController target={selectedObject} position={cameraPosition} />

        {/* Celestial Objects */}
        {objects.map((object) => (
          <CelestialBody
            key={object.id}
            object={object}
            isSelected={selectedObject?.id === object.id}
            onClick={() => handleObjectClick(object)}
          />
        ))}

        {/* Routes */}
        {showRoutes &&
          routes.map((route) => (
            <RouteVisualization
              key={route.id}
              route={route}
              isActive={activeRoute?.id === route.id}
              onClick={() => handleRouteClick(route)}
            />
          ))}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={200}
          autoRotate={viewMode === "explore"}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* UI Controls Overlay */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="cosmic-glass-ultra p-3 rounded-lg border border-cyan-400/30">
          <h3 className="text-sm font-semibold text-cyan-400 mb-2">
            View Mode
          </h3>
          <div className="flex space-x-2">
            {(["explore", "navigation", "tactical"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  viewMode === mode
                    ? "bg-cyan-400 text-black"
                    : "bg-transparent text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400/10"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Object Info Panel */}
        <AnimatePresence>
          {selectedObject && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="cosmic-glass-ultra p-4 rounded-lg border border-cyan-400/30 max-w-xs"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {selectedObject.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-cyan-400 capitalize">
                    {selectedObject.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Threat Level:</span>
                  <span
                    className={`font-medium ${
                      selectedObject.threat_level === "safe"
                        ? "text-green-400"
                        : selectedObject.threat_level === "caution"
                          ? "text-yellow-400"
                          : selectedObject.threat_level === "danger"
                            ? "text-red-400"
                            : "text-gray-400"
                    }`}
                  >
                    {selectedObject.threat_level.toUpperCase()}
                  </span>
                </div>
                {selectedObject.faction && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Faction:</span>
                    <span className="text-violet-400">
                      {selectedObject.faction}
                    </span>
                  </div>
                )}
                {selectedObject.resources &&
                  selectedObject.resources.length > 0 && (
                    <div>
                      <span className="text-gray-400">Resources:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedObject.resources.map((resource, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-emerald-400/20 text-emerald-400 rounded"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {selectedObject.description && (
                  <div>
                    <span className="text-gray-400">Description:</span>
                    <p className="text-gray-300 text-xs mt-1">
                      {selectedObject.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Statistics Overlay */}
      <div className="absolute bottom-4 right-4">
        <div className="cosmic-glass-ultra p-3 rounded-lg border border-cyan-400/30">
          <div className="text-xs text-gray-400 space-y-1">
            <div>Objects: {objects.length}</div>
            <div>Routes: {routes.length}</div>
            <div>View: {viewMode}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cosmic3DStarMap;
