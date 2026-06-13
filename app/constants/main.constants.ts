export enum SECTIONS {
  ABOUT = "about",
  PROJECTS = "projects",
  // CONTACT = "contact",
}

export enum PROJECTS {
  CHAT_APP = "Chat App",
}

export const CHAT_APP_EVENTS = {
  TO_SERVER: "TO_SERVER",
  TO_CLIENT: "TO_CLIENT",
};

export const LEAD_DEV_EMAIL = "justin.hemnath.96@gmail.com";

export enum ENVIRONMENT {
  DEV = "dev",
  PROD = "prod",
}

export const CHAT_APP_SPRING_BE_EVENTS = {
  POST_MESSAGE: "/socket/postMessage",
  LISTEN_MESSAGE: "/user/queue/listenMessage",
};

export const STYLE = {
  INPUT_HEIGHT: "2rem",
};
