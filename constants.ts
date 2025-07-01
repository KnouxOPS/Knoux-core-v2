import { NavItem, RealTimeStat, SystemSettings, Theme, Language, UserRole, LocaleTranslations } from './types';
import { LayoutDashboard, Download, Wifi, ShieldCheck, Settings, Info, UserCircle, Sun, Moon, Search, Cpu, HardDrive, AlertTriangle, Play, Pause, X, FolderOpen, FileVideo, FileArchive, FileAudio, FileCode, FileQuestion, UploadCloud, Copy, FolderInput, Clock, ListChecks, Puzzle, HelpCircle, Mic, Languages, Brain, Cloud, ShieldAlert as SecurityStatusIcon } from 'lucide-react';

export const KNORIX_LOGO_URL = "https://i.postimg.cc/T3k13rnP/d04f3a9b-36ac-4127-953b-691a8b413256.png";
export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_SYSTEM_INSTRUCTION = "You are KnouxCore's AI assistant. Provide concise, actionable insights or recommendations based on the user's query related to download management, network optimization, security, or system performance. Assume you have access to simulated system data. Format your response clearly, using markdown for structure if appropriate (e.g., bullet points). Keep responses under 150 words unless detailed explanation is crucial.";


export const COLORS = {
  primaryBgDark: '#0A0B1A',
  primaryBgLight: '#F0F2F8',
  knouxCosmicTeal: 'rgba(0, 255, 213, 0.9)',
  knouxCosmicTealTransparent: 'rgba(0, 255, 213, 0.3)',
  knouxCosmicTealDarker: 'rgba(0, 200, 160, 0.9)',
  knouxGalacticViolet: 'rgba(119, 0, 255, 0.8)',
  knouxGalacticVioletTransparent: 'rgba(119, 0, 255, 0.3)',
  knouxGalacticVioletDarker: 'rgba(90, 0, 200, 0.8)',
  neonOutlineTeal: '#00FFE5',
  neonOutlineViolet: '#FF00FF',
  glassBorderDark: 'rgba(255, 255, 255, 0.1)',
  glassBorderLight: 'rgba(0, 0, 0, 0.1)',
  textDark: 'text-slate-200',
  textLight: 'text-slate-800',
  success: 'rgba(0, 255, 100, 0.9)', 
  error: 'rgba(255, 0, 80, 0.9)', 
  warning: 'rgba(255, 180, 0, 0.9)', 
};

export const TRANSLATIONS: LocaleTranslations = {
  [Language.English]: {
    // Nav Items
    dashboard: 'Dashboard',
    downloadOps: 'Download Ops',
    networkControl: 'Network Control',
    securityHub: 'Security Hub',
    aiInsights: 'AI Insights',
    systemSettings: 'System Settings',
    auditLog: 'Audit Log',
    plugins: 'Plugins',
    help: 'Help & Tutorials',
    aboutKnouxCore: 'About KnouxCore',
    userProfile: 'User Profile',
    login: 'Login',
    // TopBar Stats
    activeDownloads: 'Active Downloads',
    networkSpeed: 'Network Speed',
    connectionQuality: 'Connection Quality',
    systemSecurityStatus: 'System Security',
    cloudSyncStatus: 'Cloud Sync',
    encryptedSimulated: 'Encrypted (Simulated)',
    activeSimulated: 'Active (Simulated)',
    // Page Titles & Common
    searchPlaceholder: "Search KnouxCore...",
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    status: "Status",
    progress: "Progress",
    speed: "Speed",
    etaTime: "ETA/Time",
    actions: "Actions",
    // Voice Control
    voiceListening: "Listening...",
    voiceCommandNotRecognized: "Command not recognized. Try 'go to dashboard'.",
    voiceCommandExecuted: "Executing: ",
    voiceError: "Voice recognition error. Please try again.",
    // AI Insights
    aiInsightsTitle: "KnouxAI Cognitive Core",
    aiPromptPlaceholder: "Ask KnouxAI for insights or recommendations (e.g., 'Analyze download history for unusual activity')...",
    getInsights: "Get Insights",
    generatingResponse: "KnouxAI is processing your query...",
    aiResponseTitle: "KnouxAI Response Matrix",
    wasThisHelpful: "Was this insight helpful?",
    yes: "Yes",
    no: "No",
    thankYouForFeedback: "Thank you for your feedback!",
    aiError: "KnouxAI encountered an anomaly processing your request. Please try again.",
    // Help Page
    interactiveTutorialDownloads: "Interactive Demo: Download Ops",
    startTutorial: "Start Tutorial",
    // Other UI elements
    language: "Language",
    theme: "Theme",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    arabic: "العربية",
    english: "English",
    startDownload: "Start New Download",
    runIpCheck: "Run IP Check",
    editHostsFile: "Edit Hosts File",
    voiceControl: "Voice Control",
    toggleLanguage: "Toggle Language",
    // System Settings
    aiAssistant: "AI Assistant Features",
    enableAIAssistant: "Enable KnouxAI Cognitive Core",
    // Audit Log Actions
    ai_query_sent: "AI Insight Query Sent",
    ai_response_received: "AI Insight Response Received",
    tutorial_started: "Interactive Tutorial Started",

  },
  [Language.Arabic]: {
    // Nav Items
    dashboard: 'لوحة القيادة',
    downloadOps: 'عمليات التحميل',
    networkControl: 'تحكم الشبكة',
    securityHub: 'مركز الأمان',
    aiInsights: 'رؤى الذكاء الاصطناعي',
    systemSettings: 'إعدادات النظام',
    auditLog: 'سجل التدقيق',
    plugins: 'الإضافات',
    help: 'المساعدة والتعليمات',
    aboutKnouxCore: 'حول KnouxCore',
    userProfile: 'ملف المستخدم',
    login: 'تسجيل الدخول',
    // TopBar Stats
    activeDownloads: 'التحميلات النشطة',
    networkSpeed: 'سرعة الشبكة',
    connectionQuality: 'جودة الاتصال',
    systemSecurityStatus: 'أمان النظام',
    cloudSyncStatus: 'مزامنة سحابية',
    encryptedSimulated: 'مشفر (محاكاة)',
    activeSimulated: 'نشط (محاكاة)',
    // Page Titles & Common
    searchPlaceholder: "ابحث في KnouxCore...",
    save: "حفظ",
    cancel: "إلغاء",
    add: "إضافة",
    status: "الحالة",
    progress: "التقدم",
    speed: "السرعة",
    etaTime: "الوقت المتبقي/المقضي",
    actions: "الإجراءات",
    // Voice Control
    voiceListening: "يتم الاستماع...",
    voiceCommandNotRecognized: "الأمر غير معروف. جرب 'اذهب إلى لوحة التحكم'.",
    voiceCommandExecuted: "جاري التنفيذ: ",
    voiceError: "خطأ في التعرف على الصوت. حاول مرة أخرى.",
    // AI Insights
    aiInsightsTitle: "نواة KnouxAI المعرفية",
    aiPromptPlaceholder: "اطلب من KnouxAI رؤى أو توصيات (مثال: 'حلل سجل التحميل بحثًا عن نشاط غير عادي')...",
    getInsights: "الحصول على رؤى",
    generatingResponse: "يقوم KnouxAI بمعالجة طلبك...",
    aiResponseTitle: "مصفوفة استجابة KnouxAI",
    wasThisHelpful: "هل كانت هذه الرؤية مفيدة؟",
    yes: "نعم",
    no: "لا",
    thankYouForFeedback: "شكرا لملاحظاتك!",
    aiError: "واجه KnouxAI خللاً أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
    // Help Page
    interactiveTutorialDownloads: "عرض تفاعلي: عمليات التحميل",
    startTutorial: "ابدأ الجولة التعريفية",
    // Other UI elements
    language: "اللغة",
    theme: "السمة",
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    arabic: "العربية",
    english: "English",
    startDownload: "بدء تحميل جديد",
    runIpCheck: "فحص IP",
    editHostsFile: "تعديل ملف Hosts",
    voiceControl: "التحكم الصوتي",
    toggleLanguage: "تبديل اللغة",
    // System Settings
    aiAssistant: "ميزات مساعد الذكاء الاصطناعي",
    enableAIAssistant: "تفعيل نواة KnouxAI المعرفية",
    // Audit Log Actions
    ai_query_sent: "إرسال استعلام رؤى الذكاء الاصطناعي",
    ai_response_received: "استلام رد رؤى الذكاء الاصطناعي",
    tutorial_started: "بدء الجولة التعريفية التفاعلية",
  }
};


export const NAV_ITEMS_MAIN: NavItem[] = [
  { path: '/dashboard', nameKey: 'dashboard', icon: LayoutDashboard },
  { path: '/downloads', nameKey: 'downloadOps', icon: Download },
  { path: '/ai-insights', nameKey: 'aiInsights', icon: Brain, beta: true }, // New AI Insights page
  { path: '/network', nameKey: 'networkControl', icon: Wifi },
  { path: '/security', nameKey: 'securityHub', icon: ShieldCheck },
  { path: '/auditlog', nameKey: 'auditLog', icon: ListChecks, adminOnly: true },
];

export const NAV_ITEMS_ADVANCED: NavItem[] = [
  { path: '/plugins', nameKey: 'plugins', icon: Puzzle },
  { path: '/help', nameKey: 'help', icon: HelpCircle },
];

export const NAV_ITEMS_FOOTER: NavItem[] = [
  { path: '/settings', nameKey: 'systemSettings', icon: Settings },
  { path: '/about', nameKey: 'aboutKnouxCore', icon: Info },
];

export const ICONS = {
  Sun, Moon, Search, Cpu, HardDrive, AlertTriangle, Play, Pause, Cancel: X, FolderOpen, FileVideo, FileArchive, FileAudio, FileCode, FileQuestion, UploadCloud, Copy, FolderInput, Clock, Mic, Languages,
  ListChecks, Puzzle, HelpCircle, Brain, Cloud, SecurityStatusIcon
};

export const INITIAL_REAL_TIME_STATS: RealTimeStat[] = [
  { labelKey: 'activeDownloads', value: '0', icon: Download, colorClass: 'text-[rgba(0,255,213,0.9)]' },
  { labelKey: 'networkSpeed', value: '0', unit: 'MB/s', icon: Wifi, colorClass: 'text-[rgba(0,255,213,0.9)]' },
  // { labelKey: 'connectionQuality', value: 'Excellent', icon: AlertTriangle, colorClass: 'text-green-400' }, // Replaced by new stats below
  { labelKey: 'systemSecurityStatus', value: 'Encrypted (Simulated)', icon: ICONS.SecurityStatusIcon, colorClass: 'text-green-400', tooltipKey: 'encryptedSimulated' },
  { labelKey: 'cloudSyncStatus', value: 'Active (Simulated)', icon: ICONS.Cloud, colorClass: 'text-sky-400', tooltipKey: 'activeSimulated' },
];

export const FILE_TYPE_ICONS: { [key: string]: React.ElementType } = {
  video: FileVideo,
  archive: FileArchive,
  audio: FileAudio,
  application: FileCode, 
  image: FileQuestion, 
  text: FileQuestion, 
  unknown: FileQuestion,
};

export const GET_FILE_TYPE_FROM_URL = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const extension = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
    
    if (!extension && path.lastIndexOf('.') === -1) return 'unknown';

    if (['mp4', 'mkv', 'avi', 'mov', 'webm'].includes(extension)) return 'video';
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(extension)) return 'archive';
    if (['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a'].includes(extension)) return 'audio';
    if (['exe', 'dmg', 'app', 'msi', 'deb', 'rpm'].includes(extension)) return 'application';
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(extension)) return 'image';
    if (['txt', 'doc', 'docx', 'pdf', 'md', 'rtf', 'odt'].includes(extension)) return 'text';
    return 'unknown';
  } catch (e) {
    const simpleExt = url.split('.').pop()?.toLowerCase() || '';
    if (['mp4', 'mkv', 'avi', 'mov', 'webm'].includes(simpleExt)) return 'video';
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(simpleExt)) return 'archive';
    return 'unknown';
  }
};


export const KNORIX_CONDUIT_IDLE_TEXT = "AWAITING COMMAND";
export const DEFAULT_DOWNLOAD_PATH = "KnouxDrive:/SimulatedSpace/Downloads/";

export const INITIAL_SYSTEM_SETTINGS: SystemSettings = {
  downloadPath: DEFAULT_DOWNLOAD_PATH,
  maxConcurrentDownloads: 5,
  enableNotifications: true,
  theme: Theme.Dark, 
  language: Language.English, 
  userRole: 'admin', 
  aiAssistantEnabled: true, // AI assistant enabled by default
};