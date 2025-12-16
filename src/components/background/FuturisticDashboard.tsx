/**
 * خلفية لوحة التحكم المستقبلية
 * Futuristic Dashboard Background
 */

import React from 'react';
import { motion } from 'framer-motion';

interface FuturisticDashboardProps {
  className?: string;
  showMainImage?: boolean;
}

const FuturisticDashboard: React.FC<FuturisticDashboardProps> = ({
  className = '',
  showMainImage = true,
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* الصورة الرئيسية كخلفية */}
      {showMainImage && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${process.env.NODE_ENV === 'development' ? 'https://cdn.builder.io/api/v1/image/assets%2Fc1c71fb2fc12445b9c157b54cdf286d0%2F41e5b8441bae480d8010ad2664e45b36?format=webp&width=800' : '/assets/dashboard-bg.webp'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* طبقة التدرج المظللة */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(15, 23, 42, 0.95) 0%,
              rgba(30, 27, 75, 0.9) 25%,
              rgba(15, 23, 42, 0.95) 50%,
              rgba(30, 27, 75, 0.9) 75%,
              rgba(15, 23, 42, 0.95) 100%
            )
          `,
        }}
      />

      {/* الشبكة الهولوجرافية */}
      <div className="absolute inset-0">
        {/* خطوط الشبكة الأفقية */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px opacity-10"
            style={{
              top: `${i * 5}%`,
              background:
                'linear-gradient(90deg, transparent, rgba(0, 255, 213, 0.5), transparent)',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* خطوط الشبكة العمودية */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px opacity-10"
            style={{
              left: `${i * 5}%`,
              background:
                'linear-gradient(180deg, transparent, rgba(124, 58, 237, 0.5), transparent)',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* تأثيرات الطاقة المتحركة */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`energy-${i}`}
            className="absolute"
            style={{
              width: '2px',
              height: '100%',
              left: `${20 + i * 15}%`,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                rgba(0, 255, 213, 0.6) 20%, 
                rgba(124, 58, 237, 0.6) 50%,
                rgba(0, 255, 213, 0.6) 80%, 
                transparent 100%
              )`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* النقاط المضيئة العشوائية */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? 'rgba(0, 255, 213, 0.8)' : 'rgba(124, 58, 237, 0.8)',
              boxShadow: `0 0 10px ${i % 2 === 0 ? 'rgba(0, 255, 213, 0.8)' : 'rgba(124, 58, 237, 0.8)'}`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* تأثير الوهج المحيطي */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-1/3 h-1/3 opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 255, 213, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* تأثير الزجاج المكسور */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)
            `,
            backdropFilter: 'blur(0.5px)',
          }}
        />
      </div>
    </div>
  );
};

export default FuturisticDashboard;
