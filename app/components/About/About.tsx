import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import MainTitle from "./MainTitle";
import { SECTIONS } from "~/constants/main.constants";

const About = ({ setPageInView }: { setPageInView: any }) => {
  const mainTitle =
    "I'm Hemnath Balasubramanian. A full stack developer from Chennai, Tamilnadu.";
  const bottomTitle =
    "A full stack developer with 2.5 years of experience with ReactJs on the frontend and Python and NodeJs on the backend.";
  const sectionName = SECTIONS.ABOUT;

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div
      className="flex h-full flex-col items-start justify-end"
      ref={ref}
      id={sectionName}
    >
      <MainTitle text={mainTitle} shouldAnimate={true} />
      <MainTitle text={bottomTitle} shouldAnimate={false} />
    </div>
  );
};

export default About;
