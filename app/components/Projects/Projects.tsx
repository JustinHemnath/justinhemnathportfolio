import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { PROJECTS, SECTIONS } from "~/constants/main.constants";
import { motion } from "framer-motion";
import ProjectsSection from "./ProjectsSection";
import FullStackChatApp from "./AllProjects/ChatApp/index.chatapp.project";
import { Spinner, Divider, Chip } from "@heroui/react";

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
        Frontend: ["Javascript", "ReactJs", "TailwindCSS", "Socket.IO"],
        Backend: ["Javascript", "NodeJS", "Prisma", "Websockets"],
        Database: ["Postgresql", "Firebase"],
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
    <div ref={ref} id={sectionName} className="h-full p-2">
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
              className="funkyText text-shadow-lg absolute top-0 text-4xl font-bold"
            >
              Projects
            </motion.p>

            <div className="my-3 flex flex-col items-center gap-2">
              {ProjectNames.map((project: any) => (
                <motion.div
                  // className="funkyBg flex w-[40vw] cursor-pointer flex-col items-center rounded-2xl p-3"
                  // className="flex w-[40vw] cursor-pointer flex-col rounded-2xl bg-cyan-400 p-3"
                  className="flex w-[40vw] cursor-pointer flex-col rounded-2xl bg-gradient-to-r from-cyan-800 via-cyan-500 to-cyan-800 p-3"
                  // key={project.id}
                  onClick={() => {
                    setActiveProject({
                      name: project.activeProjectName,
                      component: project.component,
                    });
                    setIndexSectionActive(false);
                  }}
                  variants={listVariants}
                  whileHover={{
                    scale: 1.1,
                  }}
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
                      delay: 0.5,
                      bounce: 0.3,
                      type: "spring",
                    },
                    y: {
                      delay: 0.5,
                      bounce: 0.3,
                      type: "spring",
                    },
                  }}
                  key={`${sectionName}${isInView}`}
                >
                  {/* <div className="flex items-center gap-2"> */}
                  {/* <p className="text-2xl font-bold text-cyan-900"> */}
                  <p className="funkyText text-4xl font-black">
                    {project.name}
                  </p>
                  {/* <span>-</span> */}
                  <p className="mt-4 text-gray-700">{project.desc}</p>
                  {/* </div> */}

                  <div className="mt-6 flex flex-col flex-wrap gap-2">
                    {Object.entries(project.techStack).map((stackMap: any) => {
                      return (
                        <div className="flex gap-2">
                          <p className="">{stackMap[0]}</p>
                          {stackMap[1].map((stack: string) => (
                            <Chip className="bg-gray-200 text-sm text-black shadow">
                              <p className="font-medium">{stack}</p>
                            </Chip>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* <motion.ol
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
                delay: 0.5,
                bounce: 0.3,
                type: "spring",
              }}
              key={`${sectionName}${isInView}`}
              className="funkyText mt-10"
            >
              {ProjectNames.map((item) => (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  onClick={() => {
                    setActiveProject({
                      name: item.activeProjectName,
                      component: item.component,
                    });
                    setIndexSectionActive(false);
                  }}
                  className="cursor-pointer text-3xl font-extrabold transition-all duration-100 ease-in-out hover:text-4xl"
                >
                  <div className="flex flex-col gap-3">
                    <p>
                      {item.id}. {item.name}
                    </p>
                    <div className="mt-4 flex text-xl">
                      <Divider
                        className="funkyBg mx-4"
                        orientation="vertical"
                      />
                      {item.techStack.map(
                        (tech: string, index: number, arr: any[]) => (
                          <div className="flex gap-2" key={tech}>
                            <p>{tech}</p>
                            {index !== arr.length - 1 ? (
                              <Divider
                                className="funkyBg mx-4"
                                orientation="vertical"
                              />
                            ) : null}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol> */}

            <div className="funkyText mt-auto flex items-center gap-4 text-lg">
              <Spinner size="md" /> New projects under construction...
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
