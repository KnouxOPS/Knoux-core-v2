/**
 * لوحة الإحصائيات المستقبلية
 * Futuristic Statistics Panel
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Users,
  TrendingUp,
  Eye,
  Zap,
  Shield,
  Globe,
  Database,
} from 'lucide-react';

interface StatItem {
  icon: React.ComponentType<any>;
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  color: 'cyan' | 'purple' | 'green' | 'orange' | 'blue' | 'pink';
  progress?: number;
}

interface StatisticsPanelProps {
  title: string;
  subtitle?: string;
  stats: StatItem[];
  type?: 'system' | 'network' | 'user' | 'performance';
  className?: string;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  title,
  subtitle,
  stats,
  type = 'system',
  className = '',
}) => {
  const colorMap = {
    cyan: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-400/20',
      border: 'border-cyan-400/30',
      glow: 'shadow-cyan-400/20',
    },
    purple: {
      primary: 'text-purple-400',
      bg: 'bg-purple-400/20',
      border: 'border-purple-400/30',
      glow: 'shadow-purple-400/20',
    },
    green: {
      primary: 'text-green-400',
      bg: 'bg-green-400/20',
      border: 'border-green-400/30',
      glow: 'shadow-green-400/20',
    },
    orange: {
      primary: 'text-orange-400',
      bg: 'bg-orange-400/20',
      border: 'border-orange-400/30',
      glow: 'shadow-orange-400/20',
    },
    blue: {
      primary: 'text-blue-400',
      bg: 'bg-blue-400/20',
      border: 'border-blue-400/30',
      glow: 'shadow-blue-400/20',
    },
    pink: {
      primary: 'text-pink-400',
      bg: 'bg-pink-400/20',
      border: 'border-pink-400/30',
      glow: 'shadow-pink-400/20',
    },
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down':
        return <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className={`space-y-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* عنوان اللوحة */}
      <motion.div className="text-center border-b border-slate-700/50 pb-3" variants={itemVariants}>
        <h3 className="text-white font-bold text-lg">{title}</h3>
        {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
      </motion.div>

      {/* إحصائيات */}
      <div className="space-y-3">
        {stats.map((stat, index) => {
          const colors = colorMap[stat.color];
          const IconComponent = stat.icon;

          return (
            <motion.div
              key={index}
              className={`p-3 rounded-lg border ${colors.bg} ${colors.border} backdrop-blur-sm relative overflow-hidden`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* تأثير الوهج */}
              <motion.div
                className={`absolute inset-0 ${colors.bg} opacity-0`}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.2 }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${colors.bg} ${colors.primary}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm font-medium">{stat.label}</div>
                    <div className="flex items-center gap-2">
                      <span className={`${colors.primary} font-bold text-lg`}>{stat.value}</span>
                      {stat.unit && <span className="text-slate-500 text-xs">{stat.unit}</span>}
                      {getTrendIcon(stat.trend)}
                    </div>
                  </div>
                </div>
              </div>

              {/* شريط التقدم */}
              {stat.progress !== undefined && (
                <div className="mt-3">
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className={`h-full ${colors.bg.replace('/20', '')} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* مؤشرات إضافية */}
      <motion.div className="pt-3 border-t border-slate-700/50" variants={itemVariants}>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
          <Activity className="w-3 h-3" />
          <span>تحديث مباشر</span>
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// مجموعات إحصائيات جاهزة
export const SystemStats: StatItem[] = [
  {
    icon: Cpu,
    label: 'معالج النظام',
    value: 68,
    unit: '%',
    progress: 68,
    color: 'cyan',
    trend: 'stable',
  },
  {
    icon: HardDrive,
    label: 'تخزين البيانات',
    value: 2.4,
    unit: 'TB',
    progress: 74,
    color: 'purple',
    trend: 'up',
  },
  {
    icon: Wifi,
    label: 'الشبكة',
    value: 'متصل',
    color: 'green',
    trend: 'stable',
  },
  {
    icon: Battery,
    label: 'الطاقة',
    value: 91,
    unit: '%',
    progress: 91,
    color: 'green',
    trend: 'stable',
  },
];

export const NetworkStats: StatItem[] = [
  {
    icon: Globe,
    label: 'اتصالات عالمية',
    value: 1247,
    color: 'cyan',
    trend: 'up',
  },
  {
    icon: Database,
    label: 'تدفق البيانات',
    value: 2.4,
    unit: 'TB/s',
    color: 'purple',
    trend: 'stable',
  },
  {
    icon: Shield,
    label: 'الحماية',
    value: 'نشط',
    color: 'green',
    trend: 'stable',
  },
  {
    icon: Zap,
    label: 'الأداء',
    value: 94,
    unit: '%',
    progress: 94,
    color: 'orange',
    trend: 'up',
  },
];

export const UserStats: StatItem[] = [
  {
    icon: Users,
    label: 'المستخدمين النشطين',
    value: 15420,
    color: 'cyan',
    trend: 'up',
  },
  {
    icon: Eye,
    label: 'المشاهدين',
    value: 8930,
    color: 'purple',
    trend: 'up',
  },
  {
    icon: Activity,
    label: 'العمليات',
    value: 127,
    color: 'green',
    trend: 'stable',
  },
];

export default StatisticsPanel;
