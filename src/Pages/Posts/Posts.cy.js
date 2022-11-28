import { baseeUrl } from "../../Api/api";
import Posts from "./Posts";

describe("<Posts>", () => {
  it("It Should be visible when there is posts", () => {
    cy.mount(<Posts />);
    cy.get("[data-testid='postParent']").should("be.visible");
  });

  it("posts should have length of 4", () => {
    cy.mount(<Posts />);
    cy.get("[data-cy='single-post']").should("have.length", "4");
  });

  it("GET POST REQUEST And Check PageSize-Data", () => {
    cy.mount(<Posts />);
    cy.request(`${baseeUrl}/api/articles`).as("getPosts");
    cy.get("@getPosts").should((res) => {
      expect(res.body.meta.pagination.pageSize.toString()).to.be.equal("25");
      expect(res.body.data).to.have.length(4);
      expect(res.body.data[0].attributes.title).to.be.equal(
        "What should I be doing as a backend Django developer?"
      );
    });
  });
});
