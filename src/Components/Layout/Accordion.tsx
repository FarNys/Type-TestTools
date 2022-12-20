import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "../Typo/Typography";

interface AccordionType {
  className?: string;
  data: DataParentType[];
}

interface DataParentType {
  title: string;
  children: DataChildType[];
}
interface DataChildType {
  title: string;
}

const Accordion = ({ className, data, ...rest }: AccordionType) => {
  const [urlText, seturlText] = useState<string>("");

  const [activeTab, setactiveTab] = useState<number>(-1);
  const activeHandler = (index: number) => {
    if (activeTab === index) {
      setactiveTab(-1);
    } else {
      setactiveTab(index);
    }
  };

  const heightCalc = (index: number) => {
    if (activeTab === index)
      return `h-auto max-h-16  transition-all duration-300`;
    return "max-h-0 transition-all duration-300";
  };

  const activeLink = (item: string) => {
    if (item === urlText) return "bg-slate-300 border-l-4 border-cyan-400 ";
    return "";
  };

  return (
    <ul className="border w-fit " tabIndex={0} {...rest}>
      {data.map((el: DataParentType, index: number) => (
        <li key={`list-${index}`} className="overflow-hidden">
          <p
            className={`pl-3 pr-10 py-1 ${
              activeTab === index ? "bg-slate-200" : ""
            }`}
            onClick={() => activeHandler(index)}
          >
            {el.title}
          </p>
          <div className={heightCalc(index)}>
            {el.children.map((child, id) => (
              <Link
                to="/component/button"
                onClick={() => seturlText(child.title)}
                key={`child-${id}`}
              >
                <Typography
                  variant="small"
                  className={`py-1 px-2 rounded-l-md hover:bg-slate-400 active:bg-slate-500 ${activeLink(
                    child.title
                  )}`}
                >
                  {child.title}
                </Typography>
              </Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;