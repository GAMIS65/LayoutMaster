import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

interface PersistentState {
	layout: string;
	setLayout: (layout: string) => void;
}

const useLayoutStore = create(
	persist<PersistentState>(
		(set) => ({
			layout: "colemak",
			setLayout: (layout: string) => set({ layout }),
		}),
		{
			name: 'currentLayout',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useLayoutStore;

