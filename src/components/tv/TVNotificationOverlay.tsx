/**
 * إشعارات كنووكس تي في التفاعلية
 * Interactive TV Notifications Overlay
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Volume2, Signal, Users, Zap, Bell } from 'lucide-react';
import { Badge } from '../ui/badge';

interface TVNotification {
  id: string;
  type: 'channel_change' | 'viewer_milestone' | 'quality_change' | 'live_event' | 'system_alert';
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  icon: React.ReactNode;
  color: string;
  duration: number;
  timestamp: Date;
}

interface TVNotificationOverlayProps {
  currentChannel?: string;
  viewers?: number;
  signal?: number;
}

const TVNotificationOverlay: React.FC<TVNotificationOverlayProps> = ({
  currentChannel,
  viewers = 0,
  signal = 100,
}) => {
  const [notifications, setNotifications] = useState<TVNotification[]>([]);

  // إضافة إشعار جديد
  const addNotification = (notification: Omit<TVNotification, 'id' | 'timestamp'>) => {
    const newNotification: TVNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 2)]); // أقصى 3 إشعارات

    // إزالة الإشعار تلقائياً
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, notification.duration);
  };

  // مراقبة تغييرات القناة مع تجنب التكرار
  const [lastChannel, setLastChannel] = useState<string>('');
  const [lastViewerMilestone, setLastViewerMilestone] = useState<number>(0);
  const [lastSignalWarning, setLastSignalWarning] = useState<number>(Date.now());

  useEffect(() => {
    if (currentChannel && currentChannel !== lastChannel) {
      setLastChannel(currentChannel);
      addNotification({
        type: 'channel_change',
        title: 'Channel Changed',
        titleAr: 'تم تغيير القناة',
        message: `Now watching ${currentChannel}`,
        messageAr: `تشاهد الآن ${currentChannel}`,
        icon: <Tv className="w-4 h-4" />,
        color: 'from-cyan-400 to-blue-500',
        duration: 3000,
      });
    }
  }, [currentChannel, lastChannel]);

  // مراقبة معالم المشاهدين مع تجنب التكرار
  useEffect(() => {
    const milestone = Math.floor(viewers / 1000) * 1000;
    if (milestone > 0 && milestone > lastViewerMilestone && viewers >= milestone) {
      setLastViewerMilestone(milestone);
      addNotification({
        type: 'viewer_milestone',
        title: 'Viewer Milestone',
        titleAr: 'معلم المشاهدين',
        message: `${milestone.toLocaleString()}+ viewers watching!`,
        messageAr: `أكثر من ${milestone.toLocaleString()} مشاهد!`,
        icon: <Users className="w-4 h-4" />,
        color: 'from-purple-400 to-pink-500',
        duration: 4000,
      });
    }
  }, [viewers, lastViewerMilestone]);

  // مراقبة جودة الإشارة مع تجنب التكرار المستمر
  useEffect(() => {
    const now = Date.now();
    if (signal < 80 && now - lastSignalWarning > 30000) {
      // تنبيه كل 30 ثانية فقط
      setLastSignalWarning(now);
      addNotification({
        type: 'quality_change',
        title: 'Signal Quality',
        titleAr: 'جودة الإشارة',
        message: 'Low signal detected',
        messageAr: 'تم اكتشاف إشارة ضعيفة',
        icon: <Signal className="w-4 h-4" />,
        color: 'from-yellow-400 to-orange-500',
        duration: 5000,
      });
    }
  }, [signal, lastSignalWarning]);

  return (
    <div className="fixed top-20 right-4 z-40 space-y-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="relative max-w-sm"
          >
            {/* الخلفية المضيئة */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${notification.color} opacity-20 rounded-lg blur-md`}
            />

            {/* محتوى الإشعار */}
            <div className="relative bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 shadow-lg">
              <div className="flex items-start gap-3">
                {/* أيقونة الإشعار */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${notification.color} flex items-center justify-center text-white`}
                >
                  {notification.icon}
                </div>

                {/* محتوى النص */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white text-sm font-medium truncate">
                      {notification.titleAr}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs border-none bg-gradient-to-r ${notification.color} text-white`}
                    >
                      LIVE
                    </Badge>
                  </div>
                  <p className="text-slate-300 text-xs">{notification.messageAr}</p>
                </div>
              </div>

              {/* شريط التقدم */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: notification.duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${notification.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* مؤشر البث المباشر العام */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mt-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-30 rounded-full blur-md" />
        <div className="relative bg-slate-900/95 backdrop-blur-sm border border-red-500/50 rounded-full px-3 py-2 flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 bg-red-500 rounded-full"
          />
          <span className="text-red-400 text-xs font-medium">ON AIR</span>
        </div>
      </motion.div>
    </div>
  );
};

export default TVNotificationOverlay;
