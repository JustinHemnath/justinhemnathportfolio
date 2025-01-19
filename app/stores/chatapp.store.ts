import { create } from "zustand";
import { getLocalStorageItem } from "~/utils/signin.utils";

export const USER_ACCESS_TOKEN_KEY = "chatAppAccessToken";

export type TUserDetails = {
  userName: string;
  email: string;
  createdAt: number;
};

type TChatApp = {
  userDetails: TUserDetails | null;
  setUserDetails: (payload: TUserDetails | null) => void;
};

const initialUserDetails = () => {
  const user: any = getLocalStorageItem({ key: USER_ACCESS_TOKEN_KEY });
  if (user) return user;
  else return null;
};

export const useChatAppStore = create<TChatApp>((set) => ({
  userDetails: initialUserDetails(),
  setUserDetails: (payload: any) => set({ userDetails: payload }),
}));
