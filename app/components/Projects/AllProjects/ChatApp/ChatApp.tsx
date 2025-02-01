import {
  USER_ACCESS_TOKEN_KEY,
  useSocketStore,
  type TMessage,
} from "~/stores/chatapp.store";
import AllChatsSidebar from "./AllChatsSidebar";
import ConversationThread from "./ConversationThread";
import { SlLogout } from "react-icons/sl";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import NewUserSelect from "./NewUserSelect";
import SendMessage from "./SendMessage";
import { CHAT_APP_EVENTS, ENVIRONMENT } from "~/constants/main.constants";
import { io } from "socket.io-client";
import moment from "moment";
import {
  chatBottomScroller,
  receivedMessageHandler,
} from "~/utils/chatApp.utils";
import { Tooltip, Avatar } from "@heroui/react";

const ChatApp = ({
  setIsLoggedIn,
  setIndexSectionActive,
  userDetails,
  setUserDetails,
  isValidationLoading,
  isValidationSuccess,
  allUsers,
  conversations,
  setConversations,
  currentConversation,
  setCurrentConversation,
}: any) => {
  const socket = useSocketStore((state: any) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
    }
    setUserDetails(null);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const socketInstance: any = io(import.meta.env.VITE_ENDPOINT, {
      query: {
        email: userDetails.email,
      },
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log(`Socket connected: ${socketInstance.connected}`);
    });

    const scrollToBottomTimeout = chatBottomScroller();

    return () => {
      clearTimeout(scrollToBottomTimeout);
      if (socketInstance) {
        socketInstance.disconnect();
        setSocket(null);
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // console.log("TRIGGERED");
      socket.on(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage: TMessage) =>
        receivedMessageHandler({
          receivedMessage,
          conversations,
          setConversations,
        }),
      );

      return () =>
        socket.off(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage: TMessage) =>
          receivedMessageHandler({
            receivedMessage,
            conversations,
            setConversations,
          }),
        );
    }
  }, [socket, conversations]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      {isValidationLoading ? (
        <div className="flex h-full items-center justify-center">
          <Spinner
            size="lg"
            color="default"
            label="Loading..."
            labelColor="secondary"
          />
        </div>
      ) : isValidationSuccess ? (
        <div className="h-full">
          {/* header */}
          <div className="funkyBg flex flex-[5%] items-center justify-between px-4 py-2">
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() => setIndexSectionActive(true)}
            >
              <FaLongArrowAltLeft className="text-2xl" />
              <p className="text-xl font-bold">Back</p>
            </div>

            <div className="flex w-[30%] items-center gap-2">
              <div className="ml-auto flex flex-col items-center justify-center text-2xl">
                {!currentConversation ? (
                  <p className="font-extrabold">Chat App</p>
                ) : (
                  <div className="flex items-center gap-3">
                    <Avatar />
                    <div className="flex flex-col">
                      <p className="text-xl font-semibold">
                        {currentConversation.otherPersonName}
                      </p>
                      {import.meta.env.VITE_ENVIRONMENT === ENVIRONMENT.DEV ? (
                        <p className="text-lg">
                          {currentConversation.otherPersonEmail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              <NewUserSelect
                {...{
                  allUsers,
                  conversations,
                  setConversations,
                  setCurrentConversation,
                  userDetails,
                  socket,
                }}
              />
            </div>

            <Tooltip content={"Logout"} color="default" placement="bottom">
              <SlLogout
                className="cursor-pointer text-xl"
                onClick={handleLogout}
              />
            </Tooltip>
          </div>

          {/* chat section */}
          <div className="flex h-full flex-[95%]">
            <AllChatsSidebar
              {...{
                userDetails,
                conversations,
                setCurrentConversation,
              }}
            />

            <div className="flex h-full w-full flex-col pb-6">
              <ConversationThread
                {...{ userDetails, conversations, currentConversation }}
              />
              <SendMessage
                {...{
                  socket,
                  userDetails,
                  conversations,
                  setConversations,
                  currentConversation,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-white">
          Failed to login. Try again later.
        </div>
      )}
    </div>
  );
};

export default ChatApp;
