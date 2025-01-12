import About from "../About/About";
import Projects from "../Projects/Projects";
import Sidebar from "../Sidebar/Sidebar";

const Welcome = () => {
  const sidebarWidth = 40;

  return (
    <div className="p-2 text-xl">
      <Sidebar {...{ sidebarWidth }} />
      <About {...{ sidebarWidth }} />
      <Projects {...{ sidebarWidth }} />
    </div>
  );
};

export default Welcome;
