/**
 * KnouxCore - نظام التوجيه للتطبيق
 * إدارة جميع مسارات التطبيق والتنقل
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// استيراد الصفحات الرئيسية
import EnhancedDashboard from '@/pages/dashboard/EnhancedDashboard';
import NexusCodeEditor from '@/pages/nexus/NexusCodeEditor';
import AstraNavConsole from '@/pages/navigation/AstraNavConsole';
import CosmoDataBay from '@/pages/data-processing/CosmoDataBay';
import QuantumCommandCenter from '@/pages/command/QuantumCommandCenter';
import ProjectManagementHub from '@/pages/projects/ProjectManagementHub';
import AnalyticsOptimizationHub from '@/pages/analytics/AnalyticsOptimizationHub';
import SystemSettingsPage from '@/pages/SystemSettingsPage';
import AboutPage from '@/pages/about/AboutPage';
import HelpPage from '@/pages/HelpPage';
import KnouxTVPage from '@/pages/tv/KnouxTVPage';
import DeveloperServicesHub from '@/pages/developer/DeveloperServicesHub';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* الصفحة الرئيسية - لوحة القيادة */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* لوحة القيادة الرئيسية */}
      <Route path="/dashboard" element={<EnhancedDashboard />} />

      {/* محرر الأكواد الذكي */}
      <Route path="/nexus" element={<NexusCodeEditor />} />

      {/* وحدة الملاحة الفضائية */}
      <Route path="/navigation" element={<AstraNavConsole />} />

      {/* محطة معالجة البيانات */}
      <Route path="/data-processing" element={<CosmoDataBay />} />

      {/* مركز الأوامر والتحكم */}
      <Route path="/command" element={<QuantumCommandCenter />} />

      {/* مركز إدارة المشاريع */}
      <Route path="/projects" element={<ProjectManagementHub />} />

      {/* مركز الإحصائيات والتحسين */}
      <Route path="/analytics" element={<AnalyticsOptimizationHub />} />

      {/* إعدادات النظام */}
      <Route path="/settings" element={<SystemSettingsPage />} />

      {/* KnouxTV - التلفزيون الكوني */}
      <Route path="/tv" element={<KnouxTVPage />} />

      {/* مركز خدمات المطورين البريميوم */}
      <Route path="/developer" element={<DeveloperServicesHub />} />

      {/* معلومات التطبيق */}
      <Route path="/about" element={<AboutPage />} />

      {/* المساعدة والدعم */}
      <Route path="/help" element={<HelpPage />} />

      {/* صفحة 404 - إعادة توجيه للرئيسية */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
