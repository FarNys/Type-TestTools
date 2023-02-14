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

const Dropdown = React.memo(
  ({ options, value, onSelect, ...rest }: DropdownType) => {
    const SelectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [showItems, setshowItems] = useState<boolean>(false);
    const [localOptions, setlocalOptions] = useState<OptionType[]>(options);
    const [localValue, setlocalValue] = useState<string>(
      value ? value.label : "Select"
    );

    //EFFECT TO FOCUS ON SEARCH INPUT EVERY TIME WE CLICK ON SELECTION BOX
    useEffect(() => {
      if (showItems) {
        inputRef?.current?.focus();
      }
    }, [showItems]);

    //HANDLER WHEN USER SELECT AN ITEM IT CLOSE SELECTION BOX AND SEND NEW VALUE TO onSelect PROPS
    const itemSelectHandler = (e: OptionType): void => {
      setlocalValue(e.label);
      setshowItems(false);
      onSelect({ label: e.label, value: e.value });
      //SELECTION BOX WILL REMAIN EMPTY AFTER SEARCH AND THIS WILL FILL SELECTION BOX AFTER SELECT ITEM
      setlocalOptions(options);
    };

    //CLOSE SELECTION BOX WHEN USER CLICK OUTSIDE OF SELECTION BOX AREA
    const clickOutside = useCallback((e: any): void => {
      if (SelectRef) {
        if (SelectRef.current?.contains(e.target)) {
          return setshowItems(true);
        } else {
          //SELECTION BOX WILL REMAIN EMPTY AFTER SEARCH AND THIS WILL FILL SELECTION BOX AFTER SELECT ITEM
          setlocalOptions(options);
          return setshowItems(false);
        }
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
      if (
        e.target.value &&
        e.target.value.trim() &&
        e.target.value.length >= 3
      ) {
        //REGEX SEARCH TO FIND ITEM IN OPTIONS
        setlocalOptions([
          ...options.filter((el) =>
            el.label.toLowerCase().match(e.target.value.trim().toLowerCase())
          ),
        ]);
        //
        // setlocalOptions([
        //   ...options.filter(
        //     (el) => el.label.toLowerCase() === e.target.value.toLowerCase()
        //   ),
        // ]);
      } else {
        setlocalOptions(options);
      }
    };
    return (
      <div
        className="relative max-w-xs"
        {...rest}
        ref={SelectRef}
        id="select-container"
      >
        <div
          className="flex items-center py-1 px-3 mx-0.5 cursor-pointer border rounded-md"
          id="select-box"
          onClick={() => setshowItems((prev) => !prev)}
        >
          {localValue}
        </div>
        <div className="absolute left-0 top-10 max-h-44 w-full flex flex-col shadow-md z-50 overflow-y-auto">
          {showItems && (
            <div id="selection-box">
              <div className=" text-sm cursor-pointer bg-slate-50 hover:bg-slate-200">
                <input
                  className="px-4 py-2 border border-slate-100 outline-none w-full "
                  placeholder="Search (3 letters at least)"
                  onChange={(e) => searchHandler(e)}
                  ref={inputRef}
                />
              </div>
              {localOptions.map((el: OptionType, index: number) => (
                <div
                  className="px-4 py-2 text-sm cursor-pointer bg-slate-50 hover:bg-slate-200"
                  id="select-item"
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
  }
);

export default Dropdown;
