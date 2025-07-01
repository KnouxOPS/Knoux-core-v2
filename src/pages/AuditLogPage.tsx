"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  ListChecks,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: "success" | "warning" | "error";
  details: string;
}

const AuditLogPage: React.FC = () => {
  const [logs] = React.useState<AuditLog[]>([
    {
      id: "1",
      action: "تسجيل دخول",
      user: "المشرف",
      timestamp: "2024-03-20 10:30:00",
      status: "success",
      details: "تم تسجيل الدخول بنجاح",
    },
    {
      id: "2",
      action: "تعديل الإعدادات",
      user: "المشرف",
      timestamp: "2024-03-20 10:35:00",
      status: "warning",
      details: "تم تغيير إعدادات الأمان",
    },
    {
      id: "3",
      action: "محاولة وصو��",
      user: "مجهول",
      timestamp: "2024-03-20 10:40:00",
      status: "error",
      details: "محاولة وصول غير مصرح بها",
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <ListChecks className="h-8 w-8" />
          <h1 className="text-4xl font-bold">سجل المراجعة</h1>
        </div>
        <button className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity">
          <Filter className="h-5 w-5" />
          <span>تصفية</span>
        </button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {getStatusIcon(log.status)}
                <div>
                  <h3 className="font-semibold">{log.action}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {log.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="h-4 w-4" />
                  <span>{log.timestamp}</span>
                </div>
                <span>|</span>
                <span>{log.user}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          إجمالي السجلات: {logs.length}
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button className="px-4 py-2 bg-black/5 dark:bg-white/5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            السابق
          </button>
          <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity">
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;
