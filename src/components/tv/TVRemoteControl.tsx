/**
 * KnouxTV Remote Control - ريموت التحكم الكوني
 * جهاز تحكم متطور مع تأثيرات هولوغرافية وتفاعل ذكي
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Power,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Menu,
  Home,
  Settings,
  Maximize,
  Minimize,
  RotateCcw,
  Tv,
  Radio,
  Mic,
  Star,
  Zap,
} from "lucide-react";

interface TVRemoteControlProps {
  isOn: boolean;
  onPowerToggle: () => void;
  onChannelChange: (direction: "next" | "prev" | number) => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onPlayPause: () => void;
  onShowChannels: () => void;
  onFullscreen?: () => void;
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;
  currentChannel: number;
  totalChannels: number;
}

const TVRemoteControl: React.FC<TVRemoteControlProps> = ({
  isOn,
  onPowerToggle,
  onChannelChange,
  onVolumeChange,
  onMuteToggle,
  onPlayPause,
  onShowChannels,
  onFullscreen,
  volume,
  isMuted,
  isPlaying,
  currentChannel,
  totalChannels,
}) => {
  const [isPressed, setIsPressed] = useState<string | null>(null);

  const handleButtonPress = (buttonId: string, action: () => void) => {
    setIsPressed(buttonId);
    action();
    setTimeout(() => setIsPressed(null), 150);
  };

  const RemoteButton: React.FC<{
    id: string;
    icon: React.ReactNode;
    label?: string;
    onClick: () => void;
    className?: string;
    variant?: "primary" | "secondary" | "danger" | "success";
    size?: "sm" | "md" | "lg";
  }> = ({
    id,
    icon,
    label,
    onClick,
    className = "",
    variant = "secondary",
    size = "md",
  }) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return "bg-cyan-500/20 border-cyan-400 text-cyan-400 hover:bg-cyan-500/30";
        case "danger":
          return "bg-red-500/20 border-red-400 text-red-400 hover:bg-red-500/30";
        case "success":
          return "bg-green-500/20 border-green-400 text-green-400 hover:bg-green-500/30";
        default:
          return "bg-gray-500/20 border-gray-400 text-gray-300 hover:bg-gray-500/30";
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "w-8 h-8 text-xs";
        case "lg":
          return "w-14 h-14 text-lg";
        default:
          return "w-10 h-10 text-sm";
      }
    };

    return (
      <motion.button
        className={`
          ${getSizeStyles()}
          ${getVariantStyles()}
          border-2 rounded-lg flex items-center justify-center
          transition-all duration-200 relative overflow-hidden
          ${isPressed === id ? "scale-95 brightness-150" : "hover:scale-105"}
          ${className}
        `}
        onClick={() => handleButtonPress(id, onClick)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -2 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />

        {/* Icon */}
        <div className="relative z-10 flex flex-col items-center">
          {icon}
          {label && <span className="text-xs mt-1">{label}</span>}
        </div>

        {/* Press effect */}
        {isPressed === id && (
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-b from-gray-900 to-black p-4 rounded-2xl border-2 border-gray-700 w-20 shadow-2xl relative overflow-hidden"
    >
      {/* Remote glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-violet-500/5 rounded-2xl" />

      {/* Header */}
      <div className="text-center mb-4 relative z-10">
        <div className="flex items-center justify-center mb-2">
          <Tv className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-xs text-gray-400 font-mono">KnouxTV</div>
        <div className="text-xs text-cyan-400">
          {currentChannel}/{totalChannels}
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {/* Power Button */}
        <div className="flex justify-center">
          <RemoteButton
            id="power"
            icon={<Power className="w-5 h-5" />}
            onClick={onPowerToggle}
            variant={isOn ? "danger" : "success"}
            size="lg"
          />
        </div>

        {/* Channel Controls */}
        <div className="grid grid-cols-2 gap-2">
          <RemoteButton
            id="ch-up"
            icon={<ChevronUp className="w-4 h-4" />}
            label="CH+"
            onClick={() => onChannelChange("next")}
            variant="primary"
          />
          <RemoteButton
            id="vol-up"
            icon={<Volume2 className="w-4 h-4" />}
            label="VOL+"
            onClick={() => onVolumeChange(Math.min(100, volume + 5))}
            variant="primary"
          />
          <RemoteButton
            id="ch-down"
            icon={<ChevronDown className="w-4 h-4" />}
            label="CH-"
            onClick={() => onChannelChange("prev")}
            variant="primary"
          />
          <RemoteButton
            id="vol-down"
            icon={<Volume2 className="w-4 h-4" />}
            label="VOL-"
            onClick={() => onVolumeChange(Math.max(0, volume - 5))}
            variant="primary"
          />
        </div>

        {/* Navigation D-Pad */}
        <div className="grid grid-cols-3 gap-1">
          <div></div>
          <RemoteButton
            id="nav-up"
            icon={<ChevronUp className="w-4 h-4" />}
            onClick={() => {}}
          />
          <div></div>
          <RemoteButton
            id="nav-left"
            icon={<ChevronLeft className="w-4 h-4" />}
            onClick={() => {}}
          />
          <RemoteButton
            id="nav-center"
            icon={<div className="w-2 h-2 bg-current rounded-full" />}
            onClick={() => {}}
            variant="primary"
          />
          <RemoteButton
            id="nav-right"
            icon={<ChevronRight className="w-4 h-4" />}
            onClick={() => {}}
          />
          <div></div>
          <RemoteButton
            id="nav-down"
            icon={<ChevronDown className="w-4 h-4" />}
            onClick={() => {}}
          />
          <div></div>
        </div>

        {/* Media Controls */}
        <div className="grid grid-cols-3 gap-1">
          <RemoteButton
            id="prev"
            icon={<SkipBack className="w-4 h-4" />}
            onClick={() => onChannelChange("prev")}
          />
          <RemoteButton
            id="play-pause"
            icon={
              isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )
            }
            onClick={onPlayPause}
            variant="success"
          />
          <RemoteButton
            id="next"
            icon={<SkipForward className="w-4 h-4" />}
            onClick={() => onChannelChange("next")}
          />
        </div>

        {/* Function Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <RemoteButton
            id="mute"
            icon={
              isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )
            }
            onClick={onMuteToggle}
            variant={isMuted ? "danger" : "secondary"}
          />
          <RemoteButton
            id="menu"
            icon={<Menu className="w-4 h-4" />}
            onClick={onShowChannels}
          />
        </div>

        {/* Special Functions */}
        <div className="grid grid-cols-2 gap-2">
          <RemoteButton
            id="home"
            icon={<Home className="w-4 h-4" />}
            onClick={() => onChannelChange(0)}
          />
          <RemoteButton
            id="settings"
            icon={<Settings className="w-4 h-4" />}
            onClick={() => {}}
          />
        </div>

        {/* Smart Features */}
        <div className="grid grid-cols-2 gap-2">
          {onFullscreen && (
            <RemoteButton
              id="fullscreen"
              icon={<Maximize className="w-4 h-4" />}
              onClick={onFullscreen}
              variant="primary"
            />
          )}
          <RemoteButton
            id="ai"
            icon={<Star className="w-4 h-4" />}
            onClick={() => {}}
            variant="primary"
          />
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <RemoteButton
              key={num}
              id={`num-${num}`}
              icon={<span className="text-xs font-mono">{num}</span>}
              onClick={() => onChannelChange(num - 1)}
              size="sm"
            />
          ))}
          <RemoteButton
            id="last"
            icon={<RotateCcw className="w-3 h-3" />}
            onClick={() => {}}
            size="sm"
          />
          <RemoteButton
            id="num-0"
            icon={<span className="text-xs font-mono">0</span>}
            onClick={() => onChannelChange(9)}
            size="sm"
          />
          <RemoteButton
            id="voice"
            icon={<Mic className="w-3 h-3" />}
            onClick={() => {}}
            size="sm"
            variant="primary"
          />
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-4 flex justify-center space-x-2 relative z-10">
        <div
          className={`w-2 h-2 rounded-full ${isOn ? "bg-green-400 animate-pulse" : "bg-gray-600"}`}
        />
        <div
          className={`w-2 h-2 rounded-full ${!isMuted ? "bg-blue-400" : "bg-gray-600"}`}
        />
        <div
          className={`w-2 h-2 rounded-full ${isPlaying ? "bg-yellow-400" : "bg-gray-600"}`}
        />
      </div>

      {/* Volume Indicator */}
      {!isMuted && (
        <div className="mt-2 relative z-10">
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${volume}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 text-center relative z-10">
        <div className="text-xs text-gray-500 font-mono">v2.0</div>
      </div>

      {/* Energy Flow Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            style={{
              left: `${20 + i * 30}%`,
              top: "-100%",
            }}
            animate={{
              y: ["0vh", "150%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TVRemoteControl;
