/**
 * KnouxCore - مكون الشريط الجانبي المحسن
 * شريط جانبي متقدم مع تأثيرات بصرية وميزات تفاعلية
 */

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
} from '@/components/icons/KnouxCoreIcons';
import {
  LayoutDashboard,
  Brain,
  Download,
  Wifi,
  Shield,
  Settings,
  HelpCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Bell,
  LogOut,
  Menu,
  Zap,
  Activity,
  Database,
  Globe,
  Code,
  Navigation,
  Terminal,
  FolderOpen,
  BarChart3,
} from 'lucide-react';

import { ThemeContext } from '@/contexts/ThemeContext';
import { useSystemSettings } from '@/contexts/SystemSettingsContext';
import { APP_CONFIG } from '@/config/app.config';
import { ROUTES, Theme, Language, UserRole } from '@/constants';

interface MenuItem {
  id: string;
  path: string;
  icon: React.ElementType;
  labelAr: string;
  labelEn: string;
  badge?: string | number;
  submenu?: MenuItem[];
  adminOnly?: boolean;
  pro?: boolean;
  external?: boolean;
}

interface SidebarProps {
  className?: string;
  onToggle?: (collapsed: boolean) => void;
}

const EnhancedSidebar: React.FC<SidebarProps> = ({ className = '', onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const systemSettings = useSystemSettings();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [expandedSubmenus, setExpandedSubmenus] = useState<Set<string>>(new Set());

  const isRTL = systemSettings?.settings.language === Language.ARABIC;
  const isAdmin = systemSettings?.settings.userRole === UserRole.ADMIN;

  // قائمة العناصر الرئيسية
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      path: '/dashboard',
      icon: () => <DashboardIcon size={20} animate={true} />,
      labelAr: 'ل��حة القيادة',
      labelEn: 'Command Dashboard',
    },
    {
      id: 'nexus',
      path: '/nexus',
      icon: () => <NexusIcon size={20} animate={true} />,
      labelAr: 'محرر Nexus',
      labelEn: 'Nexus Editor',
      badge: 'AI',
    },
    {
      id: 'navigation',
      path: '/navigation',
      icon: () => <NavigationIcon size={20} animate={true} />,
      labelAr: 'الملاحة الفضائية',
      labelEn: 'AstraNav Console',
    },
    {
      id: 'data-processing',
      path: '/data-processing',
      icon: () => <DataProcessingIcon size={20} animate={true} />,
      labelAr: 'معالجة البيانات',
      labelEn: 'CosmoData Bay',
    },
    {
      id: 'command',
      path: '/command',
      icon: () => <CommandControlIcon size={20} animate={true} />,
      labelAr: 'مركز الأوامر',
      labelEn: 'Command Center',
    },
    {
      id: 'projects',
      path: '/projects',
      icon: () => <ProjectsIcon size={20} animate={true} />,
      labelAr: 'إدارة المشاريع',
      labelEn: 'Project Hub',
    },
    {
      id: 'analytics',
      path: '/analytics',
      icon: () => <AnalyticsIcon size={20} animate={true} />,
      labelAr: 'الإحصائيات',
      labelEn: 'Analytics Hub',
    },
    {
      id: 'developer',
      path: '/developer',
      icon: Code,
      labelAr: 'مركز المطورين',
      labelEn: 'Developer Hub',
      badge: 'Premium',
      pro: true,
    },
    {
      id: 'services',
      path: '/services',
      icon: Brain,
      labelAr: 'الخدمات الذكية',
      labelEn: 'AI Services',
      submenu: [
        {
          id: 'ai-processing',
          path: '/services/ai-processing',
          icon: Zap,
          labelAr: 'المعالجة الذكية',
          labelEn: 'AI Processing',
        },
        {
          id: 'data-analysis',
          path: '/services/data-analysis',
          icon: Activity,
          labelAr: 'تحليل البيانات',
          labelEn: 'Data Analysis',
        },
      ],
    },
    {
      id: 'settings',
      path: ROUTES.SETTINGS,
      icon: () => <SettingsIcon size={20} animate={true} />,
      labelAr: 'الإعدادات',
      labelEn: 'Settings',
    },
    {
      id: 'help',
      path: ROUTES.HELP,
      icon: () => <HelpIcon size={20} animate={true} />,
      labelAr: 'ال��ساعدة',
      labelEn: 'Help & Support',
    },
    {
      id: 'tv',
      path: '/tv',
      icon: () => (
        <div className="w-5 h-5 border-2 border-current rounded flex items-center justify-center">
          <div className="w-2 h-2 bg-current rounded animate-pulse"></div>
        </div>
      ),
      labelAr: 'التلفزيون الكوني',
      labelEn: 'KnouxTV',
      badge: 'LIVE',
    },
    {
      id: 'about',
      path: ROUTES.ABOUT,
      icon: Info,
      labelAr: 'حول التطبيق',
      labelEn: 'About',
    },
  ];

  // تصفية العناصر حسب الصلاحيات
  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    return true;
  });

  // البحث في العناصر
  const searchedItems = filteredMenuItems.filter(item => {
    if (!searchQuery) return true;
    const label = isRTL ? item.labelAr : item.labelEn;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // التحكم في انهيار/توسيع الشريط الجانبي
  const toggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle?.(newCollapsed);

    // حفظ الحالة في التخزين المحلي
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(newCollapsed));
  }, [isCollapsed, onToggle]);

  // استرجاع حالة الشريط الجانبي من التخزين المحلي
  useEffect(() => {
    const savedState = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.SIDEBAR_STATE);
    if (savedState) {
      try {
        const collapsed = JSON.parse(savedState);
        setIsCollapsed(collapsed);
        onToggle?.(collapsed);
      } catch (error) {
        console.error('Error loading sidebar state:', error);
      }
    }
  }, [onToggle]);

  // التعامل مع النقر على عنصر القائمة
  const handleItemClick = (item: MenuItem) => {
    if (item.external) {
      window.open(item.path, '_blank');
      return;
    }

    if (item.submenu && item.submenu.length > 0) {
      toggleSubmenu(item.id);
    } else {
      navigate(item.path);
      // حفظ آخر طريق تم زيارته
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.LAST_ROUTE, item.path);
    }
  };

  // التعامل مع توسيع/انهيار القوائم الفرعية
  const toggleSubmenu = (itemId: string) => {
    setExpandedSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // تحديد ما إذا كان العنصر نشطاً
  const isItemActive = (item: MenuItem) => {
    if (location.pathname === item.path) return true;
    if (item.submenu) {
      return item.submenu.some(subItem => location.pathname === subItem.path);
    }
    return false;
  };

  // الحصول على ��سمية العنصر حسب اللغة
  const getItemLabel = (item: MenuItem) => {
    return isRTL ? item.labelAr : item.labelEn;
  };

  // أنماط الحركة
  const sidebarVariants = {
    expanded: {
      width: '280px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    collapsed: {
      width: '80px',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
    hidden: {
      opacity: 0,
      x: isRTL ? 20 : -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.aside
      className={`relative flex flex-col h-screen bg-gradient-to-b ${
        theme === Theme.DARK
          ? 'from-slate-900 via-slate-800 to-slate-900'
          : 'from-white via-gray-50 to-white'
      } border-r border-opacity-20 ${
        theme === Theme.DARK ? 'border-slate-700' : 'border-gray-200'
      } backdrop-blur-lg shadow-2xl ${className}`}
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* رأس الشريط الجانبي */}
      <div className="flex items-center justify-between p-6 border-b border-opacity-20 border-slate-700">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="flex items-center space-x-3 rtl:space-x-reverse"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <KnouxCoreLogo size={40} animate={true} glowColor="cyan" />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {APP_CONFIG.APP_NAME}
                </h1>
                <p className="text-xs text-gray-500">v{APP_CONFIG.APP_VERSION}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleCollapse}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme === Theme.DARK
              ? 'hover:bg-slate-700 text-slate-300'
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            isRTL ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )
          ) : isRTL ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* شريط البحث */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            className="p-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="relative">
              <Search
                className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`}
              />
              <input
                type="text"
                placeholder={isRTL ? 'البحث في القائمة...' : 'Search menu...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-lg border ${
                  theme === Theme.DARK
                    ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* قائمة التنقل */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <div className="space-y-1">
          {searchedItems.map(item => (
            <div key={item.id}>
              {/* العنصر الرئيسي */}
              <motion.button
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center ${isRTL ? 'pr-3 pl-4' : 'pl-3 pr-4'} py-3 rounded-lg transition-all duration-200 group relative ${
                  isItemActive(item)
                    ? `${theme === Theme.DARK ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'} shadow-lg`
                    : `${theme === Theme.DARK ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-100'}`
                } ${item.pro ? 'border border-yellow-500 border-opacity-30' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* أيقونة العنصر */}
                <div className={`${isCollapsed ? '' : isRTL ? 'ml-3' : 'mr-3'}`}>
                  {typeof item.icon === 'function' ? (
                    <item.icon />
                  ) : (
                    <item.icon
                      className={`h-5 w-5 ${
                        isItemActive(item)
                          ? 'text-current'
                          : 'text-gray-400 group-hover:text-current'
                      }`}
                    />
                  )}
                </div>

                {/* نص العنصر والشارة */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      className="flex-1 flex items-center justify-between"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <span className="font-medium">{getItemLabel(item)}</span>

                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        {/* شارة PRO */}
                        {item.pro && (
                          <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full">
                            PRO
                          </span>
                        )}

                        {/* شارة العدد */}
                        {item.badge && (
                          <span
                            className={`px-2 py-1 text-xs font-bold rounded-full ${
                              typeof item.badge === 'number' || !isNaN(Number(item.badge))
                                ? 'bg-red-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* سهم القائمة الفرعية */}
                        {item.submenu && item.submenu.length > 0 && (
                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ${
                              expandedSubmenus.has(item.id) ? 'rotate-90' : ''
                            } ${isRTL ? 'rotate-180' : ''}`}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* تلميح للعن��ر في الوضع المنهار */}
                {isCollapsed && hoveredItem === item.id && (
                  <div
                    className={`absolute ${isRTL ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50 shadow-lg`}
                  >
                    {getItemLabel(item)}
                  </div>
                )}
              </motion.button>

              {/* القائمة الفرعية */}
              <AnimatePresence>
                {!isCollapsed && item.submenu && expandedSubmenus.has(item.id) && (
                  <motion.div
                    className={`mt-1 ${isRTL ? 'mr-8' : 'ml-8'} space-y-1`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.submenu.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => navigate(subItem.path)}
                        className={`w-full flex items-center ${isRTL ? 'pr-3 pl-4' : 'pl-3 pr-4'} py-2 rounded-lg transition-colors duration-200 ${
                          location.pathname === subItem.path
                            ? `${theme === Theme.DARK ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-600'}`
                            : `${theme === Theme.DARK ? 'text-slate-400 hover:bg-slate-600' : 'text-gray-600 hover:bg-gray-50'}`
                        }`}
                      >
                        <subItem.icon className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <span className="text-sm">{getItemLabel(subItem)}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </nav>

      {/* معلومات المستخدم */}
      <div
        className={`p-4 border-t border-opacity-20 ${theme === Theme.DARK ? 'border-slate-700' : 'border-gray-200'}`}
      >
        <AnimatePresence>
          {!isCollapsed ? (
            <motion.div
              className="flex items-center space-x-3 rtl:space-x-reverse"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${theme === Theme.DARK ? 'text-white' : 'text-gray-900'}`}
                >
                  مدير النظام
                </p>
                <p
                  className={`text-xs ${theme === Theme.DARK ? 'text-slate-400' : 'text-gray-500'}`}
                >
                  admin@knouxcore.com
                </p>
              </div>
              <button
                className={`p-2 rounded-lg transition-colors ${theme === Theme.DARK ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <motion.button
              className={`w-full p-3 rounded-lg transition-colors ${theme === Theme.DARK ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <User className="h-5 w-5 mx-auto" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default EnhancedSidebar;
