/**
 * مركز خدمات المطورين - النسخة البريميوم
 * Developer Services Hub - Premium Edition
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Star,
  Users,
  Code,
  Globe,
  Zap,
} from 'lucide-react';
import DeveloperServiceCard3D from '../../components/developer/DeveloperServiceCard3D';
import ServiceSearchEngine from '../../components/developer/ServiceSearchEngine';
import ServicePreviewModal from '../../components/developer/ServicePreviewModal';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

// أنواع الخدمات والبيانات
export interface DeveloperService {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: ServiceCategory;
  subcategory: string;
  version: string;
  author: string;
  downloads: number;
  rating: number;
  tags: string[];
  screenshots: string[];
  documentation: string;
  repository: string;
  installMethods: InstallMethod[];
  dependencies: string[];
  platforms: Platform[];
  license: string;
  size: string;
  lastUpdated: string;
  featured: boolean;
  premium: boolean;
  price?: number;
  preview?: {
    type: 'iframe' | 'image' | 'video';
    url: string;
  };
}

export enum ServiceCategory {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  DEVTOOLS = 'devtools',
  LIBRARIES = 'libraries',
  FRAMEWORKS = 'frameworks',
  TEMPLATES = 'templates',
  SCRIPTS = 'scripts',
  APIS = 'apis',
  DATABASES = 'databases',
  HOSTING = 'hosting',
  AI_ML = 'ai_ml',
  BLOCKCHAIN = 'blockchain',
  IOT = 'iot',
}

export enum Platform {
  WEB = 'web',
  WINDOWS = 'windows',
  MACOS = 'macos',
  LINUX = 'linux',
  ANDROID = 'android',
  IOS = 'ios',
  CROSS_PLATFORM = 'cross_platform',
}

export interface InstallMethod {
  type: 'npm' | 'yarn' | 'pip' | 'git' | 'download' | 'docker' | 'api';
  command: string;
  description: string;
  descriptionAr: string;
}

// بيانات وهمية للخدمات (في التطبيق الحقيقي ستأتي من API)
const mockDeveloperServices: DeveloperService[] = [
  {
    id: '1',
    name: 'React Cosmic UI',
    nameAr: 'واجهة رياكت الكونية',
    description: 'A futuristic UI component library with cosmic themes and animations',
    descriptionAr: 'مكتبة مكونات واجهة مستقبلية بثيمات كونية ورسوم متحركة',
    category: ServiceCategory.FRONTEND,
    subcategory: 'UI Libraries',
    version: '2.1.0',
    author: 'KnouxDev',
    downloads: 15420,
    rating: 4.8,
    tags: ['react', 'ui', 'components', 'cosmic', 'animation'],
    screenshots: ['/api/placeholder/800/600'],
    documentation: 'https://cosmic-ui.docs',
    repository: 'https://github.com/knouxdev/react-cosmic-ui',
    installMethods: [
      {
        type: 'npm',
        command: 'npm install react-cosmic-ui',
        description: 'Install via NPM',
        descriptionAr: 'تثبيت عبر NPM',
      },
      {
        type: 'yarn',
        command: 'yarn add react-cosmic-ui',
        description: 'Install via Yarn',
        descriptionAr: 'تثبيت عبر Yarn',
      },
    ],
    dependencies: ['react', 'framer-motion', 'tailwindcss'],
    platforms: [Platform.WEB],
    license: 'MIT',
    size: '2.3 MB',
    lastUpdated: '2024-01-15',
    featured: true,
    premium: false,
    preview: {
      type: 'iframe',
      url: '/preview/cosmic-ui',
    },
  },
  {
    id: '2',
    name: 'Neural Code Assistant',
    nameAr: 'مساعد الكود العصبي',
    description: 'AI-powered code completion and optimization tool',
    descriptionAr: 'أداة إكمال وتحسين الكود مدعومة بالذكاء الاصطناعي',
    category: ServiceCategory.AI_ML,
    subcategory: 'Code Tools',
    version: '1.5.2',
    author: 'AI Systems Inc',
    downloads: 8750,
    rating: 4.9,
    tags: ['ai', 'code-completion', 'optimization', 'productivity'],
    screenshots: ['/api/placeholder/800/600'],
    documentation: 'https://neural-assistant.docs',
    repository: 'https://github.com/ai-systems/neural-code',
    installMethods: [
      {
        type: 'npm',
        command: 'npm install -g neural-code-assistant',
        description: 'Global installation via NPM',
        descriptionAr: 'تثبيت عام عبر NPM',
      },
    ],
    dependencies: ['node', 'tensorflow'],
    platforms: [Platform.CROSS_PLATFORM],
    license: 'Commercial',
    size: '125 MB',
    lastUpdated: '2024-01-10',
    featured: true,
    premium: true,
    price: 29.99,
  },
  {
    id: '3',
    name: 'Quantum API Gateway',
    nameAr: 'بوابة كوانتم للواجهات البرمجية',
    description: 'High-performance API gateway with quantum encryption',
    descriptionAr: 'بوابة واجهات برمجية عالية الأداء مع تشفير كوانتم',
    category: ServiceCategory.BACKEND,
    subcategory: 'API Management',
    version: '3.0.1',
    author: 'Quantum Systems',
    downloads: 3200,
    rating: 4.7,
    tags: ['api', 'gateway', 'security', 'quantum', 'microservices'],
    screenshots: ['/api/placeholder/800/600'],
    documentation: 'https://quantum-gateway.docs',
    repository: 'https://github.com/quantum/api-gateway',
    installMethods: [
      {
        type: 'docker',
        command: 'docker run -p 8080:8080 quantum/api-gateway',
        description: 'Run with Docker',
        descriptionAr: 'تشغيل مع دوكر',
      },
      {
        type: 'npm',
        command: 'npm install quantum-api-gateway',
        description: 'Install via NPM',
        descriptionAr: 'تثبيت عبر NPM',
      },
    ],
    dependencies: ['node', 'redis', 'postgresql'],
    platforms: [Platform.LINUX, Platform.WINDOWS, Platform.MACOS],
    license: 'Apache 2.0',
    size: '45 MB',
    lastUpdated: '2024-01-08',
    featured: false,
    premium: true,
    price: 99.99,
  },
  {
    id: '4',
    name: 'Mobile Nexus Framework',
    nameAr: 'إطار عمل نيكزوس للهواتف',
    description: 'Cross-platform mobile development framework with native performance',
    descriptionAr: 'إطار عمل لتطوير التطبيقات متعددة المنصات بأداء أصلي',
    category: ServiceCategory.MOBILE,
    subcategory: 'Frameworks',
    version: '4.2.0',
    author: 'Nexus Mobile',
    downloads: 12000,
    rating: 4.6,
    tags: ['mobile', 'cross-platform', 'native', 'framework'],
    screenshots: ['/api/placeholder/800/600'],
    documentation: 'https://mobile-nexus.docs',
    repository: 'https://github.com/nexus/mobile-framework',
    installMethods: [
      {
        type: 'npm',
        command: 'npm install -g @nexus/mobile-cli',
        description: 'Install CLI globally',
        descriptionAr: 'تثبيت أداة الأوامر عالمياً',
      },
    ],
    dependencies: ['node', 'android-sdk', 'xcode'],
    platforms: [Platform.ANDROID, Platform.IOS],
    license: 'BSD-3',
    size: '200 MB',
    lastUpdated: '2024-01-12',
    featured: true,
    premium: false,
  },
  {
    id: '5',
    name: 'Blockchain Dev Toolkit',
    nameAr: 'أدوات مطور البلوك تشين',
    description: 'Complete toolkit for blockchain and smart contract development',
    descriptionAr: 'مجموعة أدوات كاملة لتطوير البلوك تشين والعقود الذكية',
    category: ServiceCategory.BLOCKCHAIN,
    subcategory: 'Development Tools',
    version: '1.8.3',
    author: 'BlockDev Labs',
    downloads: 5400,
    rating: 4.5,
    tags: ['blockchain', 'smart-contracts', 'ethereum', 'web3', 'solidity'],
    screenshots: ['/api/placeholder/800/600'],
    documentation: 'https://blockchain-toolkit.docs',
    repository: 'https://github.com/blockdev/toolkit',
    installMethods: [
      {
        type: 'npm',
        command: 'npm install -g blockchain-dev-toolkit',
        description: 'Global installation',
        descriptionAr: 'تثبيت عام',
      },
    ],
    dependencies: ['node', 'web3', 'truffle'],
    platforms: [Platform.CROSS_PLATFORM],
    license: 'GPL-3.0',
    size: '78 MB',
    lastUpdated: '2024-01-14',
    featured: false,
    premium: true,
    price: 149.99,
  },
];

const DeveloperServicesHub: React.FC = () => {
  // الحالات الأساسية
  const [services, setServices] = useState<DeveloperService[]>(mockDeveloperServices);
  const [filteredServices, setFilteredServices] =
    useState<DeveloperService[]>(mockDeveloperServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'recent' | 'name'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedService, setSelectedService] = useState<DeveloperService | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  // فلترة وترتيب الخدمات
  const processedServices = useMemo(() => {
    let filtered = services.filter(service => {
      const matchesSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.nameAr.includes(searchQuery) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.descriptionAr.includes(searchQuery) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesPremium = !showPremiumOnly || service.premium;

      return matchesSearch && matchesCategory && matchesPremium;
    });

    // الترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [services, searchQuery, selectedCategory, sortBy, showPremiumOnly]);

  // إحصائيات سريعة
  const stats = useMemo(
    () => ({
      total: services.length,
      premium: services.filter(s => s.premium).length,
      categories: Object.values(ServiceCategory).length,
      totalDownloads: services.reduce((sum, s) => sum + s.downloads, 0),
    }),
    [services]
  );

  const handleServiceClick = (service: DeveloperService) => {
    setSelectedService(service);
    setShowPreview(true);
  };

  const categoryLabels = {
    [ServiceCategory.FRONTEND]: { en: 'Frontend', ar: 'الواجهة الأمامية' },
    [ServiceCategory.BACKEND]: { en: 'Backend', ar: 'الواجهة الخلفية' },
    [ServiceCategory.MOBILE]: { en: 'Mobile', ar: 'الهواتف المحمولة' },
    [ServiceCategory.DESKTOP]: { en: 'Desktop', ar: 'سطح المكتب' },
    [ServiceCategory.DEVTOOLS]: { en: 'Dev Tools', ar: 'أدوات التطوير' },
    [ServiceCategory.LIBRARIES]: { en: 'Libraries', ar: 'المكتبات' },
    [ServiceCategory.FRAMEWORKS]: { en: 'Frameworks', ar: 'أطر العمل' },
    [ServiceCategory.TEMPLATES]: { en: 'Templates', ar: 'القوالب' },
    [ServiceCategory.SCRIPTS]: { en: 'Scripts', ar: 'السكريبتات' },
    [ServiceCategory.APIS]: { en: 'APIs', ar: 'واجهات برمجية' },
    [ServiceCategory.DATABASES]: { en: 'Databases', ar: 'قواعد البيانات' },
    [ServiceCategory.HOSTING]: { en: 'Hosting', ar: 'الاستضافة' },
    [ServiceCategory.AI_ML]: { en: 'AI/ML', ar: 'ذكاء اصطناعي' },
    [ServiceCategory.BLOCKCHAIN]: { en: 'Blockchain', ar: 'بلوك تشين' },
    [ServiceCategory.IOT]: { en: 'IoT', ar: 'إنترنت الأشياء' },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* خلفية كونية متحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* طبقات الضوء المتحركة */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`bg-light-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
              style={{ top: `${30 + i * 25}%` }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10 p-6">
        {/* الرأس الأساسي */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Code className="w-8 h-8 text-cyan-400" />
              <motion.div
                className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h1 className="text-4xl font-bold text-white">مركز خدمات المطورين</h1>
            <Badge variant="outline" className="border-cyan-400 text-cyan-400">
              <Star className="w-3 h-3 mr-1" />
              بريميوم
            </Badge>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            الجسر الحي الموصل لجميع المطورين - اكتشف، حمل، ثبت أي خدمة أو تطبيق أو سكريبت
          </p>

          {/* إحصائيات سريعة */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{stats.total.toLocaleString()}</div>
              <div className="text-sm text-slate-400">خدمة متاحة</div>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.premium}</div>
              <div className="text-sm text-slate-400">خدمة بريميوم</div>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.categories}</div>
              <div className="text-sm text-slate-400">فئة</div>
            </div>
            <div className="w-px h-8 bg-slate-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {(stats.totalDownloads / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-slate-400">تحميل</div>
            </div>
          </div>
        </motion.div>

        {/* شريط البحث والفلاتر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-6xl mx-auto">
            {/* البحث الذكي */}
            <div className="relative mb-6">
              <ServiceSearchEngine
                onSearch={setSearchQuery}
                placeholder="ابحث عن أي خدمة، تطبيق، سكريبت، أو مكتبة..."
                suggestions={services.map(s => ({
                  name: s.name,
                  nameAr: s.nameAr,
                  category: s.category,
                }))}
              />
            </div>

            {/* الفلاتر */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
              {/* فئة الخدمة */}
              <Select
                value={selectedCategory}
                onValueChange={value => setSelectedCategory(value as ServiceCategory | 'all')}
              >
                <SelectTrigger className="w-48 bg-slate-900/80 border-slate-600">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-600">
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label.ar}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* طريقة الترتيب */}
              <Select value={sortBy} onValueChange={value => setSortBy(value as any)}>
                <SelectTrigger className="w-40 bg-slate-900/80 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-600">
                  <SelectItem value="popularity">الأكثر شعبية</SelectItem>
                  <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                  <SelectItem value="recent">الأحدث</SelectItem>
                  <SelectItem value="name">الاسم</SelectItem>
                </SelectContent>
              </Select>

              {/* خدمات بريميوم فقط */}
              <Button
                variant={showPremiumOnly ? 'default' : 'outline'}
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                className={
                  showPremiumOnly
                    ? 'bg-cyan-600 hover:bg-cyan-700'
                    : 'border-slate-600 hover:bg-slate-700'
                }
              >
                <Star className="w-4 h-4 mr-2" />
                بريميوم فقط
              </Button>

              {/* طريقة العرض */}
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

              {/* عدد النتائج */}
              <div className="mr-auto flex items-center gap-2 text-slate-400">
                <Globe className="w-4 h-4" />
                <span>{processedServices.length} خدمة</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* شبكة الخدمات */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          {processedServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">لم يتم العثور على خدمات</h3>
              <p className="text-slate-400">جرب تغيير معايير البحث أو الفلاتر</p>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}
            >
              <AnimatePresence>
                {processedServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <DeveloperServiceCard3D
                      service={service}
                      viewMode={viewMode}
                      onClick={() => handleServiceClick(service)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* مودال معاينة الخدمة */}
        <AnimatePresence>
          {showPreview && selectedService && (
            <ServicePreviewModal
              service={selectedService}
              isOpen={showPreview}
              onClose={() => {
                setShowPreview(false);
                setSelectedService(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeveloperServicesHub;
