describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("TEST /posts page", () => {
    cy.contains("Get Posts").click();
    cy.get("[data-testid='postParent']").should("exist");
    cy.get("[data-cy='single-post']").should("have.length", 4);
    cy.url().should("include", "/");
  });
  // it("Should be visible when it typed", () => {
  //   cy.get("[data-cy='username']").type("test");
  //   cy.get("[data-cy='username']").should("be.visible");
  // });
});
