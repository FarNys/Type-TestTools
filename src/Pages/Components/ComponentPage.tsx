import React, { useRef, useState } from "react";
import Button from "../../Components/Actions/Button";
import Alert from "../../Components/DataDisplay/Alert";
import Card from "../../Components/Layout/Card";
import Container from "../../Components/Layout/Container";
import LinkText from "../../Components/Navigate/LinkText";
import Modal from "../../Components/Navigate/Portal";
import Typography from "../../Components/Typo/Typography";

type CountType = number;

const ComponentPage = () => {
  const [count, setcount] = useState<CountType>(0);
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);
  const btnRef = useRef(null);
  const openModalHanlder = () => {
    setmodalIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Card>
        <Button
          title="Add +1"
          data-testid="increment"
          role="button"
          // onClick={():void => setcount((prev) => prev + 1)}
          onClick={(): void => setcount((prev) => prev + 1)}
        />
        <Button
          title="Add -1"
          role="button"
          data-testid="decrement"
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
        This is <LinkText to="/todo">Todo</LinkText> Example
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
    </Container>
  );
};

export default ComponentPage;
