import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";

const ADDITIONAL_INFO = [
  {
    title: "Email",
    description: "justin.hemnath.96@gmail.com",
  },
  {
    title: "Skills",
    description:
      "ReactJS, NodeJS, Python, MySQL, MongoDB, Postgresql, TailwindCSS, Pandas",
  },
  {
    title: "Years of experience",
    description: "2.5 yrs",
  },
  {
    title: "Location",
    description: "Mandaveli, Chennai",
  },
  {
    title: "Languages known",
    description: "English, tamil, telugu",
  },
  {
    title: "Qualification",
    description:
      "B.E Electrical and Electronics Engineering, MNM Jain Engineering College, 2018",
  },
  {
    title: "Year of graduation",
    description: "2018",
  },
];

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
        }, 100);

        return () => clearTimeout(letterAdderTimeout);
      }
    }

    //   }, []);
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
            "funkyText text-wrap font-bold " +
            (shouldAnimate
              ? " text-[2.7rem] 2xl:text-[3.3rem]"
              : " text-justify text-[1.7rem] 2xl:text-[2.5rem]")
          }
        >
          {feederString}
        </p>
      </motion.div>
      {!shouldAnimate ? (
        <>
          <Button
            color="secondary"
            variant="solid"
            className="text-xl text-black"
            onPress={onOpen}
          >
            More info -{">"}
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="5xl"
            className=""
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-3xl underline">
                    Additional info
                  </ModalHeader>
                  <ModalBody className="flex flex-col gap-10">
                    {ADDITIONAL_INFO.map((info: any) => (
                      <div className="flex text-2xl">
                        <p className="mr-4 font-bold">{info.title}: </p>
                        <p className="">{info.description}</p>
                      </div>
                    ))}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </motion.div>
  );
};

export default MainTitle;
