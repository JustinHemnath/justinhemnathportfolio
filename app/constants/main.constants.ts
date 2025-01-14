import capitalize from "lodash/capitalize";

export enum SECTIONS {
  ABOUT = "about",
  PROJECTS = "projects",
  CONTACT = "contact",
}

export enum PROJECTS {
  CHAT_APP = "Chat App",
}

export const ProjectNames = [
  {
    id: 1,
    name: PROJECTS.CHAT_APP,
    // name: PROJECTS.CHAT_APP.split("_")
    //   .map((word: string) => capitalize(word))
    //   .join(" "),
    activeProjectName: PROJECTS.CHAT_APP,
  },
];
