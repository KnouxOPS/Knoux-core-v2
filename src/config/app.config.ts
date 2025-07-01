/**
 * KnouxCore - تكوين التطبيق الرئيسي
 * ملف التكوينات العامة والثوابت المستخدمة في التطبيق
 */

export const APP_CONFIG = {
  // معلومات التطبيق الأساسية
  APP_NAME: "KnouxCore",
  APP_VERSION: "2.0.0",
  APP_DESCRIPTION: "المركز الذكي للتحكم الفضائي - الإصدار البلاتيني",

  // إعدادات الثيم والألوان
  THEME: {
    PRIMARY_COLOR: "#7C3AED", // البنفسجي الأساسي
    SECONDARY_COLOR: "#06B6D4", // الأزرق الفيروزي
    ACCENT_COLOR: "#F59E0B", // الذهبي
    SUCCESS_COLOR: "#10B981",
    WARNING_COLOR: "#F59E0B",
    ERROR_COLOR: "#EF4444",
    INFO_COLOR: "#3B82F6",

    // تدرجات خاصة بالتطبيق
    GRADIENTS: {
      PRIMARY: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      SECONDARY: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      COSMIC: "linear-gradient(135deg, #1a0025 0%, #2d0036 50%, #4b006e 100%)",
      LIGHT_COSMIC:
        "linear-gradient(135deg, #f3eaff 0%, #e9d8fd 50%, #f5e0ff 100%)",
    },
  },

  // إعدادات التحريك وال��نتقالات
  ANIMATIONS: {
    DURATION_FAST: 200,
    DURATION_NORMAL: 300,
    DURATION_SLOW: 500,
    EASING: "cubic-bezier(0.4, 0.0, 0.2, 1)",

    // إعدادات الجسيمات المتحركة
    PARTICLES: {
      COUNT: 25,
      SIZE_RANGE: [1, 4],
      SPEED_RANGE: [15, 25],
      OPACITY_RANGE: [0.3, 0.7],
    },
  },

  // اللغات المدعومة
  LANGUAGES: {
    AR: "ar",
    EN: "en",
    FR: "fr",
    ES: "es",
  },

  // إعدادات التخزين المحلي
  STORAGE_KEYS: {
    THEME: "knoux_theme",
    LANGUAGE: "knoux_language",
    USER_PREFERENCES: "knoux_user_prefs",
    SIDEBAR_STATE: "knoux_sidebar_state",
    LAST_ROUTE: "knoux_last_route",
  },

  // حدود وقيود التطبيق
  LIMITS: {
    MAX_PARTICLES: 50,
    MIN_PARTICLES: 10,
    MAX_NOTIFICATIONS: 10,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 دقيقة
  },

  // روابط خارجية
  EXTERNAL_LINKS: {
    DOCS: "https://docs.knouxcore.com",
    SUPPORT: "https://support.knouxcore.com",
    GITHUB: "https://github.com/knouxcore",
    WEBSITE: "https://knouxcore.com",
  },

  // إعدادات API
  API: {
    BASE_URL: process.env.REACT_APP_API_URL || "https://api.knouxcore.com",
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
  },

  // إعدادات الأمان
  SECURITY: {
    TOKEN_KEY: "knoux_auth_token",
    REFRESH_TOKEN_KEY: "knoux_refresh_token",
    TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 دقائ��
  },
} as const;

// أنواع البيانات للتكوين
export type AppConfig = typeof APP_CONFIG;
export type ThemeConfig = typeof APP_CONFIG.THEME;
export type AnimationConfig = typeof APP_CONFIG.ANIMATIONS;
