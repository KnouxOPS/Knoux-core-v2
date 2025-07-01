/**
 * KnouxCore Cosmic Interface Components - مكونات الواجهة الكونية
 * مجموعة متقدمة من مكونات الواجهة مع تأثيرات فضائية وهولوغرافية
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ===============================
// Cosmic Button Component
// ===============================

interface CosmicButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "ai";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  glowIntensity?: "low" | "medium" | "high";
  quantumEffect?: boolean;
}

export const CosmicButton: React.FC<CosmicButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  onClick,
  glowIntensity = "medium",
  quantumEffect = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]";
      case "secondary":
        return "bg-gradient-to-r from-violet-500 to-pink-600 text-white border-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.4)]";
      case "ghost":
        return "bg-transparent text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10";
      case "danger":
        return "bg-gradient-to-r from-red-500 to-orange-600 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]";
      case "ai":
        return "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]";
      default:
        return "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-cyan-400";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-base";
      case "lg":
        return "px-6 py-3 text-lg";
      case "xl":
        return "px-8 py-4 text-xl";
      default:
        return "px-4 py-2 text-base";
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden rounded-lg font-semibold transition-all duration-300",
        "border-2 backdrop-blur-sm",
        "transform active:scale-95",
        getVariantStyles(),
        getSizeStyles(),
        disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105",
        isHovered && !disabled ? "shadow-2xl" : "",
        quantumEffect ? "quantum-border" : "",
        className,
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 0 } : {}}
    >
      {/* Quantum Energy Background */}
      {quantumEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-pink-400/20"
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      {/* Hover Glow Effect */}
      <AnimatePresence>
        {isHovered && !disabled && (
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Click Ripple Effect */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        <span>{children}</span>
      </div>

      {/* Energy Particles */}
      {isHovered && !disabled && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

// ===============================
// Cosmic Progress Bar
// ===============================

interface CosmicProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "energy" | "quantum" | "neural";
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

export const CosmicProgress: React.FC<CosmicProgressProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showValue = false,
  animated = true,
  className,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-2";
      case "md":
        return "h-3";
      case "lg":
        return "h-4";
      default:
        return "h-3";
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "energy":
        return "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600";
      case "quantum":
        return "bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-600";
      case "neural":
        return "bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600";
      default:
        return "bg-gradient-to-r from-cyan-400 to-violet-600";
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "w-full bg-black/50 rounded-full overflow-hidden border border-cyan-400/30",
          getSizeStyles(),
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full relative overflow-hidden",
            getVariantStyles(),
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={
            animated ? { duration: 0.5, ease: "easeOut" } : { duration: 0 }
          }
        >
          {/* Energy Flow Effect */}
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}
        </motion.div>
      </div>

      {showValue && (
        <div className="mt-1 text-xs text-center text-cyan-400 font-mono">
          {value.toFixed(1)} / {max}
        </div>
      )}
    </div>
  );
};

// ===============================
// Cosmic Input Field
// ===============================

interface CosmicInputProps {
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  variant?: "default" | "command" | "search";
  icon?: React.ReactNode;
  className?: string;
}

export const CosmicInput: React.FC<CosmicInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  variant = "default",
  icon,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getVariantStyles = () => {
    switch (variant) {
      case "command":
        return "bg-black/80 border-green-400 text-green-400 font-mono placeholder-green-400/50";
      case "search":
        return "bg-black/60 border-cyan-400 text-cyan-300 placeholder-cyan-400/50";
      default:
        return "bg-black/50 border-cyan-400/50 text-white placeholder-gray-400";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-cyan-300">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          className={cn(
            "relative flex items-center rounded-lg border-2 transition-all duration-300",
            "backdrop-blur-sm overflow-hidden",
            getVariantStyles(),
            isFocused
              ? "border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              : "",
            error ? "border-red-400" : "",
            disabled ? "opacity-50 cursor-not-allowed" : "",
          )}
        >
          {icon && <div className="pl-3 text-cyan-400">{icon}</div>}

          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "w-full px-4 py-3 bg-transparent outline-none",
              icon ? "pl-2" : "",
            )}
          />

          {/* Quantum Scan Line */}
          {isFocused && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          )}
        </div>

        {/* Data Flow Particles */}
        {isFocused && !disabled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: "50%",
                }}
                animate={{
                  x: [0, 100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ===============================
// Cosmic Card Component
// ===============================

interface CosmicCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: "default" | "premium" | "elite" | "quantum";
  interactive?: boolean;
  glowEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CosmicCard: React.FC<CosmicCardProps> = ({
  children,
  title,
  subtitle,
  variant = "default",
  interactive = false,
  glowEffect = false,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "premium":
        return "cosmic-glass-ultra border-violet-400/50 shadow-[0_0_30px_rgba(124,58,237,0.2)]";
      case "elite":
        return "cosmic-glass-ultra border-pink-400/50 shadow-[0_0_30px_rgba(255,20,147,0.2)]";
      case "quantum":
        return "quantum-border cosmic-glass-ultra";
      default:
        return "cosmic-glass-ultra border-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]";
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg p-6 transition-all duration-300",
        getVariantStyles(),
        interactive ? "cursor-pointer hover:scale-105" : "",
        isHovered && glowEffect ? "shadow-2xl" : "",
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={interactive ? { y: -4 } : {}}
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-4 pb-4 border-b border-cyan-400/20">
          {title && (
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          )}
          {subtitle && <p className="text-sm text-cyan-300/70">{subtitle}</p>}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Hover Effect Particles */}
      {isHovered && interactive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
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
      )}
    </motion.div>
  );
};

export default {
  CosmicButton,
  CosmicProgress,
  CosmicInput,
  CosmicCard,
};
