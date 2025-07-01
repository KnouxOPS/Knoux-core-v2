/**
 * KnouxCore - شاشة التحميل المذهلة
 * شاشة تحميل متقدمة مع تأثير��ت فضائية وسايبربانك
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_CONFIG } from "@/config/app.config";

interface SplashScreenProps {
  onLoadComplete?: () => void;
  duration?: number;
  className?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onLoadComplete,
  duration = 3000,
  className = "",
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<
    "loading" | "ready" | "fading"
  >("loading");

  // محاكاة تقدم التحميل
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentPhase("ready");
          setTimeout(() => {
            setCurrentPhase("fading");
            setTimeout(() => {
              setIsVisible(false);
              onLoadComplete?.();
            }, 500);
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{
          background: `
            linear-gradient(135deg,
              #0a0015 0%,
              #1a0025 25%,
              #2d0036 50%,
              #4b006e 75%,
              #1a0025 100%
            )
          `,
        }}
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)",
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        {/* خلفية النجوم المتحركة */}
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* السديم المتحرك */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 40%,
                  rgba(124, 58, 237, 0.3) 0%,
                  transparent 50%
                ),
                radial-gradient(ellipse at 70% 60%,
                  rgba(0, 255, 213, 0.2) 0%,
                  transparent 50%
                ),
                radial-gradient(ellipse at 50% 20%,
                  rgba(255, 20, 147, 0.2) 0%,
                  transparent 50%
                )
              `,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* الجسيمات المتحركة المتقدمة */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                background:
                  i % 2 === 0
                    ? "rgba(0, 255, 213, 0.6)"
                    : "rgba(124, 58, 237, 0.6)",
                boxShadow: `0 0 ${Math.random() * 20 + 10}px ${
                  i % 2 === 0
                    ? "rgba(0, 255, 213, 0.8)"
                    : "rgba(124, 58, 237, 0.8)"
                }`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -window.innerHeight - 50],
                x: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* الشعار المركزي الهولوجرافي */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ scale: 0, opacity: 0, rotateY: 180 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: { duration: 1, ease: "easeOut", delay: 0.5 },
          }}
        >
          {/* النواة المركزية ��لمتوهجة */}
          <motion.div
            className="relative w-32 h-32 mb-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* الحلقات الخارجية */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor:
                    ring === 1
                      ? "rgba(0, 255, 213, 0.8)"
                      : ring === 2
                        ? "rgba(124, 58, 237, 0.6)"
                        : "rgba(255, 20, 147, 0.4)",
                  filter: `blur(${ring}px)`,
                  transform: `scale(${1 + ring * 0.2})`,
                }}
                animate={{
                  rotate: ring % 2 === 0 ? [0, -360] : [0, 360],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  rotate: {
                    duration: 4 + ring,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}

            {/* النواة الداخلية */}
            <motion.div
              className="absolute inset-4 rounded-full"
              style={{
                background: `
                  radial-gradient(circle,
                    rgba(0, 255, 213, 1) 0%,
                    rgba(124, 58, 237, 0.8) 50%,
                    rgba(0, 255, 213, 0.3) 100%
                  )
                `,
                boxShadow: `
                  0 0 30px rgba(0, 255, 213, 0.8),
                  0 0 60px rgba(124, 58, 237, 0.6),
                  inset 0 0 20px rgba(255, 255, 255, 0.2)
                `,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 30px rgba(0, 255, 213, 0.8), 0 0 60px rgba(124, 58, 237, 0.6)",
                  "0 0 50px rgba(0, 255, 213, 1), 0 0 80px rgba(124, 58, 237, 0.8)",
                  "0 0 30px rgba(0, 255, 213, 0.8), 0 0 60px rgba(124, 58, 237, 0.6)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* رمز K المضيء */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-3xl font-bold text-white"
                  style={{
                    textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  K
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* نص الشعار */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 1.2 },
            }}
          >
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #00FFD5, #7C3AED, #FF1493)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 30px rgba(0, 255, 213, 0.5)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              KnouxCore
            </h1>
            <p
              className="text-lg text-cyan-300 mb-6"
              style={{
                textShadow: "0 0 10px rgba(0, 255, 213, 0.7)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              المركز الذكي للتحكم الفضائي
            </p>
            <p
              className="text-sm text-purple-300"
              style={{
                textShadow: "0 0 8px rgba(124, 58, 237, 0.7)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              الإصدار البلاتيني - v{APP_CONFIG.APP_VERSION}
            </p>
          </motion.div>
        </motion.div>

        {/* شريط التقدم المتقدم */}
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 1.5 },
          }}
        >
          {/* خلفية الشريط */}
          <div
            className="w-full h-2 rounded-full relative overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* الشريط المتحرك */}
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: `
                  linear-gradient(90deg,
                    #00FFD5 0%,
                    #7C3AED 50%,
                    #FF1493 100%
                  )
                `,
                boxShadow: "0 0 10px rgba(0, 255, 213, 0.8)",
                width: `${progress}%`,
              }}
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0, 255, 213, 0.8)",
                  "0 0 20px rgba(124, 58, 237, 0.8)",
                  "0 0 10px rgba(0, 255, 213, 0.8)",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* تأثير الوميض */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>

          {/* نص التقدم */}
          <div className="flex justify-between items-center mt-3 text-sm">
            <motion.span
              className="text-cyan-300"
              style={{ textShadow: "0 0 5px rgba(0, 255, 213, 0.7)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentPhase === "loading" && "جاري التحميل..."}
              {currentPhase === "ready" && "جاهز للإطلاق!"}
              {currentPhase === "fading" && "مرحباً بك!"}
            </motion.span>
            <span
              className="text-purple-300"
              style={{ textShadow: "0 0 5px rgba(124, 58, 237, 0.7)" }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* تأثيرات إضافية */}
        <div className="absolute inset-0 pointer-events-none">
          {/* خطوط طاقة */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: "2px",
                height: "100%",
                background: `linear-gradient(to bottom,
                  transparent,
                  rgba(0, 255, 213, 0.5),
                  transparent
                )`,
                left: `${20 + i * 15}%`,
                filter: "blur(1px)",
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
