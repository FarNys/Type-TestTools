import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Actions/Button";
import Alert from "../../Components/DataDisplay/Alert";
import Badge from "../../Components/DataDisplay/Badge";
import DataCard from "../../Components/DataDisplay/DataCard";
import Loading from "../../Components/DataDisplay/Loading";
import SquareLoading from "../../Components/DataDisplay/SquareLoading";
import InputGroup from "../../Components/DataInput/InputGroup";
import Accordion from "../../Components/Layout/Accordion";
import Card from "../../Components/Layout/Card";
import Container from "../../Components/Layout/Container";
import LinkText from "../../Components/Navigate/LinkText";
import Modal from "../../Components/Navigate/Portal";
import Typography from "../../Components/Typo/Typography";
import Modals from "../../Components/Actions/Modals";
import Dropdown, { OptionType } from "../../Components/Actions/Dropdown";
import DropdownMulti from "../../Components/Actions/DropdownMulti";
import Toggle from "../../Components/DataInput/Toggle";
import Checkbox from "../../Components/DataInput/Checkbox";
import Tabs from "../../Components/Navigate/Tabs";
import RangeSlider from "../../Components/DataInput/RangeSlider";
import Toast from "../../Components/DataDisplay/Toast";
import Carousel from "../../Components/DataDisplay/Carousel";
import { toastCreator } from "../../functions/toastCreator";

const ComponentPage = () => {
  const [count, setcount] = useState<number>(0);
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);
  const [modalOpen, setmodalOpen] = useState<boolean>(false);
  const [isToast, setisToast] = useState<boolean>(false);
  const [isToastShow, setisToastShow] = useState<boolean>(false);
  const btnRef = useRef(null);
  const openModalHanlder = () => {
    setmodalIsOpen((prev) => !prev);
  };
  //MODAL CONTROLLER
  const openModalStateHandler = () => {
    setmodalOpen(true);
  };

  //DROPDOWN SELECT VALUE
  const selectDataHandler = (e: OptionType): void => {
    console.log(e);
  };
  //DROPDWON MULTI SELECT HANDLER
  const selectMultiHandler = (e: OptionType[]): void => {
    console.log(e);
  };

  //TOGGLE HANDLER FOR CHECKBOX
  const changeToggleHandler = (e: boolean) => {
    console.log(e);
  };

  //CHECKBOX HANDLER TO CONTROL STATE IN PARENT
  const changeCheckboxHandler = (e: boolean) => {
    console.log(e);
  };

  //HANDLER TO GET RANGE SLIDER SELECTED VALUE
  const selectedValueHandler = (e: number) => {
    console.log(e);
  };

  return (
    <Container>
      {/* <Card>
        <Button
          title="Add +1"
          data-testid="increment"
          role="button"
          variant="default"
          size="sm"
          // onClick={():void => setcount((prev) => prev + 1)}
          onClick={(): void => setcount((prev) => prev + 1)}
        />
        <Button
          title="Add -1"
          role="button"
          data-testid="decrement"
          variant="default"
          size="md"
          onClick={(): void => setcount((prev) => prev - 1)}
          ref={btnRef}
        />
        <p data-testid="countValue">{count}</p>
      </Card>
      <Card>
        <Button
          title="OpenModal"
          className="mx-2 bg-blue-500 text-white hover:bg-blue-600 hover:scale-95 focus:bg-blue-700"
          onClick={openModalHanlder}
          size="md"
          variant="warning"
        />
        {modalIsOpen && (
          <Modal show={true}>
            <div className="kl">Vladiagro</div>
          </Modal>
        )}
      </Card>
      <Card>
        <Typography variant="h1">Test Typography h1</Typography>
        <Typography variant="h2">Test Typography h2</Typography>
        <Typography variant="h3">Test Typography h3</Typography>
        <Typography variant="h4">Test Typography h4</Typography>
        <Typography variant="h5">Test Typography h5</Typography>
        <Typography variant="h6">Test Typography h6</Typography>
        <Typography variant="p">Test Typography p</Typography>
      </Card>
      <Card>
        This is <LinkText to="/todo">Link</LinkText> Example
      </Card>
      <Card>
        <Typography variant="h5" className="mt-2 mb-1 ">
          Success Alert
        </Typography>
        <Alert variant="success" title="Your purchase has been confirmed!" />
        <Typography variant="h5" className="mt-2 mb-1">
          Danger Alert
        </Typography>
        <Alert variant="danger" title="Error! Task failed successfully." />
        <Typography variant="h5" className="mt-2 mb-1">
          Info Alert
        </Typography>
        <Alert variant="info" title="New software update available." />
        <Typography variant="h5" className="mt-2 mb-1">
          Warning Alert
        </Typography>

        <Alert
          variant="warning"
          title="Warning: Invalid email address!
"
        />
      </Card>
      <Card>
        <Typography variant="p" colorVariant="default">
          p element with default Variant
        </Typography>
        <Typography variant="p" colorVariant="success">
          p element with success Variant
        </Typography>
        <Typography variant="p" colorVariant="danger">
          p element with danger Variant
        </Typography>
        <Typography variant="p" colorVariant="info">
          p element with info Variant
        </Typography>
        <Typography variant="p" colorVariant="warning">
          p element with warning Variant
        </Typography>
      </Card>
      <Card>
        <Badge text="success" variant="success" />
        <Badge text="danger" variant="danger" />
        <Badge text="info" variant="info" />
        <Badge text="warning" variant="warning" />
      </Card>
      <Card>
        <Loading />
        <SquareLoading />
      </Card>
      <Card>
        <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-2 sm:grid-cols-1 mx-auto">
          <DataCard
            content="You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more."
            title="Title"
            imageUrl="https://www.immune-image.eu/wp-content/uploads/2020/01/publications-immune-image.jpg"
          />
          <DataCard
            content="You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more."
            title="Title"
            imageUrl="https://www.immune-image.eu/wp-content/uploads/2020/01/publications-immune-image.jpg"
          />
          <DataCard
            content="You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more."
            title="Title"
            imageUrl="https://www.immune-image.eu/wp-content/uploads/2020/01/publications-immune-image.jpg"
          />
          <DataCard
            content="You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more."
            title="Title"
            imageUrl="https://www.immune-image.eu/wp-content/uploads/2020/01/publications-immune-image.jpg"
          />
        </div>
      </Card> */}
      <Card>
        <Accordion data={accordionData} />
      </Card>
      <Card>
        <InputGroup label="title" name="input-name" />
        <InputGroup label="title-ko" name="input-name-2" />
      </Card>
      <Card>
        <Button onClick={openModalStateHandler} size="md" variant="default">
          Open Modal
        </Button>
      </Card>

      <Card>
        <Dropdown options={optionList} onSelect={selectDataHandler} />
      </Card>
      <Card>
        <DropdownMulti options={optionList} onSelect={selectMultiHandler} />
      </Card>
      <Card>
        <Toggle
          onChange={changeToggleHandler}
          isChecked={true}
          variant="danger"
        />
      </Card>
      <Card>
        <Checkbox
          onChange={changeCheckboxHandler}
          isChecked={true}
          variant="warning"
        />
      </Card>
      <Card>
        <Button
          // onClick={() => setshowToastPortal(true)}
          onClick={() =>
            toastCreator("<div><h1>H1 IS HERE</h1></div>", "success")
          }
          size="sm"
          variant="default"
          title="Portal Toast"
        />
      </Card>
      <Card>
        <Tabs tabsValue={tabsItem} variant="info" />
      </Card>
      <Card>
        <RangeSlider
          minValue={26584}
          maxValue={36598}
          selectedValue={selectedValueHandler}
        />
      </Card>
      <Card>
        <Button size="md" variant="default" onClick={() => setisToast(true)}>
          Show Toast
        </Button>
        <Button
          size="md"
          variant="default"
          onClick={() => setisToastShow(true)}
        >
          Show Toast 2
        </Button>
      </Card>
      <Card>
        <Carousel />
      </Card>

      <Toast
        toastText="TS2739: Type '{}' is missing the follow"
        showToast={isToast}
        setshowToast={setisToast}
        variant="info"
      />
      <Toast
        toastText="TS2739: Danger Toastthe follow"
        showToast={isToastShow}
        setshowToast={setisToastShow}
        variant="danger"
      />
      {/* <ToastPortal
        toastText="This is For Test"
        showToastPortal={showToastPortal}
        setshowToastPortal={setshowToastPortal}
      /> */}
      <Modals setisOpren={setmodalOpen} isOpen={modalOpen} title="Modal Header">
        <Typography variant="p">Do you want to exit?</Typography>
        <div className="flex w-full justify-end">
          <Button size="sm" variant="info" onClick={() => setmodalOpen(false)}>
            Yes
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setmodalOpen(false)}
          >
            No
          </Button>
        </div>
      </Modals>
    </Container>
  );
};

export default ComponentPage;

const tabsItem = [
  {
    title: "TAB-1",
    id: "1",
    content: <div>THIS IS First Item</div>,
  },
  {
    title: "TAB-2",
    id: "2",
    content: <div>THIS IS Second Item</div>,
  },
  {
    title: "TAB-3",
    id: "3",
    content: <div>THIS IS Third Item</div>,
  },
];

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
];

const accordionData = [
  {
    title: "Parent-1",
    children: [
      {
        title: "childrensSz-1",
      },
      {
        title: "child-2",
      },
    ],
  },
  {
    title: "Parent-2",
    children: [
      {
        title: "child-2-1",
      },
    ],
  },
  {
    title: "Parent-3",
    children: [
      {
        title: "child-3-1",
      },
      {
        title: "child-3-2",
      },
    ],
  },
];
