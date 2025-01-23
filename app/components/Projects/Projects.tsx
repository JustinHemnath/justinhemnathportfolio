import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";
import { PROJECTS, SECTIONS } from "~/constants/main.constants";
import { motion } from "framer-motion";
import ProjectsSection from "./ProjectsSection";
import FullStackChatApp from "./AllProjects/ChatApp/index.chatapp.project";
import { firebaseConfig } from "~/firebase.config";

type TActiveProject = {
  name: PROJECTS;
  component: ReactNode;
};

const Projects = ({ setPageInView }: { setPageInView: any }) => {
  const sectionName = SECTIONS.PROJECTS;
  const [activeProject, setActiveProject] = useState<TActiveProject | undefined>(undefined);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [indexPageActive, setIndexSectionActive] = useState(true);

  const ProjectNames = [
    {
      id: 1,
      name: PROJECTS.CHAT_APP,
      activeProjectName: PROJECTS.CHAT_APP,
      component: <FullStackChatApp {...{ setIndexSectionActive }} />,
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
          <div className="">
            <motion.p
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 100,
              }}
              transition={{
                duration: 0.5,
                bounce: 1,
              }}
              className="funkyText p-2 text-3xl font-bold italic"
            >
              PROJECTS
            </motion.p>

            <motion.ol
              variants={listVariants}
              initial="hidden"
              animate="visible"
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
                  className="cursor-pointer text-2xl font-extrabold"
                >
                  {item.id}. {item.name}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        ) : (
          <ProjectsSection {...{ activeProject, setIndexSectionActive }} />
        )}
      </div>
    </div>
  );
};

export default Projects;
