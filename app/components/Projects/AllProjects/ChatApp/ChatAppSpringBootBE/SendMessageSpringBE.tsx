import { Button, Input } from "@heroui/react";
import { useCallback, useState, type SyntheticEvent } from "react";
import {
  CHAT_APP_EVENTS,
  CHAT_APP_SPRING_BE_EVENTS,
} from "~/constants/main.constants";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import type { TConversation, TMessage } from "~/stores/chatapp.store";
import { chatBottomScroller } from "~/utils/chatApp.utils";

const SendMessageSpringBE = ({
  userDetails,
  conversations,
  setConversations,
  currentConversation,
  setCurrentConversation,
  clientRef,
}: any) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(e: any) {
    const value = e.target.value;
    setMessage(value);
  }

  const handleSendMessage = useCallback(
    (e: any) => {
      e.preventDefault();

      if (message) {
        const messageToSend: TMessage = {
          sender: userDetails.email,
          receiver: currentConversation.otherPersonEmail,
          sender_name: userDetails.userName,
          receiver_name: currentConversation.otherPersonName,
          message,
          id: uuidv4(),
          sent_at: moment().format(),
        };

        console.log({
          messageToSend,
          currentConversation,
          userDetails,
        });

        // send message to server using stompClient.publish
        clientRef?.current.publish({
          destination: CHAT_APP_SPRING_BE_EVENTS.POST_MESSAGE,
          body: JSON.stringify(messageToSend),
        });

        // insert newly sent message into local conversations store
        const targetConvoIndex = conversations.findIndex(
          (convo: TConversation) =>
            convo.otherPersonEmail === messageToSend.receiver,
        );
        let newConversations: TConversation[] = [...conversations];
        let targetConvo: TConversation;

        if (targetConvoIndex === -1) {
          targetConvo = {
            otherPersonEmail: messageToSend.receiver,
            otherPersonName: messageToSend.receiver_name,
            messages: [messageToSend],
            lastMessage: messageToSend,
          };
        } else {
          targetConvo = newConversations[targetConvoIndex];
          targetConvo.messages.push(messageToSend);
          targetConvo = {
            ...targetConvo,
            lastMessage: messageToSend,
          };
          newConversations.splice(targetConvoIndex, 1, targetConvo);
        }

        setConversations(newConversations);
        setCurrentConversation(targetConvo);
        setMessage("");

        console.log("Emitted message");
        chatBottomScroller();

        // focus button on button send
        const sendbtn = document.getElementById("sendMessageinput");
        if (sendbtn) sendbtn.focus();
      }
    },
    [message, currentConversation, conversations],
  );

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-[20%] items-center gap-2 2xl:flex-[15%]"
    >
      <input
        type="text"
        onChange={handleMessageChange}
        value={message}
        id="sendMessageinput"
        placeholder="Enter message..."
        className="w-full rounded-lg bg-white px-1 py-4 text-base text-black 2xl:text-xl"
      />

      <Button
        className="bg-white text-base text-[funkyText] 2xl:text-xl"
        type="submit"
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessageSpringBE;
