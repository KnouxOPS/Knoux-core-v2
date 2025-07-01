/**
 * KnouxCore - لوحة التحكم المحسنة
 * لوحة تحكم متقدمة مع تأثيرات فضائية وواجهة تفاعلية
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Zap,
  Download,
  Upload,
  Users,
  Shield,
  Brain,
  Globe,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Settings,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SystemMetric {
  id: string;
  label: string;
  labelAr: string;
  value: number;
  unit: string;
  trend: "up" | "down" | "stable";
  status: "good" | "warning" | "critical";
  icon: React.ElementType;
  color: string;
}

interface ActivityItem {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  timestamp: Date;
  user?: string;
}

const EnhancedDashboard: React.FC = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      id: "cpu",
      label: "CPU Usage",
      labelAr: "استخدام المعالج",
      value: 45,
      unit: "%",
      trend: "stable",
      status: "good",
      icon: Cpu,
      color: "#00FFD5",
    },
    {
      id: "memory",
      label: "Memory Usage",
      labelAr: "استخدام الذاكرة",
      value: 68,
      unit: "%",
      trend: "up",
      status: "warning",
      icon: HardDrive,
      color: "#7C3AED",
    },
    {
      id: "network",
      label: "Network Speed",
      labelAr: "سرعة الشبكة",
      value: 85,
      unit: "Mbps",
      trend: "up",
      status: "good",
      icon: Wifi,
      color: "#FF1493",
    },
    {
      id: "battery",
      label: "System Power",
      labelAr: "طاقة النظام",
      value: 92,
      unit: "%",
      trend: "stable",
      status: "good",
      icon: Battery,
      color: "#FFD700",
    },
  ]);

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "success",
      title: "AI Analysis Completed",
      titleAr: "اكتمل التحليل الذكي",
      description: "Advanced data processing finished successfully",
      descriptionAr: "انتهت معالجة البيانات المتقدمة بنجاح",
      timestamp: new Date(Date.now() - 5 * 60000),
      user: "System AI",
    },
    {
      id: "2",
      type: "info",
      title: "New Service Deployed",
      titleAr: "تم نشر خدمة جديدة",
      description: "Network monitoring service is now active",
      descriptionAr: "خدمة مراقبة الشبكة أصبحت نشطة الآن",
      timestamp: new Date(Date.now() - 15 * 60000),
      user: "Admin",
    },
    {
      id: "3",
      type: "warning",
      title: "High Memory Usage",
      titleAr: "استخدام عالي للذاكرة",
      description: "Memory usage exceeded 65% threshold",
      descriptionAr: "استخدام الذاكرة تجاوز حد 65%",
      timestamp: new Date(Date.now() - 30 * 60000),
      user: "System Monitor",
    },
  ]);

  const [quickStats, setQuickStats] = useState({
    totalUsers: 247,
    activeServices: 12,
    totalDownloads: 1847,
    systemUptime: "15d 7h 23m",
  });

  // محاكا�� تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(
            0,
            Math.min(100, metric.value + (Math.random() - 0.5) * 10),
          ),
          trend:
            Math.random() > 0.5
              ? "up"
              : Math.random() > 0.5
                ? "down"
                : "stable",
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      default:
        return "→";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "error":
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* العنوان الرئيسي */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold gradient-text-primary mb-2">
          مركز التحكم الذكي
        </h1>
        <p className="text-lg text-gray-400">
          رصد شامل لجميع أنظمة KnouxCore الفضائية
        </p>
      </motion.div>

      {/* الإحصائيات السريعة */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {[
          {
            label: "المستخدمون النشطون",
            value: quickStats.totalUsers,
            icon: Users,
            color: "#00FFD5",
          },
          {
            label: "الخدمات النشطة",
            value: quickStats.activeServices,
            icon: Zap,
            color: "#7C3AED",
          },
          {
            label: "إجمالي التحميلات",
            value: quickStats.totalDownloads,
            icon: Download,
            color: "#FF1493",
          },
          {
            label: "وقت التشغيل",
            value: quickStats.systemUptime,
            icon: Clock,
            color: "#FFD700",
            isString: true,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className="glassmorphism p-6 border-0 relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color}, transparent 70%)`,
                }}
              />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p
                    className="text-2xl font-bold"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 10px ${stat.color}50`,
                    }}
                  >
                    {stat.isString ? stat.value : stat.value.toLocaleString()}
                  </p>
                </div>
                <stat.icon
                  className="h-8 w-8 opacity-70"
                  style={{ color: stat.color }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* مقاييس النظام */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold neon-text-cyan mb-6">
          مقاييس النظام الحية
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="glassmorphism p-6 border-0 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `linear-gradient(135deg, ${metric.color}, transparent)`,
                  }}
                />
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <metric.icon
                      className="h-6 w-6"
                      style={{ color: metric.color }}
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">
                        {getTrendIcon(metric.trend)}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getStatusColor(metric.status)} border-current`}
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      {metric.labelAr}
                    </p>
                    <div className="flex items-end space-x-2 rtl:space-x-reverse">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: metric.color }}
                      >
                        {metric.value.toFixed(0)}
                      </span>
                      <span className="text-sm text-gray-500 mb-1">
                        {metric.unit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress
                      value={metric.value}
                      className="h-2 bg-gray-800"
                    />
                    <motion.div
                      className="h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${metric.color}, transparent)`,
                        width: `${metric.value}%`,
                      }}
                      animate={{
                        boxShadow: [
                          `0 0 5px ${metric.color}50`,
                          `0 0 15px ${metric.color}80`,
                          `0 0 5px ${metric.color}50`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* النشاط الأخير والخدمات السريعة */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* النشاط الأخير */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glassmorphism p-6 border-0 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold neon-text-violet">
                النشاط الأخير
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                عرض الكل
              </Button>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                return (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ActivityIcon
                      className={`h-5 w-5 mt-0.5 ${getActivityColor(activity.type)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">
                        {activity.titleAr}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.descriptionAr}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {activity.user}
                        </span>
                        <span className="text-xs text-gray-500">
                          {activity.timestamp.toLocaleTimeString("ar-SA")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* الوصول السريع للخدمات */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glassmorphism p-6 border-0 h-full">
            <h3 className="text-xl font-bold neon-text-pink mb-6">
              الوصول السريع
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "الذكاء ا��اصطناعي",
                  icon: Brain,
                  path: "/ai-insights",
                  color: "#00FFD5",
                },
                {
                  label: "مراقبة الشبكة",
                  icon: Globe,
                  path: "/network",
                  color: "#7C3AED",
                },
                {
                  label: "مركز الأمان",
                  icon: Shield,
                  path: "/security",
                  color: "#FF1493",
                },
                {
                  label: "الإعدادات",
                  icon: Settings,
                  path: "/settings",
                  color: "#FFD700",
                },
                {
                  label: "التحميلات",
                  icon: Download,
                  path: "/downloads",
                  color: "#00FFD5",
                },
                {
                  label: "الإحصائيات",
                  icon: TrendingUp,
                  path: "/analytics",
                  color: "#7C3AED",
                },
              ].map((service, index) => (
                <motion.button
                  key={service.label}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <service.icon
                      className="h-8 w-8 group-hover:scale-110 transition-transform"
                      style={{ color: service.color }}
                    />
                    <span className="text-sm font-medium text-center">
                      {service.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* تأثيرات إضافية */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30"
            style={{
              height: "100%",
              left: `${20 + i * 30}%`,
              filter: "blur(1px)",
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedDashboard;
