export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  English = 'en',
  Arabic = 'ar',
}

export type UserRole = 'admin' | 'user';

export interface NavItem {
  path: string;
  nameKey: string; // Key for translation
  icon: React.ElementType; 
  adminOnly?: boolean; // For role-based access
  beta?: boolean; // For features like AI Insights
}

export enum DownloadStatus {
  Pending = 'Pending',
  Connecting = 'Connecting',
  Downloading = 'Downloading',
  Paused = 'Paused',
  Verifying = 'Verifying',
  Completed = 'Completed',
  Scheduled = 'Scheduled',
  Error = 'Error', // Generic Error
  NetworkError = 'Network Error (Simulated)',
  DiskFullError = 'Disk Full (Simulated)',
  Cancelled = 'Cancelled',
}

export interface DownloadItem {
  id: string;
  url: string;
  fileName: string;
  fileType: string; 
  status: DownloadStatus;
  progress: number; 
  speed: string; 
  elapsedTime: string; 
  remainingTime: string; 
  totalSize?: number; 
  downloadedSize?: number; 
  createdAt: number; 
  targetPath?: string; 
  errorMessage?: string; 
}

export interface RealTimeStat {
  labelKey: string; // Key for translation
  value: string;
  icon?: React.ElementType;
  colorClass?: string;
  unit?: string;
  onClick?: () => void; // For clickable stats
  tooltipKey?: string; // For tooltips on stats
}

export interface ToastNotification {
  id: string;
  message: string; // Can be a translation key or direct message
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export interface ChartDataPoint {
  name: string; // Can be a translation key
  value: number;
  fill?: string;
}

export interface LineChartDataPoint {
  time: string; 
  speed: number;
}

export interface HostEntry {
  id: string;
  ip: string;
  domain: string;
  enabled: boolean;
}

export interface SystemSettings {
  downloadPath: string;
  maxConcurrentDownloads: number;
  enableNotifications: boolean;
  theme: Theme;
  language: Language;
  userRole: UserRole; // Added user role
  aiAssistantEnabled: boolean; // For enabling/disabling AI features (mock)
}

export interface AuditLogEntry {
  id: string;
  timestamp: number;
  user: string; // Or role
  actionKey: string; // Translation key for action
  details?: string; // Additional details
  status: 'success' | 'failure' | 'info';
}

// For i18n
export interface Translations {
  [key: string]: string;
}

export interface LocaleTranslations {
  [Language.English]: Translations;
  [Language.Arabic]: Translations;
}

// For AI Insights
export interface AIQuery {
  id: string;
  prompt: string;
  timestamp: number;
}

export interface AIResponse {
  id: string;
  queryId: string;
  response: string;
  timestamp: number;
  feedback?: 'helpful' | 'not_helpful';
}

// For Interactive Tutorial
export interface TutorialStep {
  elementSelector: string; // CSS selector for the element to highlight
  titleKey: string;
  descriptionKey: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // Preferred tooltip position
}