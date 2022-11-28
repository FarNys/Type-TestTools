import ComponentPage from "./ComponentPage";

describe("<AuthPage>", () => {
  it("Should have Increase And decrease button", () => {
    cy.mount(<ComponentPage />);
    cy.get("[data-testid='decrement']").should("have.text", "Add -1");
    cy.get("[data-testid='increment']").should("have.text", "Add +1");
  });

  it("Decrease button should decrease value by 1", () => {
    cy.mount(<ComponentPage />);
    cy.get("[data-testid='decrement']").click();
    cy.get("[data-testid='countValue']").should("have.text", "-1");
  });

  it("Increase button should increase value by 1", () => {
    cy.mount(<ComponentPage />);
    cy.get("[data-testid='increment']").click();
    cy.get("[data-testid='countValue']").should("have.text", "1");
  });
});
