import React from "react";

interface Props {
  max: number;
  data: string;
}

export const CounterComponent: React.FC<Props> = ({ max, data }) => {
  return (
    <div className="counter">
      <p>
        {data.length}/{max}
      </p>
    </div>
  );
};
