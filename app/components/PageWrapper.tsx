import type { ReactNode } from "react";

const PageWrapper = ({
  children,
  sidebarWidth,
}: {
  children: ReactNode;
  sidebarWidth: number;
}) => {
  return (
    <div
      className="h-screen py-6 pl-4"
      style={{
        marginLeft: sidebarWidth,
        scrollSnapAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
