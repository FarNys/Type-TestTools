import React, { useState } from "react";
import Typography from "../Typo/Typography";
interface TabsType {
  tabsValue: SingleTab[];
  className?: string;
}
interface SingleTab {
  title: string;
  id: string;
  content: React.ReactNode;
}

const Tabs = ({ className, tabsValue, ...rest }: TabsType) => {
  const [activeTabId, setactiveTabId] = useState<string>(tabsValue[0].id);
  const changeActiveHandler = (item: SingleTab) => {
    setactiveTabId(item.id);
  };

  return (
    <div {...rest} className="block">
      <div className="flex rounded-md overflow-hidden w-fit">
        {tabsValue.map((el: SingleTab, index: number) => (
          <div
            className={`w-fit px-3 py-1 border-r-2 last-of-type:border-r-0 cursor-pointer duration-150 ${
              el.id === activeTabId ? "bg-sky-100 " : "bg-slate-100"
            }`}
            key={`tab-header-${el.id}-${index}`}
            onClick={() => changeActiveHandler(el)}
          >
            <Typography
              variant="h6"
              colorVariant={el.id === activeTabId ? "info" : "default"}
            >
              {el.title}
            </Typography>
          </div>
        ))}
      </div>
      <div className="my-2">
        <div className="translate-y-5">
          {tabsValue.map((el: SingleTab, index: number) => (
            <div
              key={`active-tab-${index}`}
              className={`${
                el.id === activeTabId
                  ? "block duration-500 -translate-y-5 opacity-100"
                  : "max-h-0 invisible pointer-events-none opacity-0"
              }`}
            >
              {el.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
