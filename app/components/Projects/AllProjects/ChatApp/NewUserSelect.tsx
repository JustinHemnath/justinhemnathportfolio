import { Select, SelectItem } from "@heroui/react";
import type { TConversation } from "~/stores/chatapp.store";

const NewUserSelect = ({ allUsers, conversations, setCurrentConversation, onOpen, setNewUserSelected }: any) => {
  function handleUserSelected(args: any) {
    const selectedUserEmail = args.anchorKey;

    const matchingConvo = conversations.find((convo: TConversation) => convo.otherPersonEmail === selectedUserEmail);

    if (matchingConvo) {
      setCurrentConversation(matchingConvo);
    } else {
      const selectedUser = allUsers.find((user: any) => user.email === selectedUserEmail);
      setNewUserSelected({
        email: selectedUser.email,
        name: selectedUser.name,
      });
      onOpen();
    }
  }

  return (
    <div>
      <Select
        className="w-[25rem]"
        label="Select user..."
        placeholder="Select user..."
        size="sm"
        onSelectionChange={(args) => handleUserSelected(args)}
      >
        {allUsers.map((user: any) => (
          <SelectItem key={user.email}>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-base">{user.email}</p>
            </div>
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
export default NewUserSelect;
