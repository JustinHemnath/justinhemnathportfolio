import { Button, Input } from "@heroui/react";
import { useCallback, useState, type SyntheticEvent } from "react";
import { CHAT_APP_EVENTS } from "~/constants/main.constants";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import type { TConversation, TMessage } from "~/stores/chatapp.store";
import { chatBottomScroller } from "~/utils/chatApp.utils";

const SendMessage = ({
  socket,
  userDetails,
  conversations,
  setConversations,
  currentConversation,
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

        // send message to server using socket emit
        socket.emit(CHAT_APP_EVENTS.TO_SERVER, messageToSend);

        // insert newly sent message into local conversations store
        const targetConvoIndex = conversations.findIndex(
          (convo: TConversation) =>
            convo.otherPersonEmail === messageToSend.receiver,
        );
        let newConversations: TConversation[] = [...conversations];

        if (targetConvoIndex === -1) {
        } else {
          let targetConvo: TConversation = newConversations[targetConvoIndex];
          targetConvo.messages.push(messageToSend);
          targetConvo = {
            ...targetConvo,
            lastMessage: messageToSend,
          };
          newConversations.splice(targetConvoIndex, 1, targetConvo);
        }

        setConversations(newConversations);
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

export default SendMessage;
