import React, { useState } from "react";
import Typography from "../Typo/Typography";
import { VariantTypes } from "../sharedTypes";
interface TabsType extends React.ComponentPropsWithRef<"div"> {
  tabsValue: SingleTab[];
  className?: string;
  variant: VariantTypes;
}

interface SingleTab {
  title: string;
  id: string;
  content: React.ReactNode;
}

const Tabs = ({ className, tabsValue, variant, ...rest }: TabsType) => {
  const [activeTabId, setactiveTabId] = useState<string>(tabsValue[0].id);
  const changeActiveHandler = (item: SingleTab) => {
    setactiveTabId(item.id);
  };

  const bgItems: Record<VariantTypes, string> = {
    info: "bg-sky-50",
    danger: "bg-red-50",
    success: "bg-green-50",
    warning: "bg-orange-50",
    default: "bg-slate-50",
  };

  return (
    <div {...rest} className="block">
      <div className="flex rounded-md overflow-hidden w-fit">
        {tabsValue.map((el: SingleTab, index: number) => (
          <div
            className={`w-fit px-3 py-1 border-r-2 last-of-type:border-r-0 cursor-pointer duration-150 ${
              el.id === activeTabId ? bgItems[variant] : "bg-slate-50"
            } `}
            key={`tab-header-${el.id}-${index}`}
            onClick={() => changeActiveHandler(el)}
          >
            <Typography
              variant="h6"
              colorVariant={el.id === activeTabId ? variant : "default"}
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
