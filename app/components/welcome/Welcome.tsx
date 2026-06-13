import { useMemo, useState, type ReactNode } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "~/firebase.config";

import About from "../About/About";
import Projects from "../Projects/Projects";
import Sidebar from "../Sidebar/Sidebar";
import { SECTIONS } from "~/constants/main.constants";
import PageWrapper from "../PageWrapper";
import Contact from "../Contact/Contact";
import { Alert } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Welcome = () => {
  const sidebarWidth = 40;
  const [pageInView, setPageInView] = useState(SECTIONS.ABOUT);
  const app = initializeApp(firebaseConfig);

  const experienceYears = useMemo(() => {
    return dayjs().diff("2022-09-01", "year", true).toPrecision(2);
  }, []);

  const CURRENT_SECTIONS = [
    {
      name: SECTIONS.ABOUT,
      component: <About {...{ setPageInView, experienceYears }} />,
    },
    {
      name: SECTIONS.PROJECTS,
      component: <Projects {...{ setPageInView }} />,
    },
    // {
    //   name: SECTIONS.CONTACT,
    //   component: <Contact {...{ setPageInView }} />,
    // },
  ];

  return (
    <div>
      <Sidebar
        {...{ sidebarWidth, pageInView, setPageInView, CURRENT_SECTIONS }}
      />

      {CURRENT_SECTIONS.map((elementObj: any) => (
        <PageWrapper {...{ sidebarWidth }} key={elementObj.name}>
          {elementObj.component}
        </PageWrapper>
      ))}
    </div>
  );
};

export default Welcome;
