import { Callback } from "common-types";
import { DEFAULT_TIME_VALUES } from "config";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from "react";
import AudioPlocState from "states/AudioPlocState";
import { Listener } from "states/PlocState";
import TimerPlocState, { TimerState, TimeValues } from "../states/TimerPlocState";
import TogglePlocState, { ToggleState } from "../states/TogglePlocState";
import usePlocState from "../states/usePlocState";

export interface UseWorkerTimerOptions {
  timerId: number
  initTimeVals?: TimeValues
  onTimeValuesChanged?: (timerId: number, timeVals: TimeValues) => any
  onPlayAudio: Callback
}

const useWorkerTimer = ({
  timerId,
  initTimeVals,
  onTimeValuesChanged,
  onPlayAudio,
}: UseWorkerTimerOptions) => {
  const timerPloc = useRef(new TimerPlocState({
    timeValues: initTimeVals || DEFAULT_TIME_VALUES,
    onTimeupCb: () => onPlayAudio()
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

  const handleTimeValueChanged = useCallback((_timeValues: TimeValues) => {
    onTimeValuesChanged && onTimeValuesChanged(timerId, {..._timeValues});
  }, [onTimeValuesChanged, timerId]);

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