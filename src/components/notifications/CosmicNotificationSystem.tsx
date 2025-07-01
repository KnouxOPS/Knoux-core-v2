/**
 * KnouxCore Cosmic Notification System - نظام الإشعارات الكوني
 * نظام إشعارات متطور مع تأثيرات هولوغرافية وذكاء اصطناعي
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Brain,
  Shield,
  Rocket,
  X,
  Star,
  Target,
} from "lucide-react";

interface CosmicNotification {
  id: string;
  type: "success" | "error" | "warning" | "info" | "ai" | "system" | "critical";
  title: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  source?: "AI" | "System" | "User" | "Navigation" | "Data" | "Command";
  priority?: "low" | "normal" | "high" | "critical";
  actions?: Array<{
    label: string;
    action: () => void;
    style?: "primary" | "secondary" | "danger";
  }>;
}

interface CosmicNotificationSystemProps {
  notifications: CosmicNotification[];
  onDismiss: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
}

const CosmicNotificationSystem: React.FC<CosmicNotificationSystemProps> = ({
  notifications,
  onDismiss,
  onAction,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getNotificationIcon = (type: CosmicNotification["type"]) => {
    const iconProps = { size: 20, className: "shrink-0" };

    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} className="text-green-400" />;
      case "error":
        return <AlertCircle {...iconProps} className="text-red-400" />;
      case "warning":
        return <AlertCircle {...iconProps} className="text-yellow-400" />;
      case "info":
        return <Info {...iconProps} className="text-blue-400" />;
      case "ai":
        return <Brain {...iconProps} className="text-violet-400" />;
      case "system":
        return <Zap {...iconProps} className="text-cyan-400" />;
      case "critical":
        return <Shield {...iconProps} className="text-red-500 animate-pulse" />;
      default:
        return <Info {...iconProps} className="text-gray-400" />;
    }
  };

  const getNotificationStyles = (
    type: CosmicNotification["type"],
    priority?: string,
  ) => {
    const baseClasses = "cosmic-glass-ultra border-l-4";

    switch (type) {
      case "success":
        return `${baseClasses} border-l-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]`;
      case "error":
        return `${baseClasses} border-l-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]`;
      case "warning":
        return `${baseClasses} border-l-yellow-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]`;
      case "info":
        return `${baseClasses} border-l-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]`;
      case "ai":
        return `${baseClasses} border-l-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.3)]`;
      case "system":
        return `${baseClasses} border-l-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]`;
      case "critical":
        return `${baseClasses} border-l-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse`;
      default:
        return `${baseClasses} border-l-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.3)]`;
    }
  };

  const getPriorityIndicator = (priority?: string) => {
    switch (priority) {
      case "critical":
        return <Star className="w-3 h-3 text-red-500 animate-spin" />;
      case "high":
        return <Target className="w-3 h-3 text-orange-400 animate-pulse" />;
      case "normal":
        return (
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        );
      case "low":
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      default:
        return null;
    }
  };

  const handleAction = (
    notificationId: string,
    actionIndex: number,
    action: () => void,
  ) => {
    action();
    onAction?.(notificationId, actionIndex);
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full space-y-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{
              opacity: 0,
              x: 400,
              scale: 0.8,
              rotateY: 90,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              x: 400,
              scale: 0.8,
              rotateY: -90,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: index * 0.1,
            }}
            className={`
              ${getNotificationStyles(notification.type, notification.priority)}
              relative overflow-hidden p-4 rounded-lg
              pointer-events-auto cursor-pointer
              transform transition-all duration-300 ease-out
              ${hoveredId === notification.id ? "scale-105 -translate-y-1" : ""}
            `}
            onMouseEnter={() => setHoveredId(notification.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Holographic Scan Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* Quantum Border Animation */}
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-lg"
              animate={{
                borderColor: [
                  "rgba(0,255,213,0.3)",
                  "rgba(124,58,237,0.3)",
                  "rgba(255,20,147,0.3)",
                  "rgba(0,255,213,0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex items-center space-x-2">
                    {notification.source && (
                      <span className="text-xs px-2 py-1 bg-black/30 rounded text-cyan-300 font-mono">
                        {notification.source}
                      </span>
                    )}
                    {getPriorityIndicator(notification.priority)}
                  </div>
                </div>

                <button
                  onClick={() => onDismiss(notification.id)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X size={16} className="text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h4 className="font-semibold text-white text-sm">
                  {notification.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {notification.message}
                </p>
              </div>

              {/* Actions */}
              {notification.actions && notification.actions.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {notification.actions.map((action, actionIndex) => (
                    <motion.button
                      key={actionIndex}
                      onClick={() =>
                        handleAction(
                          notification.id,
                          actionIndex,
                          action.action,
                        )
                      }
                      className={`
                        px-3 py-1.5 text-xs font-medium rounded transition-all
                        ${
                          action.style === "primary"
                            ? "bg-cyan-500 hover:bg-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : action.style === "danger"
                              ? "bg-red-500 hover:bg-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                              : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Progress indicator for auto-dismiss */}
              {notification.duration && !notification.persistent && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-500"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: notification.duration / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </div>

            {/* Data Flow Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-8 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: "-100%",
                  }}
                  animate={{
                    y: ["0vh", "150%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Notification Context and Hook
export const useCosmicNotifications = () => {
  const [notifications, setNotifications] = useState<CosmicNotification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<CosmicNotification, "id">) => {
      const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newNotification: CosmicNotification = {
        ...notification,
        id,
        duration: notification.duration || 5000,
        priority: notification.priority || "normal",
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto-dismiss after duration (unless persistent)
      if (!newNotification.persistent && newNotification.duration) {
        setTimeout(() => {
          dismissNotification(id);
        }, newNotification.duration);
      }

      return id;
    },
    [],
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const notifySuccess = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({ type: "success", title, message, ...options });
    },
    [addNotification],
  );

  const notifyError = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({ type: "error", title, message, ...options });
    },
    [addNotification],
  );

  const notifyWarning = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({ type: "warning", title, message, ...options });
    },
    [addNotification],
  );

  const notifyInfo = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({ type: "info", title, message, ...options });
    },
    [addNotification],
  );

  const notifyAI = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({
        type: "ai",
        title,
        message,
        source: "AI",
        ...options,
      });
    },
    [addNotification],
  );

  const notifySystem = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({
        type: "system",
        title,
        message,
        source: "System",
        ...options,
      });
    },
    [addNotification],
  );

  const notifyCritical = useCallback(
    (title: string, message: string, options?: Partial<CosmicNotification>) => {
      return addNotification({
        type: "critical",
        title,
        message,
        priority: "critical",
        persistent: true,
        ...options,
      });
    },
    [addNotification],
  );

  return {
    notifications,
    addNotification,
    dismissNotification,
    dismissAll,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyAI,
    notifySystem,
    notifyCritical,
  };
};

export default CosmicNotificationSystem;
