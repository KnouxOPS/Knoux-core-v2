/**
 * KnouxCore - أيقونات مخصصة للتطبيق
 * مجموعة من الأيقونات المصممة خصيصاً لجماليات التطبيق الفضائي
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  size?: number;
  animate?: boolean;
  glowColor?: "cyan" | "violet" | "blue" | "green" | "red" | "yellow";
}

// الشعار الرئيسي لـ KnouxCore
export const KnouxCoreLogo: React.FC<IconProps> = ({
  className,
  size = 48,
  animate = true,
  glowColor = "cyan",
}) => {
  const getGlowColor = (color: string) => {
    switch (color) {
      case "violet":
        return "#7C3AED";
      case "blue":
        return "#3B82F6";
      case "green":
        return "#10B981";
      case "red":
        return "#EF4444";
      case "yellow":
        return "#F59E0B";
      default:
        return "#00FFD5";
    }
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn("drop-shadow-lg", className)}
      animate={
        animate
          ? {
              filter: [
                `drop-shadow(0 0 8px ${getGlowColor(glowColor)}40)`,
                `drop-shadow(0 0 16px ${getGlowColor(glowColor)}60)`,
                `drop-shadow(0 0 8px ${getGlowColor(glowColor)}40)`,
              ],
            }
          : {}
      }
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            stopColor={getGlowColor(glowColor)}
            stopOpacity="0.8"
          />
          <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.6" />
          <stop
            offset="100%"
            stopColor={getGlowColor(glowColor)}
            stopOpacity="0.9"
          />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* النواة المركزية */}
      <motion.circle
        cx="32"
        cy="32"
        r="12"
        fill="url(#coreGradient)"
        stroke={getGlowColor(glowColor)}
        strokeWidth="1"
        filter="url(#glow)"
        animate={animate ? { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* الدوائر المدارية */}
      <motion.circle
        cx="32"
        cy="32"
        r="20"
        fill="none"
        stroke={getGlowColor(glowColor)}
        strokeWidth="0.5"
        strokeOpacity="0.4"
        strokeDasharray="2,4"
        animate={animate ? { rotate: [0, 360] } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        strokeDasharray="1,6"
        animate={animate ? { rotate: [360, 0] } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* نقاط البيانات المتحركة */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.circle
          key={i}
          cx="32"
          cy="32"
          r="1"
          fill={getGlowColor(glowColor)}
          animate={
            animate
              ? {
                  x: [0, 20 * Math.cos((i * Math.PI) / 4)],
                  y: [0, 20 * Math.sin((i * Math.PI) / 4)],
                  opacity: [0, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* الخطوط الهندسية */}
      <motion.polygon
        points="32,20 44,32 32,44 20,32"
        fill="none"
        stroke={getGlowColor(glowColor)}
        strokeWidth="0.5"
        strokeOpacity="0.6"
        animate={animate ? { rotate: [0, 90, 0] } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

// أيقونة محرر الأكواد (Nexus)
export const NexusIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    animate={animate ? { scale: [1, 1.05, 1] } : {}}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    <defs>
      <linearGradient id="nexusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFD5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <motion.path
      d="M8 6C7.45 6 7 6.45 7 7v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H8z"
      fill="none"
      stroke="url(#nexusGradient)"
      strokeWidth="1.5"
    />
    <motion.path
      d="M10 9h4M10 12h4M10 15h2"
      stroke="#00FFD5"
      strokeWidth="1"
      strokeLinecap="round"
      animate={animate ? { opacity: [0.6, 1, 0.6] } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="19"
      cy="9"
      r="1"
      fill="#00FFD5"
      animate={animate ? { opacity: [0, 1, 0] } : {}}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// أيقونة لوحة القيادة
export const DashboardIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <radialGradient id="dashGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00FFD5" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
      </radialGradient>
    </defs>
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="url(#dashGradient)"
      stroke="#00FFD5"
      strokeWidth="0.5"
      animate={animate ? { scale: [0.9, 1.1, 0.9] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M12 6v6l4 2"
      stroke="#FFFFFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      animate={animate ? { rotate: [0, 360] } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    {Array.from({ length: 4 }).map((_, i) => (
      <motion.circle
        key={i}
        cx={12 + 8 * Math.cos((i * Math.PI) / 2)}
        cy={12 + 8 * Math.sin((i * Math.PI) / 2)}
        r="1"
        fill="#00FFD5"
        animate={animate ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.svg>
);

// أيقونة الملاحة
export const NavigationIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <motion.circle
      cx="12"
      cy="12"
      r="9"
      fill="none"
      stroke="url(#navGradient)"
      strokeWidth="0.5"
      strokeDasharray="1,2"
      animate={animate ? { rotate: [0, 360] } : {}}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
    <motion.path
      d="M12 3v18M3 12h18"
      stroke="#7C3AED"
      strokeWidth="0.5"
      strokeOpacity="0.6"
    />
    <motion.polygon
      points="12,6 15,9 12,12 9,9"
      fill="#7C3AED"
      animate={animate ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M12 12l6 6"
      stroke="#00FFD5"
      strokeWidth="1"
      strokeLinecap="round"
      animate={animate ? { pathLength: [0, 1, 0] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// أيقونة معالجة البيانات
export const DataProcessingIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFD5" />
        <stop offset="50%" stopColor="#FF1493" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    {/* شبكة العقد */}
    {[
      { x: 6, y: 6 },
      { x: 12, y: 6 },
      { x: 18, y: 6 },
      { x: 6, y: 12 },
      { x: 12, y: 12 },
      { x: 18, y: 12 },
      { x: 6, y: 18 },
      { x: 12, y: 18 },
      { x: 18, y: 18 },
    ].map((node, i) => (
      <motion.circle
        key={i}
        cx={node.x}
        cy={node.y}
        r="2"
        fill="url(#dataGradient)"
        animate={
          animate ? { scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] } : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      />
    ))}
    {/* خطوط الاتصال */}
    <motion.path
      d="M6 6L18 18M18 6L6 18M6 12L18 12M12 6L12 18"
      stroke="#00FFD5"
      strokeWidth="0.5"
      strokeOpacity="0.4"
      animate={animate ? { pathLength: [0, 1, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// أيقونة الأوامر والتحكم
export const CommandControlIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <radialGradient id="commandGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#3B82F6" />
      </radialGradient>
    </defs>
    <motion.circle
      cx="12"
      cy="12"
      r="8"
      fill="none"
      stroke="url(#commandGradient)"
      strokeWidth="1"
      animate={animate ? { scale: [0.9, 1.1, 0.9] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="3"
      fill="#7C3AED"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    {Array.from({ length: 6 }).map((_, i) => (
      <motion.line
        key={i}
        x1="12"
        y1="12"
        x2={12 + 6 * Math.cos((i * Math.PI) / 3)}
        y2={12 + 6 * Math.sin((i * Math.PI) / 3)}
        stroke="#FFFFFF"
        strokeWidth="1"
        animate={animate ? { opacity: [0.3, 1, 0.3] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.svg>
);

// أيقونة المشاريع
export const ProjectsIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <linearGradient id="projectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFD5" />
        <stop offset="100%" stopColor="#C0C0C0" />
      </linearGradient>
    </defs>
    {[
      { x: 5, y: 5, size: 3 },
      { x: 12, y: 5, size: 2.5 },
      { x: 19, y: 5, size: 2 },
      { x: 5, y: 12, size: 2.5 },
      { x: 12, y: 12, size: 3.5 },
      { x: 19, y: 12, size: 2.5 },
      { x: 5, y: 19, size: 2 },
      { x: 12, y: 19, size: 2.5 },
      { x: 19, y: 19, size: 3 },
    ].map((cube, i) => (
      <motion.rect
        key={i}
        x={cube.x - cube.size / 2}
        y={cube.y - cube.size / 2}
        width={cube.size}
        height={cube.size}
        fill="url(#projectGradient)"
        stroke="#00FFD5"
        strokeWidth="0.5"
        animate={
          animate
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut",
        }}
      />
    ))}
    <motion.path
      d="M5 5L19 19M19 5L5 19M5 12L19 12M12 5L12 19"
      stroke="#00FFD5"
      strokeWidth="0.3"
      strokeOpacity="0.3"
      animate={animate ? { pathLength: [0, 1, 0] } : {}}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// أيقونة الإحصائيات والتحليل
export const AnalyticsIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <linearGradient
        id="analyticsGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="50%" stopColor="#00FFD5" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </linearGradient>
    </defs>
    {/* أعمدة البيانات */}
    {[4, 7, 5, 9, 6, 8, 3].map((height, i) => (
      <motion.rect
        key={i}
        x={2 + i * 2.8}
        y={20 - height}
        width="2"
        height={height}
        fill="url(#analyticsGradient)"
        animate={animate ? { scaleY: [0.8, 1.2, 0.8] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut",
        }}
      />
    ))}
    {/* خط الاتجاه */}
    <motion.path
      d="M2 18L6 15L10 16L14 12L18 14L22 10"
      stroke="#00FFD5"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      animate={animate ? { pathLength: [0, 1, 0] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* نقاط البيانات */}
    {[
      { x: 2, y: 18 },
      { x: 6, y: 15 },
      { x: 10, y: 16 },
      { x: 14, y: 12 },
      { x: 18, y: 14 },
      { x: 22, y: 10 },
    ].map((point, i) => (
      <motion.circle
        key={i}
        cx={point.x}
        cy={point.y}
        r="1.5"
        fill="#FFFFFF"
        animate={animate ? { scale: [1, 1.5, 1] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </motion.svg>
);

// أيقونة الإعدادات
export const SettingsIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <linearGradient id="settingsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00FFD5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <motion.path
      d="M12 2L15.5 5.5L20 6L21 9L18.5 11.5L20 16L17 18.5L15.5 21L12 20L8.5 21L7 18.5L4 16L5.5 11.5L3 9L4 6L8.5 5.5L12 2Z"
      fill="none"
      stroke="url(#settingsGradient)"
      strokeWidth="1"
      animate={animate ? { rotate: [0, 360] } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="4"
      fill="none"
      stroke="#00FFD5"
      strokeWidth="1.5"
      animate={animate ? { scale: [0.9, 1.1, 0.9] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="12"
      cy="12"
      r="1.5"
      fill="#7C3AED"
      animate={animate ? { scale: [1, 1.3, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

// أيقونة المساعدة
export const HelpIcon: React.FC<IconProps> = ({
  className,
  size = 24,
  animate = true,
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <radialGradient id="helpGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#FFFFFF" />
      </radialGradient>
    </defs>
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="url(#helpGradient)"
      strokeWidth="1"
      animate={animate ? { scale: [0.9, 1.1, 0.9] } : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.path
      d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 3"
      stroke="#7C3AED"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      animate={animate ? { opacity: [0.7, 1, 0.7] } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.circle
      cx="12"
      cy="17"
      r="1"
      fill="#7C3AED"
      animate={animate ? { scale: [1, 1.5, 1] } : {}}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* تأثير الهالة */}
    <motion.circle
      cx="12"
      cy="12"
      r="15"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="0.5"
      strokeOpacity="0.3"
      animate={animate ? { scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] } : {}}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

export default {
  KnouxCoreLogo,
  NexusIcon,
  DashboardIcon,
  NavigationIcon,
  DataProcessingIcon,
  CommandControlIcon,
  ProjectsIcon,
  AnalyticsIcon,
  SettingsIcon,
  HelpIcon,
};
