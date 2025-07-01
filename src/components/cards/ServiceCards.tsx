/**
 * KnouxCore - مكونات البطاقات الخدمية
 * بطاقات جميلة ومنظمة لعرض الأقسام والخدمات
 */

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HolographicCard } from "@/components/effects/HolographicCard";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Zap,
  Shield,
  Cpu,
  Database,
  Network,
  Activity,
  Target,
  Sparkles,
  Rocket,
  Brain,
  Globe,
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  status: "active" | "beta" | "coming_soon" | "premium";
  onClick?: () => void;
  gradient?: "cyan" | "violet" | "blue" | "green" | "red" | "yellow";
  className?: string;
}

interface CategoryCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  services: ServiceCardProps[];
  gradient?: "cyan" | "violet" | "blue" | "green" | "red" | "yellow";
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  status,
  onClick,
  gradient = "cyan",
  className,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "beta":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "coming_soon":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "premium":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط";
      case "beta":
        return "تجريبي";
      case "coming_soon":
        return "قريباً";
      case "premium":
        return "مميز";
      default:
        return "غير محدد";
    }
  };

  const getGradientColors = (gradient: string) => {
    switch (gradient) {
      case "violet":
        return "from-violet-500/20 to-purple-500/20 border-violet-500/30";
      case "blue":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "green":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30";
      case "red":
        return "from-red-500/20 to-rose-500/20 border-red-500/30";
      case "yellow":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      default:
        return "from-cyan-500/20 to-blue-500/20 border-cyan-500/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group cursor-pointer", className)}
      onClick={onClick}
    >
      <HolographicCard
        glowIntensity="medium"
        scanlineEffect={true}
        interactiveGlow={true}
        className="h-full"
      >
        <div className="p-6 h-full flex flex-col">
          {/* رأس البطاقة */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-3 rounded-lg bg-gradient-to-br border",
                  getGradientColors(gradient),
                )}
              >
                {icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {title}
                </h3>
                <div
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium border",
                    getStatusColor(status),
                  )}
                >
                  {getStatusText(status)}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
          </div>

          {/* وصف الخدمة */}
          <p className="text-slate-300 text-sm mb-4 flex-1">{description}</p>

          {/* المميزات */}
          <div className="space-y-2 mb-4">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-xs text-slate-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-1 h-1 rounded-full bg-cyan-400" />
                <span>{feature}</span>
              </motion.div>
            ))}
            {features.length > 3 && (
              <div className="text-xs text-slate-500">
                +{features.length - 3} مميزات أخرى
              </div>
            )}
          </div>

          {/* زر الإجراء */}
          <Button
            size="sm"
            className={cn(
              "w-full bg-gradient-to-r text-white border-0 group-hover:shadow-lg transition-all duration-200",
              gradient === "violet"
                ? "from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500"
                : gradient === "blue"
                  ? "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                  : gradient === "green"
                    ? "from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                    : gradient === "red"
                      ? "from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500"
                      : gradient === "yellow"
                        ? "from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500"
                        : "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500",
            )}
          >
            <Zap className="w-4 h-4 mr-2" />
            {status === "coming_soon" ? "قريباً" : "تشغيل"}
          </Button>
        </div>
      </HolographicCard>
    </motion.div>
  );
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  services,
  gradient = "cyan",
  className,
}) => {
  const getGradientColors = (gradient: string) => {
    switch (gradient) {
      case "violet":
        return "from-violet-500/30 to-purple-500/30 border-violet-500/50";
      case "blue":
        return "from-blue-500/30 to-cyan-500/30 border-blue-500/50";
      case "green":
        return "from-green-500/30 to-emerald-500/30 border-green-500/50";
      case "red":
        return "from-red-500/30 to-rose-500/30 border-red-500/50";
      case "yellow":
        return "from-yellow-500/30 to-amber-500/30 border-yellow-500/50";
      default:
        return "from-cyan-500/30 to-blue-500/30 border-cyan-500/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn("space-y-6", className)}
    >
      {/* رأس الفئة */}
      <HolographicCard
        glowIntensity="high"
        dataStreamEffect={true}
        className="p-8"
      >
        <div className="text-center">
          <motion.div
            className={cn(
              "inline-flex p-4 rounded-2xl bg-gradient-to-br border mb-4",
              getGradientColors(gradient),
            )}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon}
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
            {title}
          </h2>
          <p className="text-lg text-slate-400 mb-3">{subtitle}</p>
          <p className="text-slate-300 max-w-2xl mx-auto">{description}</p>

          {/* إحصائيات سريعة */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                {services.length}
              </div>
              <div className="text-xs text-slate-400">خدمات متاحة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {services.filter((s) => s.status === "active").length}
              </div>
              <div className="text-xs text-slate-400">خدمات نشطة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-400">
                {services.filter((s) => s.status === "premium").length}
              </div>
              <div className="text-xs text-slate-400">خدمات مميزة</div>
            </div>
          </div>
        </div>
      </HolographicCard>

      {/* شبكة الخدمات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceCard {...service} gradient={gradient} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// بطاقة خدمة مميزة للخدمات الرئيسية
export const FeaturedServiceCard: React.FC<
  ServiceCardProps & {
    isNew?: boolean;
    metrics?: { users?: number; uptime?: number; performance?: number };
  }
> = ({
  title,
  description,
  icon,
  features,
  status,
  onClick,
  gradient = "cyan",
  className,
  isNew = false,
  metrics,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group cursor-pointer relative", className)}
      onClick={onClick}
    >
      {isNew && (
        <motion.div
          className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs px-2 py-1 rounded-full z-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          جديد!
        </motion.div>
      )}

      <HolographicCard
        glowIntensity="high"
        scanlineEffect={true}
        dataStreamEffect={true}
        hologramDistortion={true}
        className="h-full"
      >
        <div className="p-8 h-full flex flex-col">
          {/* رأس البطاقة المحسن */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/50"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {icon}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm">
                    {status === "active"
                      ? "نشط"
                      : status === "premium"
                        ? "مميز"
                        : "متاح"}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-400">متصل</span>
                  </div>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all duration-300" />
          </div>

          {/* وصف مفصل */}
          <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>

          {/* المقاييس (إذا توفرت) */}
          {metrics && (
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-slate-800/30 rounded-lg border border-slate-600/30">
              {metrics.users && (
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">
                    {metrics.users.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">مستخدم</div>
                </div>
              )}
              {metrics.uptime && (
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">
                    {metrics.uptime}%
                  </div>
                  <div className="text-xs text-slate-400">وقت التشغيل</div>
                </div>
              )}
              {metrics.performance && (
                <div className="text-center">
                  <div className="text-lg font-bold text-violet-400">
                    {metrics.performance}ms
                  </div>
                  <div className="text-xs text-slate-400">الاستجابة</div>
                </div>
              )}
            </div>
          )}

          {/* المميزات المحسنة */}
          <div className="space-y-3 mb-6 flex-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-sm text-slate-300 p-2 rounded-lg bg-slate-800/20 border border-slate-700/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: "rgba(0, 255, 213, 0.1)" }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* أزرار الإجراء */}
          <div className="flex gap-3">
            <Button
              size="default"
              className="flex-1 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white border-0 group-hover:shadow-lg transition-all duration-300"
            >
              <Rocket className="w-4 h-4 mr-2" />
              إطلاق الخدمة
            </Button>
            <Button
              size="default"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Activity className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  );
};

// بطاقة إحصائيات سريعة
export const QuickStatsCard: React.FC<{
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "stable";
  icon: React.ReactNode;
  color?: "cyan" | "violet" | "green" | "red" | "yellow";
}> = ({ title, value, change, trend, icon, color = "cyan" }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "violet":
        return "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400";
      case "green":
        return "from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400";
      case "red":
        return "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-400";
      case "yellow":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400";
      default:
        return "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400";
      case "down":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <HolographicCard glowIntensity="low" className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">{title}</p>
            <p className="text-2xl font-bold text-white mb-1">{value}</p>
            <p className={cn("text-xs", getTrendColor(trend))}>
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {change}
            </p>
          </div>
          <div
            className={cn(
              "p-3 rounded-lg bg-gradient-to-br border",
              getColorClasses(color),
            )}
          >
            {icon}
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  );
};

export default {
  ServiceCard,
  CategoryCard,
  FeaturedServiceCard,
  QuickStatsCard,
};
