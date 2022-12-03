import { CyGetExist } from "../../TestFunctions";

const userText = "userName";
const passText = "Password";
const Send = "Send";

describe("Auth Page E2E Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("SUCCESS AUTH---Should go to Auth page - fill user and password and then press Send Add text", () => {
    cy.contains("Auth Page").click();
    CyGetExist("[role='button']");
    cy.contains("This is Auth").should("exist");
    cy.get("[role='button']").should("have.text", Send);
    cy.get("[data-testid='myData']").should("have.text", "");
    cy.get("[data-cy='username']").type(userText);
    cy.get("[data-cy='password']").type(passText);
    cy.get("[role='button']").click();
    cy.get("[role='button']").should("have.text", "Loading");
    cy.get("[data-testid='myData']").should("have.text", userText);
    cy.get("[role='button']").should("have.text", Send);
  });
});
