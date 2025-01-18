import { chatsMSGS } from "./test";

const AllChatsSidebar = () => {
  return (
    <div className="w-[25%] overflow-auto bg-neutral-900">
      {chatsMSGS.map((chatItem: any) => (
        <div
          className="flex flex-col border-b border-gray-500 px-2 py-3"
          key={chatItem.name}
        >
          <div className="flex justify-between">
            <p className="text-xl font-bold">{chatItem.name}</p>
            <p className="self-end text-sm font-bold">{chatItem.lastSent}</p>
          </div>
          <p className="text-lg">{chatItem.latestText.substring(0, 35)}</p>
        </div>
      ))}
    </div>
  );
};

export default AllChatsSidebar;
