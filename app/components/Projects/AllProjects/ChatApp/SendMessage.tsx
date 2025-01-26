import { Button, Input } from "@heroui/react";
import { useCallback, useState, type SyntheticEvent } from "react";
import { CHAT_APP_EVENTS } from "~/constants/main.constants";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const SendMessage = ({ socket, userDetails, conversations, currentConversation }: any) => {
  const [message, setMessage] = useState("");

  function handleMessageChange(e: any) {
    const value = e.target.value;
    setMessage(value);
  }

  const handleSend = useCallback(
    (message: string) => {
      const payload = {
        sender: userDetails.email,
        receiver: currentConversation.otherPersonEmail,
        sender_name: userDetails.userName,
        receiver_name: currentConversation.otherPersonName,
        message,
        id: uuidv4(),
        sent_at: moment().format(),
      };
      socket.emit(CHAT_APP_EVENTS.TO_SERVER, payload);
      setMessage("");
      console.log("Emitted message");
    },
    [message, currentConversation, conversations]
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
