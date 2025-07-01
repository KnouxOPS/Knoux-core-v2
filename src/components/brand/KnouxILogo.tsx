/**
 * شعار كنووكس آي - المكون الرسمي للشعار
 * KnouxI Official Logo Component
 */

import React from 'react';
import { motion } from 'framer-motion';

interface KnouxILogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'full' | 'icon' | 'text';
  animated?: boolean;
  glowEffect?: boolean;
  className?: string;
}

const KnouxILogo: React.FC<KnouxILogoProps> = ({
  size = 'medium',
  variant = 'full',
  animated = true,
  glowEffect = true,
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24',
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xlarge: 'text-4xl',
  };

  // Logo animation variants
  const logoVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      rotateY: -90,
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 15,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
      x: -20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const IconLogo = () => (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      variants={animated ? logoVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
      whileHover={animated ? 'hover' : undefined}
    >
      {/* استخدام الصورة الفعلية للشعار */}
      <div
        className="w-full h-full rounded-xl"
        style={{
          backgroundImage: `url(${process.env.NODE_ENV === 'development' ? 'https://cdn.builder.io/api/v1/image/assets%2Fc1c71fb2fc12445b9c157b54cdf286d0%2F13cbbdcfa30742859058f0c025d2e652?format=webp&width=800' : '/assets/knouxi-logo.webp'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* تأثير الوهج */}
      {glowEffect && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(79, 70, 229, 0.3))',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* تأثيرات إضافية */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"
          style={{
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </motion.div>
  );

  const TextLogo = () => (
    <motion.div
      className="flex items-center gap-2"
      variants={animated ? textVariants : undefined}
      initial={animated ? 'initial' : undefined}
      animate={animated ? 'animate' : undefined}
    >
      <span
        className={`font-bold ${textSizes[size]} bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent`}
      >
        KNOUXI
      </span>
      <span className={`${textSizes[size]} text-slate-400 font-light`}>AI</span>
    </motion.div>
  );

  if (variant === 'icon') {
    return <IconLogo />;
  }

  if (variant === 'text') {
    return <TextLogo />;
  }

  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated ? { opacity: 1 } : undefined}
      transition={animated ? { duration: 0.5 } : undefined}
    >
      <IconLogo />
      {size !== 'small' && <TextLogo />}
    </motion.div>
  );
};

export default KnouxILogo;
