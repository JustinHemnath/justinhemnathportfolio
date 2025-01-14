import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { ProjectNames, PROJECTS, SECTIONS } from "~/constants/main.constants";
import { motion } from "framer-motion";

const Projects = ({ setPageInView }: { setPageInView: any }) => {
  const sectionName = SECTIONS.PROJECTS;
  const [activeProject, setActiveProject] = useState<PROJECTS | undefined>(
    undefined,
  );
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

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

  return (
    <div ref={ref} id={sectionName} className="h-full p-2">
      <div className="h-full rounded-3xl bg-black p-2">
        {/* Projects index section */}
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
                onClick={() => setActiveProject(item.activeProjectName)}
                className="cursor-pointer text-2xl font-extrabold"
              >
                {item.id}. {item.name}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </div>
  );
};

export default Projects;
