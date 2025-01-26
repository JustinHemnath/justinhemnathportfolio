import type { TConversation, TMessage } from "~/stores/chatapp.store";

export function receivedMessageHandler({
  receivedMessage,
  conversations,
  setConversations,
}: {
  receivedMessage: TMessage;
  conversations: TConversation[];
  setConversations: any;
}) {
  const targetConvoIndex = conversations.findIndex((convo: any) => convo.otherPersonEmail === receivedMessage.sender);
  let newConversations: TConversation[] = [...conversations];

  if (targetConvoIndex === -1) {
    const newConversationItem = {
      otherPersonEmail: receivedMessage.sender,
      otherPersonName: receivedMessage.sender_name,
      messages: [receivedMessage],
      lastMessage: receivedMessage,
    };
    newConversations.push(newConversationItem);
  } else {
    let targetConvo: TConversation = newConversations[targetConvoIndex];
    const messageAlreadyInserted = targetConvo.messages.find((message: TMessage) => message.id === receivedMessage.id);

    if (!messageAlreadyInserted) {
      targetConvo.messages.push(receivedMessage);
      targetConvo = {
        ...targetConvo,
        lastMessage: receivedMessage,
      };
      newConversations.splice(targetConvoIndex, 1, targetConvo);
    }
  }

  newConversations.sort((a, b) => {
    const aDate: any = new Date(a.lastMessage.sent_at);
    const bDate: any = new Date(b.lastMessage.sent_at);
    return bDate - aDate;
  });

  setConversations(newConversations);
  chatBottomScroller();
}

export function chatBottomScroller() {
  const scrollToBottomTimeout = setTimeout(function () {
    const bottomDiv = document.getElementById("conversationThreadBottomDiv")!;
    if (bottomDiv) {
      bottomDiv.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, 200);

  return scrollToBottomTimeout;
}
