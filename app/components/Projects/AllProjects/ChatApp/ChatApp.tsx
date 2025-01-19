import AllChatsSidebar from "./AllChatsSidebar";
import ConversationThread from "./ConversationThread";

const ChatApp = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
      {/* header */}
      <div className="funkyBg flex flex-[5%] items-center justify-center py-2">
        Chat App
      </div>

      {/* chat section */}
      <div className="flex h-full flex-[95%]">
        <AllChatsSidebar />
        <ConversationThread />
      </div>
    </div>
  );
};

export default ChatApp;
