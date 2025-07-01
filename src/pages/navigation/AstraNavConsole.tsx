/**
 * KnouxCore AstraNav - وحدة الملاحة الفضائية الذكية
 * نظام ملاحة متطور مع خرائط نجمية هولوغرافية وذكاء اصطناعي
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  HolographicCard,
  HolographicProgressBar,
} from "@/components/effects/HolographicCard";
import { NavigationIcon } from "@/components/icons/KnouxCoreIcons";
import {
  Navigation,
  Radar,
  Radio,
  Shield,
  Zap,
  AlertTriangle,
  Cpu,
  Activity,
  Clock,
  Target,
  MapPin,
  Orbit,
  Fuel,
  Star,
  Route,
  Scan,
  Send,
  MessageSquare,
  WifiOff,
  Wifi,
  Battery,
  Thermometer,
  ArrowUp,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

// ===============================
// Types & Interfaces
// ===============================

interface CelestialBody {
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  type:
    | "star"
    | "planet"
    | "moon"
    | "station"
    | "nebula"
    | "asteroid"
    | "wormhole";
  status: "safe" | "caution" | "danger" | "unknown";
  size: number;
  distance: number;
  faction?: string;
  resources?: string[];
}

interface Route {
  id: string;
  name: string;
  start: string;
  end: string;
  waypoints: string[];
  distance: number;
  travelTime: number;
  fuelCost: number;
  hazardLevel: "low" | "medium" | "high";
  status: "planned" | "active" | "completed";
}

interface Hazard {
  id: string;
  type:
    | "asteroid_field"
    | "energy_storm"
    | "pirate_activity"
    | "system_anomaly";
  location: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timeRemaining?: number;
}

interface SystemStatus {
  engines: { status: string; efficiency: number; temperature: number };
  shields: { status: string; power: number; integrity: number };
  navigation: { status: string; accuracy: number; calibration: number };
  communications: { status: string; range: number; encryption: number };
  sensors: { status: string; range: number; resolution: number };
  lifeSupport: { status: string; oxygen: number; pressure: number };
}

interface CommChannel {
  id: string;
  name: string;
  frequency: string;
  type: "emergency" | "civilian" | "military" | "trade";
  activity: number;
  lastMessage?: string;
}

// ===============================
// AI Service Functions
// ===============================

const fetchStarMapData = async (): Promise<CelestialBody[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return [
    {
      id: "sol",
      name: "Sol System",
      position: { x: 0, y: 0, z: 0 },
      type: "star",
      status: "safe",
      size: 8,
      distance: 0,
      faction: "United Earth",
      resources: ["hydrogen", "helium", "rare_metals"],
    },
    {
      id: "alpha_centauri",
      name: "Alpha Centauri",
      position: { x: 4.3, y: 2.1, z: -1.8 },
      type: "star",
      status: "safe",
      size: 7,
      distance: 4.37,
      faction: "Colonial Alliance",
    },
    {
      id: "mars",
      name: "Mars Colony",
      position: { x: 1.5, y: 0, z: 0.2 },
      type: "planet",
      status: "safe",
      size: 4,
      distance: 1.52,
      faction: "Mars Federation",
      resources: ["iron", "water_ice"],
    },
    {
      id: "europa_station",
      name: "Europa Station",
      position: { x: 5.2, y: 0.3, z: -0.1 },
      type: "station",
      status: "caution",
      size: 2,
      distance: 5.2,
      faction: "Europa Consortium",
    },
    {
      id: "veil_nebula",
      name: "Veil Nebula",
      position: { x: -3.2, y: 4.8, z: 2.1 },
      type: "nebula",
      status: "danger",
      size: 12,
      distance: 6.1,
    },
  ];
};

const calculateOptimalRoute = async (
  start: string,
  end: string,
): Promise<Route> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const distance = Math.random() * 50 + 10;
  const travelTime = distance * 0.8 + Math.random() * 5;
  const fuelCost = distance * 1.2 + Math.random() * 10;

  return {
    id: `route_${Date.now()}`,
    name: `${start} → ${end}`,
    start,
    end,
    waypoints: ["Checkpoint Alpha", "Navigation Beacon Beta"],
    distance,
    travelTime,
    fuelCost,
    hazardLevel: distance > 30 ? "high" : distance > 15 ? "medium" : "low",
    status: "planned",
  };
};

const detectHazards = async (sector: string): Promise<Hazard[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const hazards: Hazard[] = [];

  if (Math.random() > 0.6) {
    hazards.push({
      id: `hazard_${Date.now()}`,
      type: "asteroid_field",
      location: sector,
      severity: "medium",
      description: "Dense asteroid field detected. Navigation caution advised.",
      timeRemaining: 24,
    });
  }

  if (Math.random() > 0.8) {
    hazards.push({
      id: `hazard_${Date.now() + 1}`,
      type: "energy_storm",
      location: `${sector} Outer Rim`,
      severity: "high",
      description:
        "Electromagnetic storm affecting sensors and communications.",
      timeRemaining: 12,
    });
  }

  return hazards;
};

const performSectorScan = async (
  target: string,
): Promise<{ anomalies: number; threats: number; resources: string[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    anomalies: Math.floor(Math.random() * 5),
    threats: Math.floor(Math.random() * 3),
    resources: ["titanium", "rare_crystals", "energy_cells"].slice(
      0,
      Math.floor(Math.random() * 3) + 1,
    ),
  };
};

// ===============================
// Main Component
// ===============================

const AstraNavConsole: React.FC = () => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);

  // ===============================
  // State Management
  // ===============================
  const [celestialBodies, setCelestialBodies] = useState<CelestialBody[]>([]);
  const [currentLocation, setCurrentLocation] = useState("Sol System");
  const [targetDestination, setTargetDestination] = useState("Alpha Centauri");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    engines: { status: "Optimal", efficiency: 98, temperature: 72 },
    shields: { status: "Active", power: 95, integrity: 100 },
    navigation: { status: "Calibrated", accuracy: 99, calibration: 100 },
    communications: { status: "Clear", range: 85, encryption: 256 },
    sensors: { status: "Active", range: 92, resolution: 88 },
    lifeSupport: { status: "Stable", oxygen: 98, pressure: 101 },
  });
  const [commChannels] = useState<CommChannel[]>([
    {
      id: "emergency",
      name: "Emergency",
      frequency: "121.5",
      type: "emergency",
      activity: 15,
    },
    {
      id: "civilian",
      name: "Civilian Traffic",
      frequency: "243.0",
      type: "civilian",
      activity: 45,
    },
    {
      id: "trade",
      name: "Trade Network",
      frequency: "156.8",
      type: "trade",
      activity: 78,
      lastMessage: "Cargo manifest received",
    },
  ]);

  // Process States
  const [isScanning, setIsScanning] = useState(false);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [warpCharging, setWarpCharging] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedBody, setSelectedBody] = useState<CelestialBody | null>(null);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [zoomLevel, setZoomLevel] = useState([50]);

  // ===============================
  // Effects & Data Loading
  // ===============================
  useEffect(() => {
    const loadNavigationData = async () => {
      try {
        const starData = await fetchStarMapData();
        setCelestialBodies(starData);

        const initialHazards = await detectHazards(currentLocation);
        setHazards(initialHazards);

        toast({
          title: "Navigation System Online",
          description: "Star map data loaded successfully.",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Navigation Error",
          description: "Failed to load star map data.",
          variant: "destructive",
        });
      }
    };

    loadNavigationData();
  }, [currentLocation, toast]);

  // Real-time system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        engines: {
          ...prev.engines,
          efficiency: Math.max(
            85,
            prev.engines.efficiency + (Math.random() - 0.5) * 2,
          ),
          temperature: Math.max(
            65,
            Math.min(85, prev.engines.temperature + (Math.random() - 0.5) * 3),
          ),
        },
        shields: {
          ...prev.shields,
          power: Math.max(80, prev.shields.power + (Math.random() - 0.5) * 3),
        },
        navigation: {
          ...prev.navigation,
          accuracy: Math.max(
            95,
            prev.navigation.accuracy + (Math.random() - 0.5) * 1,
          ),
        },
        communications: {
          ...prev.communications,
          range: Math.max(
            75,
            prev.communications.range + (Math.random() - 0.5) * 2,
          ),
        },
        sensors: {
          ...prev.sensors,
          range: Math.max(85, prev.sensors.range + (Math.random() - 0.5) * 2),
          resolution: Math.max(
            80,
            prev.sensors.resolution + (Math.random() - 0.5) * 2,
          ),
        },
        lifeSupport: {
          ...prev.lifeSupport,
          oxygen: Math.max(
            95,
            prev.lifeSupport.oxygen + (Math.random() - 0.5) * 1,
          ),
          pressure: Math.max(
            98,
            Math.min(
              103,
              prev.lifeSupport.pressure + (Math.random() - 0.5) * 1,
            ),
          ),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ===============================
  // Navigation Functions
  // ===============================
  const handlePlanRoute = async () => {
    if (!targetDestination || isCalculatingRoute) return;

    setIsCalculatingRoute(true);
    toast({
      title: "Route Calculation",
      description: "StarChaser AI is calculating optimal route...",
    });

    try {
      const newRoute = await calculateOptimalRoute(
        currentLocation,
        targetDestination,
      );
      setRoutes((prev) => [...prev, newRoute]);
      setActiveRoute(newRoute);

      toast({
        title: "Route Calculated",
        description: `Optimal route to ${targetDestination} ready for engagement.`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Route Error",
        description: "Failed to calculate route. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculatingRoute(false);
    }
  };

  const handleEngageWarp = async () => {
    if (!activeRoute || warpCharging) return;

    setWarpCharging(true);
    toast({
      title: "Warp Drive Charging",
      description: "Preparing for faster-than-light travel...",
    });

    setTimeout(() => {
      setCurrentLocation(activeRoute.end);
      setActiveRoute(null);
      setWarpCharging(false);
      toast({
        title: "Warp Complete",
        description: `Successfully arrived at ${activeRoute.end}.`,
        variant: "success",
      });
    }, 4000);
  };

  const handleSectorScan = async () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanProgress(0);
    toast({
      title: "Sector Scan Initiated",
      description: "Echo Array sensors are analyzing the region...",
    });

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      const scanResults = await performSectorScan(currentLocation);
      setIsScanning(false);
      setScanProgress(100);

      toast({
        title: "Scan Complete",
        description: `Detected ${scanResults.anomalies} anomalies, ${scanResults.threats} threats, and ${scanResults.resources.length} resource deposits.`,
        variant: "success",
      });
    } catch (error) {
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: "Sensor malfunction detected. Please try again.",
        variant: "destructive",
      });
    }
  };

  // ===============================
  // Render Functions
  // ===============================
  const renderStarMap = () => (
    <div
      ref={mapRef}
      className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg overflow-hidden border border-primary/20"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 255, 213, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(120, 58, 237, 0.1) 0%, transparent 50%)`,
      }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Celestial Bodies */}
      <AnimatePresence>
        {celestialBodies.map((body, index) => {
          const x = (body.position.x + 10) * (zoomLevel[0] / 50) * 20;
          const y = (body.position.y + 10) * (zoomLevel[0] / 50) * 20;

          return (
            <motion.div
              key={body.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedBody?.id === body.id ? "z-20" : "z-10"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => setSelectedBody(body)}
            >
              <div
                className={`relative group ${
                  body.status === "danger" ? "animate-pulse" : ""
                }`}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-full blur-md ${
                    body.type === "star"
                      ? "bg-yellow-400/50"
                      : body.type === "planet"
                        ? "bg-blue-400/50"
                        : body.type === "station"
                          ? "bg-primary/50"
                          : body.type === "nebula"
                            ? "bg-purple-400/50"
                            : "bg-gray-400/50"
                  } ${selectedBody?.id === body.id ? "scale-150" : "scale-100"} transition-transform`}
                />

                {/* Main body */}
                <div
                  className={`relative w-${Math.max(3, Math.min(8, body.size))} h-${Math.max(3, Math.min(8, body.size))} rounded-full border-2 ${
                    body.status === "safe"
                      ? "border-green-400 bg-green-400/20"
                      : body.status === "caution"
                        ? "border-yellow-400 bg-yellow-400/20"
                        : body.status === "danger"
                          ? "border-red-400 bg-red-400/20"
                          : "border-gray-400 bg-gray-400/20"
                  } backdrop-blur-sm`}
                >
                  {/* Status indicator */}
                  <div
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                      body.status === "safe"
                        ? "bg-green-400"
                        : body.status === "caution"
                          ? "bg-yellow-400"
                          : body.status === "danger"
                            ? "bg-red-400"
                            : "bg-gray-400"
                    } ${body.status === "danger" ? "animate-ping" : ""}`}
                  />
                </div>

                {/* Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs whitespace-nowrap border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  {body.name}
                  <br />
                  <span className="text-primary/70">
                    {body.distance.toFixed(1)} ly
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Active Route Visualization */}
      {activeRoute && (
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg width="100%" height="100%">
            <defs>
              <linearGradient
                id="routeGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="rgb(0, 255, 213)"
                  stopOpacity="0.8"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(120, 58, 237)"
                  stopOpacity="0.8"
                />
              </linearGradient>
            </defs>
            <path
              d={`M 20,50 Q 50,20 80,50`}
              stroke="url(#routeGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </motion.div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setViewMode(viewMode === "2d" ? "3d" : "2d")}
        >
          {viewMode === "2d" ? "3D" : "2D"}
        </Button>
      </div>
    </div>
  );

  const renderSystemStatus = () => (
    <HolographicCard className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Ship Systems</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(systemStatus).map(([system, status]) => (
          <div key={system} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium capitalize">
                {system.replace(/([A-Z])/g, " $1")}
              </span>
              <Badge
                variant={
                  system === "engines"
                    ? status.efficiency > 90
                      ? "default"
                      : "secondary"
                    : system === "shields"
                      ? status.power > 85
                        ? "default"
                        : "secondary"
                      : "default"
                }
              >
                {status.status}
              </Badge>
            </div>

            {system === "engines" && (
              <div className="space-y-1">
                <HolographicProgressBar
                  value={status.efficiency}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Efficiency: {status.efficiency.toFixed(1)}%</span>
                  <span>Temp: {status.temperature}°C</span>
                </div>
              </div>
            )}

            {system === "shields" && (
              <div className="space-y-1">
                <HolographicProgressBar value={status.power} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Power: {status.power.toFixed(1)}%</span>
                  <span>Integrity: {status.integrity}%</span>
                </div>
              </div>
            )}

            {system === "navigation" && (
              <div className="space-y-1">
                <HolographicProgressBar
                  value={status.accuracy}
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  Accuracy: {status.accuracy.toFixed(1)}%
                </div>
              </div>
            )}

            {system === "communications" && (
              <div className="space-y-1">
                <HolographicProgressBar value={status.range} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Range: {status.range.toFixed(1)}%
                </div>
              </div>
            )}

            {system === "sensors" && (
              <div className="space-y-1">
                <HolographicProgressBar value={status.range} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Range: {status.range.toFixed(1)}%</span>
                  <span>Res: {status.resolution}%</span>
                </div>
              </div>
            )}

            {system === "lifeSupport" && (
              <div className="space-y-1">
                <HolographicProgressBar value={status.oxygen} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>O₂: {status.oxygen.toFixed(1)}%</span>
                  <span>P: {status.pressure} kPa</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </HolographicCard>
  );

  // ===============================
  // Main Render
  // ===============================
  return (
    <div
      className="min-h-screen cosmic-grid p-6"
      style={{ background: "var(--gradient-void)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <NavigationIcon className="w-8 h-8" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AstraNav Console
          </h1>
          <p className="text-muted-foreground">
            وحدة الملاحة الفضائية الذكية - Intelligent Space Navigation System
          </p>
        </div>
        <div className="ml-auto">
          <Badge variant="outline" className="text-primary border-primary/50">
            Current Location: {currentLocation}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Star Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-8"
        >
          <div className="cosmic-glass-ultra p-6 rounded-lg border border-cyan-400/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Holographic Star Map</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Zoom:</span>
                <Slider
                  value={zoomLevel}
                  onValueChange={setZoomLevel}
                  max={100}
                  min={25}
                  step={5}
                  className="w-24"
                />
              </div>
            </div>
            {renderStarMap()}
          </div>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 space-y-6"
        >
          {/* Navigation Controls */}
          <HolographicCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Navigation Control</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Destination
                </label>
                <select
                  value={targetDestination}
                  onChange={(e) => setTargetDestination(e.target.value)}
                  className="w-full p-2 bg-background border border-primary/30 rounded-lg"
                >
                  {celestialBodies
                    .filter((body) => body.name !== currentLocation)
                    .map((body) => (
                      <option key={body.id} value={body.name}>
                        {body.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handlePlanRoute}
                  disabled={isCalculatingRoute || !targetDestination}
                  className="flex-1"
                  size="sm"
                >
                  {isCalculatingRoute ? (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Route className="w-4 h-4 mr-2" />
                      Plan Route
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleEngageWarp}
                  disabled={!activeRoute || warpCharging}
                  variant="secondary"
                  size="sm"
                >
                  {warpCharging ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Charging...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Engage
                    </>
                  )}
                </Button>
              </div>

              {warpCharging && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Warp Drive Status
                  </div>
                  <HolographicProgressBar value={75} className="h-2" />
                </div>
              )}
            </div>
          </HolographicCard>

          {/* Sensor Controls */}
          <HolographicCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Radar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Sensor Array</h3>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleSectorScan}
                disabled={isScanning}
                className="w-full"
                size="sm"
              >
                {isScanning ? (
                  <>
                    <Scan className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4 mr-2" />
                    Sector Scan
                  </>
                )}
              </Button>

              {isScanning && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Scan Progress
                  </div>
                  <HolographicProgressBar
                    value={scanProgress}
                    className="h-2"
                  />
                </div>
              )}
            </div>
          </HolographicCard>

          {/* Communications */}
          <HolographicCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Communications</h3>
            </div>

            <div className="space-y-2">
              {commChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center justify-between p-2 bg-background/50 rounded border border-primary/20"
                >
                  <div>
                    <div className="text-sm font-medium">{channel.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {channel.frequency} MHz
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        channel.activity > 50
                          ? "bg-green-400 animate-pulse"
                          : channel.activity > 20
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                      }`}
                    />
                    <span className="text-xs">{channel.activity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </HolographicCard>
        </motion.div>

        {/* System Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-8"
        >
          {renderSystemStatus()}
        </motion.div>

        {/* Hazards & Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-4"
        >
          <HolographicCard className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold">Risk Assessment</h3>
            </div>

            <ScrollArea className="h-48">
              <div className="space-y-2">
                {hazards.length > 0 ? (
                  hazards.map((hazard) => (
                    <div
                      key={hazard.id}
                      className="p-3 bg-background/50 rounded border border-yellow-400/30"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge
                          variant={
                            hazard.severity === "critical"
                              ? "destructive"
                              : hazard.severity === "high"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {hazard.severity.toUpperCase()}
                        </Badge>
                        {hazard.timeRemaining && (
                          <span className="text-xs text-muted-foreground">
                            {hazard.timeRemaining}h remaining
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium mb-1 capitalize">
                        {hazard.type.replace(/_/g, " ")}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {hazard.description}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <div>All Clear</div>
                    <div className="text-xs">No hazards detected</div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </HolographicCard>
        </motion.div>
      </div>

      {/* Selected Body Info Modal */}
      <AnimatePresence>
        {selectedBody && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBody(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background border border-primary/30 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{selectedBody.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBody(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">{selectedBody.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span>{selectedBody.distance.toFixed(2)} light years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      selectedBody.status === "safe"
                        ? "default"
                        : selectedBody.status === "caution"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedBody.status}
                  </Badge>
                </div>
                {selectedBody.faction && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Faction:</span>
                    <span>{selectedBody.faction}</span>
                  </div>
                )}
                {selectedBody.resources &&
                  selectedBody.resources.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Resources:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedBody.resources.map((resource) => (
                          <Badge
                            key={resource}
                            variant="outline"
                            className="text-xs"
                          >
                            {resource.replace(/_/g, " ")}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => {
                    setTargetDestination(selectedBody.name);
                    setSelectedBody(null);
                  }}
                  className="flex-1"
                  size="sm"
                >
                  Set as Destination
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBody(null)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AstraNavConsole;
