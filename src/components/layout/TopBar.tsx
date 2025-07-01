"use client"

import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b bg-white dark:bg-black flex items-center justify-between px-6">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <h1 className="text-xl font-bold">KnouxCore</h1>
      </div>
      
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <button 
          onClick={() => navigate('/services')}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition-opacity"
        >
          الخدمات
        </button>
      </div>
    </header>
  );
};

export default TopBar;
