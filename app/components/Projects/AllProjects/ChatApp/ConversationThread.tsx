import type { TUserDetails } from "~/stores/chatapp.store";
import moment from "moment";
import { motion } from "framer-motion";

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
    <div
      className="relative flex h-full w-full flex-[80%] flex-col gap-2 overflow-auto p-2 pb-10 2xl:flex-[85%]"
      id="conversationThread"
    >
      {userDetails && currentConversation ? (
        currentConversation.messages.map((message: any) => {
          const date = moment(message.sent_at).format("hh:mm A");

          return (
            <motion.div
              className="funkyBg min-w-[7rem] max-w-[50%] rounded-xl p-2 text-black"
              style={{
                alignSelf:
                  userDetails.email === message.sender
                    ? "flex-end"
                    : "flex-start",
              }}
              initial={{
                opacity: 0,
                y: 100,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                bounce: 0.25,
                duration: 0.5,
              }}
              key={message.id}
            >
              <div className="flex justify-between gap-10">
                <div className="text-lg font-bold 2xl:text-xl">
                  {message.sender_name}
                </div>
                <div className="text-sm 2xl:text-base">{date}</div>
              </div>
              <div className="text-md 2xl:text-xl">{message.message}</div>
            </motion.div>
          );
        })
      ) : (
        <div className="flex h-full items-center justify-center p-24 text-lg text-white 2xl:text-3xl">
          <p className="text-justify">
            No conversations. Select a user from the dropdown and send a message
            to begin a conversation.
          </p>
        </div>
      )}

      <div
        className="invisible mt-auto text-white"
        id="conversationThreadBottomDiv"
      >
        T
      </div>
    </div>
  );
};
export default ConversationThread;
