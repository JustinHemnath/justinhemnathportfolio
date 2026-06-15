import { Progress } from "@heroui/react";

const SkillProgress = ({ experienceYears }: { experienceYears: string }) => {
  const progressSections = [
    {
      skills: [
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
          name: "Python",
          value: "2",
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
        "Single handedly developed the frontend and co-maintained the backend of a complex CRUD operation dashboard used by a team, using ReactJs, python serverless backend, Azure MSSQL server DB.",
        "Developed and maintained various dashboards and static sites utilizing ReactJS, NodeJs and python.",
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

      <div className="flex h-full flex-col gap-4 overflow-auto text-sm lg:text-base">
        {progressSections.map((progressSection: any) => (
          <div className="rounded-xl bg-zinc-700/30 p-2 backdrop-blur-lg lg:px-4 lg:py-3">
            {progressSection.skills.map((skill: any) => (
              <div className="m-1 flex items-center justify-between gap-5 lg:m-2 lg:gap-2">
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
            <div className="mt-4 flex flex-col gap-3 leading-5 lg:mt-10 lg:gap-1 lg:leading-5">
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
