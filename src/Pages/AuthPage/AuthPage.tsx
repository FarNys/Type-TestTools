import React, { useState } from "react";
import Button from "../../Components/Button";
import { FormType } from "./AuthPageType";

const AuthPage = () => {
  const [formData, setformData] = useState<FormType>({
    username: "",
    password: "",
  });
  const sendHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log(formData);
  };
  const changeFormHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <label htmlFor="username">UserName</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="username"
          onChange={changeFormHandler}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          onChange={changeFormHandler}
        />
        <Button title="Send" onClick={sendHandler} role="button" />
      </form>
    </div>
  );
};

export default AuthPage;
