import { useChatAppStore, USER_ACCESS_TOKEN_KEY, type TUserDetails } from "~/stores/chatapp.store";
import AllChatsSidebar from "./AllChatsSidebar";
import ConversationThread from "./ConversationThread";
import { SlLogout } from "react-icons/sl";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { validateAndFetchUserConversations } from "~/services/chatapp.project.services";
import { FaLongArrowAltLeft } from "react-icons/fa";
import NewUserSelect from "./NewUserSelect";

const ChatApp = ({ setIsLoggedIn, setIndexSectionActive }: any) => {
  const {
    userDetails,
    setUserDetails,
    isValidationLoading,
    isValidationSuccess,
    setIsValidationLoading,
    setIsValidationSuccess,
    allUsers,
    setAllUsers,
    conversations,
    setConversations,
  } = useChatAppStore((state) => state);

  const [activeConversationIndex, setActiveConversationIndex] = useState(0);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
    }
    setUserDetails(null);
    setIsLoggedIn(false);
  }

  console.log({ conversations });

  useEffect(() => {
    if (userDetails) {
      validateAndFetchUserConversations({ userDetails, setIsValidationLoading, setIsValidationSuccess, setAllUsers, setConversations });
    }
  }, [userDetails]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      {isValidationLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size="lg" color="default" label="Loading..." />
        </div>
      ) : isValidationSuccess ? (
        <div>
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
            <ConversationThread {...{ userDetails, conversations, activeConversationIndex }} />
          </div>
        </div>
      ) : (
        <div className="text-white h-full flex justify-center items-center">Failed to login. Try again later.</div>
      )}
    </div>
  );
};

export default ChatApp;
