import { useChatAppStore, USER_ACCESS_TOKEN_KEY } from "~/stores/chatapp.store";
import AllChatsSidebar from "./AllChatsSidebar";
import ConversationThread from "./ConversationThread";
import { SlLogout } from "react-icons/sl";
import { Spinner } from "@heroui/react";
import { useEffect } from "react";

const ChatApp = ({ setIsLoggedIn }: any) => {
  const {
    userDetails,
    setUserDetails,
    isValidationLoading,
    isValidationSuccess,
    setIsValidationLoading,
    setIsValidationSuccess,
  } = useChatAppStore((state) => state);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
    }
    setUserDetails(null);
    setIsLoggedIn(false);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      {isValidationLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" color="default" label="Loading..." />
        </div>
      ) : isValidationSuccess ? (
        <div>
          {/* header */}
          <div className="funkyBg flex flex-[5%] items-center justify-center px-4 py-2">
            <p className="ml-auto">Chat App</p>
            <SlLogout className="ml-auto cursor-pointer text-xl" onClick={handleLogout} />
          </div>

          {/* chat section */}
          <div className="flex h-full flex-[95%]">
            <AllChatsSidebar />
            <ConversationThread />
          </div>
        </div>
      ) : (
        <div className="text-white h-full flex justify-center items-center">Failed to login. Try again later.</div>
      )}
    </div>
  );
};

export default ChatApp;
