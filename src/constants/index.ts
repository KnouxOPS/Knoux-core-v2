/**
 * KnouxCore - ملف الثوابت والتعدادات
 * يحتوي على جميع القيم الثابتة والتعدادات المستخدمة في التطبيق
 */

// تعدادات الثيمات
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  COSMIC = "cosmic",
  AUTO = "auto",
}

// تعدادات اللغات
export enum Language {
  ARABIC = "ar",
  ENGLISH = "en",
  FRENCH = "fr",
  SPANISH = "es",
}

// تعدادات أنواع المستخدمين
export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  USER = "user",
  GUEST = "guest",
}

// تعدادات حالات النظام
export enum SystemStatus {
  ONLINE = "online",
  OFFLINE = "offline",
  MAINTENANCE = "maintenance",
  ERROR = "error",
}

// تعدادات أنواع الإشعارات
export enum NotificationType {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  SYSTEM = "system",
}

// تعدادات أولويات الإشعارات
export enum NotificationPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// تعدادات أنواع الخدمات
export enum ServiceType {
  AI_PROCESSING = "ai_processing",
  DATA_ANALYSIS = "data_analysis",
  NETWORK_MONITORING = "network_monitoring",
  SECURITY_SCAN = "security_scan",
  SYSTEM_OPTIMIZATION = "system_optimization",
}

// تعدادات حالات الخدمات
export enum ServiceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PROCESSING = "processing",
  ERROR = "error",
  MAINTENANCE = "maintenance",
}

// تعدادات أنواع الملفات
export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
  DOCUMENT = "document",
  AUDIO = "audio",
  ARCHIVE = "archive",
  OTHER = "other",
}

// تعدادات أحجام الشاشات
export enum ScreenSize {
  MOBILE = "mobile",
  TABLET = "tablet",
  DESKTOP = "desktop",
  LARGE_DESKTOP = "large_desktop",
}

// تعدادات اتجاهات الترتيب
export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

// تعدادات أنواع التحريك
export enum AnimationType {
  FADE = "fade",
  SLIDE = "slide",
  SCALE = "scale",
  ROTATE = "rotate",
  BOUNCE = "bounce",
}

// ثوابت الطرق المدعومة
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SERVICES: "/services",
  DOWNLOADS: "/downloads",
  NETWORK: "/network",
  SECURITY: "/security",
  AI_INSIGHTS: "/ai-insights",
  PLUGINS: "/plugins",
  SETTINGS: "/settings",
  HELP: "/help",
  ABOUT: "/about",
  AUDIT_LOG: "/auditlog",
  PROFILE: "/profile",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

// ثوابت الأيقونات
export const ICONS = {
  DASHBOARD: "LayoutDashboard",
  SERVICES: "Brain",
  DOWNLOADS: "Download",
  NETWORK: "Wifi",
  SECURITY: "Shield",
  SETTINGS: "Settings",
  HELP: "HelpCircle",
  ABOUT: "Info",
  USER: "User",
  NOTIFICATION: "Bell",
  SEARCH: "Search",
  MENU: "Menu",
  CLOSE: "X",
  LOADING: "Loader",
} as const;

// ثوابت الرسائل الافتراضية
export const MESSAGES = {
  AR: {
    LOADING: "جاري التحميل...",
    ERROR: "حدث خطأ غير متوقع",
    SUCCESS: "تم بنجاح",
    NO_DATA: "لا توجد بيانات",
    CONFIRM_DELETE: "هل أنت متأكد من الحذف؟",
    SAVE_CHANGES: "حفظ التغييرات",
    CANCEL: "إلغاء",
    OK: "موافق",
  },
  EN: {
    LOADING: "Loading...",
    ERROR: "An unexpected error occurred",
    SUCCESS: "Success",
    NO_DATA: "No data available",
    CONFIRM_DELETE: "Are you sure you want to delete?",
    SAVE_CHANGES: "Save Changes",
    CANCEL: "Cancel",
    OK: "OK",
  },
} as const;

// ثوابت التحقق من صحة البيانات
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
} as const;

// ثوابت الشبكة والاتصال
export const NETWORK = {
  REQUEST_TIMEOUT: 30000,
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  WEBSOCKET_RECONNECT_INTERVAL: 5000,
  API_RATE_LIMIT: 100, // requests per minute
  FILE_UPLOAD_CHUNK_SIZE: 1024 * 1024, // 1MB chunks
} as const;

// ثوابت الذاكرة المؤقتة
export const CACHE = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  USER_DATA_TTL: 15 * 60 * 1000, // 15 minutes
  STATIC_DATA_TTL: 60 * 60 * 1000, // 1 hour
  MAX_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
} as const;

export type RouteKey = keyof typeof ROUTES;
export type IconKey = keyof typeof ICONS;
export type MessageKey = keyof typeof MESSAGES.AR;
