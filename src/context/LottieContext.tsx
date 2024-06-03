import React, { createContext, useContext, useState } from 'react';
import { LottieJson } from '../pages/Editor';

interface LottieContextType {
  animation: LottieJson | any;
  setAnimation: React.Dispatch<React.SetStateAction<LottieJson | any>>;
  layers: any[];
  saveCount: number;
  setSaveCount: React.Dispatch<React.SetStateAction<number>>;
}

const LottieContext = createContext<LottieContextType | undefined>(undefined);

export const useLottie = () => {
  const context = useContext(LottieContext);
  if (!context) {
    throw new Error('useLottie must be used within a LottieProvider');
  }
  return context;
};

interface LottieProviderProps {
  children: React.ReactNode;
}

export const LottieProvider: React.FC<LottieProviderProps> = ({ children }) => {
  const [animation, setAnimation] = useState<LottieJson | any>(null);
  const [saveCount, setSaveCount] = useState<number>(0);

  const layers = animation?.layers || [];

  return <LottieContext.Provider value={{ animation, setAnimation, layers, saveCount, setSaveCount }}>{children}</LottieContext.Provider>;
};
