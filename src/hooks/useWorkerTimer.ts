import { DEFAULT_TIME_VALUES } from "config";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import TimerPlocState, { TimeValues } from "../states/TimerPlocState";
import TogglePlocState from "../states/TogglePlocState";
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
    // onTimeValuesChangedCb: (_timeValues: TimeValues) => {
    //   onTimeValuesChanged && onTimeValuesChanged(timerId, _timeValues);
    // },
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

  useEffect(() => {
    timerPloc.current.updateState(s => ({
      onTimeValuesChangedCb: (_timeValues: TimeValues) => {
        console.log('onTimeValuesChangedCb');
        toggleState.toggle && onTimeValuesChanged && onTimeValuesChanged(timerId, {..._timeValues});
      }
    }));
  }, [onTimeValuesChanged, timerId, toggleState.toggle]);

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