/**
 * KnouxCore - شريط علوي محسن مع تأثيرات متقدمة
 */

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  Globe,
  Zap,
  Activity,
  Wifi,
  Battery,
  Clock,
  Command,
  Maximize,
  Minimize,
  X,
} from "lucide-react";

import { ThemeContext } from "@/contexts/ThemeContext";
import { useSystemSettings } from "@/contexts/SystemSettingsContext";
import { APP_CONFIG } from "@/config/app.config";
import { Theme, Language } from "@/constants";

interface TopBarProps {
  className?: string;
  onMenuToggle?: () => void;
  showWindowControls?: boolean;
}

const EnhancedTopBar: React.FC<TopBarProps> = ({
  className = "",
  onMenuToggle,
  showWindowControls = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const systemSettings = useSystemSettings();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [systemStatus, setSystemStatus] = useState({
    cpu: 45,
    memory: 68,
    network: "online",
    battery: 87,
  });

  const isRTL = systemSettings?.settings.language === Language.ARABIC;

  // تحديث الوقت
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // محاكاة تحديث حالة النظام
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          30,
          Math.min(95, prev.memory + (Math.random() - 0.5) * 5),
        ),
        battery: Math.max(
          15,
          Math.min(100, prev.battery + (Math.random() - 0.5) * 2),
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // الحصول على عنوان الصفحة الحالية
  const getCurrentPageTitle = () => {
    const pathMap: Record<string, { ar: string; en: string }> = {
      "/dashboard": { ar: "لوحة التحكم", en: "Dashboard" },
      "/services": { ar: "الخدمات الذكية", en: "AI Services" },
      "/downloads": { ar: "إدارة التحميلات", en: "Downloads" },
      "/network": { ar: "مراقبة الشبكة", en: "Network" },
      "/security": { ar: "مركز الأمان", en: "Security" },
      "/settings": { ar: "الإعدادات", en: "Settings" },
      "/help": { ar: "المساعدة", en: "Help" },
      "/about": { ar: "حول التطبيق", en: "About" },
    };

    const current = pathMap[location.pathname] || {
      ar: "KnouxCore",
      en: "KnouxCore",
    };
    return isRTL ? current.ar : current.en;
  };

  return (
    <motion.header
      className={`relative h-16 flex items-center justify-between px-6 backdrop-blur-lg border-b ${
        theme === Theme.DARK
          ? "bg-slate-900/80 border-slate-700/50"
          : "bg-white/80 border-gray-200/50"
      } ${className}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background:
          theme === Theme.DARK
            ? "linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)"
            : "linear-gradient(90deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* الجانب الأيسر - العنوان ومعلومات الصفحة */}
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        {/* شعار مصغر */}
        <motion.div
          className="flex items-center space-x-3 rtl:space-x-reverse"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background:
                theme === Theme.DARK
                  ? "linear-gradient(135deg, #00FFD5, #7C3AED)"
                  : "linear-gradient(135deg, #0F766E, #6D28D9)",
              boxShadow: "0 0 15px rgba(0, 255, 213, 0.3)",
            }}
          >
            <span className="text-white font-bold text-sm">K</span>
          </div>

          <div className="hidden md:block">
            <h1
              className="text-lg font-bold"
              style={{
                backgroundImage:
                  theme === Theme.DARK
                    ? "linear-gradient(45deg, #00FFD5, #7C3AED)"
                    : "linear-gradient(45deg, #0F766E, #6D28D9)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {getCurrentPageTitle()}
            </h1>
            <p
              className={`text-xs ${theme === Theme.DARK ? "text-slate-400" : "text-gray-500"}`}
            >
              {APP_CONFIG.APP_DESCRIPTION}
            </p>
          </div>
        </motion.div>

        {/* مؤشرات الحالة */}
        <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
          {/* حالة الشبكة */}
          <motion.div
            className="flex items-center space-x-1 rtl:space-x-reverse"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wifi
              className={`h-4 w-4 ${systemStatus.network === "online" ? "text-green-400" : "text-red-400"}`}
            />
            <span
              className={`text-xs ${theme === Theme.DARK ? "text-slate-300" : "text-gray-600"}`}
            >
              {systemStatus.network === "online" ? "متصل" : "غير متصل"}
            </span>
          </motion.div>

          {/* استخدام CPU */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Activity
              className={`h-4 w-4 ${theme === Theme.DARK ? "text-cyan-400" : "text-blue-500"}`}
            />
            <span
              className={`text-xs ${theme === Theme.DARK ? "text-slate-300" : "text-gray-600"}`}
            >
              {systemStatus.cpu.toFixed(0)}%
            </span>
          </div>

          {/* البطارية */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Battery
              className={`h-4 w-4 ${
                systemStatus.battery > 50
                  ? "text-green-400"
                  : systemStatus.battery > 20
                    ? "text-yellow-400"
                    : "text-red-400"
              }`}
            />
            <span
              className={`text-xs ${theme === Theme.DARK ? "text-slate-300" : "text-gray-600"}`}
            >
              {systemStatus.battery}%
            </span>
          </div>
        </div>
      </div>

      {/* الوسط - شريط البحث */}
      <div className="flex-1 max-w-md mx-8">
        <motion.div
          className="relative"
          animate={{
            scale: isSearchFocused ? 1.02 : 1,
            boxShadow: isSearchFocused
              ? "0 0 20px rgba(0, 255, 213, 0.3)"
              : "0 0 0px rgba(0, 255, 213, 0)",
          }}
          transition={{ duration: 0.2 }}
        >
          <Search
            className={`absolute ${isRTL ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              theme === Theme.DARK ? "text-slate-400" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder={isRTL ? "البحث الذكي..." : "Smart Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"} py-2 rounded-xl transition-all duration-200 ${
              theme === Theme.DARK
                ? "bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400"
                : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
            } border backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent`}
            style={{
              backdropFilter: "blur(10px)",
            }}
          />
          {searchQuery && (
            <motion.button
              className={`absolute ${isRTL ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2`}
              onClick={() => setSearchQuery("")}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4 text-slate-400 hover:text-slate-300" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* الجانب الأيمن - ال��دوات والإعدادات */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* الوقت */}
        <div
          className={`hidden md:flex flex-col items-center text-xs ${theme === Theme.DARK ? "text-slate-300" : "text-gray-600"}`}
        >
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Clock className="h-3 w-3" />
            <span>
              {currentTime.toLocaleTimeString(isRTL ? "ar-SA" : "en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <span className="text-xs opacity-75">
            {currentTime.toLocaleDateString(isRTL ? "ar-SA" : "en-US")}
          </span>
        </div>

        {/* أزرار التحكم */}
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          {/* الإشعارات */}
          <motion.button
            className={`relative p-2 rounded-lg transition-colors ${
              theme === Theme.DARK
                ? "hover:bg-slate-700/50 text-slate-300"
                : "hover:bg-gray-100/50 text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/notifications")}
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>

          {/* تبديل الثيم */}
          <motion.button
            className={`p-2 rounded-lg transition-colors ${
              theme === Theme.DARK
                ? "hover:bg-slate-700/50 text-slate-300"
                : "hover:bg-gray-100/50 text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
          >
            <AnimatePresence mode="wait">
              {theme === Theme.DARK ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* اللغة */}
          <motion.button
            className={`p-2 rounded-lg transition-colors ${
              theme === Theme.DARK
                ? "hover:bg-slate-700/50 text-slate-300"
                : "hover:bg-gray-100/50 text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="h-5 w-5" />
          </motion.button>

          {/* الإعدادات */}
          <motion.button
            className={`p-2 rounded-lg transition-colors ${
              theme === Theme.DARK
                ? "hover:bg-slate-700/50 text-slate-300"
                : "hover:bg-gray-100/50 text-gray-600"
            }`}
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/settings")}
          >
            <Settings className="h-5 w-5" />
          </motion.button>

          {/* المستخدم */}
          <motion.button
            className={`p-2 rounded-lg transition-colors ${
              theme === Theme.DARK
                ? "hover:bg-slate-700/50 text-slate-300"
                : "hover:bg-gray-100/50 text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
          >
            <User className="h-5 w-5" />
          </motion.button>
        </div>

        {/* أزرار النافذة */}
        {showWindowControls && (
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse ml-4">
            <motion.button
              className="p-1.5 rounded hover:bg-yellow-500/20 text-yellow-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minimize className="h-3 w-3" />
            </motion.button>
            <motion.button
              className="p-1.5 rounded hover:bg-green-500/20 text-green-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize className="h-3 w-3" />
            </motion.button>
            <motion.button
              className="p-1.5 rounded hover:bg-red-500/20 text-red-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-3 w-3" />
            </motion.button>
          </div>
        )}
      </div>

      {/* تأثير الوهج السفلي */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            theme === Theme.DARK
              ? "linear-gradient(90deg, transparent, rgba(0, 255, 213, 0.5), transparent)"
              : "linear-gradient(90deg, transparent, rgba(15, 118, 110, 0.3), transparent)",
        }}
      />
    </motion.header>
  );
};

export default EnhancedTopBar;
