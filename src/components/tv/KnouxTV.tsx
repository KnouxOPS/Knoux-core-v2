/**
 * KnouxTV - شاشة التلفزيون الكونية العريضة
 * نظام عرض متقدم بالوقت الفعلي مع جميع خدمات KnouxCore
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TVRemoteControl from "./TVRemoteControl";
import {
  Monitor,
  Tv,
  Radio,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Settings,
  Maximize,
  Minimize,
  Power,
  Zap,
  Brain,
  Navigation,
  Database,
  Terminal,
  Users,
  BarChart3,
  HelpCircle,
  Star,
  Cpu,
  Activity,
  Shield,
  Rocket,
  Target,
  Network,
  Eye,
  Globe,
} from "lucide-react";

// ===============================
// Types & Interfaces
// ===============================

interface TVChannel {
  id: string;
  name: string;
  arabicName: string;
  icon: React.ReactNode;
  color: string;
  service:
    | "dashboard"
    | "nexus"
    | "navigation"
    | "data"
    | "command"
    | "projects"
    | "analytics"
    | "settings"
    | "help";
  category: "core" | "management" | "support";
  liveData: any;
  description: string;
}

interface KnouxTVProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  className?: string;
}

// ===============================
// TV Channels Configuration
// ===============================

const TV_CHANNELS: TVChannel[] = [
  {
    id: "dashboard",
    name: "Command Bridge",
    arabicName: "جسر القيادة",
    icon: <Monitor className="w-6 h-6" />,
    color: "#00ffd5",
    service: "dashboard",
    category: "core",
    liveData: {},
    description: "Real-time ship systems monitoring and control",
  },
  {
    id: "nexus",
    name: "AI Nexus",
    arabicName: "عقدة الذكاء الاصطناعي",
    icon: <Brain className="w-6 h-6" />,
    color: "#7c3aed",
    service: "nexus",
    category: "core",
    liveData: {},
    description: "Advanced AI code editor and enhancement",
  },
  {
    id: "navigation",
    name: "AstraNav",
    arabicName: "الملاحة النجمية",
    icon: <Navigation className="w-6 h-6" />,
    color: "#06b6d4",
    service: "navigation",
    category: "core",
    liveData: {},
    description: "Galactic navigation and route planning",
  },
  {
    id: "data",
    name: "CosmoData",
    arabicName: "البيانات الكونية",
    icon: <Database className="w-6 h-6" />,
    color: "#10b981",
    service: "data",
    category: "core",
    liveData: {},
    description: "Cosmic data processing and analysis",
  },
  {
    id: "command",
    name: "Quantum Command",
    arabicName: "القيادة الكمية",
    icon: <Terminal className="w-6 h-6" />,
    color: "#f59e0b",
    service: "command",
    category: "management",
    liveData: {},
    description: "Natural language command interface",
  },
  {
    id: "projects",
    name: "Project Hub",
    arabicName: "مركز المشاريع",
    icon: <Users className="w-6 h-6" />,
    color: "#8b5cf6",
    service: "projects",
    category: "management",
    liveData: {},
    description: "Project management and collaboration",
  },
  {
    id: "analytics",
    name: "Analytics Center",
    arabicName: "مركز التحليلات",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "#ef4444",
    service: "analytics",
    category: "management",
    liveData: {},
    description: "Performance analytics and insights",
  },
  {
    id: "settings",
    name: "System Config",
    arabicName: "تكوين النظام",
    icon: <Settings className="w-6 h-6" />,
    color: "#6b7280",
    service: "settings",
    category: "support",
    liveData: {},
    description: "System configuration and preferences",
  },
  {
    id: "help",
    name: "Help Center",
    arabicName: "مركز المساعدة",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "#84cc16",
    service: "help",
    category: "support",
    liveData: {},
    description: "Documentation and support resources",
  },
];

// ===============================
// Main KnouxTV Component
// ===============================

const KnouxTV: React.FC<KnouxTVProps> = ({
  isFullscreen = false,
  onToggleFullscreen,
  className,
}) => {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isOn, setIsOn] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showRemote, setShowRemote] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showChannelList, setShowChannelList] = useState(false);
  const [liveStats, setLiveStats] = useState({
    cpu: 68,
    memory: 74,
    network: 82,
    activeUsers: 127,
    processingLoad: 73,
    systemHealth: 95,
  });

  const tvRef = useRef<HTMLDivElement>(null);
  const remoteRef = useRef<HTMLDivElement>(null);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        cpu: Math.max(30, Math.min(95, prev.cpu + (Math.random() - 0.5) * 8)),
        memory: Math.max(
          40,
          Math.min(90, prev.memory + (Math.random() - 0.5) * 6),
        ),
        network: Math.max(
          50,
          Math.min(100, prev.network + (Math.random() - 0.5) * 10),
        ),
        activeUsers: Math.max(
          100,
          Math.min(
            200,
            prev.activeUsers + Math.floor((Math.random() - 0.5) * 10),
          ),
        ),
        processingLoad: Math.max(
          60,
          Math.min(95, prev.processingLoad + (Math.random() - 0.5) * 8),
        ),
        systemHealth: Math.max(
          85,
          Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 3),
        ),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Channel navigation
  const changeChannel = useCallback((direction: "next" | "prev" | number) => {
    if (typeof direction === "number") {
      setCurrentChannel(direction);
    } else if (direction === "next") {
      setCurrentChannel((prev) => (prev + 1) % TV_CHANNELS.length);
    } else {
      setCurrentChannel(
        (prev) => (prev - 1 + TV_CHANNELS.length) % TV_CHANNELS.length,
      );
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          changeChannel("prev");
          break;
        case "ArrowDown":
          changeChannel("next");
          break;
        case " ":
          setIsPlaying(!isPlaying);
          break;
        case "f":
          onToggleFullscreen?.();
          break;
        case "m":
          setIsMuted(!isMuted);
          break;
        case "r":
          setShowRemote(!showRemote);
          break;
      }
    };

    if (isFullscreen) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [
    isFullscreen,
    isPlaying,
    isMuted,
    showRemote,
    onToggleFullscreen,
    changeChannel,
  ]);

  const currentChannelData = TV_CHANNELS[currentChannel];

  return (
    <div className={`relative ${className}`}>
      {/* TV Screen Container */}
      <motion.div
        ref={tvRef}
        className={`
          relative bg-black rounded-lg overflow-hidden border-4 border-gray-800
          ${isFullscreen ? "w-screen h-screen fixed inset-0 z-50" : "w-full aspect-video max-w-6xl mx-auto"}
        `}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* TV Frame Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Screen glow effect */}
          <div className="absolute inset-2 rounded-lg shadow-inner bg-gradient-to-br from-transparent via-blue-500/5 to-transparent" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 213, 0.1) 2px, rgba(0, 255, 213, 0.1) 4px)",
              animation: "tvScanlines 2s linear infinite",
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/30" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/30" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/30" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/30" />
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {isOn ? (
            <motion.div
              key={currentChannel}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden"
            >
              {/* Channel Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Top Status Bar */}
                <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    {/* Channel Info */}
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: currentChannelData.color + "20",
                          border: `1px solid ${currentChannelData.color}`,
                        }}
                      >
                        {currentChannelData.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {currentChannelData.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {currentChannelData.arabicName}
                        </p>
                      </div>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-500 font-semibold text-sm">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Real-time Stats */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400">
                        {liveStats.cpu.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">
                        {liveStats.systemHealth.toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-violet-400" />
                      <span className="text-violet-400">
                        {liveStats.activeUsers}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Channel Display */}
                <div className="flex-1 relative">
                  {/* Service-specific content */}
                  {renderChannelContent(
                    currentChannelData,
                    liveStats,
                    isFullscreen,
                  )}

                  {/* Data Flow Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                        style={{
                          left: `${10 + i * 20}%`,
                          top: "-100px",
                        }}
                        animate={{
                          y: ["0vh", "120vh"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.6,
                          ease: "linear",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="p-4 bg-black/50 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm">
                        CH {currentChannel + 1}
                      </span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-300 text-sm">
                        {currentChannelData.description}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{new Date().toLocaleTimeString()}</span>
                      <span>•</span>
                      <span>KnouxTV</span>
                    </div>
                  </div>
                </div>

                {/* Channel List Overlay */}
                <AnimatePresence>
                  {showChannelList && (
                    <motion.div
                      initial={{ opacity: 0, x: -300 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -300 }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30"
                    >
                      <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 w-80">
                        <h3 className="text-white font-semibold mb-4">
                          القنوات المتاحة
                        </h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {TV_CHANNELS.map((channel, index) => (
                            <motion.div
                              key={channel.id}
                              className={`
                                flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
                                ${index === currentChannel ? "bg-cyan-400/20 border border-cyan-400/50" : "hover:bg-white/5"}
                              `}
                              onClick={() => {
                                changeChannel(index);
                                setShowChannelList(false);
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                  backgroundColor: channel.color + "20",
                                  border: `1px solid ${channel.color}`,
                                }}
                              >
                                {channel.icon}
                              </div>
                              <div className="flex-1">
                                <div className="text-white text-sm font-medium">
                                  {channel.name}
                                </div>
                                <div className="text-gray-400 text-xs">
                                  {channel.arabicName}
                                </div>
                              </div>
                              <span className="text-gray-500 text-xs">
                                {index + 1}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            // TV Off State
            <div className="w-full h-full bg-black flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <Power className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">KnouxTV</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Volume Indicator */}
        <AnimatePresence>
          {!isMuted && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-black/80 backdrop-blur-lg rounded-lg p-4 flex items-center space-x-3">
                <Volume2 className="w-6 h-6 text-cyan-400" />
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${volume}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-cyan-400 font-mono text-sm">
                  {volume}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Remote Control */}
      <AnimatePresence>
        {showRemote && (
          <motion.div
            ref={remoteRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`
              ${isFullscreen ? "fixed right-4 top-1/2 transform -translate-y-1/2" : "absolute -right-20 top-1/2 transform -translate-y-1/2"}
              z-50
            `}
          >
            <TVRemoteControl
              isOn={isOn}
              onPowerToggle={() => setIsOn(!isOn)}
              onChannelChange={changeChannel}
              onVolumeChange={setVolume}
              onMuteToggle={() => setIsMuted(!isMuted)}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onShowChannels={() => setShowChannelList(!showChannelList)}
              onFullscreen={onToggleFullscreen}
              volume={volume}
              isMuted={isMuted}
              isPlaying={isPlaying}
              currentChannel={currentChannel + 1}
              totalChannels={TV_CHANNELS.length}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes tvScanlines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

// ===============================
// Channel Content Renderer
// ===============================

const renderChannelContent = (
  channel: TVChannel,
  liveStats: any,
  isFullscreen: boolean,
) => {
  switch (channel.service) {
    case "dashboard":
      return (
        <DashboardTVView liveStats={liveStats} isFullscreen={isFullscreen} />
      );
    case "nexus":
      return <NexusTVView liveStats={liveStats} isFullscreen={isFullscreen} />;
    case "navigation":
      return (
        <NavigationTVView liveStats={liveStats} isFullscreen={isFullscreen} />
      );
    case "data":
      return <DataTVView liveStats={liveStats} isFullscreen={isFullscreen} />;
    case "command":
      return (
        <CommandTVView liveStats={liveStats} isFullscreen={isFullscreen} />
      );
    case "projects":
      return (
        <ProjectsTVView liveStats={liveStats} isFullscreen={isFullscreen} />
      );
    case "analytics":
      return (
        <AnalyticsTVView liveStats={liveStats} isFullscreen={isFullscreen} />
      );
    case "settings":
      return (
        <SettingsTVView liveStats={liveStats} isFullscreen={isFullscreen} />
      );
    case "help":
      return <HelpTVView liveStats={liveStats} isFullscreen={isFullscreen} />;
    default:
      return <DefaultTVView channel={channel} liveStats={liveStats} />;
  }
};

// ===============================
// TV Channel Views
// ===============================

const DashboardTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6 space-y-6">
    <div className="grid grid-cols-3 gap-6 h-full">
      {/* System Status */}
      <div className="space-y-4">
        <h3 className="text-cyan-400 font-semibold text-lg">System Status</h3>
        <div className="space-y-3">
          {Object.entries(liveStats).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
            >
              <span className="text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="text-cyan-400 font-mono">
                {typeof value === "number" ? value.toFixed(0) : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Metrics */}
      <div className="space-y-4">
        <h3 className="text-violet-400 font-semibold text-lg">Live Metrics</h3>
        <div className="space-y-4">
          <div className="relative h-32 bg-black/30 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Network Activity</div>
            <div className="h-full bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-pink-400/20 rounded relative overflow-hidden">
              {/* Simulated network graph */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-1 bg-cyan-400/60"
                  style={{ bottom: `${i * 12}%` }}
                  animate={{
                    width: [
                      `${20 + Math.random() * 60}%`,
                      `${30 + Math.random() * 70}%`,
                    ],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="relative h-32 bg-black/30 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">CPU Load</div>
            <div className="h-full bg-gradient-to-t from-yellow-400/20 to-red-400/20 rounded relative overflow-hidden">
              {/* Simulated CPU graph */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 bg-yellow-400/80 rounded-t"
                  style={{
                    left: `${i * 8}%`,
                    bottom: 0,
                  }}
                  animate={{
                    height: [
                      `${20 + Math.random() * 40}%`,
                      `${30 + Math.random() * 60}%`,
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="space-y-4">
        <h3 className="text-orange-400 font-semibold text-lg">System Alerts</h3>
        <div className="space-y-2">
          <div className="p-3 bg-green-400/10 border border-green-400/30 rounded-lg">
            <div className="text-green-400 text-sm font-medium">
              All Systems Nominal
            </div>
            <div className="text-gray-400 text-xs">Last check: 2 min ago</div>
          </div>
          <div className="p-3 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
            <div className="text-yellow-400 text-sm font-medium">
              Memory Usage High
            </div>
            <div className="text-gray-400 text-xs">Threshold: 85%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NexusTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="space-y-4">
        <h3 className="text-violet-400 font-semibold text-lg">
          AI Code Analysis
        </h3>
        <div className="bg-black/50 rounded-lg p-4 h-full font-mono text-sm">
          <div className="text-green-400">// Real-time code analysis</div>
          <div className="text-gray-300">function analyzeCode() {"{"}</div>
          <div className="text-cyan-400 ml-4">
            const complexity = calculateComplexity();
          </div>
          <div className="text-yellow-400 ml-4">
            const suggestions = generateSuggestions();
          </div>
          <div className="text-pink-400 ml-4">
            return {(complexity, suggestions)};
          </div>
          <div className="text-gray-300">{"}"}</div>
          <div className="mt-4 text-cyan-400">// AI Enhancement Active...</div>
          <div className="animate-pulse text-green-400">✓ Code optimized</div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-cyan-400 font-semibold text-lg">
          Performance Metrics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-violet-400">1,247</div>
            <div className="text-sm text-gray-400">Lines Enhanced</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">23</div>
            <div className="text-sm text-gray-400">Bugs Fixed</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">89%</div>
            <div className="text-sm text-gray-400">Optimization</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">5</div>
            <div className="text-sm text-gray-400">Active Projects</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NavigationTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="grid grid-cols-3 gap-6 h-full">
      <div className="col-span-2 bg-black/30 rounded-lg relative overflow-hidden">
        <h3 className="absolute top-4 left-4 text-cyan-400 font-semibold text-lg z-10">
          Star Map
        </h3>
        {/* Simulated star map */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        {/* Route indicator */}
        <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3">
          <div className="text-green-400 text-sm">
            Route: Sol → Alpha Centauri
          </div>
          <div className="text-gray-400 text-xs">ETA: 14h 32m</div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-cyan-400 font-semibold text-lg">
          Navigation Status
        </h3>
        <div className="space-y-3">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-gray-300 text-sm">Current System</div>
            <div className="text-cyan-400 font-semibold">Sol System</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-gray-300 text-sm">Destination</div>
            <div className="text-violet-400 font-semibold">Alpha Centauri</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-gray-300 text-sm">Speed</div>
            <div className="text-green-400 font-semibold">0.8c</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-gray-300 text-sm">Hazard Level</div>
            <div className="text-yellow-400 font-semibold">Minimal</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DataTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="space-y-4">
        <h3 className="text-green-400 font-semibold text-lg">
          Data Processing
        </h3>
        <div className="bg-black/30 rounded-lg p-4 h-full relative overflow-hidden">
          {/* Data flow visualization */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-cyan-400 font-semibold text-lg">Analytics</h3>
        <div className="space-y-3">
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">2.4TB</div>
            <div className="text-sm text-gray-400">Data Processed</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-cyan-400">1,247</div>
            <div className="text-sm text-gray-400">Active Nodes</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">7</div>
            <div className="text-sm text-gray-400">Anomalies</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CommandTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="space-y-4">
      <h3 className="text-yellow-400 font-semibold text-lg">Command Center</h3>
      <div className="bg-black/50 rounded-lg p-4 h-full font-mono text-sm">
        <div className="text-green-400">KnouxCore Command Interface v2.0</div>
        <div className="text-gray-400">Type 'help' for available commands</div>
        <div className="mt-4">
          <div className="text-cyan-400">$ scan current sector</div>
          <div className="text-gray-300">
            Scanning... Complete. No threats detected.
          </div>
          <div className="text-cyan-400">$ status report</div>
          <div className="text-gray-300">
            All systems nominal. Crew: 127. Power: 91%
          </div>
          <div className="text-cyan-400">$ navigate alpha-centauri</div>
          <div className="text-gray-300">Route calculated. ETA: 14h 32m</div>
          <div className="text-cyan-400 animate-pulse">$ _</div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="space-y-4">
        <h3 className="text-violet-400 font-semibold text-lg">
          Active Projects
        </h3>
        <div className="space-y-3">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-white font-medium">
              Quantum Navigation System
            </div>
            <div className="text-gray-400 text-sm">Progress: 78%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-violet-400 h-2 rounded-full"
                style={{ width: "78%" }}
              />
            </div>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-white font-medium">AI Enhancement Engine</div>
            <div className="text-gray-400 text-sm">Progress: 45%</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-cyan-400 h-2 rounded-full"
                style={{ width: "45%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-cyan-400 font-semibold text-lg">Team Status</h3>
        <div className="space-y-3">
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">15</div>
            <div className="text-sm text-gray-400">Active Members</div>
          </div>
          <div className="bg-black/30 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-violet-400">8</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AnalyticsTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="grid grid-cols-3 gap-6 h-full">
      <div className="bg-black/30 rounded-lg p-4">
        <h4 className="text-red-400 font-semibold mb-3">Performance</h4>
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">94%</div>
            <div className="text-sm text-gray-400">Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">341</div>
            <div className="text-sm text-gray-400">Tasks Completed</div>
          </div>
        </div>
      </div>
      <div className="bg-black/30 rounded-lg p-4">
        <h4 className="text-green-400 font-semibold mb-3">Usage</h4>
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">47h</div>
            <div className="text-sm text-gray-400">Time Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">23</div>
            <div className="text-sm text-gray-400">Features Used</div>
          </div>
        </div>
      </div>
      <div className="bg-black/30 rounded-lg p-4">
        <h4 className="text-violet-400 font-semibold mb-3">Insights</h4>
        <div className="text-sm text-gray-300">
          <div>• Peak usage: 14:00-16:00</div>
          <div>• Most used: Code Editor</div>
          <div>• Productivity: +23%</div>
        </div>
      </div>
    </div>
  </div>
);

const SettingsTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="space-y-6">
      <h3 className="text-gray-400 font-semibold text-lg">
        System Configuration
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">System Health</div>
            <div className="text-green-400 text-2xl font-bold">Excellent</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">Uptime</div>
            <div className="text-cyan-400 text-xl font-mono">15d 7h 42m</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">Updates</div>
            <div className="text-yellow-400">3 pending</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">AI Status</div>
            <div className="text-green-400">Optimized</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HelpTVView: React.FC<{ liveStats: any; isFullscreen: boolean }> = ({
  liveStats,
  isFullscreen,
}) => (
  <div className="h-full p-6">
    <div className="space-y-6">
      <h3 className="text-green-400 font-semibold text-lg">
        Help & Documentation
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">Knowledge Base</div>
            <div className="text-cyan-400 text-2xl font-bold">156</div>
            <div className="text-gray-400 text-sm">Articles</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">Video Tutorials</div>
            <div className="text-violet-400 text-2xl font-bold">42</div>
            <div className="text-gray-400 text-sm">Available</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">Support Tickets</div>
            <div className="text-green-400 text-2xl font-bold">2</div>
            <div className="text-gray-400 text-sm">Open</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-white font-medium mb-2">Community</div>
            <div className="text-yellow-400">Active</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DefaultTVView: React.FC<{ channel: TVChannel; liveStats: any }> = ({
  channel,
  liveStats,
}) => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <div
        className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: channel.color + "20",
          border: `2px solid ${channel.color}`,
        }}
      >
        {React.cloneElement(channel.icon as React.ReactElement, { size: 48 })}
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{channel.name}</h2>
      <p className="text-gray-400 mb-4">{channel.arabicName}</p>
      <p className="text-gray-500 text-sm max-w-md">{channel.description}</p>
    </div>
  </div>
);

export default KnouxTV;
