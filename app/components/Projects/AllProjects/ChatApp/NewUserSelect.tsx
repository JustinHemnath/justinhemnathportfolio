import { Select, SelectItem } from "@heroui/react";
import type { TConversation } from "~/stores/chatapp.store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const NewUserSelect = ({
  allUsers,
  conversations,
  setCurrentConversation,
  onOpen,
  setNewUserSelected,
}: any) => {
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
    </div>
  );
};
export default NewUserSelect;
