import { useState } from "react";
import { SECTIONS } from "~/constants/main.constants";
import { motion } from "framer-motion";

const Sidebar = ({ sidebarWidth, pageInView, setPageInView }: any) => {
  const [sectionStringsArr] = useState(
    Object.values(SECTIONS).map((section: string) =>
      // section.split("").reverse(),
      section.split("")
    )
  );

  function onSidebarClick(sectionName: SECTIONS) {
    setPageInView(sectionName);
    document.getElementById(sectionName)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      className="fixed left-0 h-full rounded-r-full bg-black"
      style={{ width: sidebarWidth }}
      whileHover={{
        width: sidebarWidth + 20,
      }}
      initial={{
        width: sidebarWidth,
      }}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between py-24 text-white">
        {sectionStringsArr.map((sectionArr: string[]) => {
          const sectionName = sectionArr.join("") as SECTIONS;

          return (
            <motion.div
              key={sectionName}
              className="flex cursor-pointer flex-col items-center gap-3 text-xl font-semibold"
              onClick={() => onSidebarClick(sectionName)}
              animate={{
                scale: pageInView === sectionName ? 1.3 : 1,
              }}
              whileHover={{
                scale: 1.3,
              }}
              transition={{
                bounce: 0.7,
                type: "spring",
              }}
            >
              {sectionArr.map((letter: string, index: number) => (
                // <div className="h-2 -rotate-90 uppercase">{letter}</div>
                <div className="h-2 uppercase" key={`${letter}${index}`}>
                  {letter}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* backdrop blur */}
      {/* <div className="h-full w-full backdrop-blur-md"></div> */}
    </motion.div>
  );
};

export default Sidebar;
