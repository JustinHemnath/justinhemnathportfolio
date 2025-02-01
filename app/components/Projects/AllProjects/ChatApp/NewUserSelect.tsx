import { Select, SelectItem } from "@heroui/react";
import type { TConversation, TMessage } from "~/stores/chatapp.store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@heroui/react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { CHAT_APP_EVENTS } from "~/constants/main.constants";
import { useState } from "react";

const NewUserSelect = ({
  allUsers,
  conversations,
  setConversations,
  setCurrentConversation,
  userDetails,
  socket,
}: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newUserSelected, setNewUserSelected] = useState<any>(null);
  const [newUserMessage, setNewUserMessage] = useState("");

  function handleUserSelected(selectedUserEmail: string) {
    const matchingConvo = conversations.find(
      (convo: TConversation) => convo.otherPersonEmail === selectedUserEmail,
    );

    if (matchingConvo) {
      setCurrentConversation(matchingConvo);
    } else {
      const selectedUser = allUsers.find(
        (user: any) => user.email === selectedUserEmail,
      );
      setNewUserSelected({
        email: selectedUser.email,
        name: selectedUser.name,
      });
      onOpen();
    }
  }

  function handleNewUserMessage(
    e: any,
    onClose: any,
    newUserMessage: string,
    newUserSelected: any,
  ) {
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

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="flat" className="!p-1">
            <FaMagnifyingGlass className="text-white" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="single"
          onSelectionChange={({ currentKey }: any) =>
            handleUserSelected(currentKey)
          }
        >
          {allUsers.map((user: any) => (
            <DropdownItem key={user.email}>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">{user.name}</p>
                <p className="text-base">{user.email}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Start a conversation with {newUserSelected.name}!
              </ModalHeader>
              <ModalBody className="text-xl">
                <p>
                  This will start a new conversation with {newUserSelected.name}
                </p>
                <form
                  onSubmit={(e: any) =>
                    handleNewUserMessage(
                      e,
                      onClose,
                      newUserMessage,
                      newUserSelected,
                    )
                  }
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
                <p>
                  {newUserSelected.name} will receive your message when they log
                  in.
                </p>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
export default NewUserSelect;
