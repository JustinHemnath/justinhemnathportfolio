import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { SECTIONS } from "~/constants/main.constants";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = ({ setPageInView }: { setPageInView: any }) => {
  const sectionName = SECTIONS.CONTACT;

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div ref={ref} id={sectionName} className="h-full">
      <div className="bg-black h-full w-full rounded-3xl p-10 flex justify-center items-center">
        <div className="font-bold text-3xl flex flex-col justify-start items-center">
          <p className=" mb-20 text-5xl funkyText ">Contact me at:</p>

          <motion.a
            href="https://www.linkedin.com/in/hemnath-balasubramanian-0a23a5185/"
            target="_blank"
            className="flex gap-4 items-center "
            whileHover={{
              scale: 1.2,
            }}
          >
            <FaLinkedin className="funkyBg text-[4rem] rounded-lg" />
            {/* <p className="italic"> Hemnath Balasubramanian</p> */}
            <p className="text-slate-500"> Hemnath Balasubramanian</p>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
