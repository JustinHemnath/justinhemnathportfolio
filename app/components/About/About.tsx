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

  const ADDITIONAL_INFO = [
    {
      title: "Email",
      description: "justin.hemnath.96@gmail.com",
    },
    {
      title: "Date of birth",
      description: "30 - 11 - 1996",
    },
    {
      title: "Skills",
      description:
        "Javascript, Java, ReactJS, NodeJS, Spring Boot, Python, MSSQL, Postgresql, MongoDB,  TailwindCSS,",
    },
    {
      title: "Years of experience",
      description: `${experienceYears} yrs`,
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

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div className="flex h-full flex-col" ref={ref} id={sectionName}>
      <div className="flex h-full flex-col justify-between lg:flex-row">
        <div className="flex h-full w-full flex-col justify-between gap-3 px-24 py-4 lg:w-[50%]">
          <MainTitle
            text={mainTitle}
            shouldAnimate={true}
            delayFactor={1}
            {...{ isInView }}
          />

          <div className="flex gap-4">
            <Avatar
              src={image}
              size="lg"
              className="mx-auto h-[15em] w-[15em]"
            />
            <Contact />
          </div>

          <div className="flex items-center justify-center">
            <Button
              color="secondary"
              variant="solid"
              className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700 text-lg font-medium text-white"
              onPress={onOpen}
            >
              View resume
            </Button>
          </div>
        </div>

        <div
          className="hidden h-full w-[50%] items-center justify-center p-3 text-5xl text-white lg:flex"
          ref={skillGraphContainerRef}
        >
          <SkillGraph {...{ skillGraphContainerRef, isInView }} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-3xl underline">Resume</ModalHeader>
              <ModalBody className="overflow-auto">
                <table>
                  <tbody className="text-xl">
                    {ADDITIONAL_INFO.map((info: any) => (
                      <tr className="py-3">
                        {/* <div className="flex text-2xl"> */}
                        <td className="pr-4 pb-10 font-semibold">
                          {info.title}:{" "}
                        </td>
                        <td className="pb-10 text-zinc-600">
                          {info.description}
                        </td>
                        {/* </div> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    </div>
  );
};

export default About;
