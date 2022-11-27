import AuthPage from "./AuthPage";

describe("<AuthPage>", () => {
  it("it should have username and password inputs", () => {
    cy.mount(<AuthPage />);
    cy.get("[data-cy='username']").should("be.visible");
    cy.get("[data-cy='password']").should("be.visible");
  });

  it("its should be filled by proper text", () => {
    cy.mount(<AuthPage />);
    cy.get("input[placeholder='username']").type("user");
    cy.get("input[placeholder='password']").type("password");
    cy.get("button[role='button']").click();
    cy.get("[data-cy='result']").should("have.value", "Farid");
  });
});
