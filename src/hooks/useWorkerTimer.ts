import { DEFAULT_TIME_VALUES } from "config";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { Listener } from "states/PlocState";
import TimerPlocState, { TimerState, TimeValues } from "../states/TimerPlocState";
import TogglePlocState, { ToggleState } from "../states/TogglePlocState";
import usePlocState from "../states/usePlocState";

export interface UseWorkerTimerOptions {
  timerId: number
  initTimeVals?: TimeValues
  onTimeValuesChanged?: (timerId: number, timeVals: TimeValues) => any
}

const useWorkerTimer = ({
  timerId,
  initTimeVals,
  onTimeValuesChanged,
}: UseWorkerTimerOptions) => {
  const timerPloc = useRef(new TimerPlocState({
    timeValues: initTimeVals || DEFAULT_TIME_VALUES,
  }));
  const timerState = usePlocState(timerPloc.current);

  const togglePloc = useRef(new TogglePlocState({
    toggle: false,
  }));
  const toggleState = usePlocState(togglePloc.current);

  const handleStartPause = timerPloc.current.handleStartOrPause;

  const handleEditTime = (e: any) => {
    timerPloc.current.handleEditTimeVals(e.target.name, e.target.value);
  };

  const handleTimeValueChanged = (_timeValues: TimeValues) => {
    onTimeValuesChanged && onTimeValuesChanged(timerId, {..._timeValues});
  };

  useEffect(() => {
    const listner: Listener<ToggleState> = s => {
      if(!s.toggle) {
        handleTimeValueChanged(timerPloc.current.state.timeValues);
      }
    };
    togglePloc.current.addlistener(listner, s => [s.toggle]);
    return () => togglePloc.current.removeListener(listner);
  }, [handleTimeValueChanged]);

  return ({
    toggleState: toggleState,
    timerState: timerState,
    handleEditTime,
    handleStartPause,
    handleReset: timerPloc.current.handleResetTimer,
    handleToggleEditTime: togglePloc.current.setToggle,
  });
};

export default useWorkerTimer;