import { create } from "zustand";

export const useImageSlider = create((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  images: [],
  setImages: (images) => set({ images }),
  selectedIndex: 0,
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
}));
