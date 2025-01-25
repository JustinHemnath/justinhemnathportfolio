import { Button, Input } from "@heroui/react";
import { useCallback, useState, type SyntheticEvent } from "react";
import { CHAT_APP_EVENTS } from "~/constants/main.constants";

const SendMessage = ({ socket, userDetails, conversations, activeConversationIndex }: any) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(e: any) {
    const value = e.target.value;
    setMessage(value);
  }

  const handleSend = useCallback(
    (message: string) => {
      const payload = {
        sender: userDetails.email,
        receiver: conversations[activeConversationIndex].otherPersonEmail,
        sender_name: userDetails.userName,
        receiver_name: conversations[activeConversationIndex].otherPersonName,
        message,
      };
      socket.emit(CHAT_APP_EVENTS.MESSAGE_LISTENER, payload);
      setMessage("");
      console.log("Emitted message");
    },
    [message, activeConversationIndex, conversations]
  );

  return (
    <div className="flex flex-[15%] items-center gap-2">
      <Input
        key={"inside"}
        description={"inside"}
        label="Message"
        labelPlacement={"inside"}
        type="text"
        onChange={handleMessageChange}
        value={message}
      />
      <Button className="bg-white text-[funkyText] mb-10" onPress={() => handleSend(message)}>
        Send
      </Button>
    </div>
  );
};

export default SendMessage;
