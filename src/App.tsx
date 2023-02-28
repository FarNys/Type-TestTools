import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./Components/Actions/Input";

function App() {
  const [value, setvalue] = useState("");
  const def = "amir";
  const inputRef = useRef<any>(null);
  console.log(inputRef.current);

  const sendHandler = () => {
    console.log(inputRef.current.value);
  };

  const blurHandler = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div className="App" data-testid="app">
      <h1>h1 ALL</h1>
      <p>This Is Home</p>
      <div className="navbar_container" dir="rtl">
        <div className="navbar">
          <div className="logo_container">Downlo</div>
          <div className="search_container">
            <Input placeholder="Search" className="border-b-indigo-600" />
          </div>
          <div className="dd_container">DropDown</div>
          <div className="filler"></div>
          <input
            className="border"
            // onChange={(e) => setvalue(e.target.value)}
            // value={value}
            // defaultValue={def}
            ref={inputRef}
            onBlur={blurHandler}
          />
          <button className="border" onClick={sendHandler}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
