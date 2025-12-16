/**
 * تخطيط ثلاثي الألواح
 * Three Panel Layout - Left Stats, Center Operations, Right Stats
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ThreePanelLayoutProps {
  leftPanel: ReactNode;
  centerPanel: ReactNode;
  rightPanel: ReactNode;
  className?: string;
}

const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({
  leftPanel,
  centerPanel,
  rightPanel,
  className = '',
}) => {
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`h-full grid grid-cols-12 gap-4 p-4 ${className}`}
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
    >
      {/* اللوحة اليسرى - الإحصائيات والبيانات */}
      <motion.div className="col-span-12 lg:col-span-3 xl:col-span-3" variants={panelVariants}>
        <div className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 overflow-y-auto">
          <div className="space-y-4">{leftPanel}</div>
        </div>
      </motion.div>

      {/* اللوحة المركزية - العمليات الرئيسية */}
      <motion.div className="col-span-12 lg:col-span-6 xl:col-span-6" variants={panelVariants}>
        <div className="h-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 overflow-y-auto relative">
          {/* تأثير الهولوجرام المركزي */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10"
              style={{
                background: 'radial-gradient(circle, rgba(0, 255, 213, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
          </div>

          <div className="relative z-10">{centerPanel}</div>
        </div>
      </motion.div>

      {/* اللوحة اليمنى - الإحصائيات والمعلومات */}
      <motion.div className="col-span-12 lg:col-span-3 xl:col-span-3" variants={panelVariants}>
        <div className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 overflow-y-auto">
          <div className="space-y-4">{rightPanel}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThreePanelLayout;
