/**
 * شاشة العمليات المركزية
 * Central Operations Display
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Monitor,
  Activity,
  Zap,
  Eye,
  Code,
  Database,
  Globe,
  Shield,
  Cpu,
  HardDrive,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface Operation {
  id: string;
  name: string;
  nameAr: string;
  status: 'running' | 'paused' | 'completed' | 'error';
  progress: number;
  type: 'scan' | 'analyze' | 'process' | 'transfer' | 'compile';
  duration: number;
  elapsed: number;
}

interface CentralOperationsDisplayProps {
  className?: string;
}

const CentralOperationsDisplay: React.FC<CentralOperationsDisplayProps> = ({ className = '' }) => {
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null);
  const [operationHistory, setOperationHistory] = useState<Operation[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // عمليات وهمية للعرض
  const sampleOperations: Omit<Operation, 'id' | 'progress' | 'elapsed'>[] = [
    {
      name: 'System Analysis',
      nameAr: 'تحليل النظام',
      status: 'running',
      type: 'analyze',
      duration: 120,
    },
    {
      name: 'Data Processing',
      nameAr: 'معالجة البيانات',
      status: 'running',
      type: 'process',
      duration: 180,
    },
    {
      name: 'Security Scan',
      nameAr: 'فحص الحماية',
      status: 'running',
      type: 'scan',
      duration: 90,
    },
    {
      name: 'Code Compilation',
      nameAr: 'ترجمة الكود',
      status: 'running',
      type: 'compile',
      duration: 60,
    },
    {
      name: 'Data Transfer',
      nameAr: 'نقل البيانات',
      status: 'running',
      type: 'transfer',
      duration: 240,
    },
  ];

  // تشغيل عملية جديدة
  const startNewOperation = () => {
    const template = sampleOperations[Math.floor(Math.random() * sampleOperations.length)];
    const newOperation: Operation = {
      ...template,
      id: `op_${Date.now()}`,
      progress: 0,
      elapsed: 0,
    };

    setCurrentOperation(newOperation);
    setIsRunning(true);
  };

  // تحديث تقدم العملية
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && currentOperation) {
      interval = setInterval(() => {
        setCurrentOperation(prev => {
          if (!prev) return null;

          const newElapsed = prev.elapsed + 1;
          const newProgress = Math.min(100, (newElapsed / prev.duration) * 100);

          if (newProgress >= 100) {
            setIsRunning(false);
            setOperationHistory(history => [
              { ...prev, progress: 100, elapsed: prev.duration, status: 'completed' },
              ...history.slice(0, 4),
            ]);
            return null;
          }

          return {
            ...prev,
            elapsed: newElapsed,
            progress: newProgress,
          };
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, currentOperation?.id]);

  const getOperationIcon = (type: Operation['type']) => {
    switch (type) {
      case 'scan':
        return Eye;
      case 'analyze':
        return Activity;
      case 'process':
        return Cpu;
      case 'transfer':
        return Globe;
      case 'compile':
        return Code;
      default:
        return Monitor;
    }
  };

  const getStatusColor = (status: Operation['status']) => {
    switch (status) {
      case 'running':
        return 'text-cyan-400';
      case 'completed':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'paused':
        return 'text-yellow-400';
      default:
        return 'text-slate-400';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* العنوان والتحكم */}
      <div className="text-center border-b border-slate-700/50 pb-4">
        <h2 className="text-2xl font-bold text-white mb-2">مركز العمليات</h2>
        <p className="text-slate-400 text-sm">شاشة العمليات المباشرة والتحكم</p>
      </div>

      {/* الشاشة المركزية */}
      <div className="relative">
        {/* إطار الشاشة */}
        <div className="bg-slate-900/80 backdrop-blur-md border-2 border-slate-700/50 rounded-xl p-6 min-h-[300px] relative overflow-hidden">
          {/* تأثير الهولوجرام */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-xl"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* محتوى الشاشة */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {currentOperation ? (
                <motion.div
                  key="operation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  {/* أيقونة العملية */}
                  <motion.div
                    className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center border border-cyan-400/30"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  >
                    {React.createElement(getOperationIcon(currentOperation.type), {
                      className: 'w-8 h-8 text-cyan-400',
                    })}
                  </motion.div>

                  {/* تفاصيل العملية */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{currentOperation.nameAr}</h3>
                    <p className="text-slate-400 text-sm">{currentOperation.name}</p>
                  </div>

                  {/* شريط التقدم */}
                  <div className="space-y-3">
                    <Progress
                      value={currentOperation.progress}
                      className="w-full h-3 bg-slate-800"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>{formatTime(currentOperation.elapsed)}</span>
                      <span>{currentOperation.progress.toFixed(1)}%</span>
                      <span>{formatTime(currentOperation.duration)}</span>
                    </div>
                  </div>

                  {/* حالة العملية */}
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span
                      className={`text-sm font-medium ${getStatusColor(currentOperation.status)}`}
                    >
                      قيد التشغيل
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    className="mx-auto w-20 h-20 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full flex items-center justify-center border border-slate-600/50"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Monitor className="w-8 h-8 text-slate-500" />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">في انتظار العملية</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      الشاشة جاهزة لعرض العمليات الجديدة
                    </p>
                    <Button
                      onClick={startNewOperation}
                      className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      بدء عملية جديدة
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* أزرار التحكم */}
        <div className="flex justify-center gap-3 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
            disabled={!currentOperation}
            className="border-slate-600 hover:bg-slate-700"
          >
            {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRunning ? 'إيقاف مؤقت' : 'متابعة'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentOperation(null);
              setIsRunning(false);
            }}
            disabled={!currentOperation}
            className="border-slate-600 hover:bg-slate-700"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            إعادة تعيين
          </Button>

          <Button variant="outline" size="sm" className="border-slate-600 hover:bg-slate-700">
            <Settings className="w-4 h-4 mr-2" />
            إعدادات
          </Button>
        </div>
      </div>

      {/* سجل العمليات */}
      {operationHistory.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-center border-b border-slate-700/50 pb-2">
            العمليات المكتملة
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {operationHistory.map((operation, index) => (
              <motion.div
                key={operation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/30"
              >
                <div className="flex items-center gap-3">
                  {React.createElement(getOperationIcon(operation.type), {
                    className: 'w-4 h-4 text-green-400',
                  })}
                  <span className="text-sm text-white">{operation.nameAr}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{formatTime(operation.duration)}</span>
                  <span className="text-green-400">✓</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralOperationsDisplay;
