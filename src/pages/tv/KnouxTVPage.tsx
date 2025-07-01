/**
 * KnouxTV Page - صفحة التلفزيون الكوني
 * واجهة التلفزيون الرئيسية مع التحكم الكامل والتفاعل المتطور
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KnouxTV from "../../components/tv/KnouxTV";
import {
  Maximize,
  Minimize,
  Monitor,
  Tv,
  Settings,
  HelpCircle,
} from "lucide-react";

const KnouxTVPage: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Hide instructions after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen cosmic-grid p-6"
      style={{ background: "var(--gradient-void)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Tv className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold cosmic-title">KnouxTV</h1>
              <p className="text-muted-foreground">
                التلفزيون الكوني المتطور - Advanced Cosmic Television System
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleFullscreen}
            className="cosmic-button flex items-center gap-2 px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </motion.button>

          <motion.button
            onClick={() => setShowInstructions(!showInstructions)}
            className="cosmic-button flex items-center gap-2 px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </motion.button>
        </div>
      </motion.div>

      {/* Instructions Overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 max-w-2xl"
          >
            <div className="cosmic-glass-ultra p-6 rounded-lg border border-cyan-400/30">
              <div className="text-center">
                <Monitor className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">
                  مرحباً بك في KnouxTV
                </h3>
                <div className="text-sm text-gray-300 space-y-2 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-2">
                        Keyboard Controls:
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li>↑/↓ - Change Channel</li>
                        <li>Space - Play/Pause</li>
                        <li>F - Fullscreen</li>
                        <li>M - Mute</li>
                        <li>R - Toggle Remote</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-violet-400 mb-2">
                        Features:
                      </h4>
                      <ul className="space-y-1 text-xs">
                        <li>9 Live Channels</li>
                        <li>Real-time Data</li>
                        <li>AI Integration</li>
                        <li>Voice Control</li>
                        <li>Smart Remote</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="mt-4 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
                >
                  ابدأ المشاهدة
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main TV Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <KnouxTV
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          className="relative z-10"
        />
      </motion.div>

      {/* Feature Highlights */}
      {!isFullscreen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="cosmic-glass-ultra p-6 rounded-lg border border-cyan-400/30">
            <div className="text-center">
              <Monitor className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                عرض مباشر
              </h3>
              <p className="text-gray-400 text-sm">
                بيانات حية من جميع خدمات KnouxCore بالوقت الفعلي
              </p>
            </div>
          </div>

          <div className="cosmic-glass-ultra p-6 rounded-lg border border-violet-400/30">
            <div className="text-center">
              <Tv className="w-12 h-12 text-violet-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                9 قنوات ذكية
              </h3>
              <p className="text-gray-400 text-sm">
                كل قناة مخصصة لخدمة مختلفة مع تحليلات وبيانات متقدمة
              </p>
            </div>
          </div>

          <div className="cosmic-glass-ultra p-6 rounded-lg border border-emerald-400/30">
            <div className="text-center">
              <Settings className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                تحكم متطور
              </h3>
              <p className="text-gray-400 text-sm">
                ريموت ذكي مع تحكم صوتي وإعدادات قابلة للتخصيص
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* TV Signal Waves */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/10 rounded-full"
              style={{
                width: `${(i + 1) * 200}px`,
                height: `${(i + 1) * 200}px`,
                left: `${-(i + 1) * 100}px`,
                top: `${-(i + 1) * 100}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnouxTVPage;
