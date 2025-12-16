/**
 * كارت خدمة المطورين ثلاثي الأبعاد
 * 3D Developer Service Card Component
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  Star,
  Eye,
  ExternalLink,
  Shield,
  Calendar,
  Users,
  Package,
  Zap,
  Crown,
  Heart,
  Share2,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { DeveloperService } from '../../pages/developer/DeveloperServicesHub';

interface DeveloperServiceCard3DProps {
  service: DeveloperService;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const DeveloperServiceCard3D: React.FC<DeveloperServiceCard3DProps> = ({
  service,
  viewMode,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000000) return `${(downloads / 1000000).toFixed(1)}M`;
    if (downloads >= 1000) return `${(downloads / 1000).toFixed(1)}K`;
    return downloads.toString();
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const getCategoryIcon = () => {
    const iconClass = 'w-5 h-5';
    switch (service.category) {
      case 'frontend':
        return <Eye className={iconClass} />;
      case 'backend':
        return <Package className={iconClass} />;
      case 'mobile':
        return <Zap className={iconClass} />;
      case 'ai_ml':
        return <Shield className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  const cardVariants = {
    idle: {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      z: 0,
    },
    hover: {
      rotateX: viewMode === 'grid' ? -5 : 0,
      rotateY: viewMode === 'grid' ? 5 : 0,
      scale: viewMode === 'grid' ? 1.05 : 1.02,
      z: 50,
    },
  };

  const glowVariants = {
    idle: {
      opacity: 0,
      scale: 1,
    },
    hover: {
      opacity: service.premium ? 0.6 : 0.3,
      scale: 1.1,
    },
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="idle"
        animate={isHovered ? 'hover' : 'idle'}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        className="relative group cursor-pointer"
        style={{ perspective: 1000 }}
      >
        {/* توهج الخلفية */}
        <motion.div
          variants={glowVariants}
          className={`absolute inset-0 rounded-xl blur-xl ${
            service.premium ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-cyan-400'
          }`}
        />

        {/* الكارت الرئيسي */}
        <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 transition-all duration-300">
          <div className="flex items-center gap-4">
            {/* أيقونة الخدمة */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center border border-slate-600">
                <div className="text-cyan-400">{getCategoryIcon()}</div>
              </div>
              {service.premium && (
                <Crown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-400" />
              )}
            </div>

            {/* تفاصيل الخدمة */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-white truncate">{service.name}</h3>
                  <p className="text-sm text-slate-400 truncate">{service.nameAr}</p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-white">{service.rating}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 line-clamp-2 mb-3">{service.descriptionAr}</p>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {formatDownloads(service.downloads)}
                </div>
                <div className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {formatFileSize(service.size)}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />v{service.version}
                </div>
              </div>
            </div>

            {/* الإجراءات */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={e => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`p-2 ${isLiked ? 'text-red-400' : 'text-slate-400'}`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 text-slate-400">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <Eye className="w-4 h-4 mr-1" />
                معاينة
              </Button>
            </div>
          </div>

          {/* علامات التصنيف */}
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-700/50">
            {service.tags.slice(0, 4).map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-slate-600 text-slate-300"
              >
                {tag}
              </Badge>
            ))}
            {service.tags.length > 4 && (
              <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                +{service.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // عرض الشبكة (Grid View)
  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      animate={isHovered ? 'hover' : 'idle'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
    >
      {/* توهج الخلفية */}
      <motion.div
        variants={glowVariants}
        className={`absolute inset-0 rounded-xl blur-xl ${
          service.premium ? 'bg-gradient-to-r from-cyan-400 to-purple-600' : 'bg-cyan-400'
        }`}
      />

      {/* الكارت الرئيسي */}
      <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300">
        {/* صورة المعاينة */}
        <div className="relative h-40 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
          {service.screenshots[0] ? (
            <img
              src={service.screenshots[0]}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl text-cyan-400">{getCategoryIcon()}</div>
            </div>
          )}

          {/* تراكب العلامات */}
          <div className="absolute top-3 left-3 flex gap-2">
            {service.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                مميز
              </Badge>
            )}
            {service.premium && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                <Crown className="w-3 h-3 mr-1" />
                بريميوم
              </Badge>
            )}
          </div>

          {/* التقييم */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-white">{service.rating}</span>
          </div>

          {/* تراكب التحوي�� */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/90 text-black">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/90 text-black">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* محتوى الكارت */}
        <div className="p-4">
          {/* اسم الخدمة */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-white truncate">{service.name}</h3>
            <p className="text-sm text-slate-400 truncate">{service.nameAr}</p>
          </div>

          {/* الوصف */}
          <p className="text-sm text-slate-300 line-clamp-2 mb-3">{service.descriptionAr}</p>

          {/* الإحصائيات */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              <span>{formatDownloads(service.downloads)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{service.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Package className="w-3 h-3" />
              <span>{formatFileSize(service.size)}</span>
            </div>
          </div>

          {/* علامات التصنيف */}
          <div className="flex flex-wrap gap-1 mb-3">
            {service.tags.slice(0, 3).map(tag => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs border-slate-600 text-slate-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* الإجراءات */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
              onClick={e => {
                e.stopPropagation();
                // TODO: إضافة منطق المعاينة
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              معاينة
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={e => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2 ${isLiked ? 'text-red-400' : 'text-slate-400'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* معلومات الإصدار */}
          <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
            <span>الإصدار {service.version}</span>
            <span>{service.lastUpdated}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperServiceCard3D;
