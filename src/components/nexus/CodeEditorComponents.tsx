/**
 * KnouxCore Nexus - مكونات محرر الأكواد المتقدمة
 * مكونات فرعية للمحرر مع تأثيرات هولوجرافية وذكاء اصطناعي
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HolographicCard,
  HolographicProgressBar,
} from "@/components/effects/HolographicCard";
import {
  nexusAI,
  type CodeAnalysis,
  type CodeCompletion,
  type CollaboratorStatus,
} from "@/services/nexusAI";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Zap,
  AlertTriangle,
  CheckCircle,
  Info,
  Code,
  GitBranch,
  Users,
  Activity,
  TrendingUp,
  Brain,
  Shield,
  Cpu,
  Clock,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Save,
  Download,
  Upload,
  Settings,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react";

// مساعد الذكاء الاصطناعي Codex Prime
export const CodexPrimeAssistant: React.FC<{
  isProcessing: boolean;
  analysisResults?: CodeAnalysis;
  onEnhanceCode: () => void;
  onAnalyzeCode: () => void;
}> = ({ isProcessing, analysisResults, onEnhanceCode, onAnalyzeCode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [assistantState, setAssistantState] = useState<
    "idle" | "thinking" | "suggesting" | "analyzing"
  >("idle");

  useEffect(() => {
    if (isProcessing) {
      setAssistantState("thinking");
    } else if (analysisResults) {
      setAssistantState("suggesting");
    } else {
      setAssistantState("idle");
    }
  }, [isProcessing, analysisResults]);

  const getOrbColor = () => {
    switch (assistantState) {
      case "thinking":
        return "from-yellow-400 to-orange-400";
      case "suggesting":
        return "from-cyan-400 to-blue-400";
      case "analyzing":
        return "from-violet-400 to-purple-400";
      default:
        return "from-slate-400 to-slate-500";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <HolographicCard glowIntensity="high" className="p-4 w-80">
            <div className="flex items-center gap-3 mb-4">
              {/* AI Orb */}
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center",
                  getOrbColor(),
                )}
                animate={{
                  scale: assistantState === "thinking" ? [1, 1.1, 1] : 1,
                  rotate: assistantState === "thinking" ? [0, 360] : 0,
                }}
                transition={{
                  scale: { duration: 1.5, repeat: Infinity },
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
              >
                <Brain className="w-6 h-6 text-white" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-white font-semibold">Codex Prime</h3>
                <p className="text-slate-400 text-sm">
                  {assistantState === "thinking" && "يفكر..."}
                  {assistantState === "suggesting" && "لدي اقتراحات"}
                  {assistantState === "analyzing" && "يحلل الكود"}
                  {assistantState === "idle" && "مستعد للمساعدة"}
                </p>
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </Button>
            </div>

            {/* AI Actions */}
            <div className="space-y-2">
              <Button
                onClick={onEnhanceCode}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border-0"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isProcessing ? "يحسن الكود..." : "تحسين الكود"}
              </Button>

              <Button
                onClick={onAnalyzeCode}
                disabled={isProcessing}
                variant="outline"
                className="w-full border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
              >
                <Target className="w-4 h-4 mr-2" />
                تحليل الجودة
              </Button>
            </div>

            {/* Analysis Results Preview */}
            {analysisResults && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-slate-600/30"
              >
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-slate-800/30 rounded">
                    <div className="text-lg font-bold text-green-400">
                      {analysisResults.performance}
                    </div>
                    <div className="text-xs text-slate-400">أداء</div>
                  </div>
                  <div className="p-2 bg-slate-800/30 rounded">
                    <div className="text-lg font-bold text-blue-400">
                      {analysisResults.complexity}
                    </div>
                    <div className="text-xs text-slate-400">تعقيد</div>
                  </div>
                  <div className="p-2 bg-slate-800/30 rounded">
                    <div className="text-lg font-bold text-violet-400">
                      {analysisResults.security}
                    </div>
                    <div className="text-xs text-slate-400">أمان</div>
                  </div>
                </div>
              </motion.div>
            )}
          </HolographicCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// مكون اقتراحات الإكمال التلقائي
export const CodeCompletionSuggestions: React.FC<{
  suggestions: CodeCompletion["suggestions"];
  visible: boolean;
  position: { top: number; left: number };
  onApplySuggestion: (suggestion: string) => void;
  onDismiss: () => void;
}> = ({ suggestions, visible, position, onApplySuggestion, onDismiss }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, suggestions.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (suggestions[selectedIndex]) {
            onApplySuggestion(suggestions[selectedIndex].text);
          }
          break;
        case "Escape":
          e.preventDefault();
          onDismiss();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, selectedIndex, suggestions, onApplySuggestion, onDismiss]);

  if (!visible || !suggestions.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed z-50"
      style={{ top: position.top, left: position.left }}
    >
      <HolographicCard
        glowIntensity="low"
        className="p-2 w-80 max-h-60 overflow-auto"
      >
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            className={cn(
              "flex items-center gap-3 p-2 rounded cursor-pointer transition-all",
              index === selectedIndex
                ? "bg-cyan-500/20 border border-cyan-500/50"
                : "hover:bg-slate-700/50",
            )}
            onClick={() => onApplySuggestion(suggestion.text)}
            whileHover={{ x: 4 }}
          >
            <div
              className={cn(
                "w-6 h-6 rounded flex items-center justify-center text-xs font-semibold",
                suggestion.type === "function"
                  ? "bg-blue-500/20 text-blue-400"
                  : suggestion.type === "keyword"
                    ? "bg-green-500/20 text-green-400"
                    : suggestion.type === "variable"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-purple-500/20 text-purple-400",
              )}
            >
              {suggestion.type === "function" && "F"}
              {suggestion.type === "keyword" && "K"}
              {suggestion.type === "variable" && "V"}
              {suggestion.type === "method" && "M"}
              {suggestion.type === "snippet" && "S"}
            </div>

            <div className="flex-1">
              <div className="text-white font-medium text-sm">
                {suggestion.text}
              </div>
              <div className="text-slate-400 text-xs">
                {suggestion.description}
              </div>
            </div>

            <div className="text-xs text-slate-500">
              {suggestion.confidence}%
            </div>
          </motion.div>
        ))}
      </HolographicCard>
    </motion.div>
  );
};

// مكون عرض الأخطاء والتحذيرات
export const ErrorsAndWarningsPanel: React.FC<{
  warnings: CodeAnalysis["warnings"];
  onJumpToLine: (line: number) => void;
}> = ({ warnings, onJumpToLine }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const errorCount = warnings.filter((w) => w.severity === "error").length;
  const warningCount = warnings.filter((w) => w.severity === "warning").length;
  const infoCount = warnings.filter((w) => w.severity === "info").length;

  if (!warnings.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40"
    >
      <HolographicCard
        glowIntensity="medium"
        className="m-4 rounded-t-lg rounded-b-none"
      >
        <div
          className="flex items-center justify-between p-3 cursor-pointer border-b border-slate-600/30"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            <h3 className="text-white font-medium">مشاكل الكود</h3>
            <div className="flex items-center gap-2">
              {errorCount > 0 && (
                <Badge
                  variant="destructive"
                  className="bg-red-500/20 text-red-400 border-red-500/30"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {errorCount} خطأ
                </Badge>
              )}
              {warningCount > 0 && (
                <Badge
                  variant="outline"
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {warningCount} تحذير
                </Badge>
              )}
              {infoCount > 0 && (
                <Badge
                  variant="outline"
                  className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                >
                  <Info className="w-3 h-3 mr-1" />
                  {infoCount} معلومة
                </Badge>
              )}
            </div>
          </div>

          <Button size="sm" variant="ghost">
            {isExpanded ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <ScrollArea className="max-h-40 p-3">
                <div className="space-y-2">
                  {warnings.map((warning, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded cursor-pointer border transition-all",
                        warning.severity === "error"
                          ? "border-red-500/30 bg-red-500/10 hover:bg-red-500/20"
                          : warning.severity === "warning"
                            ? "border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20"
                            : "border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20",
                      )}
                      onClick={() => onJumpToLine(warning.line)}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 flex items-center justify-center rounded",
                          warning.severity === "error"
                            ? "text-red-400"
                            : warning.severity === "warning"
                              ? "text-yellow-400"
                              : "text-blue-400",
                        )}
                      >
                        {warning.severity === "error" && (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        {warning.severity === "warning" && (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        {warning.severity === "info" && (
                          <Info className="w-4 h-4" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="text-white text-sm">
                          {warning.message}
                        </div>
                        <div className="text-slate-400 text-xs">
                          السطر {warning.line} • {warning.type}
                        </div>
                      </div>

                      <div className="text-slate-500 text-xs">
                        السطر {warning.line}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </HolographicCard>
    </motion.div>
  );
};

// مكون Git Panel
export const GitIntegrationPanel: React.FC<{
  code: string;
  onCommit: (message: string) => void;
}> = ({ code, onCommit }) => {
  const [commitMessage, setCommitMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [changeStatus, setChangeStatus] = useState<
    "modified" | "staged" | "committed"
  >("modified");

  const generateCommitMessage = async () => {
    setIsGenerating(true);
    try {
      const suggestion = await nexusAI.chronos.suggestCommitMessage(code);
      setCommitMessage(suggestion);
    } catch (error) {
      console.error("Error generating commit message:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCommit = () => {
    if (commitMessage.trim()) {
      onCommit(commitMessage);
      setChangeStatus("committed");
      setCommitMessage("");
      setTimeout(() => setChangeStatus("modified"), 2000);
    }
  };

  return (
    <HolographicCard glowIntensity="medium" className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-cyan-400" />
          Git Operations
        </h3>
        <Badge
          variant="outline"
          className={cn(
            changeStatus === "modified"
              ? "border-yellow-500/30 text-yellow-400"
              : changeStatus === "staged"
                ? "border-blue-500/30 text-blue-400"
                : "border-green-500/30 text-green-400",
          )}
        >
          {changeStatus === "modified" && "معدل"}
          {changeStatus === "staged" && "مُجهز"}
          {changeStatus === "committed" && "مُرسل"}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Textarea
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="رسالة الـ commit..."
            className="bg-slate-800/30 border-slate-600/30 text-white placeholder-slate-400 resize-none"
            rows={3}
          />
          <Button
            size="sm"
            onClick={generateCommitMessage}
            disabled={isGenerating}
            className="absolute top-2 right-2 bg-violet-600/20 text-violet-400 border border-violet-500/30 hover:bg-violet-600/30"
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-3 h-3" />
              </motion.div>
            ) : (
              <>
                <Sparkles className="w-3 h-3 mr-1" />
                AI
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCommit}
            disabled={!commitMessage.trim()}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0"
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Commit
          </Button>
          <Button
            size="default"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Push
          </Button>
          <Button
            size="default"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Pull
          </Button>
        </div>
      </div>
    </HolographicCard>
  );
};

// مكون التعاون المباشر
export const CollaborationPanel: React.FC<{
  collaborators: CollaboratorStatus[];
}> = ({ collaborators }) => {
  const [showChat, setShowChat] = useState(false);

  const getStatusColor = (status: CollaboratorStatus["status"]) => {
    switch (status) {
      case "online":
        return "border-green-400 shadow-green-400/50";
      case "typing":
        return "border-yellow-400 shadow-yellow-400/50 animate-pulse";
      case "idle":
        return "border-blue-400 shadow-blue-400/30";
      default:
        return "border-gray-600";
    }
  };

  return (
    <HolographicCard glowIntensity="low" className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-violet-400" />
          المتعاونون ({collaborators.length})
        </h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowChat(!showChat)}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          💬
        </Button>
      </div>

      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <motion.div
            key={collaborator.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-2 rounded bg-slate-800/30"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full border-2 overflow-hidden",
                getStatusColor(collaborator.status),
              )}
            >
              <img
                src={collaborator.avatar}
                alt={collaborator.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="text-white text-sm font-medium">
                {collaborator.name}
              </div>
              <div className="text-slate-400 text-xs">
                {collaborator.status === "online" && "متصل الآن"}
                {collaborator.status === "typing" && "يكتب..."}
                {collaborator.status === "idle" && "خامل"}
                {collaborator.status === "offline" && "غير متصل"}
              </div>
            </div>

            <div className="text-slate-500 text-xs">
              السطر {collaborator.position.line}
            </div>
          </motion.div>
        ))}

        {collaborators.length === 0 && (
          <div className="text-center text-slate-400 py-4">
            لا يوجد متعاونون متصلون حالياً
          </div>
        )}
      </div>
    </HolographicCard>
  );
};

export default {
  CodexPrimeAssistant,
  CodeCompletionSuggestions,
  ErrorsAndWarningsPanel,
  GitIntegrationPanel,
  CollaborationPanel,
};
