/**
 * KnouxCore - مكون الجسيمات المتحركة المحسن
 * يوفر تأثيرات بصرية متقدمة وقابلة للتخصيص
 */

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { APP_CONFIG } from "@/config/app.config";
import { Theme, AnimationType } from "@/constants";

interface ParticleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  animationType: AnimationType;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
  theme?: Theme;
  enabled?: boolean;
  interactiveMode?: boolean;
  customColors?: string[];
  animationType?: AnimationType;
  className?: string;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = APP_CONFIG.ANIMATIONS.PARTICLES.COUNT,
  theme = Theme.DARK,
  enabled = true,
  interactiveMode = false,
  customColors,
  animationType = AnimationType.FADE,
  className = "",
}) => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ألوان الجسيمات حسب الثيم
  const particleColors = useMemo(() => {
    if (customColors) return customColors;

    switch (theme) {
      case Theme.LIGHT:
        return [
          "rgba(124, 58, 237, 0.4)", // البنفسجي
          "rgba(59, 130, 246, 0.4)", // الأزرق
          "rgba(245, 158, 11, 0.4)", // الذهبي
          "rgba(16, 185, 129, 0.4)", // الأخضر
        ];
      case Theme.COSMIC:
        return [
          "rgba(0, 255, 213, 0.6)", // الفيروزي المضيء
          "rgba(119, 0, 255, 0.6)", // البنفسجي المضيء
          "rgba(255, 20, 147, 0.6)", // الوردي المضيء
          "rgba(0, 191, 255, 0.6)", // الأزرق المضيء
        ];
      default: // DARK
        return [
          "rgba(0, 255, 213, 0.3)",
          "rgba(119, 0, 255, 0.3)",
          "rgba(245, 158, 11, 0.3)",
          "rgba(59, 130, 246, 0.3)",
        ];
    }
  }, [theme, customColors]);

  // إنشاء جسيمة جديدة
  const createParticle = useCallback(
    (id: number): ParticleProps => {
      const sizeRange = APP_CONFIG.ANIMATIONS.PARTICLES.SIZE_RANGE;
      const speedRange = APP_CONFIG.ANIMATIONS.PARTICLES.SPEED_RANGE;
      const opacityRange = APP_CONFIG.ANIMATIONS.PARTICLES.OPACITY_RANGE;

      return {
        id,
        x: Math.random() * 100,
        y: Math.random() * 100 + 100,
        size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        opacity:
          Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
        speed: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
        animationType,
        delay: Math.random() * 10,
      };
    },
    [particleColors, animationType],
  );

  // إنشاء الجسيمات
  useEffect(() => {
    if (!enabled) {
      setParticles([]);
      return;
    }

    const newParticles: ParticleProps[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push(createParticle(i));
    }
    setParticles(newParticles);
  }, [count, enabled, createParticle]);

  // تتبع موضع الماوس للوضع التفاعلي
  useEffect(() => {
    if (!interactiveMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactiveMode]);

  // حساب موضع الجسيمة في الوضع التفاعلي
  const calculateInteractivePosition = useCallback(
    (particle: ParticleProps) => {
      if (!interactiveMode) return { x: particle.x, y: particle.y };

      const distanceX = mousePosition.x - particle.x;
      const distanceY = mousePosition.y - particle.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 20) {
        const repelForce = (20 - distance) / 20;
        return {
          x: particle.x - distanceX * repelForce * 2,
          y: particle.y - distanceY * repelForce * 2,
        };
      }

      return { x: particle.x, y: particle.y };
    },
    [interactiveMode, mousePosition],
  );

  // أنماط CSS للحركات المختلفة
  const getAnimationStyle = (particle: ParticleProps) => {
    const position = calculateInteractivePosition(particle);

    const baseStyle: React.CSSProperties = {
      position: "absolute",
      left: `${position.x}%`,
      top: `${position.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      background: particle.color,
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: 0,
      animationDelay: `${particle.delay}s`,
      animationDuration: `${particle.speed}s`,
      animationIterationCount: "infinite",
      animationTimingFunction: APP_CONFIG.ANIMATIONS.EASING,
      opacity: particle.opacity,
    };

    switch (particle.animationType) {
      case AnimationType.FADE:
        return {
          ...baseStyle,
          animation: `float-fade ${particle.speed}s infinite linear`,
          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
        };
      case AnimationType.SCALE:
        return {
          ...baseStyle,
          animation: `float-scale ${particle.speed}s infinite linear`,
          filter: "blur(0.5px)",
        };
      case AnimationType.ROTATE:
        return {
          ...baseStyle,
          animation: `float-rotate ${particle.speed}s infinite linear`,
          background: `radial-gradient(circle, ${particle.color}, transparent)`,
        };
      case AnimationType.BOUNCE:
        return {
          ...baseStyle,
          animation: `float-bounce ${particle.speed}s infinite ease-in-out`,
          borderRadius: "30%",
        };
      default:
        return {
          ...baseStyle,
          animation: `float-slide ${particle.speed}s infinite linear`,
        };
    }
  };

  if (!enabled || particles.length === 0) return null;

  return (
    <>
      {/* إدراج أنماط CSS للحركات */}
      <style jsx>{`
        @keyframes float-fade {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: ${APP_CONFIG.ANIMATIONS.PARTICLES.OPACITY_RANGE[1]};
          }
          50% {
            transform: translateY(-100vh) translateX(20vw);
            opacity: 1;
          }
          75% {
            opacity: ${APP_CONFIG.ANIMATIONS.PARTICLES.OPACITY_RANGE[1]};
          }
          100% {
            transform: translateY(-200vh) translateX(-20vw);
            opacity: 0;
          }
        }

        @keyframes float-scale {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          25% {
            transform: translateY(-25vh) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-75vh) scale(1.2);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-125vh) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200vh) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes float-rotate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translateY(-50vh) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translateY(-100vh) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-150vh) rotate(270deg);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-200vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes float-bounce {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            transform: translateY(-30vh) translateX(10vw);
            opacity: 1;
          }
          50% {
            transform: translateY(-80vh) translateX(-5vw);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-130vh) translateX(15vw);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-200vh) translateX(-10vw);
            opacity: 0;
          }
        }

        @keyframes float-slide {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          25% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(-100vh) translateX(20vw);
            opacity: 1;
          }
          75% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-200vh) translateX(-20vw);
            opacity: 0;
          }
        }
      `}</style>

      {/* حاوية الجسيمات */}
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={getAnimationStyle(particle)}
            role="presentation"
          />
        ))}
      </div>
    </>
  );
};

export default FloatingParticles;
