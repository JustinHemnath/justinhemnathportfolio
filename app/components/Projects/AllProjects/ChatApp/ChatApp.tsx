import { USER_ACCESS_TOKEN_KEY, useSocketStore, type TMessage } from "~/stores/chatapp.store";
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
import { v4 as uuidv4 } from "uuid";
import { chatBottomScroller, receivedMessageHandler } from "~/utils/chatApp.utils";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@heroui/react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUserMessage, setNewUserMessage] = useState("");
  const [newUserSelected, setNewUserSelected] = useState<any>(null);

  function handleNewUserMessage(e: any, onClose: any, newUserMessage: string, newUserSelected: any) {
    e.preventDefault();

    const newConversations = [...conversations];
    const newMessage: TMessage = {
      sender: userDetails.email,
      receiver: newUserSelected.email,
      sender_name: userDetails.userName,
      receiver_name: newUserSelected.email,
      message: newUserMessage,
      id: uuidv4(),
      sent_at: moment().format(),
    };
    // emit message to server
    socket.emit(CHAT_APP_EVENTS.TO_SERVER, newMessage);

    const newConversationItem = {
      otherPersonEmail: newUserSelected.email,
      otherPersonName: newUserSelected.name,
      messages: [newMessage],
      lastMessage: newMessage,
    };
    newConversations.push(newConversationItem);
    newConversations.sort((a, b) => {
      const aDate: any = new Date(a.lastMessage.sent_at);
      const bDate: any = new Date(b.lastMessage.sent_at);
      return bDate - aDate;
    });

    setConversations(newConversations);

    // on close protocol
    onClose();
    setNewUserMessage("");
    setNewUserSelected(null);
    setCurrentConversation(newConversationItem);
  }

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
        receivedMessageHandler({ receivedMessage, conversations, setConversations })
      );

      return () =>
        socket.off(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage: TMessage) =>
          receivedMessageHandler({ receivedMessage, conversations, setConversations })
        );
    }
  }, [socket, conversations]);

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
              <NewUserSelect {...{ allUsers, conversations, setCurrentConversation, onOpen, setNewUserSelected }} />
            </div>

            <SlLogout className="cursor-pointer text-xl" onClick={handleLogout} />
          </div>

          {/* chat section */}
          <div className="flex h-full flex-[95%]">
            <AllChatsSidebar {...{ userDetails, conversations, setCurrentConversation }} />

            <div className="h-full w-full flex flex-col pb-6">
              <ConversationThread {...{ userDetails, conversations, currentConversation }} />
              <SendMessage {...{ socket, userDetails, conversations, setConversations, currentConversation }} />
            </div>

            <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-center">Start a conversation with {newUserSelected.name}!</ModalHeader>
                    <ModalBody className="text-xl">
                      <p>This will start a new conversation with {newUserSelected.name}</p>
                      <form
                        onSubmit={(e: any) => handleNewUserMessage(e, onClose, newUserMessage, newUserSelected)}
                        className="my-10 flex items-center gap-3"
                      >
                        <Input
                          label="Say a hi!"
                          type="text"
                          onChange={(e: any) => setNewUserMessage(e.target.value)}
                          value={newUserMessage}
                          isRequired
                        />
                        <Button className="" type="submit">
                          Send
                        </Button>
                      </form>
                      <p>{newUserSelected.name} will receive your message when they log in.</p>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="text-white h-full flex justify-center items-center">Failed to login. Try again later.</div>
      )}
    </div>
  );
};

export default ChatApp;
