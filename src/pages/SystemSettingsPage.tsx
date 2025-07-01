"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Settings, Moon, Sun, Globe, Bell, Shield } from "lucide-react";

const SystemSettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">إعدادات النظام</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <Settings className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">الإعدادات العامة</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Sun className="h-5 w-5" />
                <span>المظهر</span>
              </div>
              <select className="p-2 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <option value="light">فاتح</option>
                <option value="dark">داكن</option>
                <option value="system">النظام</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Globe className="h-5 w-5" />
                <span>اللغة</span>
              </div>
              <select className="p-2 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Bell className="h-5 w-5" />
                <span>الإشعارات</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
            <Shield className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">الأمان والخصوصية</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span>المصادقة الثنائية</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <span>تشفير البيانات</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity">
              حفظ الإعدادات
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
