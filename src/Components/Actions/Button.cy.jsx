import Button from "./Button";

describe("Button", () => {
  it("Should Show Title AS Text", () => {
    cy.mount(<Button title="Title" />);
    cy.get("button").should("contains.text", "Title");
  });
});
