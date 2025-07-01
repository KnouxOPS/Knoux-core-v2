/**
 * KnouxI - التطبيق الرئيسي المستقبلي
 * مع التصميم الجديد والواجهة ثلاثية الألواح
 */

import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// استيراد المكونات الجديدة
import KnouxILogo from './components/brand/KnouxILogo';
import FuturisticDashboard from './components/background/FuturisticDashboard';
import ThreePanelLayout from './components/layout/ThreePanelLayout';
import StatisticsPanel, {
  SystemStats,
  NetworkStats,
  UserStats,
} from './components/stats/StatisticsPanel';
import CentralOperationsDisplay from './components/operations/CentralOperationsDisplay';
import LiveKnouxTVBar from './components/tv/LiveKnouxTVBar';
import TVNotificationOverlay from './components/tv/TVNotificationOverlay';
import CosmicSplashScreen from './components/splash/CosmicSplashScreen';

// استيراد نظام التوجيه
import AppRoutes from './components/routing/AppRoutes';

// استيراد السياقات
import { ThemeContext } from './contexts/ThemeContext';
import { useSystemSettings } from './contexts/SystemSettingsContext';
import CosmicNotificationSystem, {
  useCosmicNotifications,
} from './components/notifications/CosmicNotificationSystem';

// استيراد الثوابت والتكوينات
import { Language, Theme, AnimationType } from './constants';
import { APP_CONFIG } from './config/app.config';
import { themes, getThemeVariables } from './styles/themes';
import './styles/cosmic-theme.css';
import './styles/tv-styles.css';

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const systemSettingsContextHook = useSystemSettings();
  const cosmicNotifications = useCosmicNotifications();

  // حالات التطبيق
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');

  // Mock data for real-time updates
  const [systemData, setSystemData] = useState({
    cpu: 68,
    memory: 74,
    network: 82,
    power: 91,
    temperature: 42,
    efficiency: 87,
    users: 15420,
    connections: 1247,
    dataFlow: 2.4,
    security: 'نشط',
  });

  // تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      setSystemData(prev => ({
        ...prev,
        cpu: Math.max(30, Math.min(95, prev.cpu + (Math.random() - 0.5) * 8)),
        memory: Math.max(40, Math.min(90, prev.memory + (Math.random() - 0.5) * 6)),
        network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 10)),
        power: Math.max(70, Math.min(100, prev.power + (Math.random() - 0.5) * 4)),
        temperature: Math.max(35, Math.min(55, prev.temperature + (Math.random() - 0.5) * 3)),
        efficiency: Math.max(75, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 5)),
        users: Math.max(0, prev.users + Math.floor(Math.random() * 20 - 10)),
        connections: Math.max(0, prev.connections + Math.floor(Math.random() * 10 - 5)),
        dataFlow: Math.max(0, prev.dataFlow + (Math.random() - 0.5) * 0.5),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isReady]);

  // الحصول على الثيم الحالي
  const currentTheme = themes.cosmicDark;

  // تطبيق متغيرات الثيم على العنصر الجذر
  useEffect(() => {
    const root = document.documentElement;
    const themeVariables = getThemeVariables(currentTheme);

    Object.entries(themeVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [currentTheme]);

  // تطبيق إعدادات اللغة والاتجاه
  useEffect(() => {
    if (systemSettingsContextHook) {
      const { language } = systemSettingsContextHook.settings;

      document.documentElement.lang = language;
      document.documentElement.dir = language === Language.ARABIC ? 'rtl' : 'ltr';
      document.documentElement.className = theme;
    }
  }, [theme, systemSettingsContextHook?.settings.language]);

  // إنهاء شاشة التحميل
  const handleLoadComplete = () => {
    setIsLoading(false);
    setIsReady(true);

    // Welcome notification
    setTimeout(() => {
      cosmicNotifications.notifySystem(
        'KnouxI Online',
        'مرحباً بك في كنووكس آي - مركز التحكم المستقبلي. جميع الأنظمة متصلة ومعايرة.',
        {
          duration: 6000,
          source: 'System',
          priority: 'normal',
        }
      );
    }, 1000);
  };

  if (!systemSettingsContextHook) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-300">جاري تحميل النظام...</p>
        </div>
      </div>
    );
  }

  // إحصائيات النظام المحدثة
  const updatedSystemStats = [
    {
      icon: require('lucide-react').Cpu,
      label: 'معالج النظام',
      value: Math.round(systemData.cpu),
      unit: '%',
      progress: systemData.cpu,
      color: 'cyan' as const,
      trend: 'stable' as const,
    },
    {
      icon: require('lucide-react').HardDrive,
      label: 'الذاكرة',
      value: Math.round(systemData.memory),
      unit: '%',
      progress: systemData.memory,
      color: 'purple' as const,
      trend: 'up' as const,
    },
    {
      icon: require('lucide-react').Wifi,
      label: 'الشبكة',
      value: Math.round(systemData.network),
      unit: '%',
      progress: systemData.network,
      color: 'green' as const,
      trend: 'stable' as const,
    },
    {
      icon: require('lucide-react').Battery,
      label: 'الطاقة',
      value: Math.round(systemData.power),
      unit: '%',
      progress: systemData.power,
      color: 'green' as const,
      trend: 'stable' as const,
    },
  ];

  const updatedNetworkStats = [
    {
      icon: require('lucide-react').Globe,
      label: 'الاتصالات',
      value: systemData.connections,
      color: 'cyan' as const,
      trend: 'up' as const,
    },
    {
      icon: require('lucide-react').Database,
      label: 'تدفق البيانات',
      value: systemData.dataFlow.toFixed(1),
      unit: 'TB/s',
      color: 'purple' as const,
      trend: 'stable' as const,
    },
    {
      icon: require('lucide-react').Shield,
      label: 'الحماية',
      value: systemData.security,
      color: 'green' as const,
      trend: 'stable' as const,
    },
    {
      icon: require('lucide-react').Zap,
      label: 'الكفاءة',
      value: Math.round(systemData.efficiency),
      unit: '%',
      progress: systemData.efficiency,
      color: 'orange' as const,
      trend: 'up' as const,
    },
  ];

  const updatedUserStats = [
    {
      icon: require('lucide-react').Users,
      label: 'المستخدمين النشطين',
      value: systemData.users.toLocaleString(),
      color: 'cyan' as const,
      trend: 'up' as const,
    },
    {
      icon: require('lucide-react').Eye,
      label: 'المشاهدين',
      value: Math.floor(systemData.users * 0.6).toLocaleString(),
      color: 'purple' as const,
      trend: 'up' as const,
    },
    {
      icon: require('lucide-react').Activity,
      label: 'العمليات',
      value: Math.floor(systemData.connections * 0.1),
      color: 'green' as const,
      trend: 'stable' as const,
    },
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: "'Cairo', 'Tajawal', 'Arial', sans-serif",
      }}
    >
      {/* الخلفية المستقبلية */}
      <FuturisticDashboard />

      {/* شاشة التحميل */}
      <AnimatePresence>
        {isLoading && <CosmicSplashScreen onLoadComplete={handleLoadComplete} duration={4000} />}
      </AnimatePresence>

      {/* شريط كنووكس تي في المباشر */}
      <AnimatePresence>{isReady && <LiveKnouxTVBar />}</AnimatePresence>

      {/* المحتوى الرئيسي */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            className="h-screen overflow-hidden pt-[60px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* الشعار ��لرئيسي */}
            <motion.div
              className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <KnouxILogo size="large" variant="full" animated glowEffect />
            </motion.div>

            {/* التخطيط ثلاثي الألواح */}
            <div className="h-full pt-20">
              <ThreePanelLayout
                leftPanel={
                  <>
                    <StatisticsPanel
                      title="إحصائيات النظام"
                      subtitle="الموارد والأداء"
                      stats={updatedSystemStats}
                      type="system"
                    />
                    <StatisticsPanel
                      title="الشبكة والاتصال"
                      subtitle="حالة الاتصالات"
                      stats={updatedNetworkStats}
                      type="network"
                    />
                  </>
                }
                centerPanel={<CentralOperationsDisplay />}
                rightPanel={
                  <>
                    <StatisticsPanel
                      title="إحصائيات المستخدمين"
                      subtitle="النشاط والمشاركة"
                      stats={updatedUserStats}
                      type="user"
                    />
                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-4">
                      <h3 className="text-white font-bold text-lg mb-3 text-center">
                        معلومات النظام
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">الإصدار:</span>
                          <span className="text-cyan-400">KnouxI v2.1.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">وقت التشغيل:</span>
                          <span className="text-green-400">15d 7h 42m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">درجة الحرارة:</span>
                          <span className="text-orange-400">
                            {Math.round(systemData.temperature)}°C
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">الحماية:</span>
                          <span className="text-green-400">{systemData.security}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">آخر تحديث:</span>
                          <span className="text-purple-400">منذ 3 ثوانِ</span>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </div>

            {/* إشعارات كنووكس تي في */}
            <TVNotificationOverlay currentChannel="KnouxSpace" viewers={15420} signal={98} />

            {/* حاوية الإشعارات الكونية */}
            <CosmicNotificationSystem
              notifications={cosmicNotifications.notifications}
              onDismiss={cosmicNotifications.dismissNotification}
              onAction={(id, actionIndex) => {
                console.log(`Action ${actionIndex} triggered for notification ${id}`);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* أنماط CSS مخصصة */}
      <style jsx>{`
        /* تخصيص شريط التمرير */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(30, 30, 46, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(0, 255, 213, 0.6), rgba(124, 58, 237, 0.6));
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(0, 255, 213, 0.8), rgba(124, 58, 237, 0.8));
        }

        /* تأثيرات زجاجية */
        .glassmorphism {
          backdrop-filter: blur(20px);
          background: rgba(26, 0, 37, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        /* تأثيرات الن��ون */
        .neon-glow {
          box-shadow:
            0 0 20px rgba(0, 255, 213, 0.5),
            0 0 40px rgba(124, 58, 237, 0.3);
        }

        /* تحسينات الخطوط العربية */
        * {
          font-feature-settings:
            'kern' 1,
            'liga' 1,
            'calt' 1;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* تحسينات الأداء */
        * {
          will-change: auto;
        }

        .hardware-acceleration {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default App;
