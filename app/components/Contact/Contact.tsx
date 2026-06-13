import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { SECTIONS } from "~/constants/main.constants";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const CONTACT_SECTIONS = [
    {
      link: "https://www.linkedin.com/in/hemnath-balasubramanian-0a23a5185/",
      section: (
        <>
          <FaLinkedin className="funkyBg rounded-lg text-[3rem]" />
          <p className="text-slate-500"> Hemnath Balasubramanian</p>
        </>
      ),
    },
    {
      link: "https://github.com/JustinHemnath",
      section: (
        <>
          <FaGithub className="funkyBg rounded-lg text-[3rem]" />
          <p className="text-slate-500"> Justin Hemnath</p>
        </>
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center" ref={ref}>
      <div className="flex flex-col items-start gap-10 text-3xl font-medium">
        {CONTACT_SECTIONS.map((section: any) => (
          <motion.a
            key={section.link}
            href={section.link}
            target="_blank"
            className="flex items-center gap-4"
            whileHover={{
              scale: 1.05,
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
              {section.section}
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
