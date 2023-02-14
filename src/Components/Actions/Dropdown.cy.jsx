import DropDown from "./Dropdown";

const optionList = [
  {
    label: "L-One",
    value: "Label One",
  },
  {
    label: "L-Two",
    value: "Label Two",
  },
  {
    label: "Mixer",
    value: "Label 3",
  },
  {
    label: "TaBLING",
    value: "Label 4",
  },
  {
    label: "Revol",
    value: "Label 5",
  },
  {
    label: "Kickso",
    value: "Label 6",
  },
  {
    label: "VeloNe",
    value: "Label 7",
  },
  {
    label: "Brand",
    value: "Label 8",
  },
  {
    label: "Brand-9",
    value: "Label 9",
  },
  {
    label: "Brand-10",
    value: "Label 10",
  },
  {
    label: "Brand-11",
    value: "Label 11",
  },
];

describe("Dropdown Test", () => {
  it("Should Show Title AS Text", () => {
    const onSelect = cy.stub();

    cy.mount(<DropDown options={optionList} onSelect={onSelect} />);
    cy.get("#select-container").should("exist");
    cy.get("#select-box").should("exist");
    cy.get("#selection-box").should("not.exist");
    cy.get("#select-box").click("");
    cy.get("#selection-box").should("exist");
    cy.get("#select-item").its("length").should("be.eq", 2);
  });
});
