/**
 * KnouxCore - مركز إدارة المشاريع "ProjectHub"
 * واجهة إدارة المشاريع مع بطاقات هولوجرافية وتعاون مباشر + ذكاء اصطناعي متقدم
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HolographicCard,
  DataNode,
  HolographicProgressBar,
} from "@/components/effects/HolographicCard";
import {
  dataSimulationEngine,
  type DataStream,
  type AIModelStatus,
  type RealTimeMetrics,
} from "@/utils/dataSimulation";
import { cn } from "@/lib/utils";
import {
  FolderPlus,
  Folder,
  Users,
  Star,
  Calendar,
  Code,
  Trash2,
  Eye,
  GitBranch,
  Activity,
  Tag,
  Clock,
  Zap,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Brain,
  Cpu,
  Database,
  Network,
  Shield,
  Gauge,
  Bot,
  Wifi,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Circle,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  collaborators: Collaborator[];
  tags: string[];
  lastModified: string;
  progress: number;
  status: "active" | "completed" | "paused";
  starred: boolean;
  filesCount: number;
  linesOfCode: number;
  aiAssistance: {
    codeOptimization: number;
    bugDetection: number;
    performanceScore: number;
    securityRating: number;
  };
  realTimeMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    buildTime: number;
    testCoverage: number;
  };
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "typing";
  role: "owner" | "editor" | "viewer";
  lastActivity: string;
}

const ProjectManagementHub: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"modified" | "name" | "progress">(
    "modified",
  );

  // Real-time data state
  const [realTimeData, setRealTimeData] = useState<{
    dataStreams: DataStream[];
    aiModels: AIModelStatus[];
    metrics: RealTimeMetrics;
    timestamp: Date;
  } | null>(null);

  const [showAIPanel, setShowAIPanel] = useState(false);
  const [selectedView, setSelectedView] = useState<
    "projects" | "ai_models" | "data_streams"
  >("projects");

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    language: "javascript",
    template: "blank",
  });

  // بيانات المشاريع الأولية مع ذكاء اصطناعي ومقاييس في الوقت الفعلي
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: "1",
        name: "Quantum Navigation System",
        description: "نظام ملاحة كمي متقدم للسفر بين النجوم",
        language: "TypeScript",
        collaborators: [
          {
            id: "1",
            name: "Alpha Commander",
            avatar: "AC",
            status: "online",
            role: "owner",
            lastActivity: "الآن",
          },
          {
            id: "2",
            name: "Beta Navigator",
            avatar: "BN",
            status: "typing",
            role: "editor",
            lastActivity: "منذ دقيقة",
          },
        ],
        tags: ["navigation", "quantum", "ai"],
        lastModified: "منذ دقيقتين",
        progress: 78,
        status: "active",
        starred: true,
        filesCount: 24,
        linesOfCode: 3420,
        aiAssistance: {
          codeOptimization: 94,
          bugDetection: 87,
          performanceScore: 91,
          securityRating: 96,
        },
        realTimeMetrics: {
          cpuUsage: 23,
          memoryUsage: 45,
          buildTime: 12.7,
          testCoverage: 89,
        },
      },
      {
        id: "2",
        name: "Data Encryption Core",
        description: "نواة تشفير البيانات الكونية المتقدمة",
        language: "Rust",
        collaborators: [
          {
            id: "3",
            name: "Gamma Security",
            avatar: "GS",
            status: "online",
            role: "owner",
            lastActivity: "منذ 5 دقائق",
          },
        ],
        tags: ["security", "encryption", "core"],
        lastModified: "منذ ساعة",
        progress: 45,
        status: "active",
        starred: false,
        filesCount: 18,
        linesOfCode: 2100,
        aiAssistance: {
          codeOptimization: 78,
          bugDetection: 92,
          performanceScore: 85,
          securityRating: 98,
        },
        realTimeMetrics: {
          cpuUsage: 67,
          memoryUsage: 34,
          buildTime: 8.3,
          testCoverage: 94,
        },
      },
      {
        id: "3",
        name: "AI Communication Interface",
        description: "واجهة تواصل ذكية مع الكيانات الفضائية",
        language: "Python",
        collaborators: [
          {
            id: "4",
            name: "Delta AI",
            avatar: "DA",
            status: "offline",
            role: "owner",
            lastActivity: "منذ 3 ساعات",
          },
          {
            id: "5",
            name: "Epsilon Linguist",
            avatar: "EL",
            status: "online",
            role: "editor",
            lastActivity: "منذ 10 دقائق",
          },
        ],
        tags: ["ai", "communication", "nlp"],
        lastModified: "أمس",
        progress: 92,
        status: "completed",
        starred: true,
        filesCount: 31,
        linesOfCode: 4850,
        aiAssistance: {
          codeOptimization: 97,
          bugDetection: 95,
          performanceScore: 93,
          securityRating: 88,
        },
        realTimeMetrics: {
          cpuUsage: 12,
          memoryUsage: 28,
          buildTime: 15.2,
          testCoverage: 97,
        },
      },
    ];

    setProjects(sampleProjects);
  }, []);

  // Initialize and subscribe to real-time data
  useEffect(() => {
    dataSimulationEngine.startSimulation();

    const unsubscribe = dataSimulationEngine.subscribe((data) => {
      setRealTimeData(data);

      // Update project metrics with simulated real-time data
      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          realTimeMetrics: {
            cpuUsage: Math.max(
              0,
              Math.min(
                100,
                project.realTimeMetrics.cpuUsage + (Math.random() - 0.5) * 10,
              ),
            ),
            memoryUsage: Math.max(
              0,
              Math.min(
                100,
                project.realTimeMetrics.memoryUsage + (Math.random() - 0.5) * 8,
              ),
            ),
            buildTime: Math.max(
              1,
              project.realTimeMetrics.buildTime + (Math.random() - 0.5) * 2,
            ),
            testCoverage: Math.max(
              0,
              Math.min(
                100,
                project.realTimeMetrics.testCoverage +
                  (Math.random() - 0.5) * 3,
              ),
            ),
          },
        })),
      );
    });

    return () => {
      unsubscribe();
      dataSimulationEngine.stopSimulation();
    };
  }, []);

  // تحديث حالة المتعاونين في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          collaborators: project.collaborators.map((collab) => ({
            ...collab,
            status:
              Math.random() > 0.8 && collab.status === "online"
                ? "typing"
                : Math.random() > 0.9
                  ? "offline"
                  : "online",
          })),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFilteredProjects = () => {
    let filtered = projects;

    // فلترة حسب الحالة
    if (selectedFilter !== "all") {
      filtered = filtered.filter((p) => p.status === selectedFilter);
    }

    // فلترة حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // ترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "progress":
          return b.progress - a.progress;
        default:
          return (
            new Date(b.lastModified).getTime() -
            new Date(a.lastModified).getTime()
          );
      }
    });

    return filtered;
  };

  const createProject = () => {
    if (!newProject.name.trim()) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      language: newProject.language,
      collaborators: [
        {
          id: "owner",
          name: "You",
          avatar: "YU",
          status: "online",
          role: "owner",
          lastActivity: "الآن",
        },
      ],
      tags: [],
      lastModified: "الآن",
      progress: 0,
      status: "active",
      starred: false,
      filesCount: 0,
      linesOfCode: 0,
      aiAssistance: {
        codeOptimization: Math.floor(Math.random() * 30) + 70,
        bugDetection: Math.floor(Math.random() * 25) + 75,
        performanceScore: Math.floor(Math.random() * 35) + 65,
        securityRating: Math.floor(Math.random() * 20) + 80,
      },
      realTimeMetrics: {
        cpuUsage: Math.floor(Math.random() * 30) + 10,
        memoryUsage: Math.floor(Math.random() * 40) + 20,
        buildTime: Math.random() * 10 + 5,
        testCoverage: Math.floor(Math.random() * 30) + 70,
      },
    };

    setProjects((prev) => [project, ...prev]);
    setNewProject({
      name: "",
      description: "",
      language: "javascript",
      template: "blank",
    });
    setShowNewProjectDialog(false);
  };

  const toggleStar = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, starred: !p.starred } : p)),
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6",
      Python: "#3776ab",
      Rust: "#ce422b",
      Go: "#00add8",
      Java: "#ed8b00",
      "C++": "#00599c",
      React: "#61dafb",
    };
    return colors[language] || "#6b7280";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "completed":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "paused":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
      {/* خلفية الكواكب والنجوم */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* النجوم */}
        {Array.from({ length: 60 }).map((_, i) => (
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
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* الكويكبات المتحركة */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? "#4f46e5" : i % 3 === 1 ? "#7c3aed" : "#06b6d4"
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
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
              <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
                <Folder className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Project Management Hub
                </h1>
                <p className="text-slate-400">
                  مركز إدارة المشاريع الفضائية مع ذكاء اصطناعي متقدم
                </p>
                {realTimeData && (
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-green-400">
                      <Circle className="w-2 h-2 fill-current" />
                      <span>
                        AI Models:{" "}
                        {
                          realTimeData.aiModels.filter(
                            (m) => m.status === "active",
                          ).length
                        }{" "}
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-400">
                      <Database className="w-3 h-3" />
                      <span>
                        Data Streams: {realTimeData.dataStreams.length} Live
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-violet-400">
                      <Cpu className="w-3 h-3" />
                      <span>
                        System Load:{" "}
                        {realTimeData.metrics.systemLoad.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-slate-800/50 rounded-lg p-1 border border-slate-600/30">
                {[
                  { id: "projects", label: "Projects", icon: Folder },
                  { id: "ai_models", label: "AI Models", icon: Brain },
                  { id: "data_streams", label: "Data Streams", icon: Database },
                ].map(({ id, label, icon: Icon }) => (
                  <Button
                    key={id}
                    onClick={() => setSelectedView(id as any)}
                    size="sm"
                    variant={selectedView === id ? "default" : "ghost"}
                    className={cn(
                      "px-3 py-1 text-xs",
                      selectedView === id
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-slate-700",
                    )}
                  >
                    <Icon className="w-3 h-3 mr-1" />
                    {label}
                  </Button>
                ))}
              </div>

              <Button
                onClick={() => setShowAIPanel(!showAIPanel)}
                size="sm"
                variant="outline"
                className="border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Panel
              </Button>

              <Button
                onClick={() => setShowNewProjectDialog(true)}
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0"
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                مشروع جديد
              </Button>
            </div>
          </div>

          {/* شريط البحث والفلاتر */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="البحث في المشاريع..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { id: "all", label: "الكل" },
                { id: "active", label: "نشط" },
                { id: "completed", label: "مكتمل" },
                { id: "paused", label: "متوقف" },
              ].map((filter) => (
                <Button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  size="sm"
                  variant={selectedFilter === filter.id ? "default" : "outline"}
                  className={
                    selectedFilter === filter.id
                      ? "bg-indigo-600 text-white"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800/50 border border-slate-600/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
            >
              <option value="modified">آخر تعديل</option>
              <option value="name">الاسم</option>
              <option value="progress">التقدم</option>
            </select>
          </div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <HolographicCard glowIntensity="medium" className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">
                  {projects.length}
                </div>
                <div className="text-sm text-slate-400">إجمالي المشاريع</div>
              </div>
            </HolographicCard>
            <HolographicCard glowIntensity="medium" className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {projects.filter((p) => p.status === "active").length}
                </div>
                <div className="text-sm text-slate-400">مشاريع نشطة</div>
              </div>
            </HolographicCard>
            <HolographicCard glowIntensity="medium" className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-sm text-slate-400">مكتملة</div>
              </div>
            </HolographicCard>
            <HolographicCard glowIntensity="medium" className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {projects.reduce((acc, p) => acc + p.collaborators.length, 0)}
                </div>
                <div className="text-sm text-slate-400">متعاونين</div>
              </div>
            </HolographicCard>
          </div>

          {/* AI Insights Panel */}
          <AnimatePresence>
            {showAIPanel && realTimeData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <HolographicCard
                  glowIntensity="high"
                  dataStreamEffect={true}
                  hologramDistortion={true}
                  className="p-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AI Models Status */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-violet-300 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        AI Models Status
                      </h3>
                      <div className="space-y-3">
                        {realTimeData.aiModels.slice(0, 3).map((model) => (
                          <div key={model.id} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-300">
                                {model.name.split(" - ")[0]}
                              </span>
                              <span
                                className={cn(
                                  "px-2 py-1 rounded text-xs",
                                  model.status === "active"
                                    ? "bg-green-400/20 text-green-400"
                                    : model.status === "training"
                                      ? "bg-yellow-400/20 text-yellow-400"
                                      : "bg-gray-400/20 text-gray-400",
                                )}
                              >
                                {model.status}
                              </span>
                            </div>
                            <HolographicProgressBar
                              value={model.accuracy}
                              max={100}
                              color="violet"
                              animated={model.status === "active"}
                              className="h-2"
                            />
                            <div className="text-xs text-slate-400">
                              Accuracy: {model.accuracy.toFixed(1)}% | Latency:{" "}
                              {model.latency}ms
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Real-time Data Streams */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Live Data Streams
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {realTimeData.dataStreams.slice(0, 4).map((stream) => (
                          <DataNode
                            key={stream.id}
                            label={stream.name.split(" ")[0]}
                            value={`${stream.value.toFixed(1)}${stream.unit}`}
                            status={
                              stream.health === "optimal"
                                ? "active"
                                : stream.health === "warning"
                                  ? "warning"
                                  : "error"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* System Metrics */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-green-300 flex items-center gap-2">
                        <Gauge className="w-5 h-5" />
                        System Metrics
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">System Load</span>
                            <span className="text-green-400">
                              {realTimeData.metrics.systemLoad.toFixed(1)}%
                            </span>
                          </div>
                          <HolographicProgressBar
                            value={realTimeData.metrics.systemLoad}
                            max={100}
                            color="green"
                            animated={true}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">
                              AI Processing Rate
                            </span>
                            <span className="text-cyan-400">
                              {realTimeData.metrics.dataProcessingRate}
                            </span>
                          </div>
                          <HolographicProgressBar
                            value={realTimeData.metrics.dataProcessingRate}
                            max={5000}
                            color="cyan"
                            animated={true}
                          />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">
                              Quantum Coherence
                            </span>
                            <span className="text-violet-400">
                              {realTimeData.metrics.quantumCoherence.toFixed(1)}
                              %
                            </span>
                          </div>
                          <HolographicProgressBar
                            value={realTimeData.metrics.quantumCoherence}
                            max={100}
                            color="violet"
                            animated={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Predictions */}
                  {realTimeData.aiModels.some((m) => m.lastPrediction) && (
                    <div className="mt-6 pt-6 border-t border-slate-600/30">
                      <h4 className="text-md font-semibold text-blue-300 flex items-center gap-2 mb-4">
                        <Bot className="w-4 h-4" />
                        Latest AI Predictions
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {realTimeData.aiModels
                          .filter((m) => m.lastPrediction)
                          .slice(0, 2)
                          .map((model) => (
                            <div
                              key={model.id}
                              className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/20"
                            >
                              <div className="text-sm font-medium text-blue-300 mb-2">
                                {model.name.split(" - ")[0]}
                              </div>
                              <div className="text-xs text-slate-400 mb-1">
                                Input: {model.lastPrediction!.input}
                              </div>
                              <div className="text-xs text-slate-200 mb-2">
                                Output: {model.lastPrediction!.output}
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-green-400">
                                  Confidence:{" "}
                                  {model.lastPrediction!.confidence.toFixed(1)}%
                                </span>
                                <span className="text-slate-500">
                                  {new Date(
                                    model.lastPrediction!.timestamp,
                                  ).toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </HolographicCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* شبكة المشاريع أو العروض البديلة */}
        {selectedView === "projects" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getFilteredProjects().map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <HolographicCard
                  glowIntensity="medium"
                  scanlineEffect={true}
                  interactiveGlow={true}
                  hologramDistortion={project.status === "active"}
                  className="h-full"
                >
                  <div className="p-6">
                    {/* رأس المشروع */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold border-2"
                          style={{
                            backgroundColor:
                              getLanguageColor(project.language) + "20",
                            borderColor:
                              getLanguageColor(project.language) + "50",
                            color: getLanguageColor(project.language),
                          }}
                        >
                          <Code className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>{project.language}</span>
                            <span>•</span>
                            <span>{project.filesCount} ملف</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => toggleStar(project.id)}
                        size="sm"
                        variant="ghost"
                        className="p-1"
                      >
                        <Star
                          className={`w-4 h-4 ${project.starred ? "text-yellow-400 fill-yellow-400" : "text-slate-400"}`}
                        />
                      </Button>
                    </div>

                    {/* وصف المشروع */}
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* AI Assistance Metrics */}
                    <div className="mb-4 p-3 bg-slate-800/30 rounded-lg border border-violet-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-4 h-4 text-violet-400" />
                        <span className="text-sm font-medium text-violet-300">
                          AI Assistant
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Code Opt.</span>
                            <span className="text-green-400">
                              {project.aiAssistance.codeOptimization}%
                            </span>
                          </div>
                          <HolographicProgressBar
                            value={project.aiAssistance.codeOptimization}
                            max={100}
                            color="green"
                            animated={project.status === "active"}
                            className="h-1"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Security</span>
                            <span className="text-blue-400">
                              {project.aiAssistance.securityRating}%
                            </span>
                          </div>
                          <HolographicProgressBar
                            value={project.aiAssistance.securityRating}
                            max={100}
                            color="cyan"
                            animated={project.status === "active"}
                            className="h-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Real-time Metrics */}
                    <div className="mb-4 p-3 bg-slate-800/30 rounded-lg border border-cyan-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Gauge className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">
                          Live Metrics
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <DataNode
                          label="CPU"
                          value={`${project.realTimeMetrics.cpuUsage.toFixed(0)}%`}
                          status={
                            project.realTimeMetrics.cpuUsage > 80
                              ? "warning"
                              : "active"
                          }
                          className="text-xs p-2"
                        />
                        <DataNode
                          label="Memory"
                          value={`${project.realTimeMetrics.memoryUsage.toFixed(0)}%`}
                          status={
                            project.realTimeMetrics.memoryUsage > 85
                              ? "warning"
                              : "active"
                          }
                          className="text-xs p-2"
                        />
                      </div>
                    </div>

                    {/* شريط التقدم */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">التقدم</span>
                        <span className="text-sm text-indigo-400 font-semibold">
                          {project.progress}%
                        </span>
                      </div>
                      <HolographicProgressBar
                        value={project.progress}
                        max={100}
                        color="violet"
                        animated={project.status === "active"}
                      />
                    </div>

                    {/* العلامات */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-md border border-indigo-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* المتعاونون */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <div className="flex -space-x-2">
                          {project.collaborators.slice(0, 3).map((collab) => (
                            <motion.div
                              key={collab.id}
                              className="relative"
                              whileHover={{ scale: 1.1, z: 10 }}
                            >
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold border-2 border-slate-900">
                                {collab.avatar}
                              </div>
                              {/* حالة النشاط */}
                              <div
                                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900 ${
                                  collab.status === "online"
                                    ? "bg-green-400"
                                    : collab.status === "typing"
                                      ? "bg-yellow-400"
                                      : "bg-gray-400"
                                }`}
                              >
                                {collab.status === "typing" && (
                                  <motion.div
                                    className="w-full h-full rounded-full bg-yellow-400"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                    }}
                                  />
                                )}
                              </div>
                            </motion.div>
                          ))}
                          {project.collaborators.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-semibold border-2 border-slate-900">
                              +{project.collaborators.length - 3}
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(project.status)}`}
                      >
                        {project.status === "active" && "نشط"}
                        {project.status === "completed" && "مكتمل"}
                        {project.status === "paused" && "مت��قف"}
                      </div>
                    </div>

                    {/* معلومات إضافية */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{project.lastModified}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        <span>{project.linesOfCode.toLocaleString()} سطر</span>
                      </div>
                    </div>

                    {/* أزرار التحكم */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white border-0"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        فتح
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <GitBranch className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteProject(project.id)}
                        className="border-red-600/30 text-red-400 hover:bg-red-600/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}

            {/* رسالة عدم وجود مشاريع */}
            {getFilteredProjects().length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-16"
              >
                <Folder className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">
                  لا توجد مشاريع
                </h3>
                <p className="text-slate-400 mb-6">
                  ابدأ رحلتك الفضائية بإنشاء مشروعك الأول
                </p>
                <Button
                  onClick={() => setShowNewProjectDialog(true)}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0"
                >
                  <FolderPlus className="w-4 h-4 mr-2" />
                  إنشاء مشروع جديد
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* AI Models View */}
        {selectedView === "ai_models" && realTimeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {realTimeData.aiModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HolographicCard
                  glowIntensity="high"
                  dataStreamEffect={true}
                  className="h-full"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30">
                          <Brain className="w-6 h-6 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {model.name.split(" - ")[0]}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {model.type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "px-2 py-1 rounded text-xs font-semibold",
                          model.status === "active"
                            ? "bg-green-400/20 text-green-400"
                            : model.status === "training"
                              ? "bg-yellow-400/20 text-yellow-400"
                              : model.status === "error"
                                ? "bg-red-400/20 text-red-400"
                                : "bg-gray-400/20 text-gray-400",
                        )}
                      >
                        {model.status}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-300">Accuracy</span>
                          <span className="text-green-400">
                            {model.accuracy.toFixed(1)}%
                          </span>
                        </div>
                        <HolographicProgressBar
                          value={model.accuracy}
                          max={100}
                          color="green"
                          animated={model.status === "active"}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <DataNode
                          label="Latency"
                          value={`${model.latency}ms`}
                          status={model.latency > 300 ? "warning" : "active"}
                        />
                        <DataNode
                          label="Throughput"
                          value={model.throughput.toString()}
                          status="active"
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-300">
                          Resource Usage
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">CPU</span>
                              <span className="text-cyan-400">
                                {model.resourceUsage.cpu.toFixed(0)}%
                              </span>
                            </div>
                            <HolographicProgressBar
                              value={model.resourceUsage.cpu}
                              max={100}
                              color="cyan"
                              animated={model.status === "active"}
                              className="h-1"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">GPU</span>
                              <span className="text-violet-400">
                                {model.resourceUsage.gpu.toFixed(0)}%
                              </span>
                            </div>
                            <HolographicProgressBar
                              value={model.resourceUsage.gpu}
                              max={100}
                              color="violet"
                              animated={model.status === "active"}
                              className="h-1"
                            />
                          </div>
                        </div>
                      </div>

                      {model.lastPrediction && (
                        <div className="bg-slate-800/30 rounded-lg p-3 border border-blue-500/20">
                          <h4 className="text-xs font-medium text-blue-300 mb-2">
                            Latest Prediction
                          </h4>
                          <div className="text-xs text-slate-400 mb-1">
                            Input: {model.lastPrediction.input}
                          </div>
                          <div className="text-xs text-slate-200 mb-2">
                            Output: {model.lastPrediction.output}
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-green-400">
                              Confidence:{" "}
                              {model.lastPrediction.confidence.toFixed(1)}%
                            </span>
                            <span className="text-slate-500">
                              {new Date(
                                model.lastPrediction.timestamp,
                              ).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Data Streams View */}
        {selectedView === "data_streams" && realTimeData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {realTimeData.dataStreams.map((stream, index) => (
              <motion.div
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <HolographicCard
                  glowIntensity="medium"
                  scanlineEffect={true}
                  className="h-full"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                          <Database className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {stream.name}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {stream.type.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "px-2 py-1 rounded text-xs font-semibold",
                          stream.health === "optimal"
                            ? "bg-green-400/20 text-green-400"
                            : stream.health === "warning"
                              ? "bg-yellow-400/20 text-yellow-400"
                              : "bg-red-400/20 text-red-400",
                        )}
                      >
                        {stream.health}
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">
                        {stream.value.toFixed(1)}
                      </div>
                      <div className="text-sm text-slate-400">
                        {stream.unit}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Trend</span>
                        <div className="flex items-center gap-1">
                          {stream.trend === "increasing" && (
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          )}
                          {stream.trend === "decreasing" && (
                            <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
                          )}
                          {stream.trend === "stable" && (
                            <Circle className="w-4 h-4 text-blue-400" />
                          )}
                          {stream.trend === "volatile" && (
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          )}
                          <span
                            className={cn(
                              "text-xs capitalize",
                              stream.trend === "increasing"
                                ? "text-green-400"
                                : stream.trend === "decreasing"
                                  ? "text-red-400"
                                  : stream.trend === "stable"
                                    ? "text-blue-400"
                                    : "text-yellow-400",
                            )}
                          >
                            {stream.trend}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-slate-300 mb-2">
                          History (last 20 points)
                        </div>
                        <div className="h-16 bg-slate-800/30 rounded-lg p-2 border border-slate-600/30">
                          <div className="flex items-end justify-between h-full">
                            {stream.history.slice(-20).map((value, i) => (
                              <div
                                key={i}
                                className="bg-cyan-400 opacity-60 rounded-sm min-w-[2px]"
                                style={{
                                  height: `${Math.max(2, (value / Math.max(...stream.history)) * 100)}%`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400">
                        Last updated: {stream.lastUpdate.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </HolographicCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* نافذة إنشاء مشروع جديد */}
        <AnimatePresence>
          {showNewProjectDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-md w-full"
              >
                <Card className="bg-slate-900/95 backdrop-blur-xl border-indigo-500/30 shadow-2xl shadow-indigo-500/20">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <FolderPlus className="w-6 h-6 text-indigo-400" />
                      <h3 className="text-xl font-bold text-indigo-300">
                        مشروع فضائي جديد
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-slate-400 text-sm block mb-2">
                          اسم المشروع
                        </label>
                        <input
                          type="text"
                          value={newProject.name}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="مشروع الاستكشاف الكوني..."
                          className="w-full bg-slate-800/50 border border-indigo-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 text-sm block mb-2">
                          الوصف
                        </label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="وصف موجز للمشروع..."
                          rows={3}
                          className="w-full bg-slate-800/50 border border-indigo-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-slate-400 text-sm block mb-2">
                          لغة البرمجة
                        </label>
                        <select
                          value={newProject.language}
                          onChange={(e) =>
                            setNewProject((prev) => ({
                              ...prev,
                              language: e.target.value,
                            }))
                          }
                          className="w-full bg-slate-800/50 border border-indigo-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-400"
                        >
                          <option value="javascript">JavaScript</option>
                          <option value="typescript">TypeScript</option>
                          <option value="python">Python</option>
                          <option value="rust">Rust</option>
                          <option value="go">Go</option>
                          <option value="java">Java</option>
                          <option value="cpp">C++</option>
                          <option value="react">React</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        onClick={createProject}
                        disabled={!newProject.name.trim()}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-0"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        إنشاء المشروع
                      </Button>
                      <Button
                        onClick={() => setShowNewProjectDialog(false)}
                        variant="outline"
                        className="border-slate-500/30 bg-slate-500/10 text-slate-300"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectManagementHub;
