import Button from "./Button";
import { waitFor, render, screen } from "@testing-library/react";

describe("Test Button", () => {
  render(<Button />);

  test("It Should Have ClassName", () => {
    const button = screen.getByTestId("button");
    expect(button).toHaveClass("btn-class");
  });
});
