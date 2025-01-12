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
      className="h-full bg-blue-500 py-6 pl-4"
      style={{ marginLeft: sidebarWidth }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
