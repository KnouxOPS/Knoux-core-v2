/**
 * KnouxCore Nexus - محرر الأكواد الذكي المتقدم
 * محرر مدعوم بالذكاء الاصطناعي مع تأثيرات هولوجرافية فضائية
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  HolographicCard,
  HolographicProgressBar,
} from "@/components/effects/HolographicCard";
import { NexusIcon } from "@/components/icons/KnouxCoreIcons";
import {
  CodexPrimeAssistant,
  CodeCompletionSuggestions,
  ErrorsAndWarningsPanel,
  GitIntegrationPanel,
  CollaborationPanel,
} from "@/components/nexus/CodeEditorComponents";
import {
  nexusAI,
  type CodeAnalysis,
  type CodeCompletion,
  type CollaboratorStatus,
  type NexusStatistics,
} from "@/services/nexusAI";
import { cn } from "@/lib/utils";
import {
  Play,
  Square,
  RotateCcw,
  Save,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Terminal,
  FileText,
  Sparkles,
  Zap,
  Activity,
  TrendingUp,
  Clock,
  Code2,
  Brain,
  GitBranch,
  Users,
  BarChart3,
  Target,
  Lightbulb,
  Cpu,
  Shield,
  Gauge,
} from "lucide-react";

interface EditorState {
  code: string;
  language: string;
  theme: string;
  fontSize: number;
  showLineNumbers: boolean;
  wordWrap: boolean;
  autoSave: boolean;
}

interface CursorPosition {
  line: number;
  character: number;
}

const NexusCodeEditor: React.FC = () => {
  const { toast } = useToast();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Core Editor State
  const [editorState, setEditorState] = useState<EditorState>({
    code: `// 🚀 مرحباً بك في محرر Nexus الذكي
// محرر أكواد متقدم مدعوم بالذكاء الاصطناعي

function greetUser(name) {
  console.log(\`مرحباً \${name}! أهلاً بك في عالم البرمجة الفضائي\`);
  
  // TODO: إضافة المزيد من الميزات
  const spaceship = {
    name: "KnouxCore",
    mission: "استكشاف الكون الرقمي",
    ai: "Codex Prime"
  };
  
  return spaceship;
}

// تجربة مع Codex Prime AI
greetUser("مطور فضائي");`,
    language: "javascript",
    theme: "cosmic-dark",
    fontSize: 14,
    showLineNumbers: true,
    wordWrap: true,
    autoSave: true,
  });

  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    line: 1,
    character: 0,
  });
  const [statistics, setStatistics] = useState<NexusStatistics | null>(null);

  // AI Integration State
  const [isProcessing, setIsProcessing] = useState(false);
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysis | null>(null);
  const [completionSuggestions, setCompletionSuggestions] =
    useState<CodeCompletion | null>(null);
  const [showCompletions, setShowCompletions] = useState(false);
  const [completionPosition, setCompletionPosition] = useState({
    top: 0,
    left: 0,
  });

  // Collaboration State
  const [collaborators, setCollaborators] = useState<CollaboratorStatus[]>([]);

  // UI State
  const [activePanel, setActivePanel] = useState<
    "analysis" | "git" | "collaboration" | "analytics" | null
  >(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [output, setOutput] = useState("");
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  // AI Services Integration
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Load user statistics
        const userStats =
          await nexusAI.insights.getUserStatistics("current-user");
        setStatistics(userStats);

        // Load collaborators
        const collabIds = ["user1", "user2", "user3"];
        const collabData = await Promise.all(
          collabIds.map((id) => nexusAI.teamSync.getCollaboratorStatus(id)),
        );
        setCollaborators(collabData.filter(Boolean) as CollaboratorStatus[]);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, []);

  // Real-time collaboration updates
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedCollaborators =
          await nexusAI.teamSync.getAllCollaborators();
        setCollaborators(updatedCollaborators);
      } catch (error) {
        console.error("Error updating collaborators:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (editorState.autoSave) {
      const saveTimer = setTimeout(() => {
        localStorage.setItem("nexus-code", JSON.stringify(editorState));
      }, 2000);

      return () => clearTimeout(saveTimer);
    }
  }, [editorState]);

  // Load saved code on mount
  useEffect(() => {
    const savedCode = localStorage.getItem("nexus-code");
    if (savedCode) {
      try {
        const parsed = JSON.parse(savedCode);
        setEditorState((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Error loading saved code:", error);
      }
    }
  }, []);

  // Code change handler with AI integration
  const handleCodeChange = useCallback(
    async (newCode: string) => {
      setEditorState((prev) => ({ ...prev, code: newCode }));

      // Update statistics
      if (statistics) {
        setStatistics((prev) =>
          prev
            ? {
                ...prev,
                timeSpent: prev.timeSpent + 1,
                lastActive: new Date().toISOString(),
              }
            : null,
        );
      }

      // Trigger AI analysis after a delay
      const analysisTimer = setTimeout(async () => {
        try {
          const analysis = await nexusAI.codex.analyzeCode(
            newCode,
            editorState.language,
          );
          setCodeAnalysis(analysis);
        } catch (error) {
          console.error("Error analyzing code:", error);
        }
      }, 1500);

      return () => clearTimeout(analysisTimer);
    },
    [editorState.language, statistics],
  );

  // Cursor position tracking
  const handleCursorMove = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = e.target;
      const cursorPos = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPos);
      const lines = textBeforeCursor.split("\n");
      const line = lines.length;
      const character = lines[lines.length - 1].length;

      setCursorPosition({ line, character });
    },
    [],
  );

  // Code completion handler
  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case " ": // Ctrl+Space for completions
            e.preventDefault();
            try {
              const completions = await nexusAI.codex.getCodeCompletions(
                editorState.code,
                cursorPosition,
                editorState.language,
              );
              setCompletionSuggestions(completions);
              setShowCompletions(true);

              // Calculate position for completion popup
              const textarea = e.currentTarget;
              const rect = textarea.getBoundingClientRect();
              setCompletionPosition({
                top: rect.top + cursorPosition.line * 20,
                left: rect.left + cursorPosition.character * 8,
              });
            } catch (error) {
              console.error("Error getting completions:", error);
            }
            break;

          case "s": // Ctrl+S for save
            e.preventDefault();
            await handleSave();
            break;

          case "Enter": // Ctrl+Enter for run
            e.preventDefault();
            await handleRunCode();
            break;
        }
      } else if (e.key === "Escape") {
        setShowCompletions(false);
      }
    },
    [editorState.code, cursorPosition, editorState.language],
  );

  // AI Enhancement Functions
  const handleEnhanceCode = async () => {
    if (!editorState.code.trim()) {
      toast({
        title: "تحذير",
        description: "يرجى كتابة بعض الأكواد أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await nexusAI.codex.enhanceCode(
        editorState.code,
        editorState.language,
      );
      setEditorState((prev) => ({ ...prev, code: result.enhancedCode }));
      setExecutionTime(result.timeTaken);

      toast({
        title: "تم تحسين الكود! ✨",
        description: `تحسينات مطبقة: ${result.improvements.length}`,
      });

      // Update statistics
      if (statistics) {
        setStatistics((prev) =>
          prev
            ? {
                ...prev,
                codeEnhanced: prev.codeEnhanced + 1,
                productivityScore: Math.min(100, prev.productivityScore + 2),
              }
            : null,
        );
      }
    } catch (error) {
      console.error("Error enhancing code:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحسين الكود",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAnalyzeCode = async () => {
    if (!editorState.code.trim()) {
      toast({
        title: "تحذير",
        description: "يرجى كتابة بعض الأكواد أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const analysis = await nexusAI.codex.analyzeCode(
        editorState.code,
        editorState.language,
      );
      setCodeAnalysis(analysis);
      setActivePanel("analysis");

      toast({
        title: "تم تحليل الكود! 🎯",
        description: `تم اكتشاف ${analysis.warnings.length} مشكلة محتملة`,
      });
    } catch (error) {
      console.error("Error analyzing code:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحليل الكود",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Utility Functions
  const handleSave = async () => {
    localStorage.setItem("nexus-code", JSON.stringify(editorState));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الكود بنجاح",
    });
  };

  const handleRunCode = async () => {
    if (!editorState.code.trim()) return;

    setIsProcessing(true);
    try {
      // Simulate code execution
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editorState.language === "javascript") {
        setOutput(
          "تم تشغيل الكود بنجاح! 🚀\n> مرحباً مطور فضائي! أهلاً بك في عالم البرمجة الفضائي",
        );
      } else {
        setOutput(`تم تشغيل كود ${editorState.language} بنجاح! ✨`);
      }

      setExecutionTime(Math.random() * 500 + 200);

      // Update statistics
      if (statistics) {
        setStatistics((prev) =>
          prev
            ? {
                ...prev,
                languagesUsed: {
                  ...prev.languagesUsed,
                  [editorState.language]:
                    (prev.languagesUsed[editorState.language] || 0) + 1,
                },
              }
            : null,
        );
      }
    } catch (error) {
      setOutput("خطأ في تشغيل الكود");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyCompletion = (suggestion: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const textBefore = editorState.code.substring(0, cursorPos);
    const textAfter = editorState.code.substring(cursorPos);
    const newCode = textBefore + suggestion + textAfter;

    setEditorState((prev) => ({ ...prev, code: newCode }));
    setShowCompletions(false);

    // Update statistics
    if (statistics) {
      setStatistics((prev) =>
        prev
          ? {
              ...prev,
              suggestionsAccepted: prev.suggestionsAccepted + 1,
            }
          : null,
      );
    }
  };

  const handleJumpToLine = (line: number) => {
    if (editorRef.current) {
      const lines = editorState.code.split("\n");
      const charPosition = lines
        .slice(0, line - 1)
        .reduce((acc, curr) => acc + curr.length + 1, 0);
      editorRef.current.setSelectionRange(charPosition, charPosition);
      editorRef.current.focus();
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case "javascript":
        return "🟨";
      case "typescript":
        return "🔵";
      case "python":
        return "🐍";
      case "java":
        return "☕";
      case "cpp":
        return "⚡";
      case "rust":
        return "🦀";
      case "go":
        return "🐹";
      default:
        return "📄";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400 rounded-full opacity-30"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          "relative z-10 transition-all duration-300",
          isFullscreen ? "p-0" : "p-6",
        )}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <NexusIcon size={40} animate={true} />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Nexus Code Editor
                </h1>
                <p className="text-slate-400">
                  محرر الأكواد الذكي المدعوم بالذكاء الاصطناعي
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </motion.div>

          {/* Main Editor Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Editor Panel */}
            <div className="lg:col-span-3 space-y-4">
              {/* Toolbar */}
              <HolographicCard glowIntensity="low" className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Language Selection */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {getLanguageIcon(editorState.language)}
                      </span>
                      <Select
                        value={editorState.language}
                        onValueChange={(value) =>
                          setEditorState((prev) => ({
                            ...prev,
                            language: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="rust">Rust</SelectItem>
                          <SelectItem value="go">Go</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Font Size Slider */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">حجم الخط:</span>
                      <Slider
                        value={[editorState.fontSize]}
                        onValueChange={([value]) =>
                          setEditorState((prev) => ({
                            ...prev,
                            fontSize: value,
                          }))
                        }
                        min={10}
                        max={24}
                        step={1}
                        className="w-20"
                      />
                      <span className="text-sm text-slate-400 min-w-[2rem]">
                        {editorState.fontSize}px
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={handleRunCode}
                      disabled={isProcessing}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      تشغيل
                    </Button>

                    <Button
                      size="sm"
                      onClick={handleSave}
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      حفظ
                    </Button>

                    <Button
                      size="sm"
                      onClick={() =>
                        setEditorState((prev) => ({
                          ...prev,
                          showLineNumbers: !prev.showLineNumbers,
                        }))
                      }
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      {editorState.showLineNumbers ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </HolographicCard>

              {/* Code Editor */}
              <HolographicCard
                glowIntensity="high"
                scanlineEffect={true}
                className="relative"
              >
                <div className="relative">
                  {/* Line Numbers */}
                  {editorState.showLineNumbers && (
                    <div className="absolute left-4 top-4 text-slate-500 text-sm font-mono select-none pointer-events-none z-10">
                      {editorState.code.split("\n").map((_, index) => (
                        <div key={index} className="h-[1.5em]">
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Code Textarea */}
                  <Textarea
                    ref={editorRef}
                    value={editorState.code}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onSelect={handleCursorMove}
                    className={cn(
                      "min-h-[400px] font-mono bg-slate-900/50 border-0 text-white resize-none focus:ring-0 focus:ring-offset-0",
                      editorState.showLineNumbers ? "pl-16" : "pl-4",
                    )}
                    style={{
                      fontSize: editorState.fontSize,
                      lineHeight: "1.5em",
                      whiteSpace: editorState.wordWrap ? "pre-wrap" : "pre",
                    }}
                    spellCheck={false}
                    placeholder="// اكتب كودك هنا... 
// استخدم Ctrl+Space للحصول على اقتراحات الـ AI
// استخدم Ctrl+Enter لتشغيل الكود"
                  />

                  {/* Processing Overlay */}
                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-20"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
                        />
                        <p className="text-cyan-400 font-medium">
                          Codex Prime يعمل...
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </HolographicCard>

              {/* Output Panel */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <HolographicCard glowIntensity="medium" className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-green-400" />
                        المخرجات
                      </h3>
                      {executionTime && (
                        <Badge
                          variant="outline"
                          className="border-green-500/30 text-green-400"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {executionTime.toFixed(0)}ms
                        </Badge>
                      )}
                    </div>
                    <pre className="bg-slate-800/30 p-3 rounded text-green-400 font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </pre>
                  </HolographicCard>
                </motion.div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Quick Stats */}
              {statistics && (
                <HolographicCard glowIntensity="low" className="p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-violet-400" />
                    الإحصائيات
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 bg-slate-800/30 rounded">
                      <div className="text-lg font-bold text-cyan-400">
                        {statistics.codeEnhanced}
                      </div>
                      <div className="text-xs text-slate-400">كود محسن</div>
                    </div>
                    <div className="p-2 bg-slate-800/30 rounded">
                      <div className="text-lg font-bold text-green-400">
                        {statistics.errorsFixed}
                      </div>
                      <div className="text-xs text-slate-400">أخطاء مصححة</div>
                    </div>
                    <div className="p-2 bg-slate-800/30 rounded">
                      <div className="text-lg font-bold text-violet-400">
                        {statistics.productivityScore}
                      </div>
                      <div className="text-xs text-slate-400">
                        نقاط الإنتاجية
                      </div>
                    </div>
                    <div className="p-2 bg-slate-800/30 rounded">
                      <div className="text-lg font-bold text-yellow-400">
                        {Math.floor(statistics.timeSpent / 60)}h
                      </div>
                      <div className="text-xs text-slate-400">وقت العمل</div>
                    </div>
                  </div>
                </HolographicCard>
              )}

              {/* Panel Tabs */}
              <HolographicCard glowIntensity="low" className="p-2">
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { id: "analysis", label: "تحليل", icon: Target },
                    { id: "git", label: "Git", icon: GitBranch },
                    { id: "collaboration", label: "فريق", icon: Users },
                    { id: "analytics", label: "إحصائيات", icon: TrendingUp },
                  ].map(({ id, label, icon: Icon }) => (
                    <Button
                      key={id}
                      size="sm"
                      variant={activePanel === id ? "default" : "ghost"}
                      onClick={() =>
                        setActivePanel(activePanel === id ? null : (id as any))
                      }
                      className={cn(
                        "flex flex-col gap-1 h-auto py-2",
                        activePanel === id
                          ? "bg-indigo-600 text-white"
                          : "text-slate-300 hover:bg-slate-700",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">{label}</span>
                    </Button>
                  ))}
                </div>
              </HolographicCard>

              {/* Panel Content */}
              <AnimatePresence>
                {activePanel === "analysis" && codeAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <HolographicCard glowIntensity="medium" className="p-4">
                      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-violet-400" />
                        ��حليل الكود
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2 bg-slate-800/30 rounded">
                            <div className="text-lg font-bold text-green-400">
                              {codeAnalysis.performance}
                            </div>
                            <div className="text-xs text-slate-400">أداء</div>
                          </div>
                          <div className="text-center p-2 bg-slate-800/30 rounded">
                            <div className="text-lg font-bold text-blue-400">
                              {codeAnalysis.complexity}
                            </div>
                            <div className="text-xs text-slate-400">تعقيد</div>
                          </div>
                          <div className="text-center p-2 bg-slate-800/30 rounded">
                            <div className="text-lg font-bold text-violet-400">
                              {codeAnalysis.security}
                            </div>
                            <div className="text-xs text-slate-400">أمان</div>
                          </div>
                        </div>

                        {codeAnalysis.suggestions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-2">
                              الاقتراحات
                            </h4>
                            <div className="space-y-2">
                              {codeAnalysis.suggestions
                                .slice(0, 3)
                                .map((suggestion, index) => (
                                  <div
                                    key={index}
                                    className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300"
                                  >
                                    {suggestion}
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </HolographicCard>
                  </motion.div>
                )}

                {activePanel === "git" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <GitIntegrationPanel
                      code={editorState.code}
                      onCommit={(message) => {
                        toast({
                          title: "تم الـ commit",
                          description: message,
                        });
                      }}
                    />
                  </motion.div>
                )}

                {activePanel === "collaboration" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CollaborationPanel collaborators={collaborators} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <CodexPrimeAssistant
        isProcessing={isProcessing}
        analysisResults={codeAnalysis}
        onEnhanceCode={handleEnhanceCode}
        onAnalyzeCode={handleAnalyzeCode}
      />

      {/* Code Completion Suggestions */}
      <CodeCompletionSuggestions
        suggestions={completionSuggestions?.suggestions || []}
        visible={showCompletions}
        position={completionPosition}
        onApplySuggestion={handleApplyCompletion}
        onDismiss={() => setShowCompletions(false)}
      />

      {/* Errors and Warnings Panel */}
      {codeAnalysis?.warnings && (
        <ErrorsAndWarningsPanel
          warnings={codeAnalysis.warnings}
          onJumpToLine={handleJumpToLine}
        />
      )}
    </div>
  );
};

export default NexusCodeEditor;
