import { chatBottomScroller } from "~/utils/chatApp.utils";
import moment from "moment";
import { Tooltip } from "@heroui/react";

const AllChatsSidebar = ({
  userDetails,
  conversations,
  setCurrentConversation,
}: any) => {
  // console.log({ conversations });

  function handleConversationSelection(convo: any) {
    setCurrentConversation(convo);
    chatBottomScroller();
  }

  return (
    <div className="h-full w-[25%] overflow-auto bg-neutral-900 text-white">
      {conversations.length !== 0 ? (
        conversations.map((convo: any, index: number) => {
          const date = moment(convo.lastMessage.sent_at).format("hh:mm A");

          return (
            <Tooltip
              content={convo.otherPersonEmail}
              color="secondary"
              placement="right"
              key={convo.otherPersonEmail}
            >
              <div
                className="flex flex-col border-b border-gray-500 px-2 py-3 hover:bg-slate-800"
                onClick={() => handleConversationSelection(convo)}
              >
                <div className="flex justify-between">
                  <p className="text-2xl font-bold">{convo.otherPersonName}</p>
                  <p className="self-end text-sm font-bold">{date}</p>
                </div>
                <div className="ml-1 mt-3 flex items-center gap-1 text-lg">
                  <p className="font-bold">
                    {convo.lastMessage.sender === userDetails.email
                      ? "You:"
                      : ""}
                  </p>
                  <p>{convo.lastMessage.message.substring(0, 35)}</p>
                </div>
              </div>
            </Tooltip>
          );
        })
      ) : (
        <p className="p-4 text-center text-lg text-slate-300">
          Start a new conversation with a user by clicking on the search user
          icon or the add new user icon
        </p>
      )}
    </div>
  );
};

export default AllChatsSidebar;
