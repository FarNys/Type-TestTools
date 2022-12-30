import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
export interface OptionType {
  label: string;
  value: string | boolean | number;
}

interface DropdownType {
  options: OptionType[];
  value?: OptionType;
  onSelect: (e: OptionType) => void;
}

const Dropdown = ({ options, value, onSelect, ...rest }: DropdownType) => {
  const SelectRef = useRef<any>(null);
  const [showItems, setshowItems] = useState<boolean>(false);
  const [localOptions, setlocalOptions] = useState<OptionType[]>(options);
  const [localValue, setlocalValue] = useState<string>(
    value ? value.label : "Select"
  );

  //HANDLER WHEN USER SELECT AN ITEM IT CLOSE SELECTION BOX AND SEND NEW VALUE TO onSelect PROPS
  const itemSelectHandler = (e: OptionType): void => {
    setlocalValue(e.label);
    setshowItems(false);
    onSelect({ label: e.label, value: e.value });
    //SELECTION BOX WILL REMAIN EMPTY AFTER SEARCH AND THIS WILL FILL SELECTION BOX AFTER SELECT ITEM
    setlocalOptions(options);
  };

  //CLOSE SELECTION BOX WHEN USER CLICK OUTSIDE OF SELECTION BOX AREA
  const clickOutside = useCallback((e: MouseEvent): void => {
    if (SelectRef?.current.contains(e.target)) {
      return setshowItems(true);
    } else {
      //SELECTION BOX WILL REMAIN EMPTY AFTER SEARCH AND THIS WILL FILL SELECTION BOX AFTER SELECT ITEM
      setlocalOptions(options);
      return setshowItems(false);
    }
  }, []);

  //ADD EVENT LISTENER FOR WHEN USER CLICK OUTSIDE OF SELECTION BOX AND ATTACK clickOutside TO IT
  useEffect(() => {
    if (showItems) {
      window.addEventListener("click", clickOutside);
    }
    return () => window.removeEventListener("click", clickOutside);
  }, [showItems, clickOutside]);

  //ADD SEARCH FUNCTIONALITY FOR SELECTION BOX
  const searchHandler = (e: any) => {
    if (e.target.value && e.target.value.trim() && e.target.value.length > 3) {
      setlocalOptions([
        ...options.filter(
          (el) => el.label.toLowerCase() === e.target.value.toLowerCase()
        ),
      ]);
    } else {
      setlocalOptions(options);
    }
  };

  return (
    <div className="relative max-w-xs" {...rest} ref={SelectRef}>
      <div
        className="flex items-center py-1 px-3 mx-0.5 cursor-pointer border rounded-md"
        onClick={() => setshowItems((prev) => !prev)}
      >
        {localValue}
      </div>
      <div className="absolute left-0 top-10 max-h-44 w-full flex flex-col shadow-md z-50 overflow-y-auto">
        {showItems && (
          <div>
            <div className=" text-sm cursor-pointer bg-slate-50 hover:bg-slate-200">
              <input
                className="px-4 py-2 border border-slate-100 outline-none w-full "
                placeholder="Search (+3 letters)"
                onChange={(e) => searchHandler(e)}
              />
            </div>
            {localOptions.map((el: OptionType, index: number) => (
              <div
                className="px-4 py-2 text-sm cursor-pointer bg-slate-50 hover:bg-slate-200"
                key={`${el.label}-${index}`}
                onClick={() => itemSelectHandler(el)}
              >
                {el.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
