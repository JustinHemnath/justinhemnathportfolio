import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { LEAD_DEV_EMAIL } from "~/constants/main.constants";

const ChatAppEmail = ({
  email,
  textStyle = " text-sm sm:text-lg",
}: {
  email: string;
  textStyle?: string;
}) => {
  //
  //
  const formattedEmail = useMemo(() => {
    if (!email) return "user@email.com";

    if (LEAD_DEV_EMAIL === email) {
      return email;
    } else {
      let splitMail = email.split("@");
      let beforeAtName = splitMail?.[0] || "user";

      const divisor = Math.round(beforeAtName.length / 2);

      let encodedName = "";
      for (let i = 0; i < beforeAtName.length; i++) {
        if (i < divisor) {
          encodedName += beforeAtName[i];
        } else {
          encodedName += "*";
        }
      }

      return encodedName + "@" + splitMail[1];
    }
  }, [email]);

  return (
    <p className={twMerge("text-zinc-500", textStyle)}>{formattedEmail}</p>
  );
};

export default ChatAppEmail;
