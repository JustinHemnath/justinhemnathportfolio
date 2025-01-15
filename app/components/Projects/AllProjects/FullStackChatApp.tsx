import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GrGoogle } from "react-icons/gr";
import { FaLongArrowAltLeft } from "react-icons/fa";

const FullStackChatApp = ({ setIndexSectionActive }: any) => {
  const provider = new GoogleAuthProvider();

  async function googleSignIn() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log({ token, user });

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="relative flex h-full items-center justify-center">
      {/* back button */}
      <div className="absolute left-0 top-0 flex items-center gap-4 rounded-full bg-white p-4 text-black">
        <FaLongArrowAltLeft className="text-4xl" />
        <p className="text-2xl font-bold">Back</p>
      </div>

      {/* sign in component */}
      <div className="flex flex-col rounded-xl bg-slate-400 px-24 py-20">
        <p className="funkyText text-[3rem] font-bold">Sign in using</p>
        <div className="mt-24 flex flex-col items-center">
          <GrGoogle
            className="cursor-pointer text-5xl text-white transition-all duration-300 hover:text-[5rem]"
            onClick={googleSignIn}
          />
        </div>
      </div>
    </div>
  );
};

export default FullStackChatApp;
