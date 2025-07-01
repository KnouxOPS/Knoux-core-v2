"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Brain, MessageSquare, Sparkles } from "lucide-react";

const AIInsightsPage: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleAnalyze = () => {
    if (!query) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">الرؤى الذكية</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <Brain className="h-8 w-8 text-purple-500" />
            <h3 className="text-xl font-semibold">تحليل النظام</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            تحليل ذكي لأداء النظام والخدمات
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <Sparkles className="h-8 w-8 text-yellow-500" />
            <h3 className="text-xl font-semibold">التوصيات</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            توصيات مخصصة لتحسين الأداء
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
            <MessageSquare className="h-8 w-8 text-blue-500" />
            <h3 className="text-xl font-semibold">المساعد الذكي</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            مساعد ذكي للإجابة على استفساراتك
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">تحليل ذكي</h2>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="flex-1 p-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <button
              onClick={handleAnalyze}
              disabled={!query || isAnalyzing}
              className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isAnalyzing ? "جاري التحليل..." : "تحليل"}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
              <Brain className="h-5 w-5" />
              <span className="font-semibold">تحليل الأداء</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              النظام يعمل بكفاءة عالية. استخدام المعالج: 25%، الذاكرة: 40%
            </p>
          </div>

          <div className="p-4 bg-black/5 dark:bg-white/5 rounded-lg">
            <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">توصيات التحسين</span>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>تحديث برامج التشغيل للحصول على أفضل أداء</li>
              <li>تنظيف ملفات النظام المؤقتة</li>
              <li>تحسين إعدادات الشبكة</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIInsightsPage;
