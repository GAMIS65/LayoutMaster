import { createContext, useContext, useEffect, useState } from 'react';

type KeyboardLayoutContextType = {
  layoutName: string;
  setLayoutName: (name: string) => void;
};

const KeyboardLayoutContext = createContext<KeyboardLayoutContextType | null>(
  null,
);

export function KeyboardLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [layoutName, setLayoutName] = useState<string>(() => {
    const saved = localStorage.getItem('keyboardLayout');
    return (saved as string) || 'qwerty';
  });

  useEffect(() => {
    localStorage.setItem('keyboardLayout', layoutName);
  }, [layoutName]);

  return (
    <KeyboardLayoutContext.Provider value={{ layoutName, setLayoutName }}>
      {children}
    </KeyboardLayoutContext.Provider>
  );
}

export function useKeyboardLayout() {
  const ctx = useContext(KeyboardLayoutContext);
  if (!ctx)
    throw new Error(
      'useKeyboardLayout must be used within KeyboardLayoutProvider',
    );
  return ctx;
}
