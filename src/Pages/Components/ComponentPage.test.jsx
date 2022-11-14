import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ComponentPage from "./ComponentPage";

test("Check Incrementing Btn", () => {
  render(<ComponentPage />);

  const incrementBtn = screen.getByTestId("increment");
  const decrementBtn = screen.getByTestId("decrement");
  const countValue = screen.getByTestId("countValue");
  fireEvent.click(incrementBtn);
  expect(countValue).toHaveTextContent("1");
});

test("Check Decrementing Btn", () => {
  render(<ComponentPage />);

  const decrementBtn = screen.getByTestId("decrement");
  const countValue = screen.getByTestId("countValue");
  fireEvent.click(decrementBtn);
  expect(countValue).toHaveTextContent("-1");
});
