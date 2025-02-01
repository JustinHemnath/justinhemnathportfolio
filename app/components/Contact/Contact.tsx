import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { SECTIONS } from "~/constants/main.constants";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Contact = ({ setPageInView }: { setPageInView: any }) => {
  const sectionName = SECTIONS.CONTACT;

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div ref={ref} id={sectionName} className="h-full">
      <div className="flex h-full w-full items-center justify-center rounded-3xl bg-black p-10">
        <div className="flex flex-col items-center justify-start text-3xl font-bold">
          <motion.p
            className="funkyText border-t-none border-x-none mb-20 border-b border-b-indigo-400 text-5xl"
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 100,
            }}
            transition={{
              duration: 0.5,
              bounce: 1,
            }}
          >
            Contact me at:
          </motion.p>

          <div className="flex flex-col items-start gap-10">
            <motion.a
              href="https://www.linkedin.com/in/hemnath-balasubramanian-0a23a5185/"
              target="_blank"
              className="flex items-center gap-4"
              whileHover={{
                scale: 1.2,
              }}
            >
              <motion.div
                className="flex items-center gap-10"
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
              >
                <FaLinkedin className="funkyBg rounded-lg text-[4rem]" />
                <p className="text-slate-500"> Hemnath Balasubramanian</p>
              </motion.div>
            </motion.a>
            <motion.a
              href="https://github.com/JustinHemnath"
              target="_blank"
              className="flex items-center gap-4"
              whileHover={{
                scale: 1.2,
              }}
            >
              <motion.div
                className="flex items-center gap-10"
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
              >
                <FaGithub className="funkyBg rounded-lg text-[4rem]" />
                <p className="text-slate-500"> Justin Hemnath</p>
              </motion.div>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
