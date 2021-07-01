import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incPrecision, decPrecision } from "../features/bookSlice";
import "./PrecisionControl.css"

const PrecisionControl = () => {
  const precision = useSelector((state) => state.books.precision);
  const dispatch = useDispatch();

  return (
    <div className="row">
      <button
        className="button"
        aria-label="Decrement value"
        onClick={() => dispatch(decPrecision())}
      >
        -
      </button>
      <div className="precision">{precision}</div>
      <button
        className="button"
        aria-label="Increment value"
        onClick={() => dispatch(incPrecision())}
      >
        +
      </button>
    </div>
  );
};

export default PrecisionControl;
