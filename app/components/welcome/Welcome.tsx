import About from "../About/About";
import Projects from "../Projects/Projects";
import Sidebar from "../Sidebar/Sidebar";

const Welcome = () => {
  const sidebarWidth = 40;

  return (
    <div>
      <Sidebar {...{ sidebarWidth }} />
      <About {...{ sidebarWidth }} />
      <Projects {...{ sidebarWidth }} />
    </div>
  );
};

export default Welcome;
