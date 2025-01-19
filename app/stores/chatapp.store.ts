import { create } from "zustand";

export const USER_ACCESS_TOKEN_KEY = "chatAppAccessToken";

export type TUserDetails = {
  userName: string;
  email: string;
  createdAt: number;
};

type TChatApp = {
  userDetails: TUserDetails | undefined;
  setUserDetails: (payload: TUserDetails) => void;
};

export const useChatAppStore = create<TChatApp>((set) => ({
  userDetails: undefined,
  setUserDetails: (payload: any) => set({ userDetails: payload }),
}));
