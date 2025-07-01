/**
 * KnouxCore - صفحة المساعدة والدعم المحسنة
 * دليل شامل ومنظم لجميع خدمات ووظائف التطبيق
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "@/components/icons/KnouxCoreIcons";
import { HolographicCard } from "@/components/effects/HolographicCard";
import { CategoryCard, ServiceCard } from "@/components/cards/ServiceCards";
import {
  Search,
  Book,
  Video,
  MessageCircle,
  Download,
  ExternalLink,
  ChevronRight,
  Star,
  Clock,
  Users,
  TrendingUp,
  Lightbulb,
  Zap,
  Shield,
  Rocket,
  Globe,
  Brain,
  Target,
} from "lucide-react";

interface HelpSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  articles: HelpArticle[];
  gradient?: "cyan" | "violet" | "blue" | "green";
}

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  popular?: boolean;
  new?: boolean;
}

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const helpSections: HelpSection[] = [
    {
      id: "dashboard",
      title: "لوحة القيادة الرئيسية",
      description: "دليل شامل لاستخدام لوحة القيادة ومراقبة الأنظمة",
      icon: <DashboardIcon size={24} />,
      gradient: "cyan",
      articles: [
        {
          id: "dashboard-overview",
          title: "نظرة عامة على لوحة القيادة",
          description:
            "تعرف على جميع مكونات لوحة القيادة الرئيسية وكيفية قراءة المقاييس",
          readTime: "5 دقائق",
          difficulty: "beginner",
          popular: true,
        },
        {
          id: "system-monitoring",
          title: "مراقبة الأنظمة في الوقت الفعلي",
          description: "كيفية مراقبة أداء الأنظمة والتعامل مع التنبيهات",
          readTime: "8 دقائق",
          difficulty: "intermediate",
          popular: true,
        },
        {
          id: "custom-widgets",
          title: "تخصيص الويدجت والمقاييس",
          description: "إضافة وتخصيص الويدجت لتناسب احتياجاتك",
          readTime: "12 دقيقة",
          difficulty: "advanced",
        },
        {
          id: "notifications-setup",
          title: "إعداد النتبيهات والإشعارات",
          description: "تكوين النتبيهات لمراقبة الأحداث المهمة",
          readTime: "6 دقائق",
          difficulty: "intermediate",
          new: true,
        },
      ],
    },
    {
      id: "nexus",
      title: "محرر الأكواد الذكي",
      description: "دليل محرر Nexus المدعوم بالذكاء الاصطناعي",
      icon: <NexusIcon size={24} />,
      gradient: "violet",
      articles: [
        {
          id: "nexus-basics",
          title: "أساسيات محرر Nexus",
          description: "البدء مع محرر الأكواد والميزات الأساسية",
          readTime: "10 دقائق",
          difficulty: "beginner",
          popular: true,
        },
        {
          id: "ai-assistance",
          title: "استخدام المساعد الذكي للبرمجة",
          description:
            "كيفية الاستفادة من ميزات الذكاء الاصطناعي في كتابة الأكواد",
          readTime: "15 دقيقة",
          difficulty: "intermediate",
          popular: true,
        },
        {
          id: "debugging-tools",
          title: "أدوات تشخيص الأخطاء المتقدمة",
          description: "استخدام أدوات التشخيص المتقدمة لحل المشاكل",
          readTime: "20 دقيقة",
          difficulty: "advanced",
        },
        {
          id: "code-optimization",
          title: "تحسين الأداء والكود",
          description: "تقنيات تحسين الكود للحصول على أفضل أداء",
          readTime: "18 دقيقة",
          difficulty: "advanced",
          new: true,
        },
      ],
    },
    {
      id: "navigation",
      title: "نظام الملاحة الفضائية",
      description: "دليل استخدام نظام الملاحة AstraNav",
      icon: <NavigationIcon size={24} />,
      gradient: "blue",
      articles: [
        {
          id: "navigation-basics",
          title: "أساسيات الملاحة الفضائية",
          description: "فهم أساسيات الملاحة والخرائط النجمية",
          readTime: "12 دقيقة",
          difficulty: "beginner",
        },
        {
          id: "route-planning",
          title: "تخطيط المسارات الكمية",
          description: "كيفية تخطيط مسارات آمنة وفعالة عبر الفضاء",
          readTime: "25 دقيقة",
          difficulty: "intermediate",
          popular: true,
        },
        {
          id: "hazard-detection",
          title: "كشف المخاطر الفضائية",
          description: "تحديد وتجنب المخاطر أثناء السفر",
          readTime: "15 دقيقة",
          difficulty: "intermediate",
        },
      ],
    },
    {
      id: "data-processing",
      title: "معالجة البيانات",
      description: "دليل محطة CosmoData للتحليل والمعالجة",
      icon: <DataProcessingIcon size={24} />,
      gradient: "green",
      articles: [
        {
          id: "data-basics",
          title: "أساسيات معالجة البيانات",
          description: "مقدمة في معالجة وتحليل البيانات الكونية",
          readTime: "8 دقائق",
          difficulty: "beginner",
        },
        {
          id: "quantum-processing",
          title: "المعالجة الكمية المتقدمة",
          description: "استخدام قوة الحوسبة الكمية لمعالجة البيانات",
          readTime: "30 دقيقة",
          difficulty: "advanced",
          popular: true,
        },
      ],
    },
    {
      id: "projects",
      title: "إدارة المشاريع",
      description: "دليل نظام إدارة المشاريع الهولوجرافي",
      icon: <ProjectsIcon size={24} />,
      gradient: "violet",
      articles: [
        {
          id: "project-creation",
          title: "إنشاء وإدارة المشاريع",
          description: "كيفية إنشاء مشاريع جديدة وإدارة الفرق",
          readTime: "10 دقائق",
          difficulty: "beginner",
          popular: true,
        },
        {
          id: "collaboration",
          title: "التعاون في الوقت الفعلي",
          description: "العمل مع الفريق على المشاريع في الوقت الفعلي",
          readTime: "12 دقيقة",
          difficulty: "intermediate",
        },
      ],
    },
  ];

  const quickStartGuides = [
    {
      title: "دليل البدء السريع",
      description: "ابدأ مع KnouxCore في 5 دقائق",
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      readTime: "5 دقائق",
      popular: true,
    },
    {
      title: "الأسئلة الشائعة",
      description: "إجابات على الأسئلة الأكثر شيوعاً",
      icon: <MessageCircle className="w-6 h-6 text-violet-400" />,
      readTime: "3 دقائق",
      popular: true,
    },
    {
      title: "أفضل الممارسات",
      description: "نصائح لاستخدام النظام بكفاءة",
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      readTime: "8 دقائق",
    },
    {
      title: "استكشاف الأخطاء",
      description: "حل المشاكل الشائعة بسرعة",
      icon: <Target className="w-6 h-6 text-red-400" />,
      readTime: "10 دقائق",
    },
  ];

  const filteredSections = helpSections.filter((section) => {
    if (selectedCategory !== "all" && section.id !== selectedCategory)
      return false;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        section.title.toLowerCase().includes(searchLower) ||
        section.description.toLowerCase().includes(searchLower) ||
        section.articles.some(
          (article) =>
            article.title.toLowerCase().includes(searchLower) ||
            article.description.toLowerCase().includes(searchLower),
        )
      );
    }

    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-400 bg-green-400/20 border-green-400/30";
      case "intermediate":
        return "text-yellow-400 bg-yellow-400/20 border-yellow-400/30";
      case "advanced":
        return "text-red-400 bg-red-400/20 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-400/20 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      {/* خلفية فضائية */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <HelpIcon size={48} animate={true} />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                مركز المساعدة والدعم
              </h1>
              <p className="text-xl text-slate-400 mt-2">
                دليلك الشامل لإتقان KnouxCore
              </p>
            </div>
          </div>
        </motion.div>

        {/* شريط البحث والفلاتر */}
        <HolographicCard glowIntensity="medium" className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في المساعدة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">جميع الأقسام</option>
                {helpSections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-slate-800/50 border border-slate-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">جميع المستويات</option>
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>
          </div>
        </HolographicCard>

        {/* أدلة البدء السريع */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-yellow-400" />
            البدء السريع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartGuides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
              >
                <HolographicCard glowIntensity="low" className="p-4 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      {guide.icon}
                      {guide.popular && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-3 flex-1">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {guide.readTime}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* أقسام المساعدة */}
        {filteredSections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30">
                {section.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
                <p className="text-slate-400">{section.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.articles
                .filter(
                  (article) =>
                    selectedDifficulty === "all" ||
                    article.difficulty === selectedDifficulty,
                )
                .map((article, articleIndex) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: sectionIndex * 0.1 + articleIndex * 0.05,
                    }}
                    whileHover={{ y: -3 }}
                    className="cursor-pointer"
                  >
                    <HolographicCard glowIntensity="low" className="p-6 h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-white font-semibold text-lg leading-tight">
                            {article.title}
                          </h3>
                          <div className="flex gap-1">
                            {article.popular && (
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            )}
                            {article.new && (
                              <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                                جديد
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-4 flex-1 leading-relaxed">
                          {article.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(article.difficulty)}`}
                            >
                              {article.difficulty === "beginner"
                                ? "مبتدئ"
                                : article.difficulty === "intermediate"
                                  ? "متوسط"
                                  : "متقدم"}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </div>
                    </HolographicCard>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}

        {/* قسم الدعم الإضافي */}
        <HolographicCard glowIntensity="high" className="p-8 text-center">
          <Brain className="w-12 h-12 text-violet-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            هل تحتاج مساعدة إضافية؟
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            فريق الدعم الفني متاح على مدار الساعة لمساعدتك في حل أي مشكلة أو
            الإجابة على استفساراتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white border-0">
              <MessageCircle className="w-4 h-4 mr-2" />
              تواصل مع الدعم
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Video className="w-4 h-4 mr-2" />
              جولة فيديو
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Download className="w-4 h-4 mr-2" />
              دليل PDF
            </Button>
          </div>
        </HolographicCard>
      </div>
    </div>
  );
};

export default HelpPage;
