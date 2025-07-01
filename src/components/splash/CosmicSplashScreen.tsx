/**
 * KnouxCore Cosmic Splash Screen - شاشة التحميل الكونية المتطورة
 * نظام تحميل متطور مع تأثيرات الذكاء الاصطناعي والفضاء
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KnouxCoreLogo } from "../icons/KnouxCoreIcons";

interface CosmicSplashScreenProps {
  onLoadComplete: () => void;
  duration?: number;
}

const CosmicSplashScreen: React.FC<CosmicSplashScreenProps> = ({
  onLoadComplete,
  duration = 4000,
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<
    "initializing" | "loading" | "analyzing" | "complete"
  >("initializing");
  const [loadingText, setLoadingText] = useState("تهيئة النظام الكوني...");

  const loadingPhases = [
    { phase: "initializing", text: "تهيئة النظام الكوني...", duration: 800 },
    {
      phase: "loading",
      text: "تحميل وحدات الذكاء الاصطناعي...",
      duration: 1500,
    },
    { phase: "analyzing", text: "تحليل البيانات الفضائية...", duration: 1200 },
    { phase: "complete", text: "مرحباً بك في KnouxCore", duration: 500 },
  ];

  useEffect(() => {
    let phaseIndex = 0;
    let totalElapsed = 0;

    const runPhase = () => {
      if (phaseIndex >= loadingPhases.length) {
        setLoadingProgress(100);
        setTimeout(onLoadComplete, 500);
        return;
      }

      const phase = loadingPhases[phaseIndex];
      setCurrentPhase(phase.phase as any);
      setLoadingText(phase.text);

      const interval = setInterval(() => {
        totalElapsed += 50;
        const progress = Math.min((totalElapsed / duration) * 100, 100);
        setLoadingProgress(progress);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        phaseIndex++;
        runPhase();
      }, phase.duration);
    };

    runPhase();
  }, [duration, onLoadComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(10, 0, 21, 0.9) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(75, 0, 110, 0.8) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(26, 0, 37, 0.9) 0%, transparent 50%),
            linear-gradient(135deg, #0a0015 0%, #1a0025 25%, #2d0036 50%, #4b006e 75%, #1a0025 100%)
          `,
        }}
      >
        {/* Cosmic Background Effects */}
        <div className="absolute inset-0 cosmic-grid opacity-20" />

        {/* Floating Stellar Particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: `hue-rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* AI Processing Streams */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                width: "200px",
                top: `${20 + i * 10}%`,
                left: "-200px",
              }}
              animate={{
                x: ["0vw", "100vw"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Central Logo with Quantum Effects */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Orbital Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-400/30 rounded-full"
                style={{
                  width: `${120 + i * 40}px`,
                  height: `${120 + i * 40}px`,
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            ))}
          </div>

          {/* Main Logo */}
          <motion.div
            animate={{
              rotateY: 360,
              filter: [
                "drop-shadow(0 0 20px #00ffd5)",
                "drop-shadow(0 0 40px #7c3aed)",
                "drop-shadow(0 0 20px #00ffd5)",
              ],
            }}
            transition={{
              rotateY: {
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              },
              filter: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <KnouxCoreLogo size={80} animate={true} glowColor="cyan" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="cosmic-title mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            KnouxCore
          </motion.h1>

          <motion.p
            className="cosmic-subtitle mt-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            المركز الذكي للتحكم الفضائي - الإصدار البلاتيني
          </motion.p>
        </motion.div>

        {/* Loading Interface */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* Progress Bar */}
          <div className="relative">
            <div className="quantum-progress mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 rounded-inherit"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="text-center text-cyan-400 font-mono text-sm mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.round(loadingProgress)}%
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            className="text-center"
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-cyan-300 text-sm font-medium">{loadingText}</p>
          </motion.div>

          {/* AI Status Indicators */}
          <div className="flex justify-center space-x-4 mt-6">
            {["AI Core", "Navigation", "Data Stream", "Quantum Link"].map(
              (system, i) => (
                <motion.div
                  key={system}
                  className="flex flex-col items-center space-y-1"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: loadingProgress > i * 25 ? 1 : 0.3,
                    scale: loadingProgress > i * 25 ? 1 : 0.8,
                  }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      loadingProgress > i * 25
                        ? "bg-green-400 animate-pulse"
                        : "bg-gray-600"
                    }`}
                  />
                  <span className="text-xs text-gray-400">{system}</span>
                </motion.div>
              ),
            )}
          </div>
        </motion.div>

        {/* Quantum Scanner Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              style={{ top: `${30 + i * 20}%` }}
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4">
          <motion.div
            className="w-16 h-16 border-l-2 border-t-2 border-cyan-400/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="absolute top-4 right-4">
          <motion.div
            className="w-16 h-16 border-r-2 border-t-2 border-violet-400/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <motion.div
            className="w-16 h-16 border-l-2 border-b-2 border-pink-400/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <motion.div
            className="w-16 h-16 border-r-2 border-b-2 border-emerald-400/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CosmicSplashScreen;
