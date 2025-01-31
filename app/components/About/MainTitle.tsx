import { useEffect, useState } from "react";

const MainTitle = ({
  text,
  shouldAnimate,
  isInView,
}: {
  text: string;
  shouldAnimate: boolean;
  isInView: boolean;
}) => {
  const [feederString, setFeederString] = useState(shouldAnimate ? "" : text);

  useEffect(() => {
    if (!shouldAnimate || !isInView) {
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
  }, [feederString, isInView]);

  return (
    <div className="flex gap-1 py-10">
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
