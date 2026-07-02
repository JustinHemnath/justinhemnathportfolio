import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { PROJECTS, SECTIONS } from "~/constants/main.constants";
import { motion } from "framer-motion";
import ProjectsSection from "./ProjectsSection";
import FullStackChatApp from "./AllProjects/ChatApp/index.chatapp.project";
import { Spinner, Divider, Chip, Button } from "@heroui/react";
import { MdOutlineConstruction } from "react-icons/md";
import { IoWarningSharp } from "react-icons/io5";
import { FaGithub, FaLongArrowAltLeft } from "react-icons/fa";

type TActiveProject = {
  name: PROJECTS;
  component: ReactNode;
};

const Projects = ({ setPageInView }: { setPageInView: any }) => {
  const sectionName = SECTIONS.PROJECTS;
  const [activeProject, setActiveProject] = useState<
    TActiveProject | undefined
  >(undefined);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [indexPageActive, setIndexSectionActive] = useState(true);

  const ProjectNames = [
    {
      id: 1,
      name: PROJECTS.CHAT_APP,
      activeProjectName: PROJECTS.CHAT_APP,
      desc: `${PROJECTS.CHAT_APP} with firebase login and real time messaging using websockets`,
      component: <FullStackChatApp {...{ setIndexSectionActive }} />,
      techStack: {
        Frontend: {
          stack: ["Javascript", "ReactJs", "Stompjs", "TailwindCSS"],
          link: "https://github.com/JustinHemnath/justinhemnathportfolio/blob/master/app/components/Projects/AllProjects/ChatApp/index.chatapp.project.tsx",
        },
        Backend: {
          stack: [
            "Java",
            "Springboot",
            "Spring data JPA",
            "Stomp over websockets",
          ],
          link: "https://github.com/JustinHemnath/portfolio_spring_be",
        },
        Database: { stack: ["Postgresql", "Firebase"] },
      },
    },
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div ref={ref} id={sectionName} className="h-full">
      <div className="h-full rounded-3xl bg-black p-2">
        {/* Projects index section */}

        {indexPageActive ? (
          <div className="relative flex h-full flex-col items-center justify-start pt-[10rem]">
            <motion.p
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 100,
              }}
              transition={{
                duration: 0.5,
                bounce: 1,
              }}
              className="funkyText absolute top-0 text-4xl font-bold text-shadow-lg"
            >
              Projects
            </motion.p>

            <div className="my-3 flex flex-col items-center gap-6">
              {ProjectNames.map((project: any) => (
                <motion.div
                  className="relative flex w-[25em] flex-col rounded-r-3xl bg-gradient-to-r from-green-500/40 via-gray-300 to-green-500/40 px-4 py-4 sm:w-[55em] sm:px-4"
                  variants={listVariants}
                  initial={{
                    opacity: 0,
                    y: -100,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    opacity: {
                      delay: 0.2,
                      bounce: 0.3,
                      type: "spring",
                    },
                    y: {
                      delay: 0.2,
                      bounce: 0.3,
                      type: "spring",
                    },
                  }}
                  key={`${sectionName}${isInView}`}
                >
                  <p className="text-shadow-xl/20 text-center text-2xl font-bold text-green-900 sm:text-3xl">
                    {project.name}
                  </p>
                  <p className="mt-4 text-center">{project.desc}</p>

                  <div className="flex flex-col gap-0 p-3 sm:flex-row sm:gap-2">
                    <div className="mt-2 flex flex-[80%] flex-col flex-wrap items-start justify-center sm:ml-6">
                      <div className="w-full rounded-l rounded-r-4xl bg-gray-300/40 py-2 shadow-lg sm:w-[85%]">
                        {Object.entries(project.techStack).map(
                          (stackMap: any) => {
                            return (
                              <div
                                className="flex gap-2 px-4 py-2"
                                key={stackMap[0]}
                              >
                                <div className="flex flex-[90%] items-center gap-4">
                                  <p className="mr-auto flex-[15%] font-medium sm:font-semibold">
                                    {stackMap[0]}
                                  </p>

                                  <div className="flex w-full flex-[85%] flex-wrap justify-start gap-2">
                                    {stackMap[1].stack.map((stack: string) => (
                                      <Chip
                                        size="sm"
                                        className="bg-gray-200 px-0.5! text-sm text-wrap text-black shadow"
                                        key={stack}
                                      >
                                        <p className="text-sm font-normal tracking-widest">
                                          {stack}
                                        </p>
                                      </Chip>
                                    ))}
                                  </div>
                                </div>

                                {stackMap[1].link ? (
                                  <>
                                    <div className="flex flex-[5%]">
                                      <Divider
                                        orientation="vertical"
                                        className="my-auto h-[75%] px-[1px]"
                                      />
                                    </div>

                                    <div
                                      className="flex flex-[5%] items-center"
                                      id="code_link_container"
                                    >
                                      <motion.a
                                        href={stackMap[1].link}
                                        target="_blank"
                                        whileHover={{
                                          scale: 1.1,
                                        }}
                                        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-violet-800 p-1"
                                      >
                                        <FaGithub className="text-2xl text-white" />
                                      </motion.a>
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>

                    <div className="mx-1 flex flex-[10%] items-center">
                      <Divider orientation="vertical" className="" />
                    </div>

                    <div className="flex flex-[20%] cursor-pointer items-center justify-center gap-4 rounded-l rounded-r-xl p-2 text-green-700">
                      <div
                        className="flex items-center gap-2 rounded-4xl bg-white p-4 shadow-2xl"
                        onClick={() => {
                          setActiveProject({
                            name: project.activeProjectName,
                            component: project.component,
                          });
                          setIndexSectionActive(false);
                        }}
                      >
                        <p>Launch</p>
                        <FaLongArrowAltLeft className="rotate-180 text-xl text-green-900" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 -left-1 h-full rounded-l-lg bg-green-600 px-0.5"></div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center justify-center">
              <div className="funkyText flex items-center gap-4 text-lg">
                New projects under construction
                <span>
                  <IoWarningSharp className="text-3xl text-zinc-400" />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <ProjectsSection {...{ activeProject, setIndexSectionActive }} />
        )}
      </div>
    </div>
  );
};

export default Projects;
