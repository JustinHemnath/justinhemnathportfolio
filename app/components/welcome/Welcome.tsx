import { useState, type ReactNode } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "~/firebase.config";

import About from "../About/About";
import Projects from "../Projects/Projects";
import Sidebar from "../Sidebar/Sidebar";
import { SECTIONS } from "~/constants/main.constants";
import PageWrapper from "../PageWrapper";
import Contact from "../Contact/Contact";

const Welcome = () => {
  const sidebarWidth = 40;
  const [pageInView, setPageInView] = useState(SECTIONS.ABOUT);
  const app = initializeApp(firebaseConfig);
  console.log({ app });

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
