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
  beforeEach(() => {
    const onSelect = (e) => {
      console.log(e);
    };
    cy.mount(<DropDown options={optionList} onSelect={onSelect} />);
  });
  it("Init the test", () => {
    cy.get("#select-container").should("exist");
    cy.get("#select-box").should("exist");
    cy.get("#selection-box").should("not.exist");
  });
  it("should be clickable and open selection box and create list based on options props", () => {
    cy.get("#select-box").click();
    cy.get("#selection-box").should("exist");

    cy.get("#selection-box #select-item")
      .its("length")
      .should("be.eq", optionList.length);
  });
  it("should change value when click items of selection box", () => {
    cy.get("#select-box").should("contain", "").click();
    cy.get("#selection-box #select-item")
      .eq(4)
      .should("contain", optionList[4].label);
    cy.get("#selection-box #select-item").eq(3).click();
    cy.get("#select-box").should("contain", optionList[3].label);
  });
});
