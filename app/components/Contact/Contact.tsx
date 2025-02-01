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
          <p className="funkyText mb-20 text-5xl">Contact me at:</p>

          <div className="flex flex-col items-start gap-10">
            <motion.a
              href="https://www.linkedin.com/in/hemnath-balasubramanian-0a23a5185/"
              target="_blank"
              className="flex items-center gap-4"
              whileHover={{
                scale: 1.2,
              }}
            >
              <FaLinkedin className="funkyBg rounded-lg text-[4rem]" />
              <p className="text-slate-500"> Hemnath Balasubramanian</p>
            </motion.a>
            <motion.a
              href="https://github.com/JustinHemnath"
              target="_blank"
              className="flex items-center gap-4"
              whileHover={{
                scale: 1.2,
              }}
            >
              <FaGithub className="funkyBg rounded-lg text-[4rem]" />
              <p className="text-slate-500"> Justin Hemnath</p>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
