/**
 * KnouxCore - Advanced Holographic Card Components
 * مكونات البطاقات الهولوجرافية المتقدمة مع التأثيرات التفاعلية
 */

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  glowIntensity?: "low" | "medium" | "high";
  scanlineEffect?: boolean;
  dataStreamEffect?: boolean;
  interactiveGlow?: boolean;
  hologramDistortion?: boolean;
}

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className,
  glowIntensity = "medium",
  scanlineEffect = true,
  dataStreamEffect = false,
  interactiveGlow = true,
  hologramDistortion = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  // Glow effect intensity
  const glowScale = useSpring(1);
  const glowOpacity = useSpring(0.6);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    glowScale.set(1.05);
    glowOpacity.set(0.9);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glowScale.set(1);
    glowOpacity.set(0.6);
  };

  const getGlowIntensity = () => {
    switch (glowIntensity) {
      case "low":
        return "drop-shadow-lg";
      case "high":
        return "drop-shadow-2xl";
      default:
        return "drop-shadow-xl";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative transform-gpu perspective-1000", className)}
      style={{
        rotateX,
        rotateY,
        scale: glowScale,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main holographic card */}
      <div className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-gradient-to-br from-slate-900/80 via-indigo-900/40 to-slate-900/80 border border-indigo-500/30 shadow-2xl">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: isHovered
              ? [
                  "linear-gradient(45deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))",
                  "linear-gradient(225deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3))",
                  "linear-gradient(315deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
                ]
              : "linear-gradient(45deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Scanline effect */}
        {scanlineEffect && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 213, 0.05) 2px, rgba(0, 255, 213, 0.05) 4px)",
            }}
            animate={{
              y: isHovered ? [-100, 100] : 0,
              opacity: isHovered ? [0.3, 0.6, 0.3] : 0.2,
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        )}

        {/* Data stream effect */}
        {dataStreamEffect && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-40"
                style={{
                  left: `${15 + i * 15}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scaleY: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Hologram distortion effect */}
        {hologramDistortion && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              filter: [
                "hue-rotate(0deg) saturate(1)",
                "hue-rotate(5deg) saturate(1.2)",
                "hue-rotate(-3deg) saturate(0.9)",
                "hue-rotate(0deg) saturate(1)",
              ],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}

        {/* Interactive glow border */}
        {interactiveGlow && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-xl pointer-events-none",
              getGlowIntensity(),
            )}
            style={{
              boxShadow: isHovered
                ? "0 0 40px rgba(99, 102, 241, 0.8), inset 0 0 40px rgba(139, 92, 246, 0.3)"
                : "0 0 20px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.1)",
              opacity: glowOpacity,
            }}
            animate={{
              boxShadow: isHovered
                ? [
                    "0 0 40px rgba(99, 102, 241, 0.8), inset 0 0 40px rgba(139, 92, 246, 0.3)",
                    "0 0 60px rgba(139, 92, 246, 0.9), inset 0 0 60px rgba(59, 130, 246, 0.4)",
                    "0 0 40px rgba(99, 102, 241, 0.8), inset 0 0 40px rgba(139, 92, 246, 0.3)",
                  ]
                : "0 0 20px rgba(99, 102, 241, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.1)",
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Corner accent effects */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-60" />
      </div>

      {/* Floating particles effect */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

interface DataNodeProps {
  label: string;
  value: string | number;
  status?: "active" | "warning" | "error" | "idle";
  className?: string;
}

export const DataNode: React.FC<DataNodeProps> = ({
  label,
  value,
  status = "active",
  className,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 border-green-400/50 bg-green-400/10";
      case "warning":
        return "text-yellow-400 border-yellow-400/50 bg-yellow-400/10";
      case "error":
        return "text-red-400 border-red-400/50 bg-red-400/10";
      default:
        return "text-gray-400 border-gray-400/50 bg-gray-400/10";
    }
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center p-3 rounded-lg border backdrop-blur-sm",
        getStatusColor(status),
        className,
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-xs opacity-80 mb-1">{label}</div>
      <div className="font-mono text-sm font-semibold">{value}</div>
      <motion.div
        className="w-2 h-2 rounded-full mt-1"
        style={{ backgroundColor: "currentColor" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

interface HolographicProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: "cyan" | "violet" | "green" | "yellow" | "red";
  animated?: boolean;
  className?: string;
}

export const HolographicProgressBar: React.FC<HolographicProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = "cyan",
  animated = true,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "violet":
        return "from-violet-500 to-purple-500 shadow-violet-500/50";
      case "green":
        return "from-green-500 to-emerald-500 shadow-green-500/50";
      case "yellow":
        return "from-yellow-500 to-amber-500 shadow-yellow-500/50";
      case "red":
        return "from-red-500 to-rose-500 shadow-red-500/50";
      default:
        return "from-cyan-500 to-blue-500 shadow-cyan-500/50";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">{label}</span>
          <span className="text-slate-400">
            {value}/{max}
          </span>
        </div>
      )}

      <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 10px)",
          }}
        />

        {/* Progress fill */}
        <motion.div
          className={cn(
            "h-full bg-gradient-to-r rounded-full shadow-lg",
            getColorClasses(color),
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Animated overlay */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Glow effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full blur-sm",
            getColorClasses(color).replace("shadow-", "bg-"),
          )}
          style={{ opacity: 0.3 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};
