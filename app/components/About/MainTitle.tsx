import { useEffect, useState } from "react";
import AnimatedCursor from "./AnimatedCursor";

const MainTitle = () => {
  const mainTitle = "I'm Hemnath Balasubramanian";
  const [feederString, setFeederString] = useState("");

  useEffect(() => {
    if (mainTitle.length === feederString.length) {
      return;
    } else {
      const letterAdderTimeout = setTimeout(() => {
        setFeederString((feederString: string) => {
          if (feederString.length === 0) {
            return mainTitle[0];
          } else {
            const index = feederString.length;
            const letterToAdd = mainTitle[index];

            return feederString + letterToAdd;
          }
        });
      }, 100);

      return () => clearTimeout(letterAdderTimeout);
    }

    //   }, []);
  }, [feederString]);

  return (
    <div className="flex gap-1 text-5xl">
      <p className="feederString flex w-[30%] flex-wrap items-start justify-start">
        <span>{feederString}</span>
        <AnimatedCursor />
      </p>
    </div>
  );
};

export default MainTitle;
