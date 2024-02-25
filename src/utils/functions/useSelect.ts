import { Callback } from "common-types";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

const useSelect = (initSelectVal = '', onValChanged?: Callback) => {
  const handleValChanged = useRef(onValChanged);
  const [val, setVal] = useState(initSelectVal);

  const handleSelect = useCallback((e: ChangeEvent<any>) => {
    setVal(e.target.value);
  }, []);

  // handleValChanged.current = onValChanged;
  useEffect(() => {
    handleValChanged.current && handleValChanged.current(val);
  }, [val]);

  return ({
    val,
    handleSelect,
    setVal,
  });
};

export default useSelect;
