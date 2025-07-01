"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Wifi, WifiOff } from "lucide-react";

const NetworkControlPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">التحكم بالشبكة</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">حالة الشبكة</h3>
            <Wifi className="h-6 w-6" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>السرعة الحالية</span>
              <span className="font-semibold">100 Mbps</span>
            </div>
            <div className="flex justify-between items-center">
              <span>الاتصال</span>
              <span className="text-green-500">متصل</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">الأجهزة المتصلة</h3>
            <span className="text-sm text-gray-500">5 أجهزة</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((device) => (
              <div
                key={device}
                className="flex justify-between items-center p-2 bg-black/5 dark:bg-white/5 rounded-md"
              >
                <span>جهاز {device}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                  متصل
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NetworkControlPage;
