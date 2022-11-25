import { waitFor, render, screen, fireEvent } from "@testing-library/react";

import AuthPage from "./AuthPage";

test("Should Have Username And Password Input", () => {
  render(<AuthPage />);

  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");

  expect(usernameInputEl).toBeInTheDocument();
  expect(passwordInputEl).toBeInTheDocument();
});

test("Send Button Should Be Disable if Input empty", () => {
  render(<AuthPage />);

  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");
  const buttonEl = screen.getByRole("button");

  const userValue = "test";
  const passValue = "password";

  fireEvent.click(usernameInputEl, { target: { value: userValue } });
  fireEvent.click(passwordInputEl, { target: { value: passValue } });

  //   expect(buttonEl).toBeInTheDocument();
});
