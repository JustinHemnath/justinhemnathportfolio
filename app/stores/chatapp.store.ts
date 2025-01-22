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
  isValidationLoading: boolean;
  setIsValidationLoading: (payload: boolean) => void;
  isValidationSuccess: boolean;
  setIsValidationSuccess: (payload: boolean) => void;
};

const initialUserDetails = () => {
  const user: any = getLocalStorageItem({ key: USER_ACCESS_TOKEN_KEY });
  if (user) return user;
  else return null;
};

export const useChatAppStore = create<TChatApp>((set) => ({
  userDetails: initialUserDetails(),
  setUserDetails: (payload: any) => set({ userDetails: payload }),
  isValidationLoading: false,
  setIsValidationLoading: (payload: boolean) => set({ isValidationLoading: payload }),
  isValidationSuccess: false,
  setIsValidationSuccess: (payload: boolean) => set({ isValidationSuccess: payload }),
}));
