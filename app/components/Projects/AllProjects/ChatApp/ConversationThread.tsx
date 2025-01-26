import type { TUserDetails } from "~/stores/chatapp.store";
import { threadMSGS } from "./test";

const ConversationThread = ({
  userDetails,
  conversations,
  currentConversation,
}: {
  userDetails: TUserDetails | null;
  conversations: any[];
  currentConversation: any;
}) => {
  // console.log({ conversations });

  return (
    <div className="flex h-full w-full flex-[85%] flex-col gap-2 overflow-auto p-2 pb-10 relative" id="conversationThread">
      {userDetails && currentConversation ? (
        currentConversation.messages.map((message: any) => {
          const date = new Date(message.sent_at);
          return (
            <div
              className="funkyBg min-w-[7rem] max-w-[50%] rounded-xl p-2"
              style={{
                alignSelf: userDetails.email === message.sender ? "flex-end" : "flex-start",
              }}
              key={message.id}
            >
              <div className="flex justify-between gap-10">
                <div className="text-xl font-bold">{message.sender_name}</div>
                <div className="">{date.toLocaleTimeString("en-IN")}</div>
              </div>
              <div className="text-lg">{message.message}</div>
            </div>
          );
        })
      ) : (
        <div className="text-3xl h-full text-white flex justify-center items-center p-24">
          <p className="text-justify">No conversations. Select a user from the dropdown and send a message to begin a conversation.</p>
        </div>
      )}

      <div className="mt-auto text-white invisible" id="conversationThreadBottomDiv">
        T
      </div>
    </div>
  );
};
export default ConversationThread;
