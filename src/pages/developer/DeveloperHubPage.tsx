/**
 * مركز خدمات المطورين - بيئة عمل كونية متكاملة
 * Developer Services Hub - Complete Cosmic Development Environment
 */

'use client';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Code,
  Database,
  Navigation,
  Terminal,
  Settings,
  HelpCircle,
  BarChart3,
  Cpu,
  Brain,
  Zap,
  Star,
  Download,
  Play,
  Eye,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Sparkles,
  Rocket,
  Shield,
  Globe,
  ChevronRight,
  Info,
  Loader,
} from 'lucide-react';

// UI Components
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { ScrollArea } from '../../components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';

// Contexts
import { useSystemSettings } from '../../contexts/SystemSettingsContext';
import { useToast } from '../../hooks/use-toast';

// Types
interface DeveloperService {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  status: 'active' | 'beta' | 'maintenance' | 'coming-soon' | 'premium';
  previewUrl?: string;
  features: string[];
  featuresAr: string[];
  rating: number;
  downloadSize: string;
  tags: string[];
  version: string;
  updateDate: string;
  aiType: string;
  aiTypeAr: string;
  developer: string;
  price?: number;
  category: 'core' | 'ai' | 'tools' | 'integration' | 'analytics';
}

// Mock Services Data
const DEVELOPER_SERVICES: DeveloperService[] = [
  {
    id: 'nexus-editor',
    name: 'Nexus Code Editor',
    nameAr: 'محرر نيكزوس للأكواد',
    description:
      'AI-powered code editor for spaceship systems and quantum applications with real-time debugging.',
    descriptionAr:
      'محرر أكواد ذكي مدعوم بالذكاء الاصطناعي لأنظمة السفن الفضائية والتطبيقات الكمية مع تصحيح الأخطاء المباشر.',
    icon: <Code className="w-6 h-6 text-cyan-400" />,
    status: 'active',
    previewUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    features: [
      'AI Code Completion',
      'Real-time Debugging',
      '50+ Languages',
      'Git Integration',
      'Live Collaboration',
    ],
    featuresAr: [
      'إكمال الكود بالذكاء الاصطناعي',
      'تصحيح الأخطاء المباشر',
      '50+ لغة برمجة',
      'تكامل Git',
      'تعاون مباشر',
    ],
    rating: 4.9,
    downloadSize: '2.3 MB',
    tags: ['react', 'ai', 'code-editor', 'dev-tool', 'typescript'],
    version: '3.1.0',
    updateDate: '2024-01-15',
    aiType: 'Codex Prime',
    aiTypeAr: 'كودكس برايم',
    developer: 'KnouxDev',
    category: 'core',
  },
  {
    id: 'astranav-console',
    name: 'AstraNav Console',
    nameAr: 'كونسول أسترا نافيجيشن',
    description:
      'Advanced quantum navigation unit with 3D holographic star charts and AI pathfinding.',
    descriptionAr:
      'وحدة ملاحة كمية متطورة مع خرائط نجمية ثلاثية الأبعاد وذكاء اصطناعي لإيجاد المسارات.',
    icon: <Navigation className="w-6 h-6 text-purple-400" />,
    status: 'active',
    previewUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
    features: ['3D Star Maps', 'Quantum Pathfinding', 'Hazard Detection', 'Real-time Positioning'],
    featuresAr: [
      'خرائط نجمية ثلاثية الأبعاد',
      'إيجاد المسارات الكمية',
      'اكتشاف المخاطر',
      'تحديد الموقع المباشر',
    ],
    rating: 4.7,
    downloadSize: '125 MB',
    tags: ['navigation', 'ai', '3d', 'quantum', 'realtime'],
    version: '2.8.1',
    updateDate: '2024-01-12',
    aiType: 'StarChaser AI',
    aiTypeAr: 'ذكاء صائد النجوم',
    developer: 'KnouxDev',
    category: 'ai',
  },
  {
    id: 'cosmodata-bay',
    name: 'CosmoData Bay',
    nameAr: 'خليج البيانات الكونية',
    description:
      'Cosmic data analysis center with quantum computing capabilities and pattern recognition.',
    descriptionAr: 'مركز تحليل البيانات الكونية مع قدرات الحوسبة الكمية والتعرف على الأنماط.',
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    status: 'active',
    previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    features: [
      '3D Data Visualization',
      'Anomaly Detection',
      'Predictive Analytics',
      'Big Data Processing',
    ],
    featuresAr: [
      'تصور البيانات ثلاثي الأبعاد',
      'اكتشاف الشذوذ',
      'التحليل التنبؤي',
      'معالجة البيانات الضخمة',
    ],
    rating: 4.8,
    downloadSize: '78 MB',
    tags: ['data', 'analytics', 'ai', 'visualization', 'quantum'],
    version: '1.9.2',
    updateDate: '2024-01-10',
    aiType: 'Pattern Sentinel',
    aiTypeAr: 'حارس الأنماط',
    developer: 'KnouxDev',
    category: 'analytics',
  },
  {
    id: 'quantum-command',
    name: 'Quantum Command Center',
    nameAr: 'مركز الأوامر الكمية',
    description:
      'Advanced command center with AI voice commands, system diagnostics, and security protocols.',
    descriptionAr: 'مركز أوامر متقدم مع أوامر صوتية ذكية وتشخيص النظام وبروتوكولات الأمان.',
    icon: <Terminal className="w-6 h-6 text-orange-400" />,
    status: 'beta',
    previewUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    features: ['Voice Commands', 'System Diagnostics', 'Security Hub', 'Remote Access'],
    featuresAr: ['الأوامر الصوتية', 'تشخيص النظام', 'مركز الأمان', 'الوصول عن بُعد'],
    rating: 4.6,
    downloadSize: '45 MB',
    tags: ['command', 'ai', 'voice', 'security', 'diagnostics'],
    version: '0.9.5',
    updateDate: '2024-01-11',
    aiType: 'AstroVoice AI',
    aiTypeAr: 'ذكاء أسترو الصوتي',
    developer: 'KnouxDev',
    category: 'core',
  },
  {
    id: 'neural-architect',
    name: 'Neural Architect',
    nameAr: 'المهندس العصبي',
    description:
      'AI-powered system architecture design tool with automated optimization and deployment.',
    descriptionAr: 'أداة تصميم بنية النظام مدعومة بالذكاء الاصطناعي مع التحسين الآلي والنشر.',
    icon: <Brain className="w-6 h-6 text-pink-400" />,
    status: 'premium',
    previewUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
    features: ['Auto Architecture', 'Performance Optimization', 'Cloud Deployment', 'Monitoring'],
    featuresAr: ['البنية التلقائية', 'تحسين الأداء', 'النشر السحابي', 'المراقبة'],
    rating: 4.9,
    downloadSize: '156 MB',
    tags: ['ai', 'architecture', 'deployment', 'optimization'],
    version: '2.1.3',
    updateDate: '2024-01-14',
    aiType: 'Neural Prime',
    aiTypeAr: 'العصبي الأولي',
    developer: 'KnouxDev Pro',
    category: 'ai',
    price: 99.99,
  },
  {
    id: 'cosmic-analytics',
    name: 'Cosmic Analytics',
    nameAr: 'التحليلات الكونية',
    description: 'Advanced analytics dashboard with real-time insights and predictive modeling.',
    descriptionAr: 'لوحة تحليلات متقدمة مع رؤى مباشرة ونمذجة تنبؤية.',
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    status: 'active',
    previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    features: ['Real-time Dashboards', 'Predictive Models', 'Custom Reports', 'Data Export'],
    featuresAr: ['لوحات مباشرة', 'نماذج تنبؤية', 'تقارير مخصصة', 'تصدير البيانات'],
    rating: 4.7,
    downloadSize: '32 MB',
    tags: ['analytics', 'dashboard', 'reporting', 'insights'],
    version: '1.6.8',
    updateDate: '2024-01-13',
    aiType: 'Insight Engine',
    aiTypeAr: 'محرك الرؤى',
    developer: 'KnouxDev',
    category: 'analytics',
  },
];

const DeveloperHubPage: React.FC = () => {
  // System settings and state
  const systemSettings = useSystemSettings();
  const { toast } = useToast();

  // Component state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'recent' | 'name'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedService, setSelectedService] = useState<DeveloperService | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [installProgress, setInstallProgress] = useState<{ [key: string]: number }>({});

  // Language support
  const isRTL = systemSettings?.settings.language === 'ar';
  const t = useCallback(
    (ar: string, en: string) => {
      return systemSettings?.settings.language === 'ar' ? ar : en;
    },
    [systemSettings?.settings.language]
  );

  // Filtered and sorted services
  const processedServices = useMemo(() => {
    let filtered = DEVELOPER_SERVICES.filter(service => {
      const matchesSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.nameAr.includes(searchQuery) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.descriptionAr.includes(searchQuery) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' ||
        service.category === selectedCategory ||
        (selectedCategory === 'premium' && service.status === 'premium');

      return matchesSearch && matchesCategory;
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.rating - a.rating;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
        case 'name':
          return isRTL ? a.nameAr.localeCompare(b.nameAr) : a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, isRTL]);

  // Service activation handler
  const handleServiceActivation = useCallback(
    async (service: DeveloperService) => {
      const serviceId = service.id;

      try {
        // Simulate installation process
        setInstallProgress(prev => ({ ...prev, [serviceId]: 0 }));

        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setInstallProgress(prev => ({ ...prev, [serviceId]: progress }));
        }

        toast({
          title: t('تم تفع��ل الخدمة', 'Service Activated'),
          description: t(
            `تم تفعيل ${service.nameAr} بنجاح`,
            `${service.name} has been activated successfully`
          ),
        });

        setInstallProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[serviceId];
          return newProgress;
        });
      } catch (error) {
        toast({
          title: t('خطأ في التفعيل', 'Activation Error'),
          description: t('فشل في تفعيل الخدمة', 'Failed to activate service'),
          variant: 'destructive',
        });
      }
    },
    [t, toast]
  );

  // Service preview handler
  const handleServicePreview = useCallback((service: DeveloperService) => {
    setSelectedService(service);
    setShowPreview(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="absolute inset-0">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

          {/* Floating particles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="relative"
            >
              <Code className="w-12 h-12 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-30" />
            </motion.div>

            <h1 className="text-4xl font-bold text-white">
              {t('مركز خدمات المطورين', 'Developer Services Hub')}
            </h1>

            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              <Sparkles className="w-3 h-3 mr-1" />
              {t('بريميوم', 'Premium')}
            </Badge>
          </div>

          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            {t(
              'بيئة عمل كونية متكاملة مع أحدث أدوات التطوير المدعومة بالذكاء الاصطناعي',
              'Complete cosmic development environment with cutting-edge AI-powered development tools'
            )}
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{DEVELOPER_SERVICES.length}</div>
              <div className="text-sm text-slate-400">{t('خدمة متاحة', 'Services Available')}</div>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {DEVELOPER_SERVICES.filter(s => s.status === 'premium').length}
              </div>
              <div className="text-sm text-slate-400">{t('خدمة بريميوم', 'Premium Services')}</div>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {DEVELOPER_SERVICES.filter(s => s.category === 'ai').length}
              </div>
              <div className="text-sm text-slate-400">{t('خدمة ذكية', 'AI Services')}</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder={t('ابحث في الخدمات...', 'Search services...')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/80 border-slate-600"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 bg-slate-900/80 border-slate-600">
                  <SelectValue placeholder={t('الفئة', 'Category')} />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-600">
                  <SelectItem value="all">{t('جميع الفئات', 'All Categories')}</SelectItem>
                  <SelectItem value="core">{t('أساسية', 'Core')}</SelectItem>
                  <SelectItem value="ai">{t('ذكاء اصطناعي', 'AI')}</SelectItem>
                  <SelectItem value="tools">{t('أدوات', 'Tools')}</SelectItem>
                  <SelectItem value="analytics">{t('تحليلات', 'Analytics')}</SelectItem>
                  <SelectItem value="premium">{t('بريميوم', 'Premium')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={value => setSortBy(value as any)}>
                <SelectTrigger className="w-32 bg-slate-900/80 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-600">
                  <SelectItem value="popularity">{t('الشعبية', 'Popular')}</SelectItem>
                  <SelectItem value="rating">{t('التقييم', 'Rating')}</SelectItem>
                  <SelectItem value="recent">{t('الأحدث', 'Recent')}</SelectItem>
                  <SelectItem value="name">{t('الاسم', 'Name')}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex bg-slate-900/80 rounded-lg border border-slate-600">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          {processedServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('لا توجد خدمات', 'No Services Found')}
              </h3>
              <p className="text-slate-400">
                {t('جرب تغيير معايير البحث', 'Try changing your search criteria')}
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              <AnimatePresence>
                {processedServices.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    viewMode={viewMode}
                    installProgress={installProgress[service.id]}
                    onActivate={() => handleServiceActivation(service)}
                    onPreview={() => handleServicePreview(service)}
                    index={index}
                    t={t}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Service Preview Modal */}
        <ServicePreviewModal
          service={selectedService}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false);
            setSelectedService(null);
          }}
          onActivate={handleServiceActivation}
          t={t}
        />
      </div>
    </div>
  );
};

// Service Card Component
interface ServiceCardProps {
  service: DeveloperService;
  viewMode: 'grid' | 'list';
  installProgress?: number;
  onActivate: () => void;
  onPreview: () => void;
  index: number;
  t: (ar: string, en: string) => string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  viewMode,
  installProgress,
  onActivate,
  onPreview,
  index,
  t,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card
        className={`relative overflow-hidden transition-all duration-300 hover:scale-105 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 ${
          service.status === 'premium' ? 'border-l-4 border-l-purple-500' : ''
        } ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col h-full'}`}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />

        {/* Preview Image */}
        {viewMode === 'grid' && (
          <div className="relative h-40 overflow-hidden">
            {service.previewUrl ? (
              <img
                src={service.previewUrl}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                {service.icon}
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Badge
                variant={
                  service.status === 'active'
                    ? 'default'
                    : service.status === 'beta'
                      ? 'secondary'
                      : service.status === 'premium'
                        ? 'default'
                        : 'destructive'
                }
                className={
                  service.status === 'premium'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : service.status === 'beta'
                      ? 'bg-yellow-500'
                      : ''
                }
              >
                {service.status === 'premium' && <Star className="w-3 h-3 mr-1" />}
                {t(
                  service.status === 'active'
                    ? 'نشط'
                    : service.status === 'beta'
                      ? 'تجريبي'
                      : service.status === 'premium'
                        ? 'بريميوم'
                        : 'صيانة',
                  service.status.charAt(0).toUpperCase() + service.status.slice(1)
                )}
              </Badge>
            </div>

            {/* Rating */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
              <div className="flex items-center gap-1 text-xs text-white">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                {service.rating}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {viewMode === 'list' && service.icon}
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {t(service.nameAr, service.name)}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>{service.version}</span>
                  <span>•</span>
                  <span>{service.downloadSize}</span>
                  {viewMode === 'list' && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        {service.rating}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {service.price && (
              <div className="text-right">
                <div className="text-lg font-bold text-purple-400">${service.price}</div>
                <div className="text-xs text-slate-400">{t('شهرياً', 'per month')}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">
            {t(service.descriptionAr, service.description)}
          </p>

          {/* AI Type */}
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">
              {t(service.aiTypeAr, service.aiType)}
            </span>
          </div>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {t(service.featuresAr.join(','), service.features.join(','))
                .split(',')
                .slice(0, 3)
                .map((feature, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs border-slate-600 text-slate-300"
                  >
                    {feature.trim()}
                  </Badge>
                ))}
              {service.features.length > 3 && (
                <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                  +{service.features.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {installProgress !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-cyan-400">{t('جاري التثبيت...', 'Installing...')}</span>
                <span className="text-slate-400">{installProgress}%</span>
              </div>
              <Progress value={installProgress} className="h-2" />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={onPreview}
              variant="outline"
              size="sm"
              className="flex-1 border-slate-600 hover:bg-slate-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              {t('معاينة', 'Preview')}
            </Button>

            <Button
              onClick={onActivate}
              disabled={installProgress !== undefined}
              size="sm"
              className="flex-1 bg-cyan-600 hover:bg-cyan-700"
            >
              {installProgress !== undefined ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {t('تفعيل', 'Activate')}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Service Preview Modal Component
interface ServicePreviewModalProps {
  service: DeveloperService | null;
  isOpen: boolean;
  onClose: () => void;
  onActivate: (service: DeveloperService) => void;
  t: (ar: string, en: string) => string;
}

const ServicePreviewModal: React.FC<ServicePreviewModalProps> = ({
  service,
  isOpen,
  onClose,
  onActivate,
  t,
}) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            {service.icon}
            {t(service.nameAr, service.name)}
            {service.status === 'premium' && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Star className="w-3 h-3 mr-1" />
                {t('بريميوم', 'Premium')}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>{t(service.descriptionAr, service.description)}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Preview Image */}
            {service.previewUrl && (
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={service.previewUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* AI Features */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-purple-400 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                {t('مميزات الذكاء الاصطناعي', 'AI Features')}
              </h4>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">
                      {t(service.aiTypeAr, service.aiType)}
                    </div>
                    <div className="text-sm text-slate-400">
                      {t('نظام ذكاء اصطناعي متطور', 'Advanced AI System')}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>{t('معالجة فورية', 'Real-time Processing')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>{t('آمان متقدم', 'Advanced Security')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>{t('دعم متعدد اللغات', 'Multi-language Support')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-orange-400" />
                    <span>{t('أداء عالي', 'High Performance')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-cyan-400">
                {t('المميزات الرئيسية', 'Key Features')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-sm text-slate-300">
                      {t(service.featuresAr[idx] || feature, feature)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">{service.rating}</div>
                <div className="text-xs text-slate-400">{t('التقييم', 'Rating')}</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-bold text-purple-400">{service.downloadSize}</div>
                <div className="text-xs text-slate-400">{t('الحجم', 'Size')}</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-bold text-emerald-400">{service.version}</div>
                <div className="text-xs text-slate-400">{t('الإصدار', 'Version')}</div>
              </div>
              <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                <div className="text-lg font-bold text-orange-400">{service.developer}</div>
                <div className="text-xs text-slate-400">{t('المطور', 'Developer')}</div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('إغلاق', 'Close')}
          </Button>
          <Button onClick={() => onActivate(service)} className="bg-cyan-600 hover:bg-cyan-700">
            <Download className="w-4 h-4 mr-2" />
            {service.price
              ? `${t('اشتراك', 'Subscribe')} $${service.price}`
              : t('تفعيل مجاني', 'Activate Free')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperHubPage;
