import { chatBottomScroller } from "~/utils/chatApp.utils";
import { chatsMSGS } from "./test";

const AllChatsSidebar = ({ conversations, setCurrentConversation }: any) => {
  console.log({ conversations });

  function handleConversationSelection(convo: any) {
    setCurrentConversation(convo);
    chatBottomScroller();
  }

  return (
    <div className="w-[25%] overflow-auto bg-neutral-900 text-white h-full">
      {conversations.length !== 0 ? (
        conversations.map((convo: any, index: number) => {
          const date = new Date(convo.lastMessage.sent_at);

          return (
            <div
              className="flex flex-col border-b border-gray-500 px-2 py-3 hover:bg-slate-800"
              key={convo.otherPersonEmail}
              onClick={() => handleConversationSelection(convo)}
            >
              <div className="flex justify-between">
                <p className="text-xl font-bold">{convo.otherPersonName}</p>
                <p className="self-end text-sm font-bold">{date.toLocaleTimeString("en-IN")}</p>
              </div>
              <p className="text-lg">{convo.lastMessage.message.substring(0, 35)}</p>
            </div>
          );
        })
      ) : (
        <p className="text-slate-300 text-center p-4 text-lg">
          Start a new conversation with a user by clicking on the "Select user..." dropdown and selecting a user
        </p>
      )}
      {/* // }) */}
      {/* // : null} */}
    </div>
  );
};

export default AllChatsSidebar;
