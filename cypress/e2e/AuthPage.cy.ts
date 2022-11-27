describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should be visible when it typed", () => {
    cy.get("[data-cy='username']").type("test");
    cy.get("[data-cy='username']").should("be.visible");
  });
});
