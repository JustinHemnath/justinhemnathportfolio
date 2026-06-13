import {
  USER_ACCESS_TOKEN_KEY,
  useSocketStore,
  type TMessage,
} from "~/stores/chatapp.store";
import AllChatsSidebar from "./AllChatsSidebar";
import ConversationThread from "./ConversationThread";
import { SlLogout } from "react-icons/sl";
import { Spinner } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import NewUserSelect from "./NewUserSelect";
import SendMessageSpringBE from "./ChatAppSpringBootBE/SendMessageSpringBE";
import {
  CHAT_APP_EVENTS,
  CHAT_APP_SPRING_BE_EVENTS,
  ENVIRONMENT,
} from "~/constants/main.constants";
import { io } from "socket.io-client";
import moment from "moment";
import {
  chatBottomScroller,
  receivedMessageHandler,
} from "~/utils/chatApp.utils";
import { Tooltip, Avatar } from "@heroui/react";
import { Client } from "@stomp/stompjs";

const ChatApp_SpringBootBE = ({
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
  socketReceivedMessageHandler,
}: any) => {
  const clientRef = useRef<any>(null);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_ACCESS_TOKEN_KEY);
    }
    setUserDetails(null);
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: `ws://${import.meta.env.VITE_SOCKET_ENDPOINT}/chatAppSocket`,
      connectHeaders: {
        email: userDetails?.email,
      },
      onConnect: (frame) => {
        console.log("Connected: " + frame);

        stompClient.subscribe(
          CHAT_APP_SPRING_BE_EVENTS.LISTEN_MESSAGE,
          (response: any) => {
            console.log(JSON.parse(response.body));
            const receivedMessage = JSON.parse(response.body);
            socketReceivedMessageHandler(receivedMessage);
            chatBottomScroller();
          },
        );
      },
      onWebSocketError: (error) => {
        console.error("Error with websocket", error);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    // stompClient.activate();
    clientRef.current = stompClient;
    // stompClient.activate();
    clientRef.current.activate();
    const scrollToBottomTimeout = chatBottomScroller();

    return () => {
      stompClient.deactivate();
    };
  }, [userDetails]);

  //   useEffect(() => {
  //     const socketInstance: any = io(import.meta.env.VITE_ENDPOINT, {
  //       query: {
  //         email: userDetails.email,
  //       },
  //     });
  //     setSocket(socketInstance);

  //     socketInstance.on("connect", () => {
  //       console.log(`Socket connected: ${socketInstance.connected}`);
  //     });

  //     const scrollToBottomTimeout = chatBottomScroller();

  //     return () => {
  //       clearTimeout(scrollToBottomTimeout);
  //       if (socketInstance) {
  //         socketInstance.disconnect();
  //         setSocket(null);
  //       }
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (socket) {
  //       // console.log("TRIGGERED");
  //       socket.on(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage: TMessage) =>
  //         receivedMessageHandler({
  //           receivedMessage,
  //           conversations,
  //           setConversations,
  //         }),
  //       );

  //       return () =>
  //         socket.off(CHAT_APP_EVENTS.TO_CLIENT, (receivedMessage: TMessage) =>
  //           receivedMessageHandler({
  //             receivedMessage,
  //             conversations,
  //             setConversations,
  //           }),
  //         );
  //     }
  //   }, [socket, conversations]);

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
        <div className="flex h-full flex-col">
          {/* header */}
          <div className="funkyBg relative flex h-[8%] items-center justify-center overflow-hidden">
            <div
              className="absolute left-4 flex cursor-pointer items-center gap-3"
              onClick={() => setIndexSectionActive(true)}
            >
              <FaLongArrowAltLeft className="text-2xl" />
              <p className="text-xl font-bold">Back</p>
            </div>

            <div className="my-2 flex w-[60%] items-center justify-center gap-2 2xl:w-[30%]">
              <div className="flex flex-col items-center justify-center text-2xl">
                {!currentConversation ? (
                  <p className="font-extrabold">Chat App</p>
                ) : (
                  <div className="flex items-center justify-center gap-3 rounded-full bg-white pr-6 pl-3">
                    <Avatar className="bg-zinc-700 text-zinc-200" />
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold 2xl:text-xl">
                        {currentConversation.otherPersonName}
                      </p>
                      {import.meta.env.VITE_ENVIRONMENT === ENVIRONMENT.DEV ? (
                        <p className="text-sm text-zinc-500 2xl:text-lg">
                          {currentConversation.otherPersonEmail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              {/* <NewUserSelect
                {...{
                  allUsers,
                  conversations,
                  setConversations,
                  setCurrentConversation,
                  userDetails,
                  socket,
                }}
              /> */}
            </div>

            <div className="absolute right-0 flex items-center gap-3 rounded-l-full bg-white px-3 py-0.5">
              <div className="flex items-center justify-center gap-3">
                <Avatar className="bg-zinc-700 text-zinc-200" />
                <div className="flex flex-col">
                  <p className="text-base font-semibold 2xl:text-lg">
                    {userDetails.userName}
                  </p>
                  <p className="text-sm text-zinc-500 2xl:text-base">
                    {userDetails.email}
                  </p>
                </div>
              </div>

              <Tooltip content={"Logout"} color="default" placement="bottom">
                <div className="h-full rounded-3xl bg-zinc-500 px-3 py-3 pr-4">
                  <SlLogout
                    className="cursor-pointer text-2xl text-white"
                    onClick={handleLogout}
                  />
                </div>
              </Tooltip>
            </div>
          </div>

          {/* chat section */}
          <div className="flex h-[92%]">
            <AllChatsSidebar
              {...{
                userDetails,
                conversations,
                setCurrentConversation,
              }}
            />

            <div className="relative flex h-full w-full flex-col">
              <ConversationThread
                {...{ userDetails, conversations, currentConversation }}
              />
              <SendMessageSpringBE
                {...{
                  userDetails,
                  conversations,
                  setConversations,
                  currentConversation,
                  setCurrentConversation,
                  clientRef,
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

export default ChatApp_SpringBootBE;
