import { threadMSGS } from "./test";

const ConversationThread = () => {
  const user = "Hemnath";

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2 pb-10">
      {threadMSGS.map((msgItem: any) => (
        <div
          className="funkyBg min-w-[7rem] max-w-[50%] rounded-xl p-2"
          style={{
            alignSelf: user === msgItem.sender ? "flex-end" : "flex-start",
          }}
        >
          <div className="flex justify-between gap-10">
            <div className="text-xl font-bold">{msgItem.sender}</div>
            <div className="">{msgItem.sentAt}</div>
          </div>
          <div className="text-lg">{msgItem.msg}</div>
        </div>
      ))}
    </div>
  );
};
export default ConversationThread;
