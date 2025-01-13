import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { SECTIONS } from "~/constants/main.constants";

const Contact = ({ setPageInView }: { setPageInView: any }) => {
  const sectionName = SECTIONS.CONTACT;

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) setPageInView(sectionName);
  }, [isInView]);

  return (
    <div ref={ref} id={sectionName}>
      Contact
    </div>
  );
};

export default Contact;
