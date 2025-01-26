import { chatBottomScroller } from "~/utils/chatApp.utils";
import { chatsMSGS } from "./test";
import moment from "moment";
import { Tooltip } from "@heroui/react";

const AllChatsSidebar = ({ userDetails, conversations, setCurrentConversation }: any) => {
  // console.log({ conversations });

  function handleConversationSelection(convo: any) {
    setCurrentConversation(convo);
    chatBottomScroller();
  }

  return (
    <div className="w-[25%] overflow-auto bg-neutral-900 text-white h-full">
      {conversations.length !== 0 ? (
        conversations.map((convo: any, index: number) => {
          const date = moment(convo.lastMessage.sent_at).format("hh:mm A");

          return (
            <Tooltip content={convo.otherPersonEmail} color="secondary" placement="right">
              <div
                className="flex flex-col border-b border-gray-500 px-2 py-3 hover:bg-slate-800"
                key={convo.otherPersonEmail}
                onClick={() => handleConversationSelection(convo)}
              >
                <div className="flex justify-between">
                  <p className="text-xl font-bold">{convo.otherPersonName}</p>
                  <p className="self-end text-sm font-bold">{date}</p>
                </div>
                <div className="text-lg flex gap-1 mt-3 ml-4 items-center">
                  <p className="font-bold">{convo.lastMessage.sender === userDetails.email ? "You:" : ""}</p>
                  <p>{convo.lastMessage.message.substring(0, 35)}</p>
                </div>
              </div>
            </Tooltip>
          );
        })
      ) : (
        <p className="text-slate-300 text-center p-4 text-lg">
          Start a new conversation with a user by clicking on the "Select user..." dropdown and selecting a user
        </p>
      )}
    </div>
  );
};

export default AllChatsSidebar;
