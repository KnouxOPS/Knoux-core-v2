"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";

const SecurityHubPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">مركز الأمان</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <ShieldCheck className="h-8 w-8 text-green-500" />
            <h3 className="text-xl font-semibold">حالة الحماية</h3>
          </div>
          <p className="text-green-500 font-semibold">محمي</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <Shield className="h-8 w-8" />
            <h3 className="text-xl font-semibold">آخر فحص</h3>
          </div>
          <p>منذ 2 ساعة</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <ShieldAlert className="h-8 w-8" />
            <h3 className="text-xl font-semibold">التهديدات</h3>
          </div>
          <p>0 تهديدات</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-2xl font-bold mb-4">سجل الأمان</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((log) => (
            <div
              key={log}
              className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-md"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>فحص أمان روتيني</span>
              </div>
              <span className="text-sm text-gray-500">منذ {log} ساعة</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">إحصائيات الحماية</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>الملفات المفحوصة</span>
                <span>1,234</span>
              </div>
              <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "80%" }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>التهديدات المحظورة</span>
                <span>56</span>
              </div>
              <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: "20%" }}
                />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">الإجراءات السريعة</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              فحص سريع
            </button>
            <button className="p-4 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              فحص كامل
            </button>
            <button className="p-4 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              تحديث القواعد
            </button>
            <button className="p-4 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              التقارير
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityHubPage;
