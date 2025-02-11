import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GrGoogle } from "react-icons/gr";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ChatApp from "./ChatApp";
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
        <ChatApp
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
        className="absolute left-0 top-0 flex cursor-pointer items-center gap-4 rounded-lg bg-white p-2 text-black"
        onClick={() => setIndexSectionActive(true)}
      >
        <FaLongArrowAltLeft className="text-2xl" />
        <p className="text-xl font-bold">Back</p>
      </div>

      {/* sign in component */}
      <div className="flex flex-col rounded-xl px-24 py-20">
        <p className="funkyText text-[2.5rem] font-bold">Login required:</p>
        <motion.div
          className="mt-24 flex flex-col items-center"
          whileHover={{
            scale: 1.3,
          }}
        >
          <GrGoogle
            className="cursor-pointer text-[5rem] text-white transition-all duration-300"
            onClick={googleSignIn}
          />
        </motion.div>
      </div>
    </div>
  );
};
