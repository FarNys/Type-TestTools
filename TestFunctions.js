export const CyGetExist = (item) => {
  cy.get(item).should("exist");
};
export const CyGetHaveText = (item, text) => {
  cy.get(item).should("have.text", text);
};
export const CyGetHaveNotText = (item, text) => {
  cy.get(item).should("not.have.text", text);
};
