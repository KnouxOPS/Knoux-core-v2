/**
 * KnouxCore - نظام الثيمات المتقدم
 * ثيمات مخصصة مع تأثيرات فضائية وسايبربانك
 */

export interface ThemeColors {
  // الألوان الأساسية
  primary: string;
  secondary: string;
  accent: string;

  // ألوان الخلفية
  background: string;
  backgroundSecondary: string;
  backgroundGlass: string;

  // ألوان النصوص
  foreground: string;
  foregroundMuted: string;
  foregroundSecondary: string;

  // ألوان الحدود
  border: string;
  borderMuted: string;

  // ألوان الحالة
  success: string;
  warning: string;
  error: string;
  info: string;

  // ألوان النيون
  neonCyan: string;
  neonViolet: string;
  neonPink: string;
  neonGold: string;

  // تدرجات مخصصة
  gradientPrimary: string;
  gradientSecondary: string;
  gradientCosmic: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  effects: {
    glassmorphism: string;
    neonGlow: string;
    particleColor: string;
    backgroundOverlay: string;
  };
}

// الثيم الكوني الداكن (افتراضي)
export const cosmicDarkTheme: Theme = {
  name: "Cosmic Dark",
  colors: {
    primary: "#00FFD5",
    secondary: "#7C3AED",
    accent: "#FF1493",

    background: "#0A0015",
    backgroundSecondary: "#1A0025",
    backgroundGlass: "rgba(26, 0, 37, 0.7)",

    foreground: "#E0E0E0",
    foregroundMuted: "#A0A0A0",
    foregroundSecondary: "#C0C0C0",

    border: "#2D323C",
    borderMuted: "#1F1F2E",

    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#3B82F6",

    neonCyan: "#00FFD5",
    neonViolet: "#7C3AED",
    neonPink: "#FF1493",
    neonGold: "#FFD700",

    gradientPrimary: "linear-gradient(135deg, #00FFD5 0%, #7C3AED 100%)",
    gradientSecondary: "linear-gradient(135deg, #FF1493 0%, #7C3AED 100%)",
    gradientCosmic:
      "linear-gradient(135deg, #0A0015 0%, #1A0025 25%, #2D0036 50%, #4B006E 75%, #1A0025 100%)",
  },
  effects: {
    glassmorphism:
      "backdrop-filter: blur(20px); background: rgba(26, 0, 37, 0.3); border: 1px solid rgba(255, 255, 255, 0.1);",
    neonGlow:
      "box-shadow: 0 0 20px rgba(0, 255, 213, 0.5), 0 0 40px rgba(124, 58, 237, 0.3);",
    particleColor: "rgba(0, 255, 213, 0.6)",
    backgroundOverlay:
      "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1) 0%, transparent 70%)",
  },
};

// الثيم الكوني الفاتح
export const cosmicLightTheme: Theme = {
  name: "Cosmic Light",
  colors: {
    primary: "#0F766E",
    secondary: "#6D28D9",
    accent: "#DB2777",

    background: "#F8FAFC",
    backgroundSecondary: "#F1F5F9",
    backgroundGlass: "rgba(248, 250, 252, 0.8)",

    foreground: "#1E293B",
    foregroundMuted: "#64748B",
    foregroundSecondary: "#475569",

    border: "#E2E8F0",
    borderMuted: "#F1F5F9",

    success: "#059669",
    warning: "#D97706",
    error: "#DC2626",
    info: "#2563EB",

    neonCyan: "#0F766E",
    neonViolet: "#6D28D9",
    neonPink: "#DB2777",
    neonGold: "#D97706",

    gradientPrimary: "linear-gradient(135deg, #0F766E 0%, #6D28D9 100%)",
    gradientSecondary: "linear-gradient(135deg, #DB2777 0%, #6D28D9 100%)",
    gradientCosmic:
      "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 25%, #E2E8F0 50%, #CBD5E1 75%, #F1F5F9 100%)",
  },
  effects: {
    glassmorphism:
      "backdrop-filter: blur(20px); background: rgba(248, 250, 252, 0.6); border: 1px solid rgba(0, 0, 0, 0.1);",
    neonGlow:
      "box-shadow: 0 0 20px rgba(15, 118, 110, 0.3), 0 0 40px rgba(109, 40, 217, 0.2);",
    particleColor: "rgba(15, 118, 110, 0.4)",
    backgroundOverlay:
      "radial-gradient(ellipse at center, rgba(109, 40, 217, 0.05) 0%, transparent 70%)",
  },
};

// ثيم النيون الكلاسيكي
export const neonClassicTheme: Theme = {
  name: "Neon Classic",
  colors: {
    primary: "#00FFFF",
    secondary: "#FF00FF",
    accent: "#FFFF00",

    background: "#000000",
    backgroundSecondary: "#111111",
    backgroundGlass: "rgba(17, 17, 17, 0.8)",

    foreground: "#FFFFFF",
    foregroundMuted: "#CCCCCC",
    foregroundSecondary: "#EEEEEE",

    border: "#333333",
    borderMuted: "#222222",

    success: "#00FF00",
    warning: "#FFAA00",
    error: "#FF0000",
    info: "#0088FF",

    neonCyan: "#00FFFF",
    neonViolet: "#FF00FF",
    neonPink: "#FF1493",
    neonGold: "#FFFF00",

    gradientPrimary: "linear-gradient(135deg, #00FFFF 0%, #FF00FF 100%)",
    gradientSecondary: "linear-gradient(135deg, #FF1493 0%, #FFFF00 100%)",
    gradientCosmic:
      "linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)",
  },
  effects: {
    glassmorphism:
      "backdrop-filter: blur(15px); background: rgba(17, 17, 17, 0.4); border: 1px solid rgba(255, 255, 255, 0.2);",
    neonGlow:
      "box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(255, 0, 255, 0.6);",
    particleColor: "rgba(0, 255, 255, 0.8)",
    backgroundOverlay:
      "radial-gradient(ellipse at center, rgba(255, 0, 255, 0.1) 0%, transparent 70%)",
  },
};

// ثيم الفضاء العميق
export const deepSpaceTheme: Theme = {
  name: "Deep Space",
  colors: {
    primary: "#4FC3F7",
    secondary: "#9C27B0",
    accent: "#FF9800",

    background: "#0D1117",
    backgroundSecondary: "#161B22",
    backgroundGlass: "rgba(22, 27, 34, 0.7)",

    foreground: "#F0F6FC",
    foregroundMuted: "#8B949E",
    foregroundSecondary: "#C9D1D9",

    border: "#30363D",
    borderMuted: "#21262D",

    success: "#238636",
    warning: "#D29922",
    error: "#F85149",
    info: "#58A6FF",

    neonCyan: "#4FC3F7",
    neonViolet: "#9C27B0",
    neonPink: "#E91E63",
    neonGold: "#FF9800",

    gradientPrimary: "linear-gradient(135deg, #4FC3F7 0%, #9C27B0 100%)",
    gradientSecondary: "linear-gradient(135deg, #E91E63 0%, #FF9800 100%)",
    gradientCosmic:
      "linear-gradient(135deg, #0D1117 0%, #161B22 25%, #21262D 50%, #30363D 75%, #161B22 100%)",
  },
  effects: {
    glassmorphism:
      "backdrop-filter: blur(16px); background: rgba(22, 27, 34, 0.5); border: 1px solid rgba(240, 246, 252, 0.1);",
    neonGlow:
      "box-shadow: 0 0 20px rgba(79, 195, 247, 0.4), 0 0 40px rgba(156, 39, 176, 0.3);",
    particleColor: "rgba(79, 195, 247, 0.5)",
    backgroundOverlay:
      "radial-gradient(ellipse at center, rgba(156, 39, 176, 0.08) 0%, transparent 70%)",
  },
};

// تصدير جميع الثيمات
export const themes = {
  cosmicDark: cosmicDarkTheme,
  cosmicLight: cosmicLightTheme,
  neonClassic: neonClassicTheme,
  deepSpace: deepSpaceTheme,
};

export type ThemeName = keyof typeof themes;

// دالة للحصول على متغيرات CSS للثيم
export const getThemeVariables = (theme: Theme): Record<string, string> => {
  return {
    "--color-primary": theme.colors.primary,
    "--color-secondary": theme.colors.secondary,
    "--color-accent": theme.colors.accent,
    "--color-background": theme.colors.background,
    "--color-background-secondary": theme.colors.backgroundSecondary,
    "--color-background-glass": theme.colors.backgroundGlass,
    "--color-foreground": theme.colors.foreground,
    "--color-foreground-muted": theme.colors.foregroundMuted,
    "--color-foreground-secondary": theme.colors.foregroundSecondary,
    "--color-border": theme.colors.border,
    "--color-border-muted": theme.colors.borderMuted,
    "--color-success": theme.colors.success,
    "--color-warning": theme.colors.warning,
    "--color-error": theme.colors.error,
    "--color-info": theme.colors.info,
    "--color-neon-cyan": theme.colors.neonCyan,
    "--color-neon-violet": theme.colors.neonViolet,
    "--color-neon-pink": theme.colors.neonPink,
    "--color-neon-gold": theme.colors.neonGold,
    "--gradient-primary": theme.colors.gradientPrimary,
    "--gradient-secondary": theme.colors.gradientSecondary,
    "--gradient-cosmic": theme.colors.gradientCosmic,
    "--effect-glassmorphism": theme.effects.glassmorphism,
    "--effect-neon-glow": theme.effects.neonGlow,
    "--effect-particle-color": theme.effects.particleColor,
    "--effect-background-overlay": theme.effects.backgroundOverlay,
  };
};
