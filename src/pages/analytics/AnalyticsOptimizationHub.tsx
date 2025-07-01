/**
 * KnouxCore - مركز الإحصائيات والتحسين "Analytics Hub"
 * واجهة تصور الإحصائيات وتلقي توصيات التحسين المدعومة بالذكاء الاصطناعي
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  BarChart3,
  TrendingUp,
  Brain,
  Zap,
  Clock,
  Code,
  Star,
  Target,
  Activity,
  Award,
  Download,
  Filter,
  Calendar,
  Eye,
  Users,
  Cpu,
  Globe,
  Lightbulb,
  Trophy,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface UserStats {
  codeEnhanced: number;
  favorites: number;
  projectsCreated: number;
  charactersWritten: number;
  timeSpent: number; // in hours
  languagesUsed: Record<string, number>;
  dailyActivity: Array<{ date: string; activity: number }>;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  earnedDate?: string;
}

interface OptimizationTip {
  id: string;
  category: "workflow" | "performance" | "learning" | "collaboration";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "medium" | "hard";
}

const AnalyticsOptimizationHub: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "year"
  >("month");
  const [showOptimizationTips, setShowOptimizationTips] = useState(true);
  const [dataParameters, setDataParameters] = useState([30]);

  const [userStats, setUserStats] = useState<UserStats>({
    codeEnhanced: 142,
    favorites: 23,
    projectsCreated: 8,
    charactersWritten: 47850,
    timeSpent: 156.5,
    languagesUsed: {
      JavaScript: 35,
      TypeScript: 28,
      Python: 20,
      Rust: 10,
      Go: 7,
    },
    dailyActivity: [
      { date: "2024-01-01", activity: 85 },
      { date: "2024-01-02", activity: 92 },
      { date: "2024-01-03", activity: 78 },
      { date: "2024-01-04", activity: 88 },
      { date: "2024-01-05", activity: 95 },
      { date: "2024-01-06", activity: 82 },
      { date: "2024-01-07", activity: 90 },
    ],
    achievements: [
      {
        id: "1",
        name: "مطور النجوم",
        description: "أنشأ أول مشروع بنجاح",
        icon: "🚀",
        earned: true,
        progress: 100,
        earnedDate: "2024-01-15",
      },
      {
        id: "2",
        name: "محسن الأكواد",
        description: "استخدم التحسين بالذكاء الاصطناعي 100 مرة",
        icon: "⚡",
        earned: true,
        progress: 100,
        earnedDate: "2024-01-20",
      },
      {
        id: "3",
        name: "مستكشف اللغات",
        description: "استخدم 5 لغات برمجة مختلفة",
        icon: "🌐",
        earned: true,
        progress: 100,
        earnedDate: "2024-01-25",
      },
      {
        id: "4",
        name: "ماراثون الكود",
        description: "اكتب 100,000 حرف من الكود",
        icon: "🏃",
        earned: false,
        progress: 47,
      },
    ],
  });

  const [optimizationTips] = useState<OptimizationTip[]>([
    {
      id: "1",
      category: "workflow",
      title: "تحسين سير العمل",
      description:
        "تظهر بياناتك أنك تستخدم JavaScript بكثرة. فكر في إعداد اختصارات لوحة المفاتيح للوظائف الشائعة لتوفير الوقت.",
      impact: "high",
      difficulty: "easy",
    },
    {
      id: "2",
      category: "performance",
      title: "تحسين الأداء",
      description:
        "متوسط تعقيد الكود لديك يشير إلى إمكانية تحسين الوظائف. جرب تقسيم الوظائف الكبيرة إلى وظائف أصغر.",
      impact: "medium",
      difficulty: "medium",
    },
    {
      id: "3",
      category: "learning",
      title: "فرصة التعلم",
      description:
        "لاحظنا أنك تعمل مع TypeScript مؤخراً. استكشف الأنواع المتقدمة لتحسين جودة الكود.",
      impact: "medium",
      difficulty: "hard",
    },
    {
      id: "4",
      category: "collaboration",
      title: "التعاون",
      description:
        "مشاريعك تستفيد من التعاون. فكر في دعوة مطورين آخرين للمساهمة في مشاريعك الكبيرة.",
      impact: "high",
      difficulty: "easy",
    },
  ]);

  // تحديث الإحصائيات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats((prev) => ({
        ...prev,
        codeEnhanced: prev.codeEnhanced + Math.floor(Math.random() * 3),
        timeSpent: prev.timeSpent + Math.random() * 0.1,
        charactersWritten:
          prev.charactersWritten + Math.floor(Math.random() * 50),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getLanguageColor = (language: string, index: number) => {
    const colors = [
      "#f7df1e", // JavaScript
      "#3178c6", // TypeScript
      "#3776ab", // Python
      "#ce422b", // Rust
      "#00add8", // Go
    ];
    return colors[index] || "#6b7280";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "workflow":
        return <Zap className="w-4 h-4" />;
      case "performance":
        return <TrendingUp className="w-4 h-4" />;
      case "learning":
        return <Lightbulb className="w-4 h-4" />;
      case "collaboration":
        return <Users className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "low":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const exportReport = () => {
    const report = {
      userStats,
      timeframe: selectedTimeframe,
      generatedAt: new Date().toISOString(),
      optimizationTips: optimizationTips.slice(0, 3),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `knoux-analytics-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* خلفية الأنماط الهندسية */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* الأنماط الهندسية */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `conic-gradient(from ${Math.random() * 360}deg, #8b5cf6, #06b6d4, #8b5cf6)`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Analytics & Optimization Hub
                </h1>
                <p className="text-slate-400">مركز التحليلات والتحسين الذكي</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={exportReport}
                variant="outline"
                className="border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
              >
                <Download className="w-4 h-4 mr-2" />
                تصدير التقرير
              </Button>

              <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
                {[
                  { id: "week", label: "أسبوع" },
                  { id: "month", label: "شهر" },
                  { id: "year", label: "سنة" },
                ].map((period) => (
                  <Button
                    key={period.id}
                    onClick={() => setSelectedTimeframe(period.id as any)}
                    size="sm"
                    variant={
                      selectedTimeframe === period.id ? "default" : "ghost"
                    }
                    className={
                      selectedTimeframe === period.id
                        ? "bg-purple-600 text-white"
                        : "text-slate-400 hover:text-white"
                    }
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* الإحصائيات الرئيسية */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-500/20 p-4">
              <div className="text-center">
                <Code className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-cyan-400">
                  {userStats.codeEnhanced.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">كود محسن</div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-xl border-yellow-500/20 p-4">
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400">
                  {userStats.favorites.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">مفضلة</div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-xl border-green-500/20 p-4">
              <div className="text-center">
                <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {userStats.projectsCreated.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">مشاريع منشأة</div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20 p-4">
              <div className="text-center">
                <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {userStats.charactersWritten.toLocaleString()}
                </div>
                <div className="text-sm text-slate-400">حرف مكتوب</div>
              </div>
            </Card>

            <Card className="bg-slate-900/50 backdrop-blur-xl border-blue-500/20 p-4">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(userStats.timeSpent)}h
                </div>
                <div className="text-sm text-slate-400">وقت مستغرق</div>
              </div>
            </Card>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* الرسوم البيانية والتحليلات */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* رسم استخدام اللغات */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20 shadow-2xl shadow-purple-500/10">
              <div className="p-4 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-400" />
                  <h3 className="text-purple-300 font-semibold">
                    استخدام لغات البرمجة
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="relative h-64 flex items-center justify-center">
                  {/* الرسم الدائري ثلاثي الأبعاد */}
                  <div className="relative w-48 h-48">
                    {Object.entries(userStats.languagesUsed).map(
                      ([language, percentage], index) => {
                        const angle = (percentage / 100) * 360;
                        const rotation = Object.entries(userStats.languagesUsed)
                          .slice(0, index)
                          .reduce((acc, [, p]) => acc + (p / 100) * 360, 0);

                        return (
                          <motion.div
                            key={language}
                            className="absolute inset-0"
                            style={{ transform: `rotate(${rotation}deg)` }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                          >
                            <div
                              className="w-full h-full rounded-full relative overflow-hidden"
                              style={{
                                background: `conic-gradient(from 0deg, ${getLanguageColor(language, index)} ${angle}deg, transparent ${angle}deg)`,
                                filter: `drop-shadow(0 0 10px ${getLanguageColor(language, index)})`,
                              }}
                            >
                              <motion.div
                                className="absolute inset-2 rounded-full bg-slate-900/80"
                                animate={{
                                  boxShadow: [
                                    `inset 0 0 20px ${getLanguageColor(language, index)}40`,
                                    `inset 0 0 30px ${getLanguageColor(language, index)}60`,
                                    `inset 0 0 20px ${getLanguageColor(language, index)}40`,
                                  ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                            </div>
                          </motion.div>
                        );
                      },
                    )}

                    {/* المركز */}
                    <div className="absolute inset-8 rounded-full bg-slate-800/90 backdrop-blur-xl border border-purple-500/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          100%
                        </div>
                        <div className="text-xs text-slate-400">الاستخدام</div>
                      </div>
                    </div>
                  </div>

                  {/* مفتاح الألوان */}
                  <div className="absolute right-0 top-0 space-y-2">
                    {Object.entries(userStats.languagesUsed).map(
                      ([language, percentage], index) => (
                        <motion.div
                          key={language}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="w-4 h-4 rounded-full border-2"
                            style={{
                              backgroundColor: getLanguageColor(
                                language,
                                index,
                              ),
                              borderColor: getLanguageColor(language, index),
                              boxShadow: `0 0 10px ${getLanguageColor(language, index)}50`,
                            }}
                          />
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {language}
                            </div>
                            <div className="text-xs text-slate-400">
                              {percentage}%
                            </div>
                          </div>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* النشاط اليومي */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
              <div className="p-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-cyan-300 font-semibold">النشاط اليومي</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="h-32 flex items-end gap-2">
                  {userStats.dailyActivity.map((day, index) => (
                    <motion.div
                      key={day.date}
                      className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg relative group cursor-pointer"
                      style={{ height: `${(day.activity / 100) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.activity / 100) * 100}%` }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* تأثير التوهج */}
                      <motion.div
                        className="absolute inset-0 bg-cyan-400/20 rounded-t-lg"
                        animate={{
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />

                      {/* معلومات التفصيل */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-xl rounded-lg p-2 border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="text-white text-xs font-semibold">
                          {day.activity}%
                        </div>
                        <div className="text-slate-400 text-xs">
                          {new Date(day.date).toLocaleDateString("ar-SA")}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* أيام الأسبوع */}
                <div className="flex gap-2 mt-3">
                  {[
                    "الأحد",
                    "الإثنين",
                    "الثلاثاء",
                    "الأربعاء",
                    "الخميس",
                    "الجمعة",
                    "السبت",
                  ].map((day, index) => (
                    <div key={day} className="flex-1 text-center">
                      <div className="text-xs text-slate-400">
                        {day.slice(0, 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* أدوات التحكم */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
              <div className="p-4 border-b border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-yellow-300 font-semibold">
                    معايير البيانات
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-400 text-sm block mb-2">
                      فترة التحليل: {dataParameters[0]} يوم
                    </label>
                    <Slider
                      value={dataParameters}
                      onValueChange={setDataParameters}
                      max={365}
                      min={7}
                      step={7}
                      className="w-full"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      عرض مفصل
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      جدولة التقرير
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* اللوحة الجانبية */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* مستشار التحسين AI */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-pink-500/20 shadow-2xl shadow-pink-500/10">
              <div className="p-4 border-b border-pink-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-pink-400" />
                    <h3 className="text-pink-300 font-semibold">
                      مستشار التحسين
                    </h3>
                  </div>
                  <Button
                    onClick={() =>
                      setShowOptimizationTips(!showOptimizationTips)
                    }
                    size="sm"
                    variant="ghost"
                    className="p-1"
                  >
                    {showOptimizationTips ? (
                      <ChevronUp className="w-4 h-4 text-pink-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-pink-400" />
                    )}
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {showOptimizationTips && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* أيقونة AI */}
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4"
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0 0 20px rgba(236, 72, 153, 0.5)",
                            "0 0 30px rgba(236, 72, 153, 0.8)",
                            "0 0 20px rgba(236, 72, 153, 0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Brain className="w-6 h-6 text-white" />
                      </motion.div>

                      {optimizationTips.slice(0, 2).map((tip, index) => (
                        <motion.div
                          key={tip.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                              {getCategoryIcon(tip.category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-white text-sm font-semibold">
                                  {tip.title}
                                </h4>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-semibold border ${getImpactColor(tip.impact)}`}
                                >
                                  {tip.impact === "high" && "عالي"}
                                  {tip.impact === "medium" && "متوسط"}
                                  {tip.impact === "low" && "منخفض"}
                                </span>
                              </div>
                              <p className="text-slate-300 text-xs">
                                {tip.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white border-0"
                      >
                        عرض المزيد من النصائح
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* الإنجازات */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
              <div className="p-4 border-b border-yellow-500/20">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-yellow-300 font-semibold">الإنجازات</h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {userStats.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${
                      achievement.earned
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : "bg-slate-800/30 border-slate-700/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`text-2xl ${achievement.earned ? "grayscale-0" : "grayscale"}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-semibold text-sm ${
                              achievement.earned
                                ? "text-yellow-300"
                                : "text-slate-400"
                            }`}
                          >
                            {achievement.name}
                          </h4>
                          {achievement.earned && (
                            <Award className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mb-2">
                          {achievement.description}
                        </p>

                        {!achievement.earned && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">التقدم</span>
                              <span className="text-slate-300">
                                {achievement.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1">
                              <motion.div
                                className="h-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                                style={{ width: `${achievement.progress}%` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${achievement.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                          </div>
                        )}

                        {achievement.earned && achievement.earnedDate && (
                          <div className="text-xs text-yellow-400 mt-1">
                            تم الحصول عليه في {achievement.earnedDate}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* معلومات إضافية */}
            <Card className="bg-slate-900/50 backdrop-blur-xl border-green-500/20 shadow-2xl shadow-green-500/10">
              <div className="p-4 border-b border-green-500/20">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-green-400" />
                  <h3 className="text-green-300 font-semibold">
                    معلومات سريعة
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">متوسط الجلسة:</span>
                  <span className="text-green-400 font-semibold">2.3 ساعة</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">لغة مفضلة:</span>
                  <span className="text-green-400 font-semibold">
                    JavaScript
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">معدل الإنتاجية:</span>
                  <span className="text-green-400 font-semibold">عالي</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">نمط العمل:</span>
                  <span className="text-green-400 font-semibold">صباحي</span>
                </div>

                <div className="pt-3 border-t border-slate-700/30">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white border-0"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    عرض تحليل مفصل
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsOptimizationHub;
