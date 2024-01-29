"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import qwerty from "@/keyboards/qwerty-english-ansi.json"

interface LayoutState {
  layoutName: string,
  setLayoutName: (newLayoutName: string) => void,
  layout: Keyboard,
  setLayout: (newLayout: Keyboard) => void
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      layoutName: "",
      setLayoutName: (newLayoutName: string) => set({ layoutName: newLayoutName }),
      layout: qwerty,
      setLayout: (newLayout: Keyboard) => set({ layout: newLayout})
    }),
    {
      name: "current-layout",
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    }
  )
);