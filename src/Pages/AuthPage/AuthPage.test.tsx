import { waitFor, render, screen, fireEvent } from "@testing-library/react";

import AuthPage from "./AuthPage";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("Should Have Username And Password Input", () => {
  render(<AuthPage />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText("password");
  expect(usernameInputEl).toBeInTheDocument();
  expect(passwordInputEl).toBeInTheDocument();
});

test("Should Be Username And Password Input Empty At First", () => {
  render(<AuthPage />);
  const usernameInputEl: HTMLInputElement =
    screen.getByPlaceholderText(/username/i);
  const passwordInputEl: HTMLInputElement =
    screen.getByPlaceholderText("password");
  expect(usernameInputEl.value).toBe("");
  expect(passwordInputEl.value).toBe("");
});

test("Send Button Should Not Be Disable if Inputs (username or password) arent Empty", () => {
  render(<AuthPage />);
  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");
  const buttonEl = screen.getByRole("button");
  const testValue = "test";
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(buttonEl).not.toBeDisabled();
});

test("Send Button Should Be Disable if Inputs (username or password) Are empty", () => {
  render(<AuthPage />);
  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");
  const buttonEl = screen.getByRole("button");
  const testValue = "";
  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(buttonEl).toBeDisabled();
});

test("Send Button Text change to Loading when Click", () => {
  render(<AuthPage />);
  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");
  const buttonEl = screen.getByRole("button");
  const userValue = "test";
  const passValue = "password";
  fireEvent.change(usernameInputEl, { target: { value: userValue } });
  fireEvent.change(passwordInputEl, { target: { value: passValue } });
  fireEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/Loading/i);
});

test("No Loading text after sending", async () => {
  render(<AuthPage />);
  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");
  const buttonEl = screen.getByRole("button");
  const userValue = "test";
  const passValue = "password";
  fireEvent.change(usernameInputEl, { target: { value: userValue } });
  fireEvent.change(passwordInputEl, { target: { value: passValue } });
  fireEvent.click(buttonEl);
  await waitFor(() => expect(buttonEl).toHaveTextContent("Send"));
});

test("Has no my data in start", () => {
  render(<AuthPage />);
  const getDivEl = screen.getByTestId("myData");
  expect(getDivEl).toHaveTextContent("");
});

test("Has Data after press Send Button", async () => {
  render(<AuthPage />);
  const usernameInputEl = screen.getByPlaceholderText("username");
  const passwordInputEl = screen.getByPlaceholderText("password");
  const buttonEl = screen.getByRole("button");
  const getDivEl = screen.getByTestId("myData");

  const userValue = "test";
  const passValue = "password";
  fireEvent.change(usernameInputEl, { target: { value: userValue } });
  fireEvent.change(passwordInputEl, { target: { value: passValue } });
  fireEvent.click(buttonEl);
  await waitFor(() => expect(getDivEl).toHaveTextContent("Farid"));
});
