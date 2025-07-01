"use client"

import React, { useEffect, useState } from 'react';
import { Card } from "../ui/card";
import { Service } from '../../types/service';

interface ServicePreviewProps {
  service: Service;
}

export const ServicePreview: React.FC<ServicePreviewProps> = ({ service }) => {
  const [previewData, setPreviewData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const generatePreviewData = () => {
      switch (service.id) {
        case '1': // Monitoring Service
          return {
            cpuUsage: Math.floor(Math.random() * 100),
            memoryUsage: Math.floor(Math.random() * 100),
            networkSpeed: (Math.random() * 1000).toFixed(2),
          };
        case '2': // Control Service
          return {
            devices: [
              { name: 'جهاز 1', status: Math.random() > 0.5 ? 'متصل' : 'غير متصل' },
              { name: 'جهاز 2', status: Math.random() > 0.5 ? 'متصل' : 'غير متصل' },
              { name: 'جهاز 3', status: Math.random() > 0.5 ? 'متصل' : 'غير متصل' },
            ]
          };
        case '3': // Reports Service
          return {
            dailyStats: [
              { label: 'اليوم', value: Math.floor(Math.random() * 1000) },
              { label: 'أمس', value: Math.floor(Math.random() * 1000) },
              { label: 'قبل يومين', value: Math.floor(Math.random() * 1000) },
            ]
          };
        default:
          return null;
      }
    };

    // Initial data
    setPreviewData(generatePreviewData());

    // Update every 2 seconds
    const interval = setInterval(() => {
      setPreviewData(generatePreviewData());
      setLastUpdate(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, [service.id]);

  if (!previewData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">جاري تحميل المعاينة...</p>
      </div>
    );
  }

  const renderPreviewContent = () => {
    return (
      <div className="space-y-4">
        {/* Existing preview content based on service id */}
        {service.id === '1' && (
          <>
            <PreviewMetric 
              label="استخدام المعالج"
              value={`${previewData.cpuUsage}%`}
              color={previewData.cpuUsage > 80 ? 'red' : previewData.cpuUsage > 50 ? 'yellow' : 'green'}
            />
            <PreviewMetric 
              label="استخدام الذاكرة"
              value={`${previewData.memoryUsage}%`}
              color={previewData.memoryUsage > 80 ? 'red' : previewData.memoryUsage > 50 ? 'yellow' : 'green'}
            />
            <PreviewMetric 
              label="سرعة الشبكة"
              value={`${previewData.networkSpeed} MB/s`}
              color="blue"
            />
          </>
        )}
        {service.id === '2' && (
          <>
            {previewData.devices.map((device: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg">
                <span>{device.name}</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  device.status === 'متصل' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {device.status}
                </span>
              </div>
            ))}
          </>
        )}
        {service.id === '3' && (
          <>
            {previewData.dailyStats.map((stat: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg">
                <span>{stat.label}</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </>
        )}
        {/* New features list display */}
        {service.features && service.features.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-2">مميزات الخدمة</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {service.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{service.name}</h3>
        <span className="text-sm text-gray-500">
          آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
        </span>
      </div>
      {renderPreviewContent()}
    </Card>
  );
};

interface PreviewMetricProps {
  label: string;
  value: string;
  color: 'red' | 'yellow' | 'green' | 'blue';
}

const PreviewMetric: React.FC<PreviewMetricProps> = ({ label, value, color }) => {
  const colorClasses = {
    red: 'bg-red-500/10 text-red-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
    green: 'bg-green-500/10 text-green-500',
    blue: 'bg-blue-500/10 text-blue-500',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg">
      <span>{label}</span>
      <span className={`px-2 py-1 rounded-full text-sm ${colorClasses[color]}`}>
        {value}
      </span>
    </div>
  );
};

export default ServicePreview;
