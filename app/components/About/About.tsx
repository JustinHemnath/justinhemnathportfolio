import PageWrapper from "../PageWrapper";
import MainTitle from "./MainTitle";

const About = ({ sidebarWidth }: { sidebarWidth: number }) => {
  const mainTitle =
    "I'm Hemnath Balasubramanian. A full stack developer from Chennai, Tamilnadu.";
  const bottomTitle =
    "A full stack developer with 2.5 years of experience with ReactJs on the frontend and Python and NodeJs on the backend.";

  return (
    <PageWrapper {...{ sidebarWidth }}>
      <div className="flex h-full flex-col items-start justify-end">
        <MainTitle text={mainTitle} shouldAnimate={true} />
        <MainTitle text={bottomTitle} shouldAnimate={false} />
      </div>
    </PageWrapper>
  );
};

export default About;
