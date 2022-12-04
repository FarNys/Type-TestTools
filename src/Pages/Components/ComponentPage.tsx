import React, { useState } from "react";
import Button from "../../Components/Actions/Button";

type CountType = number;

const ComponentPage = () => {
  const [count, setcount] = useState<CountType>(0);

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
      />
      <p data-testid="countValue">{count}</p>
      <Button
        title="Tailwind"
        className="mx-2 bg-blue-500 text-white hover:bg-blue-600 hover:scale-95 focus:bg-blue-700"
      />
    </div>
  );
};

export default ComponentPage;
