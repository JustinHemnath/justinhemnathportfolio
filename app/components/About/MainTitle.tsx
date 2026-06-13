import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        }, 40);

        return () => clearTimeout(letterAdderTimeout);
      }
    }
  }, [feederString, isInView]);

  return (
    <motion.div
      className=""
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
      <motion.div className="flex gap-1 py-10">
        <p
          className={
            "funkyText text-justify text-[2rem] font-bold text-wrap lg:text-[2.5rem]"
          }
        >
          {feederString}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MainTitle;
