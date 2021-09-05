import { useCallback, useEffect, useState } from "react";
import PlocState from "./PlocState";

const usePlocState = <S>(ploc: PlocState<S>) => {
  const [state, setState] = useState(ploc.state);

  useEffect(() => {
    const listener = (newState: S) => {
      // console.log(newState);
      setState(newState);
    };
    ploc.addlistener(listener);
    return () => ploc.removeListener(listener);
  }, [ploc]);

  return state;
};

export default usePlocState;