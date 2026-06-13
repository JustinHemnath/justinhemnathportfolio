import { chatBottomScroller } from "~/utils/chatApp.utils";
import moment from "moment";
import { Tooltip } from "@heroui/react";
import { ENVIRONMENT, LEAD_DEV_EMAIL } from "~/constants/main.constants";
import ChatAppEmail from "./ChatAppEmail";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "motion/react";

const AllChatsSidebar = ({
  userDetails,
  conversations,
  setCurrentConversation,
}: any) => {
  // console.log({ conversations });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleConversationSelection(convo: any) {
    setCurrentConversation(convo);
    chatBottomScroller();
  }

  const nameSpliceLength = 20;

  return (
    <>
      <motion.div
        className={twMerge(
          "relative h-full w-[25%] overflow-auto bg-neutral-900 text-white sm:block",
        )}
        animate={{
          width: sidebarOpen ? "35%" : "10%",
        }}
      >
        {conversations.length !== 0 ? (
          conversations.map((convo: any, index: number) => {
            const date = moment(convo.lastMessage.sent_at).format("hh:mm A");

            return (
              <Tooltip
                content={<ChatAppEmail email={convo.otherPersonEmail} />}
                color="secondary"
                placement="right"
                key={convo.otherPersonEmail}
                isDisabled={
                  import.meta.env.VITE_ENVIRONMENT === ENVIRONMENT.DEV
                }
              >
                <div
                  className="flex flex-col border-b border-gray-500 px-2 py-3 hover:bg-slate-800"
                  onClick={() => handleConversationSelection(convo)}
                >
                  <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                    <p className="text-base font-medium 2xl:text-xl">
                      {convo.otherPersonName.substring(0, nameSpliceLength)}
                      {convo.otherPersonName.length >= nameSpliceLength
                        ? "..."
                        : ""}
                    </p>
                    <p className="text-xs 2xl:text-sm">{date}</p>
                  </div>
                  <div className="mt-3 flex flex-col items-start gap-1 text-sm sm:flex-row sm:items-center 2xl:text-lg">
                    <p className="">
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
          <p className="p-4 text-center text-sm text-slate-300 2xl:text-lg">
            Start a new conversation with a user by clicking on the search user
            icon or the add new user icon
          </p>
        )}

        <FaArrowAltCircleLeft
          className={twMerge(
            "absolute top-1/2 right-0 bottom-1/2 text-3xl transition-all duration-300 sm:hidden",
            sidebarOpen ? " " : "rotate-180",
          )}
          onClick={() => setSidebarOpen((prevState) => !prevState)}
        />
      </motion.div>
    </>
  );
};

export default AllChatsSidebar;
