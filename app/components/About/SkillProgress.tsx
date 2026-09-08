import { Progress } from "@heroui/react";

const SkillProgress = ({ experienceYears }: { experienceYears: string }) => {
  const progressSections = [
    {
      skills: [
        {
          name: "Python",
          value: experienceYears,
        },
        {
          name: "FastAPI",
          value: "3",
        },
        {
          name: "Typescript",
          value: experienceYears,
        },
        {
          name: "ReactJs",
          value: experienceYears,
        },
        {
          name: "NodeJs",
          value: experienceYears,
        },
        {
          name: "TailwindCSS",
          value: experienceYears,
        },
        {
          name: "HTML",
          value: experienceYears,
        },
        {
          name: "MS SQL DB",
          value: experienceYears,
        },
        {
          name: "MongoDB",
          value: 2.4,
        },
        {
          name: "Postgresql",
          value: 1.5,
        },
        {
          name: "Azure devops",
          value: experienceYears,
        },
        {
          name: "Docker",
          value: experienceYears,
        },
      ],
      achievements: [
        "One of the main frontend developers of www.dmk.in, a website for the DMK party – ReactJs , NextJS",
        "Developed a voter counting dashboard for the 2024 lok sabha elections - ReactJs, FastAPI , Python Socketio, LeaftletJS",
        "Developed the frontend and backend of a complex CRUD operation dashboard used by a 15+ member survey teamfor 3 years, which collected the sentimental analysis and performance of the DMK party - ReactJs, FastAPI, Azure serverless functions, Azure MSSQL DB",
        "Co-developed and maintained a dashboard which was used by a survey team to collect census data of the people of Tamilnadu for cross verification and correction with regards to the existing available national census. Provided partial backend support – ReactJs, Zustand, ExpressJS , MongoDB.",
        "Worked on various internal websites and dashboard, independently",
      ],
    },
    {
      skills: [
        {
          name: "Java",
          value: "0.3",
        },
        {
          name: "Spring 3",
          value: "0.3",
        },
        {
          name: "Spring data JPA",
          value: "0.3",
        },
        {
          name: "STOMP over websockets",
          value: "0.3",
        },
      ],

      achievements: [
        "Created a simple real-time chatting application using Spring data JPA, STOMP over websockets and Google Firebase authentication and Postgresql for database",
      ],
    },
  ];

  return (
    <div className="funkyBg rounded-xl p-3 text-white">
      <p className="mb-4 text-base font-semibold lg:text-lg">
        Technical experience:
      </p>

      <div className="flex h-full flex-col gap-1 overflow-auto text-sm lg:text-base">
        {progressSections.map((progressSection: any) => (
          <div className="rounded-xl bg-zinc-700/30 p-1 backdrop-blur-lg lg:px-2 lg:py-2">
            {progressSection.skills.map((skill: any) => (
              <div className="m-1 flex items-center justify-between gap-3 lg:m-0.5 lg:gap-1">
                <p className="flex-[20%] lg:flex-[15%]">{skill.name}</p>
                <Progress
                  className="flex-[40%] lg:flex-[75%]"
                  color="success"
                  aria-label={skill.name}
                  size="md"
                  value={(skill.value / Number(experienceYears)) * 100}
                />
                <p className="flex-[10%] text-nowrap lg:flex-[10%]">
                  {`${skill.value} yrs`}
                  {/* {Number(skill.value) === Number(experienceYears)
                    ? `${skill.value} yrs`
                    : ""} */}
                </p>
              </div>
            ))}
            <div className="mt-1 flex flex-col gap-3 leading-5 lg:mt-7 lg:gap-1 lg:leading-5">
              {progressSection.achievements.map((achiev: any) => (
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-lg bg-zinc-300 p-0.5"></div>
                  <p>{achiev}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgress;
