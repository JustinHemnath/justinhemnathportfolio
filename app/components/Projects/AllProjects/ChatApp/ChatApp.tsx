import { USER_ACCESS_TOKEN_KEY, useSocketStore } from "~/stores/chatapp.store";
import AllChatsSidebar from "./AllChatsSidebar";
import ConversationThread from "./ConversationThread";
import { SlLogout } from "react-icons/sl";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import NewUserSelect from "./NewUserSelect";
import SendMessage from "./SendMessage";
import { CHAT_APP_EVENTS } from "~/constants/main.constants";
import { io } from "socket.io-client";
import moment from "moment";
import { chatBottomScroller, receivedMessageHandler } from "~/utils/chatApp.utils";

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
}: any) => {
  const socket = useSocketStore((state: any) => state.socket);
  const setSocket = useSocketStore((state) => state.setSocket);

  const [activeConversationIndex, setActiveConversationIndex] = useState(0);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
    }
    setUserDetails(null);
    setIsLoggedIn(false);
  }

  // useEffect(() => {
  //   const bottomDiv = document.getElementById("conversationThreadBottomDiv")!;
  //   if (bottomDiv) {
  //     bottomDiv.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // }, []);

  // console.log({ conversations });

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
    // const scrollToBottomTimeout = setTimeout(function () {
    //   const bottomDiv = document.getElementById("conversationThreadBottomDiv")!;
    //   if (bottomDiv) {
    //     bottomDiv.scrollIntoView({
    //       behavior: "smooth",
    //       block: "end",
    //     });
    //   }
    // }, 200);

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
      socket.on(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage) =>
        receivedMessageHandler({ receivedMessage, conversations, setConversations })
      );

      return () =>
        socket.off(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage) =>
          receivedMessageHandler({ receivedMessage, conversations, setConversations })
        );
    }
  }, [socket, conversations]);

  console.log({ conversations, activeConversationIndex });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      {isValidationLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" color="default" label="Loading..." />
        </div>
      ) : isValidationSuccess ? (
        <div className="h-full">
          {/* header */}
          <div className="funkyBg flex flex-[5%] items-center justify-between px-4 py-2">
            <div className="flex gap-3 items-center cursor-pointer" onClick={() => setIndexSectionActive(true)}>
              <FaLongArrowAltLeft className="text-2xl" />
              <p className="text-xl font-bold">Back</p>
            </div>

            <div className="flex gap-2 items-center justify-center">
              <p className="font-extrabold text-2xl">Chat App</p>
              <NewUserSelect {...{ allUsers }} />
            </div>

            <SlLogout className="cursor-pointer text-xl" onClick={handleLogout} />
          </div>

          {/* chat section */}
          <div className="flex h-full flex-[95%]">
            <AllChatsSidebar {...{ conversations, setActiveConversationIndex }} />

            <div className="h-full w-full flex flex-col pb-6">
              <ConversationThread {...{ userDetails, conversations, activeConversationIndex }} />
              <SendMessage {...{ socket, userDetails, conversations, activeConversationIndex }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white h-full flex justify-center items-center">Failed to login. Try again later.</div>
      )}
    </div>
  );
};

export default ChatApp;
