describe("Go To TodoPage And Create 1 Task", () => {
  beforeEach(() => {
    cy.visit("/posts");
    cy.request("https://kavinotech.com/panel/api/articles").as("posts");
  });
  it("Get Post Request", () => {
    cy.get("@posts").should((response) => {
      expect(response.body).to.have.property("data");
      expect(response.body).to.have.property("meta");
      expect(response.body.data).to.have.property("length");
      Cypress.$.each(response.body.data, (index, item) => {
        expect(item).to.have.property("id");
        expect(item).to.have.property("attributes");
      });
    });
  });
});
