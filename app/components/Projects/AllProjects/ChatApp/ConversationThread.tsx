import type { TUserDetails } from "~/stores/chatapp.store";
import { threadMSGS } from "./test";

const ConversationThread = ({
  userDetails,
  conversations,
  activeConversationIndex,
}: {
  userDetails: TUserDetails | null;
  conversations: any[];
  activeConversationIndex: any;
}) => {
  console.log({ conversations });

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2 pb-10">
      {userDetails ? (
        conversations[activeConversationIndex].messages.map((message: any) => {
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
        <div>No convo</div>
      )}
    </div>
  );
};
export default ConversationThread;
