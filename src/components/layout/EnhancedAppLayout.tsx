/**
 * KnouxCore Enhanced App Layout with OMD Integration
 * تخطيط التطبيق المحسّن مع شاش�� المعاينة العملياتية
 */

import React, { FC, ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import EnhancedSidebar from "./EnhancedSidebar";
import OperationalMonitorDisplay from "../ui/OperationalMonitorDisplay";
import { useLocation } from "react-router-dom";

// Mock context hooks (these would be real contexts in production)
const useShipStatus = () => {
  const [status, setStatus] = useState({
    cpu: 68,
    memory: 74,
    network: 82,
    power: 91,
    temperature: 42,
    efficiency: 87,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => ({
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
        temperature: Math.max(
          35,
          Math.min(55, prev.temperature + (Math.random() - 0.5) * 3),
        ),
        efficiency: Math.max(
          75,
          Math.min(100, prev.efficiency + (Math.random() - 0.5) * 5),
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return status;
};

const useAnalytics = () => ({
  codeEnhanced: 341,
  timeSpent: "47h 23m",
  optimizationTipsStatus: "Available",
  productivityScore: 94,
});

interface EnhancedAppLayoutProps {
  children: ReactNode;
  language?: "ar" | "en";
}

const EnhancedAppLayout: FC<EnhancedAppLayoutProps> = ({
  children,
  language = "en",
}) => {
  const location = useLocation();
  const shipStatus = useShipStatus();
  const analyticsSummary = useAnalytics();

  // Mock data for all sections
  const mockData = {
    shipStatus,
    nexusSummary: {
      complexity: "Moderate",
      performance: "Excellent",
      suggestionsCount: 12,
      warningsCount: 3,
      linesAnalyzed: 2847,
    },
    astranavSummary: {
      status: "En Route",
      eta: "02:37:15",
      hazardLevel: "Low",
      currentSystem: "Sol System",
      destination: "Alpha Centauri",
    },
    cosmodataSummary: {
      nodes: 1247,
      connections: 3891,
      anomalies: 7,
      dataFlowRate: "2.4 TB/s",
      processingLoad: 73,
    },
    commandSummary: {
      activeOperations: 5,
      logCount: 127,
      permissionsStatus: "Secure",
      lastCommand: "scan current sector",
      securityLevel: "Alpha",
    },
    projectSummary: {
      active: 8,
      collaborators: 15,
      pendingTasks: 23,
      recentActivity: "12 min ago",
    },
    analyticsSummary,
    systemSummary: {
      uptime: "15d 7h 42m",
      updatesPending: 3,
      aiSettingsStatus: "Optimized",
      systemHealth: "Excellent",
    },
    helpSummary: {
      faqs: 156,
      tutorials: 42,
      tickets: 2,
      lastSearched: "AI integration",
    },
    language,
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Enhanced Sidebar */}
      <EnhancedSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Operational Monitor Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full px-6 pt-6"
        >
          <OperationalMonitorDisplay {...mockData} />
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 overflow-auto px-6 pb-6"
        >
          <div className="h-full">{children}</div>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 213, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 213, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "grid-move 20s linear infinite",
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedAppLayout;
