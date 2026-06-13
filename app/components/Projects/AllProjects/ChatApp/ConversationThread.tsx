import type { TUserDetails } from "~/stores/chatapp.store";
import moment from "moment";
import { motion } from "framer-motion";
import { STYLE } from "~/constants/main.constants";

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
      className="relative flex h-[95%] w-full flex-col gap-2 overflow-auto px-2 py-4"
      id="conversationThread"
      style={{
        paddingBottom: STYLE.INPUT_HEIGHT,
      }}
    >
      {userDetails && currentConversation ? (
        currentConversation.messages.map((message: any) => {
          const date = moment(message.sent_at).format("hh:mm A");

          return (
            <motion.div
              className="funkyBg max-w-[50%] min-w-[7rem] rounded-xl p-2 text-black"
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
              <div className="flex justify-between gap-10 text-white">
                <div className="text-base font-semibold 2xl:text-lg">
                  {message.sender_name}
                </div>
                <div className="text-sm 2xl:text-base">{date}</div>
              </div>
              <div className="text-lg text-white 2xl:text-lg">
                {message.message}
              </div>
            </motion.div>
          );
        })
      ) : (
        <div className="flex h-full items-center justify-center p-24 text-lg text-white 2xl:text-xl">
          <p className="text-justify">
            {conversations.length === 0
              ? `No conversations. Choose a user to begin a conversation with.`
              : `Select a conversation to begin chatting`}
          </p>
        </div>
      )}
    </div>
  );
};
export default ConversationThread;
