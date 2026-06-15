import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import MainTitle from "./MainTitle";
import { SECTIONS } from "~/constants/main.constants";
import SkillGraph from "./SkillGraph";
import { Avatar, Chip } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";
import Contact from "../Contact/Contact";
import image from "~/components/Projects/AllProjects/ChatApp/image_1.jpg";
import SkillProgress from "./SkillProgress";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import { motion } from "motion/react";
import TechnicalExperience from "./TechnicalExperience";

const About = ({
  setPageInView,
  experienceYears,
}: {
  setPageInView: any;
  experienceYears: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const mainTitle = `Hello! I'm Hemnath Balasubramanian. A full stack web developer from Chennai, Tamilnadu, IN, with ${experienceYears} years of experience in the web development field.`;
  const bottomTitle = `A full stack web developer with ${experienceYears} years of experience with ReactJs on the frontend and NodeJs and Python on the backend.`;
  const sectionName = SECTIONS.ABOUT;
  const skillGraphContainerRef = useRef(null);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div className="flex h-full flex-col" ref={ref} id={sectionName}>
      <div className="flex h-full flex-col lg:flex-row">
        <div className="flex h-full w-full flex-col justify-evenly gap-3 px-4 py-4 lg:w-[50%] lg:justify-evenly xl:px-24">
          <div className="lg:h-[30%]">
            <MainTitle
              text={mainTitle}
              shouldAnimate={true}
              delayFactor={1}
              {...{ isInView }}
            />
          </div>

          <div className="flex flex-col items-center justify-around gap-10 lg:h-[40%] lg:flex-row">
            <Avatar
              src={image}
              size="lg"
              className="h-[10em] w-[10em] lg:h-[15em] lg:w-[15em]"
            />
            <Contact />
          </div>

          <div className="flex items-center justify-center lg:h-[10%]">
            <motion.div
              className="flex cursor-pointer items-center justify-between gap-2 rounded-full border border-indigo-700 bg-transparent bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700 px-4 py-6 text-lg font-bold text-white lg:gap-4 lg:rounded-4xl lg:px-10 lg:py-10 lg:text-2xl"
              onClick={() => onOpen()}
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                scale: {
                  duration: 0.3,
                },
              }}
            >
              <p>Reveal technical experience and resume</p>
              <IoMdArrowDroprightCircle className="text-4xl" />
            </motion.div>
          </div>
        </div>

        <div
          className="hidden h-full w-[50%] flex-col justify-between p-1 text-5xl text-white lg:flex"
          ref={skillGraphContainerRef}
        >
          <SkillGraph {...{ skillGraphContainerRef, isInView }} />
        </div>
      </div>

      <TechnicalExperience
        {...{
          isOpen,
          onOpenChange,
          experienceYears,
        }}
      />
    </div>
  );
};

export default About;
