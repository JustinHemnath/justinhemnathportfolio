import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@heroui/react";
import SkillProgress from "./SkillProgress";
import { Tabs, Tab } from "@heroui/react";
import { useState } from "react";

const TechnicalExperience = ({
  isOpen,
  onOpenChange,
  experienceYears,
}: {
  isOpen: boolean;
  onOpenChange: any;
  experienceYears: string;
}) => {
  const KEY = {
    RESUME: "resume",
    TECH_EXP: "techExp",
  };

  const [tab, setTab] = useState(KEY.RESUME);

  const ADDITIONAL_INFO = [
    {
      title: "Name",
      description: "Hemnath Balasubramanian",
    },
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
        "Typescript, Java, ReactJS, NodeJS, Spring 3 framework, Python, MSSQL, Postgresql, MongoDB,  TailwindCSS,",
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className="max-w-[90vw]"
        placement="center"
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="text-3xl underline">Resume</ModalHeader>
              <ModalBody className="">
                <div className="flex flex-col justify-between gap-3 overflow-auto lg:hidden lg:flex-row lg:gap-10">
                  {/*  */}
                  <Tabs
                    aria-label="Resume section"
                    selectedKey={tab}
                    onSelectionChange={(s: any) => setTab(s)}
                  >
                    <Tab key="resume" title="Resume">
                      <Resume {...{ ADDITIONAL_INFO }} />
                    </Tab>
                    <Tab key="techExp" title="Technical experience">
                      <div>
                        <SkillProgress {...{ experienceYears }} />
                      </div>
                    </Tab>
                  </Tabs>
                </div>

                <div className="hidden flex-col justify-between gap-3 overflow-auto lg:flex lg:flex-row lg:gap-10">
                  <Resume {...{ ADDITIONAL_INFO }} />

                  <div className="lg:flex-[50%]">
                    <SkillProgress {...{ experienceYears }} />
                  </div>
                </div>
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
  );
};
export default TechnicalExperience;

const Resume = ({ ADDITIONAL_INFO }: { ADDITIONAL_INFO: any }) => {
  return (
    <table className="lg:flex-[50%]">
      <tbody className="text-base lg:text-xl">
        {ADDITIONAL_INFO.map((info: any) => (
          <tr className="py-2">
            <td className="pr-4 pb-5 font-semibold">{info.title}: </td>
            <td className="pb-5 text-zinc-600">{info.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
