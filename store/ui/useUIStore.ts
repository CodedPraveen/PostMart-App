import { create } from 'zustand';

interface UIState {
  notice: string | null;
  showNotice: (message: string) => void;
  dismissNotice: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  notice: null,
  showNotice: (notice) => set({ notice }),
  dismissNotice: () => set({ notice: null }),
}));
