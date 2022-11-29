describe("Go To TodoPage And Create 1 Task", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("TEST /todo Page --- FILL ALL FIELD --- CREATE BUTTON --- ADD TASK --- CLEAR INPUTS", () => {
    cy.contains("Todo Page").click();
    cy.contains("TODO LIST").should("exist");
    cy.get("input[name='title']").type("title").should("have.value", "title");
    cy.get("input[name='desc']").type("desc").should("have.value", "desc");
    cy.get("input[type='number']").type(5).should("have.value", 5);
    cy.get("button[type='submit']").click();
    cy.get("[data-cy='single-todo']").should("have.length", 1);
    cy.get("input[name='title']").should("have.value", "");
    cy.get("input[name='desc']").should("have.value", "");
    cy.get("input[type='number']").should("have.value", "");
    cy.get("[data-cy='single-todo']")
      .eq(0)
      .find("h4")
      .should("contain", "title");
    cy.get("[data-cy='single-todo']").eq(0).find("p").should("contain", "desc");

    //ADD SECOND TASK
    cy.get("input[name='title']").type("title-2");
    cy.get("input[name='desc']").type("desc-2");
    cy.get("input[type='number']").type(10);

    cy.get("button[type='submit']").click();
    cy.get("[data-cy='single-todo']")
      .eq(1)
      .find("h4")
      .should("contain", "title-2");
    cy.get("[data-cy='single-todo']")
      .eq(1)
      .find("p")
      .should("contain", "desc-2");
  });
});
