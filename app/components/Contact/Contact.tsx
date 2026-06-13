import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { SECTIONS } from "~/constants/main.constants";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <div className="flex flex-col gap-10 text-3xl font-medium" ref={ref}>
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
          <FaLinkedin className="funkyBg rounded-lg text-[3rem]" />
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
          <FaGithub className="funkyBg rounded-lg text-[3rem]" />
          <p className="text-slate-500"> Justin Hemnath</p>
        </motion.div>
      </motion.a>
    </div>
  );
};

export default Contact;
