import { useState } from "react";

export const useTextInputs = (initState, maxLength) => {
  const [state, setState] = useState(initState);
  const getValue = (e) => {
    const value = e.substring(0, maxLength);
    return value;
  };

  const handleChange = (e) => {
    setState(getValue(e));
  };
  return [state, handleChange, getValue];
};

export const useNumberInputs = (initState, maxLength) => {
  const [state, setState] = useState(initState);

  const getValue = (e) => {
    const number = e.replace(/[^0-9]/g, "");
    const value = number.substring(0, maxLength);
    return value;
  };

  const handleChange = (e) => {
    setState(getValue(e));
  };

  return [state, handleChange, getValue];
};
