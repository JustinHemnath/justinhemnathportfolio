import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GrGoogle } from "react-icons/gr";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ChatApp_SpringBootBE from "./ChatApp_SpringBootBE";
import { getLocalStorageItem, setLocalStorageItem } from "~/utils/signin.utils";
import {
  useChatAppStore,
  USER_ACCESS_TOKEN_KEY,
  type TUserDetails,
} from "~/stores/chatapp.store";
import { validateAndFetchUserConversations } from "~/services/chatapp.project.services";

const FullStackChatApp = ({ setIndexSectionActive }: any) => {
  const provider = new GoogleAuthProvider();
  const {
    userDetails,
    setUserDetails,
    isValidationLoading,
    isValidationSuccess,
    setIsValidationLoading,
    setIsValidationSuccess,
    setAllUsers,
    setConversations,
    allUsers,
    conversations,
    socketReceivedMessageHandler,
  } = useChatAppStore((state) => state);

  const [isLoggedIn, setIsLoggedIn] = useState(userDetails ? true : false);
  const [currentConversation, setCurrentConversation] = useState(null);

  async function googleSignIn() {
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user: any = result.user;
      const userPayload: TUserDetails = {
        userName: user.displayName,
        email: user.email,
        createdAt: user.metadata.createdAt,
      };
      setUserDetails(userPayload);
      setLocalStorageItem({
        key: USER_ACCESS_TOKEN_KEY,
        value: JSON.stringify(userPayload),
      });
      setIsLoggedIn(true);
      validateAndFetchUserConversations({
        userDetails: userPayload,
        setIsValidationLoading,
        setIsValidationSuccess,
        setAllUsers,
        setConversations,
        setCurrentConversation,
      });
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  }

  useEffect(() => {
    if (!userDetails) {
      let user: any = getLocalStorageItem({ key: USER_ACCESS_TOKEN_KEY });
      if (user) {
        setIsLoggedIn(true);
        user = JSON.parse(user);
      } else {
        setIsLoggedIn(false);
      }

      setUserDetails(user);
      validateAndFetchUserConversations({
        userDetails: user,
        setIsValidationLoading,
        setIsValidationSuccess,
        setAllUsers,
        setConversations,
        setCurrentConversation,
      });
    }
  }, [userDetails]);

  return (
    <div className="relative flex h-full items-center justify-center">
      {!isLoggedIn ? (
        <SignInPage {...{ googleSignIn, setIndexSectionActive }} />
      ) : (
        <ChatApp_SpringBootBE
          {...{
            setIsLoggedIn,
            setIndexSectionActive,
            userDetails,
            setUserDetails,
            isValidationLoading,
            isValidationSuccess,
            allUsers,
            conversations,
            setConversations,
            currentConversation,
            setCurrentConversation,
            socketReceivedMessageHandler,
          }}
        />
      )}
    </div>
  );
};

export default FullStackChatApp;

const SignInPage = ({ googleSignIn, setIndexSectionActive }: any) => {
  return (
    <div className="">
      {/* back button */}
      <div
        className="absolute top-5 left-5 flex cursor-pointer items-center gap-4 rounded-3xl bg-white p-2 px-4 text-black"
        onClick={() => setIndexSectionActive(true)}
      >
        <FaLongArrowAltLeft className="text-2xl" />
        <p className="text-xl font-bold">Back</p>
      </div>

      {/* sign in component */}
      <div className="flex flex-col rounded-xl px-24 py-20">
        <p className="funkyText text-[2.5rem] font-bold">Login required</p>
        <motion.div
          className="mt-10 flex cursor-pointer flex-col items-center rounded-3xl bg-gradient-to-r from-blue-600 via-blue-300 to-blue-600 p-4"
          style={{
            boxShadow: "0 0 13px 1px lightgray",
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-lg">Login using google account</p>

            <div className="rounded-full bg-zinc-300 p-3">
              <GrGoogle
                className="cursor-pointer text-4xl text-blue-700 transition-all duration-300"
                onClick={googleSignIn}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
