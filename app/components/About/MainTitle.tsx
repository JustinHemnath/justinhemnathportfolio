import { useEffect, useState } from "react";

const MainTitle = ({
  text,
  shouldAnimate,
}: {
  text: string;
  shouldAnimate: boolean;
}) => {
  const [feederString, setFeederString] = useState(shouldAnimate ? "" : text);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    } else {
      if (text.length === feederString.length) {
        return;
      } else {
        const letterAdderTimeout = setTimeout(() => {
          setFeederString((feederString: string) => {
            if (feederString.length === 0) {
              return text[0];
            } else {
              const index = feederString.length;
              const letterToAdd = text[index];

              return feederString + letterToAdd;
            }
          });
        }, 100);

        return () => clearTimeout(letterAdderTimeout);
      }
    }

    //   }, []);
  }, [feederString]);

  return (
    <div className="flex w-[50%] gap-1 py-10">
      <p
        className={
          "funkyText text-wrap font-bold " +
          (shouldAnimate ? " text-[4rem]" : " text-[2.5rem]")
        }
      >
        {feederString}
      </p>
    </div>
  );
};

export default MainTitle;
