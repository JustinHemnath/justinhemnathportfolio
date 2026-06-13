import { create } from "zustand";
import { getLocalStorageItem } from "~/utils/signin.utils";
import { io } from "socket.io-client";
import { chatBottomScroller } from "~/utils/chatApp.utils";

export const USER_ACCESS_TOKEN_KEY = "chatAppAccessToken";

export type TUserDetails = {
  userName: string;
  email: string;
  createdAt: number;
};

export type TUser = {
  name: string;
  email: string;
};

export type TAllUsers = TUser | [];

export type TMessage = {
  id: string;
  sender: string;
  sender_name: string;
  receiver: string;
  receiver_name: string;
  message: string;
  sent_at: string;
};

export type TConversation = {
  lastMessage: TMessage;
  otherPersonEmail: string;
  otherPersonName: string;
  messages: TMessage[];
};

type TChatApp = {
  userDetails: TUserDetails | null;
  setUserDetails: (payload: TUserDetails | null) => void;
  allUsers: TAllUsers;
  setAllUsers: (payload: TAllUsers) => void;
  isValidationLoading: boolean;
  setIsValidationLoading: (payload: boolean) => void;
  isValidationSuccess: boolean;
  setIsValidationSuccess: (payload: boolean) => void;
  conversations: TConversation[];
  setConversations: (payload: TConversation[]) => void;

  socketReceivedMessageHandler: (receivedMessage: TMessage) => void;
};

export const useChatAppStore = create<TChatApp>((set) => ({
  // sign in details
  userDetails: null,
  setUserDetails: (payload: any) => set({ userDetails: payload }),

  // all registered users
  allUsers: [],
  setAllUsers: (payload: TAllUsers) => set({ allUsers: payload }),

  // sign in loaders
  isValidationLoading: false,
  setIsValidationLoading: (payload: boolean) =>
    set({ isValidationLoading: payload }),
  isValidationSuccess: false,
  setIsValidationSuccess: (payload: boolean) =>
    set({ isValidationSuccess: payload }),

  // conversations
  conversations: [],
  setConversations: (payload: any[]) => set({ conversations: payload }),

  socketReceivedMessageHandler: (receivedMessage: TMessage) =>
    set((state) => {
      let conversations = state.conversations;

      const targetConvoIndex = conversations.findIndex(
        (convo: any) => convo.otherPersonEmail === receivedMessage.sender,
      );
      let newConversations: TConversation[] = [...conversations];

      if (targetConvoIndex === -1) {
        const newConversationItem = {
          otherPersonEmail: receivedMessage.sender,
          otherPersonName: receivedMessage.sender_name,
          messages: [receivedMessage],
          lastMessage: receivedMessage,
        };
        newConversations.push(newConversationItem);
      } else {
        let targetConvo: TConversation = newConversations[targetConvoIndex];
        const messageAlreadyInserted = targetConvo.messages.find(
          (message: TMessage) => message.id === receivedMessage.id,
        );

        if (!messageAlreadyInserted) {
          targetConvo.messages.push(receivedMessage);
          targetConvo = {
            ...targetConvo,
            lastMessage: receivedMessage,
          };
          newConversations.splice(targetConvoIndex, 1, targetConvo);
        }
      }

      newConversations.sort((a, b) => {
        const aDate: any = new Date(a.lastMessage.sent_at);
        const bDate: any = new Date(b.lastMessage.sent_at);
        return bDate - aDate;
      });
      // chatBottomScroller();

      return {
        conversations: newConversations,
      };
    }),
}));

export const useSocketStore = create<any>((set) => ({
  socket: null,
  setSocket: (payload: any) => set({ socket: payload }),
}));
