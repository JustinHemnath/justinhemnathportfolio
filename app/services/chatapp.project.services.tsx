import axios from "axios";
import type { TAllUsers, TUserDetails } from "~/stores/chatapp.store";

export async function validateAndFetchUserConversations({
  userDetails,
  setIsValidationLoading,
  setIsValidationSuccess,
  setAllUsers,
  setConversations,
  setCurrentConversation,
}: {
  userDetails: TUserDetails | null;
  setIsValidationLoading: (value: boolean) => void;
  setIsValidationSuccess: (value: boolean) => void;
  setAllUsers: (payload: TAllUsers) => void;
  setConversations: (payload: any[]) => void;
  setCurrentConversation: (payload: any) => void;
}) {
  setIsValidationLoading(true);

  if (!userDetails) {
    setIsValidationLoading(false);
    setIsValidationSuccess(false);
  } else {
    try {
      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_ENDPOINT + "/users/validateUser",
        data: {
          user: {
            name: userDetails.userName,
            email: userDetails.email,
          },
        },
      });

      if (response.data.action === "validated") {
        const conversationsResponse = response.data.metaData.conversations;
        setConversations(conversationsResponse);
        setCurrentConversation(conversationsResponse[0]);
      } else if (response.data.action === "registered") {
        setConversations([]);
        setCurrentConversation(null);
      }

      const allUsers = response.data.metaData.users.filter(
        (user: any) => user.email !== userDetails.email,
      );
      setAllUsers(allUsers);
      setIsValidationSuccess(true);
    } catch (err: any) {
      console.log("Failed to get messages");
      setIsValidationSuccess(false);
    } finally {
      setIsValidationLoading(false);
    }
  }
}
