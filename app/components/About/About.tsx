import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import MainTitle from "./MainTitle";
import { SECTIONS } from "~/constants/main.constants";
import SkillGraph from "./SkillGraph";
import { Chip } from "@heroui/react";

const About = ({
  setPageInView,
  experienceYears,
}: {
  setPageInView: any;
  experienceYears: string;
}) => {
  const mainTitle =
    "Hello! I'm Hemnath Balasubramanian. A full stack web developer from Chennai, Tamilnadu, IN.";
  const bottomTitle = `A full stack web developer with ${experienceYears} years of experience with ReactJs on the frontend and NodeJs and Python on the backend.`;
  const sectionName = SECTIONS.ABOUT;
  const skillGraphContainerRef = useRef(null);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div className="flex h-full justify-between" ref={ref} id={sectionName}>
      <div className="flex flex-[50%] flex-col items-center justify-between p-4">
        <MainTitle
          text={mainTitle}
          shouldAnimate={true}
          delayFactor={1}
          {...{ isInView }}
        />
        <MainTitle
          text={bottomTitle}
          shouldAnimate={false}
          delayFactor={1}
          {...{ isInView }}
        />
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
