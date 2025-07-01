/**
 * KnouxCore Operational Monitor Display (OMD)
 * شاشة المعاينة العملياتية - بث حيّ فائق التطور لكل قسم
 */

import React, { FC, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import {
  Cpu,
  Database,
  Wifi,
  Battery,
  Zap,
  Code,
  Rocket,
  Clock,
  AlertTriangle,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  Info,
  Terminal,
  Target,
  Activity,
  Brain,
  Network,
  Shield,
  FileCode,
  TrendingUp,
  CheckCircle,
  Download,
  MessageSquare,
  Lightbulb,
  Globe,
  Star,
  Eye,
  Thermometer,
  Gauge,
} from "lucide-react";

// ===============================
// Types & Interfaces
// ===============================

interface ShipStatus {
  cpu: number;
  memory: number;
  network: number;
  power: number;
  temperature: number;
  efficiency: number;
}

interface AnalysisSummary {
  complexity: string;
  performance: string;
  suggestionsCount: number;
  warningsCount: number;
  linesAnalyzed: number;
}

interface RouteSummary {
  status: string;
  eta: string;
  hazardLevel: string;
  currentSystem: string;
  destination: string;
}

interface DataSummary {
  nodes: number;
  connections: number;
  anomalies: number;
  dataFlowRate: string;
  processingLoad: number;
}

interface CommandSummary {
  activeOperations: number;
  logCount: number;
  permissionsStatus: string;
  lastCommand: string;
  securityLevel: string;
}

interface ProjectSummary {
  active: number;
  collaborators: number;
  pendingTasks: number;
  recentActivity: string;
}

interface AnalyticsSummary {
  codeEnhanced: number;
  timeSpent: string;
  optimizationTipsStatus: string;
  productivityScore: number;
}

interface SystemSummary {
  uptime: string;
  updatesPending: number;
  aiSettingsStatus: string;
  systemHealth: string;
}

interface HelpSummary {
  faqs: number;
  tutorials: number;
  tickets: number;
  lastSearched: string;
}

interface OperationalMonitorDisplayProps {
  shipStatus?: ShipStatus | null;
  nexusSummary?: AnalysisSummary | null;
  astranavSummary?: RouteSummary | null;
  cosmodataSummary?: DataSummary | null;
  commandSummary?: CommandSummary | null;
  projectSummary?: ProjectSummary | null;
  analyticsSummary?: AnalyticsSummary | null;
  systemSummary?: SystemSummary | null;
  helpSummary?: HelpSummary | null;
  language?: "ar" | "en";
}

// ===============================
// Main Component
// ===============================

const OperationalMonitorDisplay: FC<OperationalMonitorDisplayProps> = ({
  shipStatus,
  nexusSummary,
  astranavSummary,
  cosmodataSummary,
  commandSummary,
  projectSummary,
  analyticsSummary,
  systemSummary,
  helpSummary,
  language = "en",
}) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = (ar: string, en: string) => (language === "ar" ? ar : en);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine active section from route
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const sectionName = pathSegments[1] || "dashboard";
    setActiveSection(sectionName);
  }, [location]);

  // Mock data generator for demo purposes
  const generateMockData = useMemo(() => {
    return {
      shipStatus: shipStatus || {
        cpu: 68 + Math.sin(Date.now() / 10000) * 15,
        memory: 74 + Math.cos(Date.now() / 8000) * 10,
        network: 82 + Math.sin(Date.now() / 12000) * 8,
        power: 91 + Math.cos(Date.now() / 15000) * 5,
        temperature: 42 + Math.sin(Date.now() / 20000) * 8,
        efficiency: 87 + Math.cos(Date.now() / 18000) * 10,
      },
      nexusSummary: nexusSummary || {
        complexity: "Moderate",
        performance: "Excellent",
        suggestionsCount: 12,
        warningsCount: 3,
        linesAnalyzed: 2847,
      },
      astranavSummary: astranavSummary || {
        status: "En Route",
        eta: "02:37:15",
        hazardLevel: "Low",
        currentSystem: "Sol System",
        destination: "Alpha Centauri",
      },
      cosmodataSummary: cosmodataSummary || {
        nodes: 1247,
        connections: 3891,
        anomalies: 7,
        dataFlowRate: "2.4 TB/s",
        processingLoad: 73,
      },
      commandSummary: commandSummary || {
        activeOperations: 5,
        logCount: 127,
        permissionsStatus: "Secure",
        lastCommand: "scan current sector",
        securityLevel: "Alpha",
      },
      projectSummary: projectSummary || {
        active: 8,
        collaborators: 15,
        pendingTasks: 23,
        recentActivity: "12 min ago",
      },
      analyticsSummary: analyticsSummary || {
        codeEnhanced: 341,
        timeSpent: "47h 23m",
        optimizationTipsStatus: "Available",
        productivityScore: 94,
      },
      systemSummary: systemSummary || {
        uptime: "15d 7h 42m",
        updatesPending: 3,
        aiSettingsStatus: "Optimized",
        systemHealth: "Excellent",
      },
      helpSummary: helpSummary || {
        faqs: 156,
        tutorials: 42,
        tickets: 2,
        lastSearched: "AI integration",
      },
    };
  }, [
    shipStatus,
    nexusSummary,
    astranavSummary,
    cosmodataSummary,
    commandSummary,
    projectSummary,
    analyticsSummary,
    systemSummary,
    helpSummary,
  ]);

  // ===============================
  // Render Section Feeds
  // ===============================

  const renderSectionLiveFeed = () => {
    const data = generateMockData;

    switch (activeSection) {
      case "dashboard":
        return (
          <motion.div
            key="dashboard-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-6 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Cpu className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("المعالج", "CPU")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.shipStatus.cpu.toFixed(0)}%
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Database className="text-purple-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الذاكرة", "Memory")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.shipStatus.memory.toFixed(0)}%
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Wifi className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الشبكة", "Network")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.shipStatus.network.toFixed(0)}%
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Battery className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الطاقة", "Power")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.shipStatus.power.toFixed(0)}%
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Thermometer className="text-orange-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الحرارة", "Temp")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.shipStatus.temperature.toFixed(0)}°C
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Gauge className="text-blue-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الكفاءة", "Efficiency")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.shipStatus.efficiency.toFixed(0)}%
              </span>
            </div>
          </motion.div>
        );

      case "nexus":
        return (
          <motion.div
            key="nexus-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Brain className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("تحليل AI", "AI Analysis")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.nexusSummary.complexity}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lightbulb className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("اقتراحات", "Suggestions")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.nexusSummary.suggestionsCount}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="text-red-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("تحذيرات", "Warnings")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.nexusSummary.warningsCount}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Code className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("أداء الكود", "Performance")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.nexusSummary.performance}
              </span>
            </div>
          </motion.div>
        );

      case "navigation":
        return (
          <motion.div
            key="navigation-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Rocket className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("حالة المسار", "Route Status")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.astranavSummary.status}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الوقت المقدر", "ETA")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.astranavSummary.eta}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("مستوى المخاطر", "Hazard Level")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.astranavSummary.hazardLevel}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Target className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الوجهة", "Destination")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.astranavSummary.destination}
              </span>
            </div>
          </motion.div>
        );

      case "data-processing":
        return (
          <motion.div
            key="data-processing-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Network className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("عقد البيانات", "Data Nodes")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.cosmodataSummary.nodes.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <AlertTriangle className="text-red-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("شذوذات", "Anomalies")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.cosmodataSummary.anomalies}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <BarChart3 className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("معدل التدفق", "Flow Rate")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.cosmodataSummary.dataFlowRate}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Activity className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("حمل المعالجة", "Processing")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.cosmodataSummary.processingLoad}%
              </span>
            </div>
          </motion.div>
        );

      case "command":
        return (
          <motion.div
            key="command-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Terminal className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("عمليات نشطة", "Active Ops")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.commandSummary.activeOperations}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الأمان", "Security")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.commandSummary.securityLevel}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("سجل الأوامر", "Command Log")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.commandSummary.logCount}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الصلاحيات", "Permissions")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.commandSummary.permissionsStatus}
              </span>
            </div>
          </motion.div>
        );

      case "projects":
        return (
          <motion.div
            key="projects-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <FileCode className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("مشاريع نشطة", "Active Projects")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.projectSummary.active}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("متعاونون", "Collaborators")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.projectSummary.collaborators}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("مهام معلقة", "Pending Tasks")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.projectSummary.pendingTasks}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Activity className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("آخر نشاط", "Last Activity")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.projectSummary.recentActivity}
              </span>
            </div>
          </motion.div>
        );

      case "analytics":
        return (
          <motion.div
            key="analytics-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Code className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("كود مُحسّن", "Code Enhanced")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.analyticsSummary.codeEnhanced}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Clock className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("الوقت المستغرق", "Time Spent")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.analyticsSummary.timeSpent}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("نقاط الإنتاجية", "Productivity")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.analyticsSummary.productivityScore}%
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Lightbulb className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("نصائح AI", "AI Tips")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.analyticsSummary.optimizationTipsStatus}
              </span>
            </div>
          </motion.div>
        );

      case "settings":
        return (
          <motion.div
            key="settings-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Settings
                className="text-cyan-400 text-2xl mb-1 animate-spin"
                style={{ animationDuration: "4s" }}
              />
              <span className="text-xs text-muted-foreground">
                {t("وقت التشغيل", "System Uptime")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.systemSummary.uptime}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Download className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("تحديثات معلقة", "Updates Pending")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.systemSummary.updatesPending}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Brain className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("إعدادات AI", "AI Settings")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.systemSummary.aiSettingsStatus}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("صحة النظام", "System Health")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.systemSummary.systemHealth}
              </span>
            </div>
          </motion.div>
        );

      case "help":
        return (
          <motion.div
            key="help-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <HelpCircle className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("قاعدة المعرفة", "Knowledge Base")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.helpSummary.faqs}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Eye className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("دروس فيديو", "Tutorials")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.helpSummary.tutorials}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("طلبات الدعم", "Support Tickets")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.helpSummary.tickets}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Globe className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("آخر بحث", "Last Search")}
              </span>
              <span className="text-sm font-bold text-primary truncate w-20">
                {data.helpSummary.lastSearched}
              </span>
            </div>
          </motion.div>
        );

      case "about":
        return (
          <motion.div
            key="about-feed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full h-full grid grid-cols-4 gap-6 items-center justify-center px-4"
          >
            <div className="flex flex-col items-center text-center">
              <Info className="text-cyan-400 text-2xl mb-1 animate-pulse" />
              <span className="text-xs text-muted-foreground">
                {t("الإصدار", "Version")}
              </span>
              <span className="text-lg font-bold text-primary">v2.0.0</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Star className="text-yellow-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("كود مُحسّن (إجمالي)", "Total Enhanced")}
              </span>
              <span className="text-lg font-bold text-primary">
                {data.analyticsSummary.codeEnhanced}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="text-violet-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("مستخدمون نشطون", "Active Users")}
              </span>
              <span className="text-lg font-bold text-primary">15,420</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Rocket className="text-green-400 text-2xl mb-1" />
              <span className="text-xs text-muted-foreground">
                {t("حالة المهمة", "Mission Status")}
              </span>
              <span className="text-lg font-bold text-primary">Active</span>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default-feed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Settings
              className="text-primary/50 text-4xl animate-spin mr-4"
              style={{ animationDuration: "3s" }}
            />
            <span className="text-xl font-bold text-primary">
              {t("جارٍ تحميل وحدة المراقبة...", "Loading Monitoring Unit...")}
            </span>
          </motion.div>
        );
    }
  };

  return (
    <Card
      className="w-full h-32 relative overflow-hidden border border-violet-500/30 shadow-lg"
      style={{
        background: `linear-gradient(135deg, 
              rgba(0, 0, 0, 0.8) 0%, 
              rgba(16, 16, 32, 0.9) 50%, 
              rgba(0, 0, 0, 0.8) 100%),
              radial-gradient(circle at 20% 50%, rgba(0, 255, 213, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(120, 58, 237, 0.1) 0%, transparent 50%)`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: `
              0 0 20px rgba(120, 58, 237, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 8px 32px rgba(0, 0, 0, 0.5)
            `,
      }}
    >
      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(90deg, 
               rgba(0, 255, 213, 0.8) 0%, 
               rgba(120, 58, 237, 0.8) 50%, 
               rgba(0, 255, 213, 0.8) 100%)`,
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "exclude",
          animation: "borderShift 4s linear infinite",
        }}
      />

      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 213, 0.3) 2px, rgba(0, 255, 213, 0.3) 4px)",
            animation: "scanlines 2s linear infinite",
          }}
        />
      </div>

      {/* Status indicators */}
      <div className="absolute top-2 left-3 flex items-center gap-2">
        <div
          className="text-xs font-mono text-cyan-400 animate-pulse"
          style={{ textShadow: "0 0 10px rgba(0, 255, 213, 0.8)" }}
        >
          [LIVE DATA FEED]
        </div>
        <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
      </div>

      {/* Section indicator */}
      <div className="absolute top-2 right-3 flex items-center gap-2">
        <div
          className="text-xs font-mono text-violet-400"
          style={{ textShadow: "0 0 10px rgba(120, 58, 237, 0.8)" }}
        >
          [{activeSection.toUpperCase()}]
        </div>
      </div>

      {/* Time indicator */}
      <div className="absolute bottom-2 left-3 text-xs font-mono text-muted-foreground">
        {currentTime.toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
        })}{" "}
        UTC
      </div>

      {/* Connection status */}
      <div className="absolute bottom-2 right-3 flex items-center gap-1">
        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-green-400">ONLINE</span>
      </div>

      {/* Main content area */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">{renderSectionLiveFeed()}</AnimatePresence>
      </div>

      {/* Add custom CSS keyframes */}
      <style jsx>{`
        @keyframes borderShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scanlines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </Card>
  );
};

export default OperationalMonitorDisplay;
