import axios from "axios";
import type { TAllUsers, TUserDetails } from "~/stores/chatapp.store";

export async function validateAndFetchUserMessages({
  userDetails,
  setIsValidationLoading,
  setIsValidationSuccess,
  setAllUsers,
  setMessages,
}: {
  userDetails: TUserDetails | null;
  setIsValidationLoading: (value: boolean) => void;
  setIsValidationSuccess: (value: boolean) => void;
  setAllUsers: (payload: TAllUsers) => void;
  setMessages: (payload: any[]) => void;
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

      console.log({ response });

      if (response.data.action === "validated") {
        setMessages(response.data.metaData.messages);
      }

      setAllUsers(response.data.metaData.users);
      setIsValidationSuccess(true);
    } catch (err: any) {
      console.log("Failed to get messages");
      setIsValidationSuccess(false);
    } finally {
      setIsValidationLoading(false);
    }
  }
}
