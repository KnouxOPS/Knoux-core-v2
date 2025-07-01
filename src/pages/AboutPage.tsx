"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Info, Star, Users, Code, Coffee } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">حول KnouxCore</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          المركز الذكي للتحكم الفضائي - الإصدار البلاتيني
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 text-center">
          <Star className="h-8 w-8 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">الإصدار</h3>
          <p>1.0.0 بلاتيني</p>
        </Card>

        <Card className="p-6 text-center">
          <Users className="h-8 w-8 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">المستخدمين</h3>
          <p>+10,000</p>
        </Card>

        <Card className="p-6 text-center">
          <Code className="h-8 w-8 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">التقنيات</h3>
          <p>React + TypeScript</p>
        </Card>

        <Card className="p-6 text-center">
          <Coffee className="h-8 w-8 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">المطورين</h3>
          <p>فريق KnouxCore</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Info className="h-6 w-6 mr-2" />
            معلومات النظام
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <span>نظام التشغيل</span>
              <span className="font-semibold">Linux 6.1</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <span>المعالج</span>
              <span className="font-semibold">8 نواة</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <span>الذاكرة</span>
              <span className="font-semibold">16 GB</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-black/5 dark:bg-white/5 rounded-lg">
              <span>القرص الصلب</span>
              <span className="font-semibold">500 GB</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">المميزات</h2>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
              <span>تحكم ذكي في الخدمات</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
              <span>معاينة مباشرة للخدمات</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
              <span>تحليلات متقدمة</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
              <span>دعم متعدد اللغات</span>
            </li>
            <li className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="h-2 w-2 bg-black dark:bg-white rounded-full"></div>
              <span>واجهة مستخدم حديثة</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
