// SystemSettingsContext.tsx
import React, { createContext, useState } from 'react';

interface SystemSettings {
  language: string;
  // Add other system settings properties as needed
}

interface SystemSettingsContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const SystemSettingsContext = createContext<SystemSettingsContextType | undefined>(undefined);

const SystemSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>({
    language: 'en', // Default language
    // Initialize other system settings properties as needed
  });

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <SystemSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SystemSettingsContext.Provider>
  );
};

const useSystemSettings = () => {
  const context = React.useContext(SystemSettingsContext);
  if (context === undefined) {
    throw new Error('useSystemSettings must be used within a SystemSettingsProvider');
  }
  return context;
};

export { SystemSettingsProvider, useSystemSettings };
