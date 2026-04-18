import { createContext, useContext, useEffect, useState } from 'react';

type LevelContextType = {
  level: number;
  xp: number;
  maxXp: number;
  addXp: (amount: number) => void;
  removeXp: (amount: number) => void;
  setLevel: (level: number) => void;
};

const LevelContext = createContext<LevelContextType | null>(null);

const XP_PER_LEVEL = 200;

export function LevelProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState(() => {
    const savedLevel = localStorage.getItem('level');
    const savedXp = localStorage.getItem('xp');
    return {
      level: savedLevel ? parseInt(savedLevel, 10) : 0,
      xp: savedXp ? parseInt(savedXp, 10) : 0,
    };
  });

  const maxXp = XP_PER_LEVEL;

  const addXp = (amount: number) => {
    setStats((prev) => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;

      while (newXp >= XP_PER_LEVEL) {
        newXp -= XP_PER_LEVEL;
        newLevel += 1;
      }

      return { level: newLevel, xp: newXp };
    });
  };

  const removeXp = (amount: number) => {
    setStats((prev) => ({
      ...prev,
      xp: Math.max(0, prev.xp - amount),
    }));
  };

  const setLevel = (newLevel: number) => {
    setStats((prev) => ({ ...prev, level: newLevel }));
  };

  useEffect(() => {
    localStorage.setItem('level', stats.level.toString());
    localStorage.setItem('xp', stats.xp.toString());
  }, [stats]);

  return (
    <LevelContext.Provider
      value={{
        level: stats.level,
        xp: stats.xp,
        maxXp,
        addXp,
        removeXp,
        setLevel,
      }}
    >
      {children}
    </LevelContext.Provider>
  );
}

export function useLevel() {
  const ctx = useContext(LevelContext);
  if (!ctx) throw new Error('useLevel must be used within LevelProvider');
  return ctx;
}
