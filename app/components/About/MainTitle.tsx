import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MainTitle = ({
  text,
  shouldAnimate,
  isInView,
  delayFactor,
}: {
  text: string;
  shouldAnimate: boolean;
  isInView: boolean;
  delayFactor: number;
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
    <motion.div
      className="flex gap-1 py-10"
      initial={{
        // y: shouldAnimate ? 0 : 100,
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
        delay: 0.3 * delayFactor,
      }}
    >
      <p
        className={
          "funkyText text-wrap font-bold " +
          (shouldAnimate
            ? " text-[3rem] 2xl:text-[4rem]"
            : " text-justify text-[2rem] 2xl:text-[2.5rem]")
        }
      >
        {feederString}
      </p>
    </motion.div>
  );
};

export default MainTitle;
