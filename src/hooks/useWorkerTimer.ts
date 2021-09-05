import { ChangeEvent, useRef } from "react";
import TimerPlocState from "../states/TimerPlocState";
import TogglePlocState from "../states/TogglePlocState";
import usePlocState from "../states/usePlocState";

const useWorkerTimer = () => {
  const timerPloc = useRef(new TimerPlocState());
  const timerState = usePlocState(timerPloc.current);

  const togglePloc = useRef(new TogglePlocState({
    toggle: false,
  }));
  const toggleState = usePlocState(togglePloc.current);

  const handleStartPause = timerPloc.current.handleStartOrPause;

  return ({
    toggleState: toggleState,
    timerState: timerState,
    handleEditTime: (e: any) => timerPloc.current.handleEditTimeVals(e.target.name, e.target.value),
    handleStartPause,
    handleReset: timerPloc.current.handleResetTimer,
    handleToggleEditTime: togglePloc.current.setToggle,
  });
};

export default useWorkerTimer;