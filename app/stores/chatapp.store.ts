import { create } from "zustand";

const useChatAppStore = create((set) => ({
  userDetails: undefined,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
}));
