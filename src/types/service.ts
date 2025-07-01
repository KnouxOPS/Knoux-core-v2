export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive' | 'error';
  previewUrl?: string;
  features?: string[];
}

export interface ServicePreview {
  serviceId: string;
  content: React.ReactNode;
  lastUpdated: Date;
}

export interface ServiceConfig {
  refreshRate: number; // in milliseconds
  autoRefresh: boolean;
  layout: 'grid' | 'list';
}
