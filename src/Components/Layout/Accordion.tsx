import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "../Typo/Typography";
import useDirection from "../../Hooks/useDirection";

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

const Accordion = React.memo(({ className, data, ...rest }: AccordionType) => {
  const [urlText, seturlText] = useState<string>("");
  const [direction] = useDirection();
  console.log(direction + " why");
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
      return `h-auto max-h-36 transition-all rounded duration-300`;
    return "max-h-0 transition-all  rounded duration-300";
  };

  const activeLink = (item: string) => {
    if (item === urlText)
      return `bg-slate-300 rounded border-r-4  border-slate-500 duration-300 font-semibold `;
    return "";
  };

  return (
    <nav className="border w-52" {...rest}>
      <ul className="w-full" tabIndex={0}>
        {data.map((el: DataParentType, index: number) => (
          <li key={`list-${index}`} className="overflow-hidden cursor-pointer">
            <div
              className={`px-3 py-2 flex justify-between ${
                activeTab === index ? "bg-slate-200 font-semibold" : ""
              }`}
              onClick={() => activeHandler(index)}
            >
              <Typography variant="p">{el.title}</Typography>
              <Typography
                variant="p"
                className={`flex items-center duration-300 ${
                  activeTab === index ? "rotate-90" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                  onClick={(e) => e.preventDefault()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Typography>
            </div>
            <div className={heightCalc(index)}>
              {el.children.map((child, id) => (
                <Link
                  to="/component/button"
                  onClick={() => seturlText(child.title)}
                  key={`sidebar-child-${id}`}
                >
                  <Typography
                    variant="small"
                    className={`py-2 px-4 rounded hover:bg-slate-400 active:bg-slate-500 ${activeLink(
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
    </nav>
  );
});

export default Accordion;
