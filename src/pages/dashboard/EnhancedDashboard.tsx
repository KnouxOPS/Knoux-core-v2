/**
 * KnouxCore - لوحة القيادة المحسنة
 * مركز التحكم الرئيسي مع أيقونات مخصصة وبطاقات خدمات منظمة
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
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
} from "@/components/icons/KnouxCoreIcons";
import {
  CategoryCard,
  FeaturedServiceCard,
  QuickStatsCard,
} from "@/components/cards/ServiceCards";
import {
  HolographicCard,
  DataNode,
} from "@/components/effects/HolographicCard";
import {
  Cpu,
  HardDrive,
  Wifi,
  Zap,
  Activity,
  Bell,
  Code,
  FolderOpen,
  Settings,
  BarChart3,
  Terminal,
  Navigation,
  Database,
  Shield,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Rocket,
  Star,
  Target,
  Brain,
  Globe,
  Sparkles,
  Network,
} from "lucide-react";

interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  power: number;
  temperature: number;
  efficiency: number;
}

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: Date;
}

const EnhancedDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 67,
    network: 89,
    power: 92,
    temperature: 38,
    efficiency: 94,
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "نظام الملاحة الكمي",
      message: "تم تحديث خوارزميات الملاحة بنجاح",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "info",
      title: "مسح فضائي جديد",
      message: "اكتشاف 3 أنظمة نجمية جديدة في القطاع Alpha-7",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "warning",
      title: "صيانة مجدولة",
      message: "صيانة وحدة الطاقة الكمية خلال 48 ساعة",
      timestamp: new Date(),
    },
  ]);

  // تحديث الوقت والمقاييس
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const metricsInterval = setInterval(() => {
      setSystemMetrics((prev) => ({
        cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          30,
          Math.min(90, prev.memory + (Math.random() - 0.5) * 8),
        ),
        network: Math.max(
          50,
          Math.min(100, prev.network + (Math.random() - 0.5) * 5),
        ),
        power: Math.max(
          80,
          Math.min(100, prev.power + (Math.random() - 0.5) * 3),
        ),
        temperature: Math.max(
          25,
          Math.min(50, prev.temperature + (Math.random() - 0.5) * 2),
        ),
        efficiency: Math.max(
          85,
          Math.min(100, prev.efficiency + (Math.random() - 0.5) * 2),
        ),
      }));
    }, 3000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(metricsInterval);
    };
  }, []);

  // بيانات الأقسام الرئيسية
  const coreSystemsServices = [
    {
      title: "محرر الأكواد الذكي",
      description:
        "محرر متقدم مدعوم بالذكاء الاصطناعي لتطوير أكواد السفينة الفضائية والأنظمة الكمية",
      icon: <NexusIcon size={24} />,
      features: [
        "تحليل الأكواد بالذكاء الاصطناعي",
        "إكمال تلقائي متقدم",
        "كشف الأخطاء في الوقت الفعلي",
        "تحسين الأداء الكمي",
        "دعم 50+ لغة برمجة",
      ],
      status: "active" as const,
      onClick: () => navigate("/nexus"),
    },
    {
      title: "نظام الملاحة الفضائية",
      description:
        "وحدة ملاحة كمية متطورة للسفر بين النجوم مع خرائط هولوجرافية ثلاثية الأبعاد",
      icon: <NavigationIcon size={24} />,
      features: [
        "خرائط نجمية هولوجرافية",
        "حساب المسارات الكمية",
        "تجنب المخاطر الفضائية",
        "ملاحة عبر الأبعاد",
        "دقة 99.97% في الوصول",
      ],
      status: "active" as const,
      onClick: () => navigate("/navigation"),
    },
    {
      title: "محطة معالجة البيانات",
      description:
        "مركز تحليل البيانات الكونية مع قدرات حاسوبية كمية فائقة السرعة",
      icon: <DataProcessingIcon size={24} />,
      features: [
        "معالجة كمية فائقة",
        "تحليل البيانات الكونية",
        "ذكاء اصطناعي متقدم",
        "تخزين بيانات لامحدود",
        "حماية كمية للمعلومات",
      ],
      status: "active" as const,
      onClick: () => navigate("/data-processing"),
    },
  ];

  const managementServices = [
    {
      title: "مركز إدارة المشاريع",
      description:
        "نظام إدارة متقدم للمشاريع الفضائية مع تعاون فريق في الوقت الفعلي",
      icon: <ProjectsIcon size={24} />,
      features: [
        "إدارة مشاريع هولوجرافية",
        "تعاون فريق مباشر",
        "جدولة ذكية للمهام",
        "تتبع التقدم المرئي",
        "تكامل مع الذكاء الاصطناعي",
      ],
      status: "active" as const,
      onClick: () => navigate("/projects"),
    },
    {
      title: "مركز التحليل والإحصائيات",
      description:
        "لوحة تحليلات شاملة مع رؤى ذكية ومقاييس أداء في الوقت الفعلي",
      icon: <AnalyticsIcon size={24} />,
      features: [
        "تحليلات ذكية شاملة",
        "مقاييس أداء حية",
        "تقارير تفاعلية",
        "تنبؤات مستقبلية",
        "رؤى مدعومة بالذكاء الاصطناعي",
      ],
      status: "active" as const,
      onClick: () => navigate("/analytics"),
    },
    {
      title: "مركز الأوامر والتحكم",
      description:
        "وحدة تحكم رئيسية للأنظمة الحيوية مع إدارة الأوامر الصوتية والذكية",
      icon: <CommandControlIcon size={24} />,
      features: [
        "أوامر صوتية ذكية",
        "إدارة الأنظمة الحيوية",
        "تحكم مركزي شامل",
        "استجابة فورية",
        "حماية متقدمة",
      ],
      status: "beta" as const,
      onClick: () => navigate("/command"),
    },
  ];

  const systemServices = [
    {
      title: "إعدادات النظام",
      description: "لوحة تحكم شاملة لإعدادات السفينة والتخصيصات الشخصية",
      icon: <SettingsIcon size={24} />,
      features: [
        "تخصيص واجهة المستخدم",
        "إعدادات الأمان",
        "تحديثات النظام",
        "النسخ الاحتياطي",
        "إدارة المستخدمين",
      ],
      status: "active" as const,
      onClick: () => navigate("/settings"),
    },
    {
      title: "مركز المساعدة والدعم",
      description: "نظام مساعدة ذكي مع دليل استخدام تفاعلي ودعم فني متقدم",
      icon: <HelpIcon size={24} />,
      features: [
        "مساعد ذكي تفاعلي",
        "دليل استخدام شامل",
        "دعم فني 24/7",
        "تشخيص المشاكل",
        "تحديثات مستمرة",
      ],
      status: "active" as const,
      onClick: () => navigate("/help"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      {/* خلفية فضائية متحركة */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* النجوم المتحركة */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* الكواكب والغازات */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#4f46e5" : i % 3 === 1 ? "#7c3aed" : "#06b6d4"
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* رأس لوحة القيادة */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <KnouxCoreLogo size={64} animate={true} />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                KnouxCore Control Center
              </h1>
              <p className="text-xl text-slate-400 mt-2">
                المركز الذكي للتحكم الفضائي - الإصدار البلاتيني
              </p>
            </div>
          </div>

          {/* الوقت والحالة */}
          <HolographicCard
            glowIntensity="medium"
            className="p-6 max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Clock className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {currentTime.toLocaleTimeString("ar-SA")}
                </div>
                <div className="text-sm text-slate-400">
                  التوقيت الكوني المحلي
                </div>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">نشط</div>
                <div className="text-sm text-slate-400">حالة جميع الأنظمة</div>
              </div>
              <div>
                <TrendingUp className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-violet-400">
                  {systemMetrics.efficiency}%
                </div>
                <div className="text-sm text-slate-400">كفاءة النظام</div>
              </div>
            </div>
          </HolographicCard>
        </motion.div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <QuickStatsCard
            title="معالج الكم"
            value={`${systemMetrics.cpu}%`}
            change="+2.3%"
            trend="up"
            icon={<Cpu className="w-5 h-5" />}
            color="cyan"
          />
          <QuickStatsCard
            title="الذاكرة"
            value={`${systemMetrics.memory}%`}
            change="-1.2%"
            trend="down"
            icon={<HardDrive className="w-5 h-5" />}
            color="violet"
          />
          <QuickStatsCard
            title="الشبكة"
            value={`${systemMetrics.network}%`}
            change="+5.7%"
            trend="up"
            icon={<Network className="w-5 h-5" />}
            color="green"
          />
          <QuickStatsCard
            title="الطاقة"
            value={`${systemMetrics.power}%`}
            change="مستقر"
            trend="stable"
            icon={<Zap className="w-5 h-5" />}
            color="yellow"
          />
          <QuickStatsCard
            title="الحرارة"
            value={`${systemMetrics.temperature}°C`}
            change="+0.5°C"
            trend="up"
            icon={<Activity className="w-5 h-5" />}
            color="red"
          />
          <QuickStatsCard
            title="الكفاءة"
            value={`${systemMetrics.efficiency}%`}
            change="+1.1%"
            trend="up"
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
        </div>

        {/* الأنظمة الرئيسية */}
        <CategoryCard
          title="الأنظمة الأساسية"
          subtitle="Core Systems"
          description="الأنظمة الرئيسية للتحكم في السفينة الفضائية وإدارة العمليات الأساسية"
          icon={<Rocket className="w-8 h-8 text-cyan-400" />}
          services={coreSystemsServices}
          gradient="cyan"
        />

        {/* أنظمة الإدارة */}
        <CategoryCard
          title="أنظمة الإدارة"
          subtitle="Management Systems"
          description="أدوات إدارية متقدمة لتنظيم المشاريع والمهام وتحليل البيانات"
          icon={<Brain className="w-8 h-8 text-violet-400" />}
          services={managementServices}
          gradient="violet"
        />

        {/* أنظمة الدعم */}
        <CategoryCard
          title="أنظمة الدعم"
          subtitle="Support Systems"
          description="أدوات الدعم والمساعدة لضمان التشغيل السلس والمساعدة الفنية"
          icon={<Shield className="w-8 h-8 text-blue-400" />}
          services={systemServices}
          gradient="blue"
        />

        {/* الخدمات المميزة */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FeaturedServiceCard
            title="ذكاء النظام المتقدم"
            description="نظام ذكاء اصطناعي متطور يدير جميع جوانب السفينة ويقدم تحليلات ذكية ومساعدة استباقية"
            icon={<Brain className="w-8 h-8 text-violet-400" />}
            features={[
              "ذكاء اصطناعي عام متقدم",
              "تعلم آلي مستمر",
              "اتخاذ قرارات ذكية",
              "مراقبة استباقية",
              "تحسين مستمر للأداء",
            ]}
            status="premium"
            isNew={true}
            metrics={{
              users: 15420,
              uptime: 99.9,
              performance: 45,
            }}
            gradient="violet"
          />

          <FeaturedServiceCard
            title="شبكة الاتصالات الكونية"
            description="نظام اتصالات متقدم للتواصل عبر المجرة مع تشفير كمي وسرعة نقل فائقة"
            icon={<Globe className="w-8 h-8 text-green-400" />}
            features={[
              "اتصالات عبر المجرة",
              "تشفير كمي آمن",
              "سرعة نقل فائقة",
              "موثوقية 99.99%",
              "دعم جميع البروتوكولات",
            ]}
            status="active"
            metrics={{
              users: 8750,
              uptime: 99.99,
              performance: 23,
            }}
            gradient="green"
          />
        </div>

        {/* آخر الإشعارات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <HolographicCard glowIntensity="low" className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-semibold text-white">
                آخر التحديثات
              </h3>
            </div>
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-600/30"
                >
                  <div className="flex-shrink-0 mt-1">
                    {notification.type === "success" && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {notification.type === "info" && (
                      <Info className="w-5 h-5 text-blue-400" />
                    )}
                    {notification.type === "warning" && (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {notification.title}
                    </h4>
                    <p className="text-slate-300 text-sm mt-1">
                      {notification.message}
                    </p>
                    <p className="text-slate-500 text-xs mt-2">
                      {notification.timestamp.toLocaleString("ar-SA")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </HolographicCard>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
