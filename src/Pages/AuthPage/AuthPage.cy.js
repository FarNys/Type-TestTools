import AuthPage from "./AuthPage";

describe("<AuthPage>", () => {
  it("it should have username and password inputs", () => {
    cy.mount(<AuthPage />);
    cy.get("[data-cy='username']").should("be.visible");
    cy.get("[data-cy='password']").should("be.visible");
  });

  it("its should be filled by proper text", () => {
    cy.mount(<AuthPage />);
    cy.get("input[placeholder='username']")
      .type("user")
      .should("have.value", "user");
    cy.get("input[placeholder='password']")
      .type("password")
      .should("have.value", "password");
  });

  it("Button Should be disabled when inputs are empty", () => {
    cy.mount(<AuthPage />);
    cy.get("input[placeholder='username']").should("have.value", "");
    cy.get("input[placeholder='password']").should("have.value", "");
    cy.get("[role='button']").should("be.disabled");
  });

  it("Button Should be Enabled when inputs are not empty", () => {
    cy.mount(<AuthPage />);
    cy.get("input[placeholder='username']")
      .type("user")
      .should("have.value", "user");
    cy.get("input[placeholder='password']")
      .type("password")
      .should("have.value", "password");
    cy.get("[role='button']").should("not.be.disabled");
  });

  it("Button Text Should Change when we click Send And Add a text in result", () => {
    cy.mount(<AuthPage />);
    cy.get("input[placeholder='username']")
      .type("user")
      .should("have.value", "user");
    cy.get("input[placeholder='password']")
      .type("password")
      .should("have.value", "password");
    cy.get("[role='button']").click();
    cy.get("[role='button']").should("have.text", "Loading");
    cy.get("[data-cy='result']").should("have.text", "Farid");
  });
});
