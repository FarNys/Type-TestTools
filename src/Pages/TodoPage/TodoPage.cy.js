import { baseeUrl } from "../../Api/api";
import TodoPage from "./TodoPage";

describe("<TodoPage>", () => {
  it("It Should render 2 text input --- 1 number input --- 1 button", () => {
    cy.mount(<TodoPage />);
    cy.get("input[type='text']").should("have.length", 2);
    cy.get("input[type='number']").should("have.length", 1);
    cy.get("button[type='submit']").should("be.visible");
  });

  it("Inputs Should Be Filled Correctly based on their name", () => {
    cy.mount(<TodoPage />);
    cy.get("input[name='title']").type("title").should("have.value", "title");
    cy.get("input[name='desc']").type("desc").should("have.value", "desc");
    cy.get("input[type='number']").type(5).should("have.value", 5);
  });

  it("it should not create todo list if ID is empty", () => {
    cy.mount(<TodoPage />);
    cy.get("input[type='number']").type(" ");
    cy.get("button[type='submit']").click();
    cy.get("[data-cy='create-error']").should("have.text", "Fill All Fields");
  });
  it("it should not create todo list if Name is empty", () => {
    cy.mount(<TodoPage />);
    cy.get("input[name='title']").type(" ");
    cy.get("button[type='submit']").click();
    cy.get("[data-cy='create-error']").should("have.text", "Fill All Fields");
  });
  it("it should not create todo list if Desc is empty", () => {
    cy.mount(<TodoPage />);
    cy.get("input[name='desc']").type(" ");
    cy.get("button[type='submit']").click();
    cy.get("[data-cy='create-error']").should("have.text", "Fill All Fields");
  });

  it("it should Create todo list if all inputs are filled and also error not appear", () => {
    cy.mount(<TodoPage />);
    cy.get("input[name='title']").type("title").should("have.value", "title");
    cy.get("input[name='desc']").type("desc").should("have.value", "desc");
    cy.get("input[type='number']").type(5).should("have.value", 5);
    cy.get("button[type='submit']").click();
    cy.get("[data-cy='single-todo']").should("have.length", 1);
    cy.get("[data-cy='create-error']").should("not.exist");
  });

  it("it should remove inputs after successful create", () => {
    cy.mount(<TodoPage />);
    cy.get("input[name='title']").type("title").should("have.value", "title");
    cy.get("input[name='desc']").type("desc").should("have.value", "desc");
    cy.get("input[type='number']").type(5).should("have.value", 5);
    cy.get("button[type='submit']").click();
    cy.get("input[name='title']").should("have.value", "");
    cy.get("input[name='desc']").should("have.value", "");
    cy.get("input[type='number']").should("have.value", "");
  });
});
