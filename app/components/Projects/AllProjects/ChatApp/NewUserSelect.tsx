import { Select, SelectItem } from "@heroui/react";

const NewUserSelect = ({ allUsers }: any) => {
  return (
    <div>
      <Select className="w-[25rem]" label="Select user..." placeholder="Select user..." size="sm">
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
