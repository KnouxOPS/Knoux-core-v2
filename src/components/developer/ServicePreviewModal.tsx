/**
 * مودال معاينة الخدمة
 * Service Preview Modal Component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Star,
  ExternalLink,
  Code,
  FileText,
  Image,
  Play,
  Copy,
  Check,
  Calendar,
  Users,
  Package,
  Shield,
  Globe,
  Heart,
  Share2,
  Flag,
  Eye,
  GitBranch,
  Terminal,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import InstallationManager from './InstallationManager';
import type { DeveloperService } from '../../pages/developer/DeveloperServicesHub';

interface ServicePreviewModalProps {
  service: DeveloperService;
  isOpen: boolean;
  onClose: () => void;
}

const ServicePreviewModal: React.FC<ServicePreviewModalProps> = ({ service, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [showInstallation, setShowInstallation] = useState(false);

  // إعادة تعيين الحالة عند تغيير الخدمة
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      setShowInstallation(false);
    }
  }, [service.id, isOpen]);

  // نسخ أمر التثبيت
  const copyToClipboard = async (text: string, commandType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(commandType);
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // تنسيق تاريخ آخر تحديث
  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // تنسيق عدد التحميلات
  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)} مليون`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)} ألف`;
    return downloads.toLocaleString('ar-EG');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="w-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
        >
          {/* رأس المودال */}
          <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-slate-700">
            {/* خلفية متحركة */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10" />

            <div className="relative flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* أيقونة الخدمة */}
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center border border-slate-600">
                  <Code className="w-8 h-8 text-cyan-400" />
                </div>

                {/* معلومات أساسية */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-lg text-slate-300 mb-3">{service.nameAr}</p>

                  {/* علامات */}
                  <div className="flex items-center gap-2">
                    {service.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">مميز</Badge>
                    )}
                    {service.premium && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                        بريميوم
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      v{service.version}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* إجراءات الرأس */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 ${isLiked ? 'text-red-400' : 'text-slate-400'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button size="sm" variant="ghost" className="p-2 text-slate-400">
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="p-2 text-slate-400">
                  <Flag className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onClose} className="p-2 text-slate-400">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="flex items-center gap-6 mt-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span>{formatDownloads(service.downloads)} تحميل</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{service.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                <span>{service.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>آخر تحديث: {formatLastUpdated(service.lastUpdated)}</span>
              </div>
            </div>
          </div>

          {/* محتوى المودال */}
          <div className="flex h-[calc(90vh-200px)]">
            {/* التبويبات الجانبية */}
            <div className="w-64 bg-slate-800/50 border-r border-slate-700 p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                  <TabsTrigger
                    value="overview"
                    className="w-full justify-start data-[state=active]:bg-cyan-600"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    نظرة عامة
                  </TabsTrigger>
                  <TabsTrigger
                    value="installation"
                    className="w-full justify-start data-[state=active]:bg-cyan-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    التثبيت
                  </TabsTrigger>
                  <TabsTrigger
                    value="documentation"
                    className="w-full justify-start data-[state=active]:bg-cyan-600"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    التوثيق
                  </TabsTrigger>
                  <TabsTrigger
                    value="screenshots"
                    className="w-full justify-start data-[state=active]:bg-cyan-600"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    صور المعاينة
                  </TabsTrigger>
                  <TabsTrigger
                    value="dependencies"
                    className="w-full justify-start data-[state=active]:bg-cyan-600"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    التبعيات
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* إجراءات سريعة */}
              <div className="mt-6 space-y-2">
                <Button
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => setShowInstallation(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  تحميل الآن
                </Button>
                <Button variant="outline" className="w-full border-slate-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  زيارة المستودع
                </Button>
                {service.preview && (
                  <Button variant="outline" className="w-full border-slate-600">
                    <Play className="w-4 h-4 mr-2" />
                    معاينة مباشرة
                  </Button>
                )}
              </div>
            </div>

            {/* محتوى التبويبات */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  {/* نظرة عامة */}
                  <TabsContent value="overview" className="mt-0">
                    <div className="space-y-6">
                      {/* الوصف التفصيلي */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">الوصف</h3>
                        <p className="text-slate-300 leading-relaxed">{service.descriptionAr}</p>
                        <p className="text-slate-400 leading-relaxed mt-2">{service.description}</p>
                      </div>

                      {/* العلامات */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">العلامات</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map(tag => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-slate-600 text-slate-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* المنصات المدعومة */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">المنصات المدعومة</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.platforms.map(platform => (
                            <Badge key={platform} className="bg-slate-700 text-slate-200">
                              <Globe className="w-3 h-3 mr-1" />
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* معلومات الترخيص */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">معلومات إضافية</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                              <Shield className="w-4 h-4" />
                              <span>الترخيص</span>
                            </div>
                            <div className="text-white font-medium">{service.license}</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-slate-400 mb-2">
                              <Package className="w-4 h-4" />
                              <span>حجم الملف</span>
                            </div>
                            <div className="text-white font-medium">{service.size}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* التثبيت */}
                  <TabsContent value="installation" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white">طرق التثبيت</h3>

                      {service.installMethods.map((method, index) => (
                        <div
                          key={index}
                          className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Terminal className="w-5 h-5 text-cyan-400" />
                              <span className="font-medium text-white">{method.descriptionAr}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(method.command, method.type)}
                              className="border-slate-600"
                            >
                              {copiedCommand === method.type ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm text-green-400">
                            {method.command}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* التوثيق */}
                  <TabsContent value="documentation" className="mt-0">
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">التوثيق الخارجي</h3>
                      <p className="text-slate-400 mb-4">
                        يمكنك الوصول إلى التوثيق الكامل من خلال الرابط أدناه
                      </p>
                      <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                        <a href={service.documentation} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          فتح التوثيق
                        </a>
                      </Button>
                    </div>
                  </TabsContent>

                  {/* صور المعاينة */}
                  <TabsContent value="screenshots" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white">صور المعاينة</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.screenshots.map((screenshot, index) => (
                          <div
                            key={index}
                            className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700"
                          >
                            <img
                              src={screenshot}
                              alt={`معاينة ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* التبعيات */}
                  <TabsContent value="dependencies" className="mt-0">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-white">التبعيات المطلوبة</h3>
                      <div className="space-y-3">
                        {service.dependencies.map((dependency, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700"
                          >
                            <Package className="w-5 h-5 text-cyan-400" />
                            <span className="text-white font-medium">{dependency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollArea>
            </div>
          </div>

          {/* مودال إدارة التثبيت */}
          <AnimatePresence>
            {showInstallation && (
              <InstallationManager
                service={service}
                isOpen={showInstallation}
                onClose={() => setShowInstallation(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicePreviewModal;
