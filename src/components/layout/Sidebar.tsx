"use client"

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, Download, Shield, Wifi, Brain } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { path: '/services', icon: Brain, label: 'الخدمات' },
    { path: '/downloads', icon: Download, label: 'التحميلات' },
    { path: '/network', icon: Wifi, label: 'الشبكة' },
    { path: '/security', icon: Shield, label: 'الأمان' },
    { path: '/settings', icon: Settings, label: 'الإعدادات' },
  ];

  return (
    <aside className="w-64 border-r bg-white dark:bg-black h-screen flex flex-col">
      <div className="p-6">
        <img 
          src="https://i.postimg.cc/T3k13rnP/d04f3a9b-36ac-4127-953b-691a8b413256.png" 
          alt="KnouxCore Logo" 
          className="h-8 w-auto"
        />
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          KnouxCore v1.0.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
