"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Download, Pause, Play, X } from "lucide-react";

interface DownloadItem {
  id: string;
  name: string;
  progress: number;
  status: "downloading" | "paused" | "completed" | "error";
  size: string;
  speed: string;
}

const DownloadOpsPage: React.FC = () => {
  const [downloads] = React.useState<DownloadItem[]>([
    {
      id: "1",
      name: "ملف_1.zip",
      progress: 75,
      status: "downloading",
      size: "1.2 GB",
      speed: "2.5 MB/s",
    },
    {
      id: "2",
      name: "ملف_2.mp4",
      progress: 45,
      status: "paused",
      size: "850 MB",
      speed: "0 MB/s",
    },
    {
      id: "3",
      name: "ملف_3.pdf",
      progress: 100,
      status: "completed",
      size: "15 MB",
      speed: "0 MB/s",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "downloading":
        return "text-blue-500";
      case "paused":
        return "text-yellow-500";
      case "completed":
        return "text-green-500";
      case "error":
        return "text-red-500";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "downloading":
        return "جاري التحميل";
      case "paused":
        return "متوقف مؤقتاً";
      case "completed":
        return "مكتمل";
      case "error":
        return "خطأ";
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">إدارة التحميلات</h1>
        <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity flex items-center space-x-2 rtl:space-x-reverse">
          <Download className="h-5 w-5" />
          <span>تحميل جديد</span>
        </button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {downloads.map((download) => (
            <div
              key={download.id}
              className="bg-black/5 dark:bg-white/5 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="font-semibold">{download.name}</span>
                  <span
                    className={`text-sm ${getStatusColor(download.status)}`}
                  >
                    {getStatusText(download.status)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {download.status === "downloading" && (
                    <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded">
                      <Pause className="h-5 w-5" />
                    </button>
                  )}
                  {download.status === "paused" && (
                    <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded">
                      <Play className="h-5 w-5" />
                    </button>
                  )}
                  <button className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{download.size}</span>
                  <span>{download.speed}</span>
                </div>
                <div className="h-2 bg-black/10 dark:bg-white/10 rounded-full">
                  <div
                    className="h-full bg-black dark:bg-white rounded-full transition-all duration-300"
                    style={{ width: `${download.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DownloadOpsPage;
