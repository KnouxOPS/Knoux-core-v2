/**
 * كنووكس تي في - الشريط التفاعلي المباشر
 * Live Interactive KnouxTV Bar
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  Settings,
  Tv,
  Radio,
  Signal,
  Wifi,
  Battery,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  Users,
  Star,
  Zap,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

// بيانات القنوات والمحتوى المباشر
interface TVChannel {
  id: string;
  name: string;
  nameAr: string;
  category: 'news' | 'tech' | 'space' | 'entertainment' | 'education';
  logo: string;
  isLive: boolean;
  currentShow: string;
  currentShowAr: string;
  viewers: number;
  quality: '4K' | 'HD' | 'SD';
  signal: number; // 0-100
}

interface LiveContent {
  title: string;
  titleAr: string;
  duration: number;
  elapsed: number;
  thumbnails: string[];
  description: string;
  descriptionAr: string;
}

const mockChannels: TVChannel[] = [
  {
    id: 'knoux-space',
    name: 'KnouxSpace',
    nameAr: 'كنووكس الفضاء',
    category: 'space',
    logo: '🚀',
    isLive: true,
    currentShow: 'Mars Mission Live',
    currentShowAr: 'مهمة المريخ مباشر',
    viewers: 15420,
    quality: '4K',
    signal: 98,
  },
  {
    id: 'tech-nexus',
    name: 'TechNexus',
    nameAr: 'نيكزوس التقنية',
    category: 'tech',
    logo: '⚡',
    isLive: true,
    currentShow: 'AI Revolution 2024',
    currentShowAr: '��ورة الذكاء الاصطناعي 2024',
    viewers: 8930,
    quality: 'HD',
    signal: 95,
  },
  {
    id: 'cosmic-news',
    name: 'Cosmic News',
    nameAr: 'الأخبار الكونية',
    category: 'news',
    logo: '📡',
    isLive: true,
    currentShow: 'Galaxy Update',
    currentShowAr: 'تحديث المجرة',
    viewers: 12500,
    quality: '4K',
    signal: 92,
  },
  {
    id: 'dev-academy',
    name: 'Dev Academy',
    nameAr: 'أكاديمية التطوير',
    category: 'education',
    logo: '💻',
    isLive: true,
    currentShow: 'React Mastery',
    currentShowAr: 'إتقان رياكت',
    viewers: 5680,
    quality: 'HD',
    signal: 88,
  },
];

const LiveKnouxTVBar: React.FC = () => {
  // الحالات الأساسية
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState([75]);
  const [currentChannel, setCurrentChannel] = useState<TVChannel>(mockChannels[0]);
  const [liveContent, setLiveContent] = useState<LiveContent>({
    title: 'Mars Mission Live',
    titleAr: 'مهمة المريخ مباشر',
    duration: 3600, // seconds
    elapsed: 1234,
    thumbnails: ['/api/placeholder/160/90'],
    description: 'Live coverage of the latest Mars mission with real-time updates',
    descriptionAr: 'تغطية مباشرة لآخر مهمة إلى المريخ مع تحديثات فورية',
  });

  // معلومات النظام والوقت
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState({
    signal: 98,
    battery: 87,
    wifi: true,
    recording: false,
  });

  // تحديث الوقت والمحتوى المباشر
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const contentInterval = setInterval(() => {
      setLiveContent(prev => ({
        ...prev,
        elapsed: prev.elapsed + 1,
      }));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(contentInterval);
    };
  }, []);

  // تحديث بيانات المشاهدات والإشارة مع تحسين الأداء
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setCurrentChannel(prev => {
        const newViewers = prev.viewers + Math.floor(Math.random() * 20 - 10);
        const newSignal = Math.max(85, Math.min(100, prev.signal + Math.random() * 4 - 2));

        // تحديث فقط إذا كان هناك تغيير ملموس
        if (Math.abs(newViewers - prev.viewers) > 0 || Math.abs(newSignal - prev.signal) > 1) {
          return {
            ...prev,
            viewers: Math.max(0, newViewers),
            signal: newSignal,
          };
        }
        return prev;
      });

      setSystemStatus(prev => {
        const newSignal = Math.max(85, Math.min(100, prev.signal + Math.random() * 4 - 2));
        const newBattery = Math.max(20, Math.min(100, prev.battery - 0.01)); // تقليل معدل النفاد

        return {
          ...prev,
          signal: newSignal,
          battery: newBattery,
        };
      });
    }, 10000); // زيادة الفترة إلى 10 ثواني

    return () => clearInterval(statusInterval);
  }, []);

  // تنسيق الوقت
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // تنسيق عدد المشاهدات
  const formatViewers = (viewers: number) => {
    if (viewers >= 1000) return `${(viewers / 1000).toFixed(1)}K`;
    return viewers.toString();
  };

  // التبديل بين القنوات مع تحسين الأداء
  const switchChannel = useCallback(
    (direction: 'next' | 'prev') => {
      const currentIndex = mockChannels.findIndex(ch => ch.id === currentChannel.id);
      let newIndex;

      if (direction === 'next') {
        newIndex = (currentIndex + 1) % mockChannels.length;
      } else {
        newIndex = currentIndex === 0 ? mockChannels.length - 1 : currentIndex - 1;
      }

      const newChannel = mockChannels[newIndex];
      if (newChannel.id !== currentChannel.id) {
        setCurrentChannel(newChannel);
        setLiveContent({
          title: newChannel.currentShow,
          titleAr: newChannel.currentShowAr,
          duration: 3600,
          elapsed: Math.floor(Math.random() * 1800),
          thumbnails: ['/api/placeholder/160/90'],
          description: `Live content from ${newChannel.name}`,
          descriptionAr: `محتوى مباشر من ${newChannel.nameAr}`,
        });
      }
    },
    [currentChannel.id]
  );

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50"
    >
      {/* الشريط المضغوط */}
      <motion.div
        animate={{ height: isExpanded ? 'auto' : '60px' }}
        className="relative overflow-hidden"
      >
        {/* الشريط الأساسي */}
        <div className="flex items-center justify-between px-4 py-2 h-[60px]">
          {/* معلومات القناة والمحتوى */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* شعار القناة */}
            <div className="relative">
              <motion.div
                animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center text-xl"
              >
                {currentChannel.logo}
              </motion.div>
              {currentChannel.isLive && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                />
              )}
            </div>

            {/* معلومات المحتوى */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-medium truncate">{liveContent.titleAr}</h3>
                <Badge variant="outline" className="border-red-500 text-red-400 text-xs">
                  <Signal className="w-3 h-3 mr-1" />
                  مباشر
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{currentChannel.nameAr}</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatViewers(currentChannel.viewers)}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {currentChannel.quality}
                </div>
              </div>
            </div>

            {/* شريط التقدم ا��مباشر */}
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <span>{formatTime(liveContent.elapsed)}</span>
              <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${(liveContent.elapsed / liveContent.duration) * 100}%` }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                />
              </div>
              <span>{formatTime(liveContent.duration)}</span>
            </div>
          </div>

          {/* عناصر التحكم */}
          <div className="flex items-center gap-2">
            {/* التحكم في التشغيل */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-white hover:bg-slate-700"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            {/* التبديل بين القنوات */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => switchChannel('prev')}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => switchChannel('next')}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* الصوت */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <div className="w-16">
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="h-2"
                />
              </div>
            </div>

            {/* معلومات النظام */}
            <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                {systemStatus.signal}%
              </div>
              <div className="flex items-center gap-1">
                <Battery className="w-3 h-3" />
                {systemStatus.battery}%
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentTime.toLocaleTimeString('ar-EG', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>

            {/* توسيع/تصغير */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* الشريط الموسع */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-700/50 p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* معاينة القناة */}
                <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{currentChannel.logo}</div>
                      <div className="text-white font-medium">{currentChannel.nameAr}</div>
                      <div className="text-slate-400 text-sm">{liveContent.titleAr}</div>
                    </div>
                  </div>

                  {/* مؤشر البث المباشر */}
                  <div className="absolute top-3 left-3">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex items-center gap-2 bg-red-500/90 rounded-full px-2 py-1 text-white text-xs"
                    >
                      <div className="w-2 h-2 bg-white rounded-full" />
                      LIVE
                    </motion.div>
                  </div>

                  {/* جودة الإشارة */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1 text-white text-xs">
                    <Signal className="w-3 h-3" />
                    {currentChannel.signal}%
                  </div>
                </div>

                {/* قائمة القنوات */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">القنوات المتاحة</h4>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {mockChannels.map(channel => (
                      <motion.button
                        key={channel.id}
                        onClick={() => setCurrentChannel(channel)}
                        whileHover={{ scale: 1.02 }}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                          channel.id === currentChannel.id
                            ? 'bg-cyan-600/20 border border-cyan-400/30'
                            : 'bg-slate-800/50 hover:bg-slate-700/50'
                        }`}
                      >
                        <div className="text-lg">{channel.logo}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-xs truncate">{channel.nameAr}</div>
                          <div className="text-slate-400 text-xs truncate">
                            {channel.currentShowAr}
                          </div>
                        </div>
                        {channel.isLive && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* إحصائيات المشاهدة */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">إحصائيات البث</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">المشاهدين الحاليين</span>
                      <span className="text-cyan-400 font-medium">
                        {formatViewers(currentChannel.viewers)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">جودة البث</span>
                      <span className="text-purple-400 font-medium">{currentChannel.quality}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">قوة الإشارة</span>
                      <span
                        className={`font-medium ${currentChannel.signal > 90 ? 'text-green-400' : 'text-yellow-400'}`}
                      >
                        {currentChannel.signal}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">وقت البث</span>
                      <span className="text-white font-medium">
                        {formatTime(liveContent.elapsed)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* عناصر تحكم إضافية */}
                <div className="space-y-3">
                  <h4 className="text-white font-medium text-sm">التحكم المتقدم</h4>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full border-slate-600">
                      <Settings className="w-4 h-4 mr-2" />
                      إعدادات البث
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-slate-600"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      {isFullscreen ? (
                        <>
                          <Minimize2 className="w-4 h-4 mr-2" />
                          خروج من ملء الشاشة
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-4 h-4 mr-2" />
                          ملء الشاشة
                        </>
                      )}
                    </Button>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>تسجيل البث</span>
                      <motion.div
                        animate={{ opacity: systemStatus.recording ? [0.5, 1, 0.5] : 1 }}
                        transition={{ duration: 1, repeat: systemStatus.recording ? Infinity : 0 }}
                        className={`w-3 h-3 rounded-full ${
                          systemStatus.recording ? 'bg-red-500' : 'bg-slate-600'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* تأثيرات بصرية */}
      <div className="absolute inset-0 pointer-events-none">
        {/* خط طاقة متحرك */}
        <motion.div
          animate={{
            x: ['0%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />
      </div>
    </motion.div>
  );
};

export default LiveKnouxTVBar;
