import { useState, type ReactNode } from "react";
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

const Welcome = () => {
  const sidebarWidth = 40;
  const [pageInView, setPageInView] = useState(SECTIONS.ABOUT);
  const [initialAlertVisible, setInitialAlertVisible] = useState(true);
  const app = initializeApp(firebaseConfig);

  return (
    <div>
      {initialAlertVisible ? (
        <div className="fixed right-0 top-0 !z-[9999] flex w-[50%] p-10">
          <Alert
            color={"default"}
            title={
              "Please view this site on any browser other than Firefox as firefox compatibility is not added"
            }
            classNames={{
              base: "!bg-white shadow-xl ",
              title: "text-md 2xl:text-xl",
            }}
            endContent={
              <IoMdClose
                className="cursor-pointer text-2xl text-black"
                onClick={() => setInitialAlertVisible(false)}
              />
            }
          />
        </div>
      ) : null}

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
