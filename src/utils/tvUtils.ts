/**
 * أدوات مساعدة لكنووكس تي في
 * KnouxTV Utility Functions
 */

// أنواع البيانات
export interface TVSettings {
  volume: number;
  quality: 'SD' | 'HD' | '4K';
  autoplay: boolean;
  notifications: boolean;
  subtitles: boolean;
  language: 'ar' | 'en';
  theme: 'dark' | 'light' | 'cosmic';
}

export interface ViewerStats {
  current: number;
  peak: number;
  average: number;
  growth: number;
}

export interface ChannelInfo {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  isLive: boolean;
  quality: string;
  viewers: number;
  signal: number;
  uptime: number;
}

// الإعدادات الافتراضية
export const DEFAULT_TV_SETTINGS: TVSettings = {
  volume: 75,
  quality: 'HD',
  autoplay: true,
  notifications: true,
  subtitles: false,
  language: 'ar',
  theme: 'cosmic',
};

// دوال مساعدة
export const formatViewerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const getSignalQuality = (signal: number): 'excellent' | 'good' | 'fair' | 'poor' => {
  if (signal >= 90) return 'excellent';
  if (signal >= 75) return 'good';
  if (signal >= 60) return 'fair';
  return 'poor';
};

export const getSignalColor = (signal: number): string => {
  const quality = getSignalQuality(signal);
  switch (quality) {
    case 'excellent':
      return 'text-green-400';
    case 'good':
      return 'text-cyan-400';
    case 'fair':
      return 'text-yellow-400';
    case 'poor':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
};

export const generateMockViewerData = (baseCount: number): ViewerStats => {
  const variation = Math.random() * 0.2 - 0.1; // ±10% variation
  const current = Math.max(0, Math.floor(baseCount * (1 + variation)));
  const peak = Math.floor(baseCount * 1.3);
  const average = Math.floor(baseCount * 0.85);
  const growth = Math.random() * 20 - 10; // ±10% growth

  return { current, peak, average, growth };
};

export const calculateBandwidth = (quality: string, viewers: number): string => {
  const baseRates = {
    SD: 1.5, // Mbps per viewer
    HD: 5,
    '4K': 25,
  };

  const rate = baseRates[quality as keyof typeof baseRates] || baseRates.HD;
  const totalBandwidth = (rate * viewers) / 1000; // Convert to Gbps

  if (totalBandwidth >= 1) {
    return `${totalBandwidth.toFixed(1)} Gbps`;
  }
  return `${(totalBandwidth * 1000).toFixed(0)} Mbps`;
};

export const getChannelHealth = (channel: ChannelInfo): 'healthy' | 'warning' | 'critical' => {
  if (channel.signal < 70 || !channel.isLive) return 'critical';
  if (channel.signal < 85 || channel.viewers < 100) return 'warning';
  return 'healthy';
};

export const generateLiveEvents = () => {
  const events = [
    {
      type: 'viewer_milestone',
      threshold: 1000,
      message: 'مبروك! تجاوز عدد المشاهدين الألف',
      messageEn: 'Congratulations! Viewers exceeded 1K',
    },
    {
      type: 'quality_upgrade',
      threshold: 90,
      message: 'تم ترقية جودة البث إلى 4K',
      messageEn: 'Stream quality upgraded to 4K',
    },
    {
      type: 'signal_warning',
      threshold: 70,
      message: 'تحذير: إشارة ضعيفة مكتشفة',
      messageEn: 'Warning: Weak signal detected',
    },
    {
      type: 'new_content',
      threshold: 0,
      message: 'محتوى جديد متاح الآن',
      messageEn: 'New content available now',
    },
  ];

  return events;
};

// إدارة التخزين المحلي للإعدادات
export const saveTVSettings = (settings: TVSettings): void => {
  try {
    localStorage.setItem('knouxTVSettings', JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save TV settings:', error);
  }
};

export const loadTVSettings = (): TVSettings => {
  try {
    const saved = localStorage.getItem('knouxTVSettings');
    if (saved) {
      return { ...DEFAULT_TV_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.warn('Failed to load TV settings:', error);
  }
  return DEFAULT_TV_SETTINGS;
};

// دالة محاكاة البيانات المباشرة
export const simulateLiveData = (baseData: ChannelInfo, interval: number = 5000): ChannelInfo => {
  const now = Date.now();
  const variation = Math.sin(now / interval) * 0.1 + Math.random() * 0.1 - 0.05;

  return {
    ...baseData,
    viewers: Math.max(0, Math.floor(baseData.viewers * (1 + variation))),
    signal: Math.max(60, Math.min(100, baseData.signal + (Math.random() - 0.5) * 5)),
    uptime: baseData.uptime + 1,
  };
};

// تصدير جميع الدوال والثوابت
export default {
  formatViewerCount,
  formatDuration,
  formatUptime,
  getSignalQuality,
  getSignalColor,
  generateMockViewerData,
  calculateBandwidth,
  getChannelHealth,
  generateLiveEvents,
  saveTVSettings,
  loadTVSettings,
  simulateLiveData,
  DEFAULT_TV_SETTINGS,
};
