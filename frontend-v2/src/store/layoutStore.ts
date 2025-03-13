import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PersistentState {
  layout: string;
  setLayout: (layout: string) => void;
}

const useLayoutStore = create(
  persist<PersistentState>(
    (set) => ({
      layout: 'qwerty',
      setLayout: (layout: string) => {
        layout = layout.toLowerCase(); // Converting the name to lower case because JSON keys are case sensitive
        set({ layout });
      },
    }),
    {
      name: 'currentLayout',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useLayoutStore;
