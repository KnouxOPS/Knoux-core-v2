/**
 * KnouxCore Quantum Command Center - مركز الأوامر الكمي
 * واجهة معالجة الأوامر الطبيعية وإدارة الصلاحيات والتحكم الشامل
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  HolographicCard,
  HolographicProgressBar,
} from "@/components/effects/HolographicCard";
import { CommandControlIcon } from "@/components/icons/KnouxCoreIcons";
import {
  Terminal,
  Shield,
  Users,
  Activity,
  Zap,
  CheckCircle,
  AlertTriangle,
  Crown,
  User,
  UserPlus,
  Lock,
  Unlock,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Brain,
  MessageSquare,
  Send,
  History,
  Settings,
  Eye,
  EyeOff,
  Clock,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  AlertCircle,
  Globe,
  Database,
  Network,
  Radar,
} from "lucide-react";

// ===============================
// Types & Interfaces
// ===============================

interface SystemStatus {
  cpu: number;
  memory: number;
  network: number;
  power: number;
  security: "secure" | "warning" | "critical";
  shield: number;
  weapons: number;
  engines: number;
  lifeSupport: number;
}

interface CommandLog {
  id: string;
  command: string;
  timestamp: string;
  status: "success" | "error" | "pending" | "warning";
  result: string;
  user: string;
  executionTime: number;
  priority: "low" | "normal" | "high" | "urgent";
  category: string;
}

interface UserRole {
  id: string;
  name: string;
  role: "free" | "premium" | "admin" | "captain";
  permissions: string[];
  lastActive: string;
  commandsExecuted: number;
  accessLevel: number;
}

interface CommandSuggestion {
  command: string;
  description: string;
  category: string;
  requiredRole: "free" | "premium" | "admin" | "captain";
  example: string;
}

interface SecurityEvent {
  id: string;
  type:
    | "login"
    | "command"
    | "access_denied"
    | "breach_attempt"
    | "system_alert";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: string;
  source: string;
  resolved: boolean;
}

interface DiagnosticResult {
  system: string;
  status: "healthy" | "warning" | "critical" | "offline";
  details: string;
  recommendations: string[];
  lastChecked: string;
}

// ===============================
// AI Service Functions
// ===============================

const processNaturalLanguageCommand = async (
  input: string,
): Promise<{
  interpreted: string;
  confidence: number;
  suggestions: string[];
  category: string;
  requiredRole: string;
}> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simple NLP simulation
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("scan") || lowerInput.includes("sensor")) {
    return {
      interpreted: "initiate_sector_scan",
      confidence: 0.92,
      suggestions: [
        "scan current sector",
        "run full sensor sweep",
        "detect anomalies",
      ],
      category: "navigation",
      requiredRole: "free",
    };
  } else if (lowerInput.includes("shield") || lowerInput.includes("defense")) {
    return {
      interpreted: "activate_shields",
      confidence: 0.88,
      suggestions: [
        "raise shields to maximum",
        "activate defensive systems",
        "shield status report",
      ],
      category: "defense",
      requiredRole: "premium",
    };
  } else if (
    lowerInput.includes("warp") ||
    lowerInput.includes("jump") ||
    lowerInput.includes("travel")
  ) {
    return {
      interpreted: "engage_warp_drive",
      confidence: 0.95,
      suggestions: [
        "set course for destination",
        "calculate jump coordinates",
        "engage faster than light",
      ],
      category: "navigation",
      requiredRole: "premium",
    };
  } else if (lowerInput.includes("status") || lowerInput.includes("report")) {
    return {
      interpreted: "system_status_report",
      confidence: 0.97,
      suggestions: [
        "ship status report",
        "all systems diagnostic",
        "crew status update",
      ],
      category: "system",
      requiredRole: "free",
    };
  } else if (lowerInput.includes("emergency") || lowerInput.includes("alert")) {
    return {
      interpreted: "emergency_protocol",
      confidence: 0.89,
      suggestions: [
        "activate emergency systems",
        "all hands alert",
        "emergency shutdown",
      ],
      category: "emergency",
      requiredRole: "admin",
    };
  } else {
    return {
      interpreted: "unknown_command",
      confidence: 0.15,
      suggestions: [
        "scan current sector",
        "ship status report",
        "activate shields",
      ],
      category: "unknown",
      requiredRole: "free",
    };
  }
};

const executeCommand = async (
  command: string,
  user: string,
): Promise<{
  success: boolean;
  result: string;
  executionTime: number;
  warnings?: string[];
}> => {
  const startTime = Date.now();
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 2000 + 500),
  );
  const executionTime = Date.now() - startTime;

  switch (command) {
    case "initiate_sector_scan":
      return {
        success: true,
        result:
          "Sector scan initiated. No immediate threats detected. 3 celestial bodies identified.",
        executionTime,
      };
    case "activate_shields":
      return {
        success: true,
        result: "Shields activated at 100% capacity. Defensive grid online.",
        executionTime,
      };
    case "engage_warp_drive":
      return {
        success: true,
        result: "Warp drive engaged. ETA to destination: 4.2 hours.",
        executionTime,
        warnings: [
          "High energy consumption detected",
          "Monitor engine temperature",
        ],
      };
    case "system_status_report":
      return {
        success: true,
        result:
          "All systems operating within normal parameters. Crew complement: 127. No critical alerts.",
        executionTime,
      };
    case "emergency_protocol":
      return {
        success: true,
        result:
          "Emergency protocol Alpha-7 activated. All non-essential systems powered down.",
        executionTime,
      };
    default:
      return {
        success: false,
        result:
          "Command not recognized. Please verify syntax or request assistance.",
        executionTime,
      };
  }
};

const runSystemDiagnostics = async (): Promise<DiagnosticResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    {
      system: "Navigation",
      status: "healthy",
      details: "All navigation systems functioning optimally",
      recommendations: ["Calibrate stellar positioning in 72 hours"],
      lastChecked: new Date().toISOString(),
    },
    {
      system: "Shields",
      status: "warning",
      details: "Shield generator running at 95% efficiency",
      recommendations: [
        "Schedule maintenance for generator 3",
        "Check power coupling stability",
      ],
      lastChecked: new Date().toISOString(),
    },
    {
      system: "Life Support",
      status: "healthy",
      details: "Atmospheric systems stable, oxygen at 21.2%",
      recommendations: ["Filter replacement due in 2 weeks"],
      lastChecked: new Date().toISOString(),
    },
    {
      system: "Communications",
      status: "critical",
      details: "Long-range communications experiencing interference",
      recommendations: [
        "Investigate antenna array",
        "Check subspace relay status",
        "Emergency protocols may be needed",
      ],
      lastChecked: new Date().toISOString(),
    },
  ];
};

// ===============================
// Main Component
// ===============================

const QuantumCommandCenter: React.FC = () => {
  const { toast } = useToast();
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandLogRef = useRef<HTMLDivElement>(null);

  // ===============================
  // State Management
  // ===============================
  const [currentUser] = useState<UserRole>({
    id: "user_001",
    name: "Commander Nova",
    role: "admin",
    permissions: [
      "scan",
      "shields",
      "warp",
      "emergency",
      "diagnostics",
      "user_management",
    ],
    lastActive: new Date().toISOString(),
    commandsExecuted: 127,
    accessLevel: 9,
  });

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpu: 68,
    memory: 74,
    network: 82,
    power: 91,
    security: "secure",
    shield: 100,
    weapons: 85,
    engines: 96,
    lifeSupport: 98,
  });

  const [commandInput, setCommandInput] = useState("");
  const [commandLogs, setCommandLogs] = useState<CommandLog[]>([
    {
      id: "log_001",
      command: "system_status_report",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: "success",
      result: "All systems nominal. No critical alerts.",
      user: "Commander Nova",
      executionTime: 145,
      priority: "normal",
      category: "system",
    },
    {
      id: "log_002",
      command: "initiate_sector_scan",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      status: "success",
      result: "Sector scan complete. No threats detected.",
      user: "Lieutenant Torres",
      executionTime: 2341,
      priority: "normal",
      category: "navigation",
    },
  ]);

  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([
    {
      command: "scan current sector",
      description: "Initiate a comprehensive scan of the current star system",
      category: "navigation",
      requiredRole: "free",
      example: "scan current sector for anomalies",
    },
    {
      command: "activate shields",
      description: "Bring defensive shields to full power",
      category: "defense",
      requiredRole: "premium",
      example: "activate shields at maximum capacity",
    },
    {
      command: "status report",
      description: "Generate comprehensive ship status report",
      category: "system",
      requiredRole: "free",
      example: "generate full system status report",
    },
  ]);

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([
    {
      id: "sec_001",
      type: "login",
      severity: "low",
      description: "Commander Nova logged in from Bridge Terminal",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      source: "Bridge Terminal Alpha",
      resolved: true,
    },
    {
      id: "sec_002",
      type: "access_denied",
      severity: "medium",
      description: "Unauthorized access attempt to weapons systems",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      source: "Cargo Bay Terminal",
      resolved: false,
    },
  ]);

  const [diagnosticResults, setDiagnosticResults] = useState<
    DiagnosticResult[]
  >([]);
  const [connectedUsers] = useState<UserRole[]>([
    currentUser,
    {
      id: "user_002",
      name: "Lieutenant Torres",
      role: "premium",
      permissions: ["scan", "shields"],
      lastActive: new Date(Date.now() - 300000).toISOString(),
      commandsExecuted: 89,
      accessLevel: 6,
    },
    {
      id: "user_003",
      name: "Engineer Kim",
      role: "free",
      permissions: ["scan"],
      lastActive: new Date(Date.now() - 120000).toISOString(),
      commandsExecuted: 34,
      accessLevel: 3,
    },
  ]);

  // Process States
  const [isProcessingCommand, setIsProcessingCommand] = useState(false);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [showCommandHelp, setShowCommandHelp] = useState(false);
  const [selectedLogCategory, setSelectedLogCategory] = useState("all");
  const [logSearchQuery, setLogSearchQuery] = useState("");
  const [autoScrollLogs, setAutoScrollLogs] = useState(true);

  // ===============================
  // Effects
  // ===============================

  // Real-time system monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        cpu: Math.max(30, Math.min(95, prev.cpu + (Math.random() - 0.5) * 8)),
        memory: Math.max(
          40,
          Math.min(90, prev.memory + (Math.random() - 0.5) * 6),
        ),
        network: Math.max(
          50,
          Math.min(100, prev.network + (Math.random() - 0.5) * 10),
        ),
        power: Math.max(
          70,
          Math.min(100, prev.power + (Math.random() - 0.5) * 4),
        ),
        shield: Math.max(
          85,
          Math.min(100, prev.shield + (Math.random() - 0.5) * 3),
        ),
        weapons: Math.max(
          75,
          Math.min(100, prev.weapons + (Math.random() - 0.5) * 5),
        ),
        engines: Math.max(
          80,
          Math.min(100, prev.engines + (Math.random() - 0.5) * 4),
        ),
        lifeSupport: Math.max(
          90,
          Math.min(100, prev.lifeSupport + (Math.random() - 0.5) * 2),
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll command logs
  useEffect(() => {
    if (autoScrollLogs && commandLogRef.current) {
      commandLogRef.current.scrollTop = commandLogRef.current.scrollHeight;
    }
  }, [commandLogs, autoScrollLogs]);

  // ===============================
  // Command Processing Functions
  // ===============================

  const handleCommandSubmit = async () => {
    if (!commandInput.trim() || isProcessingCommand) return;

    const inputCommand = commandInput.trim();
    setCommandInput("");
    setIsProcessingCommand(true);

    toast({
      title: "Processing Command",
      description: "AstroVoice AI is interpreting your command...",
    });

    try {
      // NLP Processing
      const interpretation = await processNaturalLanguageCommand(inputCommand);

      if (interpretation.confidence < 0.5) {
        toast({
          title: "Command Unclear",
          description: "Could you please rephrase your command?",
          variant: "destructive",
        });

        const failedLog: CommandLog = {
          id: `log_${Date.now()}`,
          command: inputCommand,
          timestamp: new Date().toISOString(),
          status: "error",
          result: `Command not understood. Confidence: ${(interpretation.confidence * 100).toFixed(0)}%`,
          user: currentUser.name,
          executionTime: 0,
          priority: "normal",
          category: "unknown",
        };
        setCommandLogs((prev) => [...prev, failedLog]);
        return;
      }

      // Permission Check
      const hasPermission =
        currentUser.permissions.includes(interpretation.category) ||
        currentUser.role === "admin" ||
        currentUser.role === "captain";

      if (!hasPermission) {
        toast({
          title: "Access Denied",
          description: `Insufficient permissions for ${interpretation.category} commands.`,
          variant: "destructive",
        });

        const deniedLog: CommandLog = {
          id: `log_${Date.now()}`,
          command: inputCommand,
          timestamp: new Date().toISOString(),
          status: "error",
          result: `Access denied. Required role: ${interpretation.requiredRole}`,
          user: currentUser.name,
          executionTime: 0,
          priority: "normal",
          category: interpretation.category,
        };
        setCommandLogs((prev) => [...prev, deniedLog]);

        // Add security event
        const securityEvent: SecurityEvent = {
          id: `sec_${Date.now()}`,
          type: "access_denied",
          severity: "medium",
          description: `${currentUser.name} attempted unauthorized command: ${interpretation.category}`,
          timestamp: new Date().toISOString(),
          source: "Command Center",
          resolved: false,
        };
        setSecurityEvents((prev) => [...prev, securityEvent]);
        return;
      }

      // Execute Command
      const execution = await executeCommand(
        interpretation.interpreted,
        currentUser.name,
      );

      const newLog: CommandLog = {
        id: `log_${Date.now()}`,
        command: inputCommand,
        timestamp: new Date().toISOString(),
        status: execution.success ? "success" : "error",
        result: execution.result,
        user: currentUser.name,
        executionTime: execution.executionTime,
        priority: interpretation.category === "emergency" ? "urgent" : "normal",
        category: interpretation.category,
      };

      setCommandLogs((prev) => [...prev, newLog]);

      if (execution.success) {
        toast({
          title: "Command Executed",
          description: execution.result,
          variant: "success",
        });

        if (execution.warnings) {
          execution.warnings.forEach((warning) => {
            toast({
              title: "Warning",
              description: warning,
              variant: "destructive",
            });
          });
        }
      } else {
        toast({
          title: "Command Failed",
          description: execution.result,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "System Error",
        description: "An error occurred while processing your command.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingCommand(false);
    }
  };

  const handleRunDiagnostics = async () => {
    if (isRunningDiagnostics) return;

    setIsRunningDiagnostics(true);
    toast({
      title: "System Diagnostics",
      description: "Core Scanner AI is running comprehensive diagnostics...",
    });

    try {
      const results = await runSystemDiagnostics();
      setDiagnosticResults(results);

      const criticalIssues = results.filter(
        (r) => r.status === "critical",
      ).length;
      const warnings = results.filter((r) => r.status === "warning").length;

      toast({
        title: "Diagnostics Complete",
        description: `Found ${criticalIssues} critical issues and ${warnings} warnings.`,
        variant:
          criticalIssues > 0
            ? "destructive"
            : warnings > 0
              ? "secondary"
              : "success",
      });
    } catch (error) {
      toast({
        title: "Diagnostic Error",
        description: "Failed to complete system diagnostics.",
        variant: "destructive",
      });
    } finally {
      setIsRunningDiagnostics(false);
    }
  };

  const filteredLogs = commandLogs
    .filter((log) => {
      if (selectedLogCategory !== "all" && log.category !== selectedLogCategory)
        return false;
      if (
        logSearchQuery &&
        !log.command.toLowerCase().includes(logSearchQuery.toLowerCase()) &&
        !log.result.toLowerCase().includes(logSearchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .slice(-50); // Keep only latest 50 logs

  // ===============================
  // Render Functions
  // ===============================

  const renderSystemOverview = () => (
    <HolographicCard className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Ship Systems Status</h3>
        <div className="ml-auto">
          <Badge
            variant={
              systemStatus.security === "secure"
                ? "default"
                : systemStatus.security === "warning"
                  ? "secondary"
                  : "destructive"
            }
          >
            {systemStatus.security.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              CPU
            </span>
            <span className="text-sm text-primary">
              {systemStatus.cpu.toFixed(0)}%
            </span>
          </div>
          <HolographicProgressBar value={systemStatus.cpu} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              Memory
            </span>
            <span className="text-sm text-primary">
              {systemStatus.memory.toFixed(0)}%
            </span>
          </div>
          <HolographicProgressBar value={systemStatus.memory} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              Network
            </span>
            <span className="text-sm text-primary">
              {systemStatus.network.toFixed(0)}%
            </span>
          </div>
          <HolographicProgressBar
            value={systemStatus.network}
            className="h-2"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Battery className="w-3 h-3" />
              Power
            </span>
            <span className="text-sm text-primary">
              {systemStatus.power.toFixed(0)}%
            </span>
          </div>
          <HolographicProgressBar value={systemStatus.power} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Shields
            </span>
            <span className="text-sm text-primary">
              {systemStatus.shield.toFixed(0)}%
            </span>
          </div>
          <HolographicProgressBar value={systemStatus.shield} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Engines
            </span>
            <span className="text-sm text-primary">
              {systemStatus.engines.toFixed(0)}%
            </span>
          </div>
          <HolographicProgressBar
            value={systemStatus.engines}
            className="h-2"
          />
        </div>
      </div>
    </HolographicCard>
  );

  const renderCommandInterface = () => (
    <HolographicCard className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Terminal className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">
          Natural Language Command Interface
        </h3>
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowCommandHelp(!showCommandHelp)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Help
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRunDiagnostics}
            disabled={isRunningDiagnostics}
          >
            {isRunningDiagnostics ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Radar className="w-4 h-4 mr-2" />
                Diagnostics
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Command Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              ref={commandInputRef}
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Enter natural language command... (e.g., 'scan current sector for threats')"
              onKeyPress={(e) => e.key === "Enter" && handleCommandSubmit()}
              disabled={isProcessingCommand}
              className="pr-12"
            />
            {isProcessingCommand && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <RefreshCw className="w-4 h-4 animate-spin text-primary" />
              </div>
            )}
          </div>
          <Button
            onClick={handleCommandSubmit}
            disabled={!commandInput.trim() || isProcessingCommand}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Commands */}
        {showCommandHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-background/50 border border-primary/20 rounded-lg p-4"
          >
            <h4 className="font-medium mb-3">Quick Commands</h4>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCommandInput(suggestion.command)}
                  className="justify-start text-left h-auto p-2"
                >
                  <div>
                    <div className="font-medium text-xs">
                      {suggestion.command}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {suggestion.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Command Log */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Command History</span>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search logs..."
                value={logSearchQuery}
                onChange={(e) => setLogSearchQuery(e.target.value)}
                className="w-32 h-8 text-xs"
              />
              <select
                value={selectedLogCategory}
                onChange={(e) => setSelectedLogCategory(e.target.value)}
                className="h-8 px-2 bg-background border border-primary/30 rounded text-xs"
              >
                <option value="all">All</option>
                <option value="system">System</option>
                <option value="navigation">Navigation</option>
                <option value="defense">Defense</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>

          <ScrollArea
            className="h-64 border border-primary/20 rounded"
            ref={commandLogRef}
          >
            <div className="p-2 space-y-2">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-2 rounded border text-xs ${
                    log.status === "success"
                      ? "border-green-400/30 bg-green-400/10"
                      : log.status === "error"
                        ? "border-red-400/30 bg-red-400/10"
                        : log.status === "warning"
                          ? "border-yellow-400/30 bg-yellow-400/10"
                          : "border-primary/30 bg-primary/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{log.command}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {log.category}
                      </Badge>
                      <span className="text-muted-foreground">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">{log.result}</div>
                  <div className="flex justify-between mt-1">
                    <span>User: {log.user}</span>
                    <span>Exec: {log.executionTime}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </HolographicCard>
  );

  const renderUserManagement = () => (
    <HolographicCard className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Active Users</h3>
      </div>

      <div className="space-y-2">
        {connectedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 bg-background/50 rounded border border-primary/20"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  new Date().getTime() - new Date(user.lastActive).getTime() <
                  300000
                    ? "bg-green-400 animate-pulse"
                    : "bg-gray-400"
                }`}
              />
              <div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">
                  Level {user.accessLevel}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge
                variant={
                  user.role === "captain"
                    ? "default"
                    : user.role === "admin"
                      ? "secondary"
                      : user.role === "premium"
                        ? "outline"
                        : "destructive"
                }
              >
                {user.role.toUpperCase()}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                {user.commandsExecuted} commands
              </div>
            </div>
          </div>
        ))}
      </div>
    </HolographicCard>
  );

  const renderSecurityPanel = () => (
    <HolographicCard className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Security Events</h3>
      </div>

      <ScrollArea className="h-48">
        <div className="space-y-2">
          {securityEvents.slice(-10).map((event) => (
            <div
              key={event.id}
              className={`p-2 rounded border text-xs ${
                event.severity === "critical"
                  ? "border-red-400/30 bg-red-400/10"
                  : event.severity === "high"
                    ? "border-orange-400/30 bg-orange-400/10"
                    : event.severity === "medium"
                      ? "border-yellow-400/30 bg-yellow-400/10"
                      : "border-primary/30 bg-primary/10"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Badge
                  variant={
                    event.severity === "critical"
                      ? "destructive"
                      : event.severity === "high"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {event.type.replace(/_/g, " ").toUpperCase()}
                </Badge>
                <span className="text-muted-foreground">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div>{event.description}</div>
              <div className="text-muted-foreground">
                Source: {event.source}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </HolographicCard>
  );

  // ===============================
  // Main Render
  // ===============================

  return (
    <div
      className="min-h-screen cosmic-grid p-6"
      style={{ background: "var(--gradient-void)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <CommandControlIcon className="w-8 h-8" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Quantum Command Center
          </h1>
          <p className="text-muted-foreground">
            مركز الأوامر الكمي - Advanced Natural Language Command Interface
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline" className="text-primary border-primary/50">
            Commander: {currentUser.name}
          </Badge>
          <Badge
            variant={
              currentUser.role === "captain"
                ? "default"
                : currentUser.role === "admin"
                  ? "secondary"
                  : "outline"
            }
          >
            {currentUser.role.toUpperCase()}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Command Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-8"
        >
          {renderCommandInterface()}
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-4 space-y-6"
        >
          {renderSystemOverview()}
          {renderUserManagement()}
        </motion.div>

        {/* Diagnostics Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-8"
        >
          <HolographicCard className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">System Diagnostics</h3>
            </div>

            {diagnosticResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {diagnosticResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded border ${
                      result.status === "critical"
                        ? "border-red-400/30 bg-red-400/10"
                        : result.status === "warning"
                          ? "border-yellow-400/30 bg-yellow-400/10"
                          : result.status === "offline"
                            ? "border-gray-400/30 bg-gray-400/10"
                            : "border-green-400/30 bg-green-400/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{result.system}</span>
                      <Badge
                        variant={
                          result.status === "critical"
                            ? "destructive"
                            : result.status === "warning"
                              ? "secondary"
                              : result.status === "offline"
                                ? "outline"
                                : "default"
                        }
                      >
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {result.details}
                    </div>
                    {result.recommendations.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs font-medium">
                          Recommendations:
                        </div>
                        {result.recommendations.map((rec, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-muted-foreground"
                          >
                            • {rec}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Radar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <div>No diagnostic data available</div>
                <div className="text-sm">
                  Run system diagnostics to view detailed status
                </div>
              </div>
            )}
          </HolographicCard>
        </motion.div>

        {/* Security Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-4"
        >
          {renderSecurityPanel()}
        </motion.div>
      </div>
    </div>
  );
};

export default QuantumCommandCenter;
