import PageWrapper from "../PageWrapper";
import MainTitle from "./MainTitle";

const About = ({ sidebarWidth }: { sidebarWidth: number }) => {
  return (
    <PageWrapper {...{ sidebarWidth }}>
      <MainTitle />
    </PageWrapper>
  );
};

export default About;
