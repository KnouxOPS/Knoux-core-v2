/**
 * مدير التثبيت والتحميل
 * Installation & Download Manager
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Terminal,
  Package,
  CheckCircle,
  AlertCircle,
  Loader,
  Copy,
  Check,
  FolderOpen,
  Settings,
  Play,
  Pause,
  Square,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import type { DeveloperService, InstallMethod } from '../../pages/developer/DeveloperServicesHub';

interface InstallationManagerProps {
  service: DeveloperService;
  isOpen: boolean;
  onClose: () => void;
}

type InstallationStatus =
  | 'idle'
  | 'preparing'
  | 'downloading'
  | 'installing'
  | 'completed'
  | 'error';

interface InstallationProgress {
  status: InstallationStatus;
  progress: number;
  currentStep: string;
  logs: string[];
  error?: string;
}

const InstallationManager: React.FC<InstallationManagerProps> = ({ service, isOpen, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<InstallMethod>(service.installMethods[0]);
  const [installationProgress, setInstallationProgress] = useState<InstallationProgress>({
    status: 'idle',
    progress: 0,
    currentStep: '',
    logs: [],
  });
  const [installPath, setInstallPath] = useState('~/projects/');
  const [copiedCommand, setCopiedCommand] = useState(false);

  // محاكاة عملية التثبيت
  const simulateInstallation = async () => {
    setInstallationProgress({
      status: 'preparing',
      progress: 0,
      currentStep: 'جاري التحضير للتثبيت...',
      logs: ['بدء عملية التثبيت...'],
    });

    const steps = [
      { step: 'التحقق من التبعيات...', progress: 10, delay: 1000 },
      { step: 'تحميل الملفات...', progress: 30, delay: 2000 },
      { step: 'استخراج الملفات...', progress: 50, delay: 1500 },
      { step: 'تثبيت التبعيات...', progress: 70, delay: 2500 },
      { step: 'إعداد التكوين...', progress: 85, delay: 1000 },
      { step: 'إنهاء التثبيت...', progress: 100, delay: 1000 },
    ];

    for (const { step, progress, delay } of steps) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setInstallationProgress(prev => ({
        ...prev,
        status: progress < 100 ? (progress < 30 ? 'downloading' : 'installing') : 'completed',
        progress,
        currentStep: step,
        logs: [...prev.logs, step],
      }));
    }

    // إضافة رسالة النجاح
    setInstallationProgress(prev => ({
      ...prev,
      logs: [...prev.logs, '✅ تم التثبيت بنجاح!', `📁 المسار: ${installPath}${service.name}`],
    }));
  };

  // نسخ الأمر
  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(selectedMethod.command);
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } catch (err) {
      console.error('فشل النسخ:', err);
    }
  };

  // إعادة تعيين الحالة عند فتح المودال
  useEffect(() => {
    if (isOpen) {
      setInstallationProgress({
        status: 'idle',
        progress: 0,
        currentStep: '',
        logs: [],
      });
      setSelectedMethod(service.installMethods[0]);
    }
  }, [isOpen, service.installMethods]);

  const getStatusIcon = () => {
    switch (installationProgress.status) {
      case 'preparing':
      case 'downloading':
      case 'installing':
        return <Loader className="w-5 h-5 animate-spin text-cyan-400" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Package className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = () => {
    switch (installationProgress.status) {
      case 'preparing':
        return 'from-blue-400 to-cyan-400';
      case 'downloading':
        return 'from-cyan-400 to-green-400';
      case 'installing':
        return 'from-green-400 to-emerald-400';
      case 'completed':
        return 'from-emerald-400 to-green-500';
      case 'error':
        return 'from-red-400 to-red-500';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[85vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700"
      >
        {/* رأس المودال */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">مدير التثبيت</h2>
                <p className="text-slate-400">تثبيت {service.nameAr}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={onClose} className="text-slate-400">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* محتوى المودال */}
        <div className="p-6">
          <Tabs defaultValue="methods" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="methods">طرق التثبيت</TabsTrigger>
              <TabsTrigger value="progress">تقدم التثبيت</TabsTrigger>
              <TabsTrigger value="settings">الإعدادات</TabsTrigger>
            </TabsList>

            {/* طرق التثبيت */}
            <TabsContent value="methods" className="mt-6 space-y-4">
              <div className="grid gap-4">
                {service.installMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMethod === method
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-slate-700 bg-slate-800/50 hover:bg-slate-800'
                    }`}
                    onClick={() => setSelectedMethod(method)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedMethod === method ? 'bg-cyan-400' : 'bg-slate-600'
                          }`}
                        />
                        <Terminal className="w-5 h-5 text-cyan-400" />
                        <span className="font-medium text-white">{method.descriptionAr}</span>
                      </div>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {method.type.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="bg-slate-900 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <code className="text-green-400 font-mono text-sm">{method.command}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={e => {
                            e.stopPropagation();
                            copyCommand();
                          }}
                          className="p-2"
                        >
                          {copiedCommand ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-slate-400">{method.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* معلومات إضافية */}
              <Alert className="bg-slate-800/50 border-slate-700">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-slate-300">
                  تأكد من وجود جميع التبعيات المطلوبة قبل البدء في التثبيت. يمكنك مراجعة قائمة
                  التبعيات في تبويب معاينة الخدمة.
                </AlertDescription>
              </Alert>

              {/* أزرار الإجراءات */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={simulateInstallation}
                  disabled={installationProgress.status !== 'idle'}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700"
                >
                  {installationProgress.status === 'idle' ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      بدء التثبيت
                    </>
                  ) : (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      جاري التثبيت...
                    </>
                  )}
                </Button>
                <Button variant="outline" className="border-slate-600">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  اختيار المجلد
                </Button>
              </div>
            </TabsContent>

            {/* تقدم التثبيت */}
            <TabsContent value="progress" className="mt-6">
              <div className="space-y-6">
                {/* شريط التقدم الرئيسي */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon()}
                      <span className="font-medium text-white">
                        {installationProgress.currentStep || 'في انتظار بدء التثبيت...'}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">{installationProgress.progress}%</span>
                  </div>

                  <div className="relative">
                    <Progress value={installationProgress.progress} className="h-3" />
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${getStatusColor()} rounded-full opacity-30 blur-sm`}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </div>
                </div>

                {/* سجل العمليات */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">سجل العمليات</h3>
                  <div className="bg-slate-900 rounded-lg border border-slate-700 h-64">
                    <ScrollArea className="h-full p-4">
                      <div className="space-y-2 font-mono text-sm">
                        {installationProgress.logs.length === 0 ? (
                          <div className="text-slate-500 text-center py-8">
                            سيتم عرض سجل العمليات هنا عند بدء التثبيت...
                          </div>
                        ) : (
                          installationProgress.logs.map((log, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-2"
                            >
                              <span className="text-slate-500 text-xs mt-1">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span
                                className={
                                  log.includes('✅')
                                    ? 'text-green-400'
                                    : log.includes('❌')
                                      ? 'text-red-400'
                                      : log.includes('📁')
                                        ? 'text-blue-400'
                                        : 'text-slate-300'
                                }
                              >
                                {log}
                              </span>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={installationProgress.status === 'idle'}
                    className="border-slate-600"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    إيقاف مؤقت
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={installationProgress.status === 'idle'}
                    className="border-slate-600"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    إلغاء
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600"
                    onClick={() =>
                      setInstallationProgress({
                        status: 'idle',
                        progress: 0,
                        currentStep: '',
                        logs: [],
                      })
                    }
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    إعادة تعيين
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* الإعدادات */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">إعدادات التثبيت</h3>

                  <div className="space-y-4">
                    {/* مسار التثبيت */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        مسار التثبيت
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={installPath}
                          onChange={e => setInstallPath(e.target.value)}
                          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white"
                          placeholder="~/projects/"
                        />
                        <Button variant="outline" className="border-slate-600">
                          <FolderOpen className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* خيارات إضافية */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-300">إنشاء اختصار سطح المكتب</label>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-300">تثبيت التبعيات تلقائياً</label>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-slate-300">إضافة إلى PATH</label>
                        <input type="checkbox" className="rounded" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                {/* معلومات النظام */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">معلومات النظام</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">نظام التشغيل:</span>
                      <span className="text-white">Windows 11</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">المعمارية:</span>
                      <span className="text-white">x64</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">المساحة المتاحة:</span>
                      <span className="text-white">45.2 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Node.js:</span>
                      <span className="text-green-400">v18.17.0 ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InstallationManager;
