import { useState, type ReactNode } from "react";
import About from "../About/About";
import Projects from "../Projects/Projects";
import Sidebar from "../Sidebar/Sidebar";
import { SECTIONS } from "~/constants/main.constants";
import PageWrapper from "../PageWrapper";
import Contact from "../Contact/Contact";

const Welcome = () => {
  const sidebarWidth = 40;
  const [pageInView, setPageInView] = useState(SECTIONS.ABOUT);

  return (
    <div>
      <Sidebar {...{ sidebarWidth, pageInView, setPageInView }} />

      {/* main pages  */}
      {[
        { name: SECTIONS.ABOUT, component: <About {...{ setPageInView }} /> },
        {
          name: SECTIONS.PROJECTS,
          component: <Projects {...{ setPageInView }} />,
        },
        {
          name: SECTIONS.CONTACT,
          component: <Contact {...{ setPageInView }} />,
        },
      ].map((elementObj: any) => (
        <PageWrapper {...{ sidebarWidth }} key={elementObj.name}>
          {elementObj.component}
        </PageWrapper>
      ))}
    </div>
  );
};

export default Welcome;
