/**
 * KnouxCore - صفحة معلومات التطبيق
 * عرض معلومات التطبيق، الإصدار، والمساهمين
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Info,
  Star,
  Code,
  Clock,
  Users,
  Github,
  Twitter,
  Mail,
  Globe,
  Heart,
  Cpu,
  Zap,
  Shield,
  Rocket,
  Brain,
  Database,
  Award,
  Download,
  ExternalLink,
} from "lucide-react";
import { APP_CONFIG } from "@/config/app.config";

interface AppStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  contribution: string;
}

interface Technology {
  name: string;
  description: string;
  category: "AI" | "Frontend" | "Backend" | "Database" | "Tools";
  icon: React.ReactNode;
}

const AboutPage: React.FC = () => {
  const [showFullLicense, setShowFullLicense] = useState(false);

  const appStats: AppStat[] = [
    {
      label: "أكواد محسنة",
      value: "1,247",
      icon: <Code className="w-5 h-5" />,
      color: "text-cyan-400",
    },
    {
      label: "ساعات تطوير",
      value: "2,156",
      icon: <Clock className="w-5 h-5" />,
      color: "text-green-400",
    },
    {
      label: "مستخدمين نشطين",
      value: "3,429",
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-400",
    },
    {
      label: "معدل الرضا",
      value: "98%",
      icon: <Star className="w-5 h-5" />,
      color: "text-yellow-400",
    },
  ];

  const contributors: Contributor[] = [
    {
      name: "أحمد المطور",
      role: "Lead Developer",
      avatar: "AM",
      contribution: "التطوير الأساسي والذكاء الاصطناعي",
    },
    {
      name: "سارة المصممة",
      role: "UI/UX Designer",
      avatar: "SM",
      contribution: "تصميم الواجهات والتجربة",
    },
    {
      name: "محمد المهندس",
      role: "System Architect",
      avatar: "MM",
      contribution: "هندسة النظام والبنية التحتية",
    },
    {
      name: "فاطمة المحللة",
      role: "Data Scientist",
      avatar: "FM",
      contribution: "تحليل البيانات والخوارزميات",
    },
  ];

  const technologies: Technology[] = [
    {
      name: "Codex Prime AI",
      description: "محرك الذكاء الاصطناعي لتحسين الأكواد",
      category: "AI",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      name: "React + TypeScript",
      description: "مكتبة البناء الأساسية للواجهات",
      category: "Frontend",
      icon: <Code className="w-5 h-5" />,
    },
    {
      name: "Framer Motion",
      description: "مكتبة الحركات والتأثيرات البصرية",
      category: "Frontend",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "Tailwind CSS",
      description: "إطار عمل التصميم المتقدم",
      category: "Frontend",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: "Quantum Security",
      description: "نظام الأمان والحماية المتقدم",
      category: "Backend",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Cosmic Database",
      description: "قاعدة بيانات مُحسّنة للفضاء",
      category: "Database",
      icon: <Database className="w-5 h-5" />,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "AI":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "Frontend":
        return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
      case "Backend":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "Database":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Tools":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      {/* خلفية النجوم المتحركة */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 120 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* المجرات البعيدة */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              width: Math.random() * 300 + 200,
              height: Math.random() * 300 + 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(ellipse, ${
                i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4"
              }, transparent)`,
              borderRadius: "50%",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* رأس الصفحة مع الشعار */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* الشعار المركزي */}
          <motion.div
            className="relative w-32 h-32 mx-auto mb-8"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative">
                <motion.div
                  className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  K
                </motion.div>

                {/* تأثيرات الوهج */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </div>
          </motion.div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            KnouxCore
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            المركز الذكي للتحكم الفضائي
          </p>
          <p className="text-lg text-purple-400 font-semibold">
            الإصدار البلاتيني v{APP_CONFIG.APP_VERSION}
          </p>
        </motion.div>

        {/* وصف المهمة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-indigo-500/20 shadow-2xl shadow-indigo-500/10 p-8 text-center">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                  "0 0 30px rgba(99, 102, 241, 0.8)",
                  "0 0 20px rgba(99, 102, 241, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Rocket className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-indigo-300 mb-4">مهمتنا</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              نسعى لبناء أكثر منصات التطوير تقدماً في المجرة، حيث يلتقي الذكاء
              الاصطناعي مع التكنولوجيا الفضائية لخلق تجربة برمجة لا مثيل لها.
              KnouxCore يمثل المستقبل حيث يصبح كل مطور قائد سفينة فضائية في رحلة
              استكشاف عوالم البرمجة اللامحدودة.
            </p>
          </Card>
        </motion.div>

        {/* الإحصائيات المدعومة بالذكاء الاصطناعي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-cyan-300 mb-6 text-center">
            الإحصائيات المباشرة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {appStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-600/30 p-6 text-center hover:border-cyan-500/50 transition-all duration-300">
                  <motion.div
                    className={`${stat.color} mb-3`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* التقنيات والمكتبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-purple-300">
                  التقنيات المستخدمة
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg border ${getCategoryColor(tech.category)}`}
                      >
                        {tech.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-semibold">
                            {tech.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(tech.category)}`}
                          >
                            {tech.category}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* فريق المساهمين */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-green-500/20 shadow-2xl shadow-green-500/10">
            <div className="p-6 border-b border-green-500/20">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-green-300">
                  فريق التطوير
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-green-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center text-white font-bold"
                        whileHover={{ scale: 1.1 }}
                      >
                        {contributor.avatar}
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {contributor.name}
                        </h3>
                        <p className="text-green-400 text-sm">
                          {contributor.role}
                        </p>
                        <p className="text-slate-300 text-xs mt-1">
                          {contributor.contribution}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* التواصل والروابط */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <div className="p-6 border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-cyan-300">
                  التواصل معنا
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "GitHub",
                    icon: <Github className="w-5 h-5" />,
                    color: "text-gray-400",
                    link: "#",
                  },
                  {
                    name: "Twitter",
                    icon: <Twitter className="w-5 h-5" />,
                    color: "text-blue-400",
                    link: "#",
                  },
                  {
                    name: "البريد",
                    icon: <Mail className="w-5 h-5" />,
                    color: "text-green-400",
                    link: "mailto:info@knouxcore.space",
                  },
                  {
                    name: "الموقع",
                    icon: <Globe className="w-5 h-5" />,
                    color: "text-purple-400",
                    link: "#",
                  },
                ].map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Button
                      onClick={() => window.open(social.link, "_blank")}
                      className="w-full h-16 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={social.color}>{social.icon}</div>
                        <span className="text-sm text-slate-300">
                          {social.name}
                        </span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* معلومات الترخيص */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-12"
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
            <div className="p-6 border-b border-yellow-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-yellow-300">
                    الترخيص والقانون
                  </h2>
                </div>
                <Button
                  onClick={() => setShowFullLicense(!showFullLicense)}
                  size="sm"
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-300"
                >
                  {showFullLicense ? "إخفاء" : "عرض"} التفاصيل
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
                  <Heart className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">MIT License</h3>
                  <p className="text-slate-300 text-sm">
                    مفتوح المصدر مع المحبة للمجتمع البرمجي
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showFullLicense && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-800/30 rounded-lg p-4 border border-yellow-500/20 text-sm text-slate-300 overflow-hidden"
                  >
                    <p className="mb-3">
                      © 2024 KnouxCore. جميع الحقوق محفوظة.
                    </p>
                    <p className="mb-3">
                      يُمنح بموجب هذا الترخيص الإذن مجاناً لأي شخص يحصل على نسخة
                      من هذا البرنامج والملفات المرتبطة به، للتعامل مع البرنامج
                      دون قيود، بما في ذلك دون حصر الحقوق في الاستخدام والنسخ
                      والتعديل والدمج والنشر والتوزيع.
                    </p>
                    <p className="text-yellow-400 font-semibold">
                      تم بناؤه بالحب والقهوة في المجرة البعيدة ✨
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* أزرار الإجراءات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex justify-center gap-4"
        >
          <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white border-0">
            <Download className="w-4 h-4 mr-2" />
            تحميل التقرير
          </Button>
          <Button
            variant="outline"
            className="border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            زيارة الموقع
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
