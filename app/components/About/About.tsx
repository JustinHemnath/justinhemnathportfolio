import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import MainTitle from "./MainTitle";
import { SECTIONS } from "~/constants/main.constants";
import SkillGraph from "./SkillGraph";

const About = ({ setPageInView }: { setPageInView: any }) => {
  const mainTitle =
    "I'm Hemnath Balasubramanian. A full stack developer from Chennai, Tamilnadu.";
  const bottomTitle =
    "A full stack web developer with 2.5 years of experience with ReactJs on the frontend and Python and NodeJs on the backend.";
  const sectionName = SECTIONS.ABOUT;
  const skillGraphContainerRef = useRef(null);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div className="flex h-full justify-between" ref={ref} id={sectionName}>
      <div className="flex flex-[50%] flex-col items-center justify-center p-4">
        <MainTitle text={mainTitle} shouldAnimate={true} {...{ isInView }} />
        <MainTitle text={bottomTitle} shouldAnimate={false} {...{ isInView }} />
      </div>

      <div
        className="flex h-full w-full flex-[50%] items-center justify-center p-3 text-5xl text-white"
        ref={skillGraphContainerRef}
      >
        <SkillGraph {...{ skillGraphContainerRef, isInView }} />
      </div>
    </div>
  );
};

export default About;
