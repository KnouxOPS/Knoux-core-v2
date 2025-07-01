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
import NotificationContainer from './components/notifications/NotificationContainer';
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Mock data for OMD (would be real data from contexts/services in production)
  const [omdData, setOmdData] = useState({
    shipStatus: {
      cpu: 68,
      memory: 74,
      network: 82,
      power: 91,
      temperature: 42,
      efficiency: 87,
    },
    nexusSummary: {
      complexity: 'Moderate',
      performance: 'Excellent',
      suggestionsCount: 12,
      warningsCount: 3,
      linesAnalyzed: 2847,
    },
    astranavSummary: {
      status: 'En Route',
      eta: '02:37:15',
      hazardLevel: 'Low',
      currentSystem: 'Sol System',
      destination: 'Alpha Centauri',
    },
    cosmodataSummary: {
      nodes: 1247,
      connections: 3891,
      anomalies: 7,
      dataFlowRate: '2.4 TB/s',
      processingLoad: 73,
    },
    commandSummary: {
      activeOperations: 5,
      logCount: 127,
      permissionsStatus: 'Secure',
      lastCommand: 'scan current sector',
      securityLevel: 'Alpha',
    },
    projectSummary: {
      active: 8,
      collaborators: 15,
      pendingTasks: 23,
      recentActivity: '12 min ago',
    },
    analyticsSummary: {
      codeEnhanced: 341,
      timeSpent: '47h 23m',
      optimizationTipsStatus: 'Available',
      productivityScore: 94,
    },
    systemSummary: {
      uptime: '15d 7h 42m',
      updatesPending: 3,
      aiSettingsStatus: 'Optimized',
      systemHealth: 'Excellent',
    },
    helpSummary: {
      faqs: 156,
      tutorials: 42,
      tickets: 2,
      lastSearched: 'AI integration',
    },
  });

  // Simulate real-time data updates for OMD
  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      setOmdData(prev => ({
        ...prev,
        shipStatus: {
          ...prev.shipStatus,
          cpu: Math.max(30, Math.min(95, prev.shipStatus.cpu + (Math.random() - 0.5) * 8)),
          memory: Math.max(40, Math.min(90, prev.shipStatus.memory + (Math.random() - 0.5) * 6)),
          network: Math.max(
            50,
            Math.min(100, prev.shipStatus.network + (Math.random() - 0.5) * 10)
          ),
          power: Math.max(70, Math.min(100, prev.shipStatus.power + (Math.random() - 0.5) * 4)),
          temperature: Math.max(
            35,
            Math.min(55, prev.shipStatus.temperature + (Math.random() - 0.5) * 3)
          ),
          efficiency: Math.max(
            75,
            Math.min(100, prev.shipStatus.efficiency + (Math.random() - 0.5) * 5)
          ),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isReady]);

  // الحصول على الثيم الحالي
  const currentTheme = themes.cosmicDark; // يمكن تغييره حسب الحاجة

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
        'KnouxCore Online',
        'جميع الأنظمة متصلة ومعايرة. مرحباً بك في المركز الذكي للتحكم الفضائي.',
        {
          duration: 6000,
          source: 'System',
          priority: 'normal',
        }
      );
    }, 1000);
  };

  // التعامل مع تبديل الشريط الجانبي
  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  if (!systemSettingsContextHook) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-300">جاري تحميل الإعدادات...</p>
        </div>
      </div>
    );
  }

  const { settings } = systemSettingsContextHook;

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-all duration-500"
      style={{
        background: currentTheme.colors.gradientCosmic,
        fontFamily: "'Cairo', 'Tajawal', 'Arial', sans-serif",
      }}
    >
      {/* شاشة التح��يل */}
      <AnimatePresence>
        {isLoading && <CosmicSplashScreen onLoadComplete={handleLoadComplete} duration={4000} />}
      </AnimatePresence>

      {/* شريط كنووكس تي في المباشر */}
      <AnimatePresence>{isReady && <LiveKnouxTVBar />}</AnimatePresence>

      {/* المحتوى الرئيسي */}
      <AnimatePresence>
        {isReady && (
          <motion.div
            className="flex h-screen overflow-hidden pt-[60px]" // إضافة padding-top للشريط العلوي
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* الجسيمات المتحركة في الخلفية */}
            <FloatingParticles
              count={APP_CONFIG.ANIMATIONS.PARTICLES.COUNT}
              theme={theme === 'light' ? Theme.LIGHT : Theme.DARK}
              enabled={true}
              interactiveMode={false}
              animationType={AnimationType.FADE}
              className="absolute inset-0 pointer-events-none"
            />

            {/* الشريط الجانبي المحسن */}
            <EnhancedSidebar className="relative z-10" onToggle={handleSidebarToggle} />

            {/* المنطقة الرئيسية */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {/* الشريط العلوي المحسن */}
              <EnhancedTopBar
                className="relative z-10"
                onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                showWindowControls={true}
              />

              {/* شاشة المعاينة العملياتية (OMD) */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-4 md:px-6 lg:px-8 pt-4"
              >
                <OperationalMonitorDisplay
                  {...omdData}
                  language={systemSettingsContextHook.settings.language}
                />
              </motion.div>

              {/* المحتوى الرئيسي */}
              <main
                className="flex-1 overflow-y-auto relative"
                style={{
                  background: `
                    linear-gradient(135deg,
                      rgba(26, 0, 37, 0.1) 0%,
                      rgba(45, 0, 54, 0.05) 50%,
                      rgba(75, 0, 110, 0.1) 100%
                    )
                  `,
                }}
              >
                {/* طبقة زجاجية للمحتوى */}
                <div
                  className="absolute inset-0 backdrop-blur-sm"
                  style={{
                    background: 'rgba(26, 0, 37, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}
                />

                {/* محتوى الصفحات */}
                <div className="relative z-10 px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-2">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AppRoutes />
                  </motion.div>
                </div>

                {/* تأثيرات إضافية */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* خطوط الطاقة */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        width: '1px',
                        height: '100%',
                        background: `linear-gradient(to bottom,
                          transparent,
                          rgba(0, 255, 213, 0.3),
                          transparent
                        )`,
                        left: `${30 + i * 20}%`,
                        filter: 'blur(0.5px)',
                      }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        scaleY: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}

                  {/* تأثير الوهج المحيطي */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `
                        radial-gradient(ellipse at top left,
                          rgba(124, 58, 237, 0.1) 0%,
                          transparent 50%
                        ),
                        radial-gradient(ellipse at bottom right,
                          rgba(0, 255, 213, 0.1) 0%,
                          transparent 50%
                        )
                      `,
                    }}
                  />
                </div>
              </main>

              {/* حاوية الإشعارات الكونية */}
              <CosmicNotificationSystem
                notifications={cosmicNotifications.notifications}
                onDismiss={cosmicNotifications.dismissNotification}
                onAction={(id, actionIndex) => {
                  // Handle notification actions
                  console.log(`Action ${actionIndex} triggered for notification ${id}`);
                }}
              />

              {/* إشعارات كنووكس تي في */}
              <TVNotificationOverlay currentChannel="KnouxSpace" viewers={15420} signal={98} />
            </div>

            {/* طبقة تأثيرات إضافية */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* تأثير الوميض العشوائي */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px rgba(0, 255, 213, 0.8)',
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
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

        /* تأثيرات النيون */
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
