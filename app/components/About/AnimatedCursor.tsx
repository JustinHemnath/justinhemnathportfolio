import { useEffect, useState } from "react";

const AnimatedCursor = () => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    const toggleCursorInterval = setInterval(() => {
      setShouldDisplay((shouldDisplay) => !shouldDisplay);
    }, 500);

    return () => clearInterval(toggleCursorInterval);
  }, []);

  return (
    <span
      className="h-10 w-1 bg-white"
      style={{ display: shouldDisplay ? "block" : "none" }}
    ></span>
  );
};
export default AnimatedCursor;
