import React, { useState } from "react";
import Button from "../../Components/Button";
import { FormType } from "./AuthPageType";

const AuthPage = () => {
  const [btnTitle, setbtnTitle] = useState("Send");
  const [myData, setmyData] = useState("");
  const [formData, setformData] = useState<FormType>({
    username: "",
    password: "",
  });
  const sendHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log(formData);
    setbtnTitle("Loading");
    setTimeout(() => {
      setbtnTitle("Send");
      setmyData(formData.username);
    }, 300);
  };
  const changeFormHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>This is Auth</h1>
      <form>
        <label htmlFor="username">UserName</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="username"
          data-cy="username"
          onChange={changeFormHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          data-cy="password"
          onChange={changeFormHandler}
        />
        <Button
          title={btnTitle}
          onClick={sendHandler}
          role="button"
          disabled={!formData.username || !formData.password}
        />
        <div data-testid="myData" data-cy="result">
          {myData}
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
