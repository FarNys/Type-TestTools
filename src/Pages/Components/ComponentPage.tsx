import React, { useRef, useState } from "react";
import Button from "../../Components/Actions/Button";
import Modal from "../../Components/Navigate/Portal";

type CountType = number;

const ComponentPage = () => {
  const [count, setcount] = useState<CountType>(0);
  const [modalIsOpen, setmodalIsOpen] = useState<boolean>(false);
  const btnRef = useRef(null);
  const openModalHanlder = () => {
    setmodalIsOpen((prev) => !prev);
  };

  return (
    <div>
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
    </div>
  );
};

export default ComponentPage;
