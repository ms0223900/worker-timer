import { Callback } from "common-types";
import { DEFAULT_TIME_VALUES, WORKER_PATH } from "config";
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from "react";
import AudioPlocState from "states/AudioPlocState";
import { context } from "states/context";
import { Listener } from "states/PlocState";
import DocumentTitleDisplayer from "utils/functions/DocumentTitleDisplayer";
import TimerPlocState, { TimerState, TimeValues } from "../states/TimerPlocState";
import TogglePlocState, { ToggleState } from "../states/TogglePlocState";
import usePlocState from "../states/usePlocState";

export interface UseWorkerTimerOptions {
  timerId: number
  timerName?: string
  initTimeVals?: TimeValues
  onTimeValuesChanged?: (timerId: number, timeVals: TimeValues) => any
  onTimerNameChanged: (id: number, timerName?: string) => any
  onPlayAudio: Callback
}

const useWorkerTimer = (options: UseWorkerTimerOptions) => {
  const {
    timerName,
    timerId,
    initTimeVals,
    onTimeValuesChanged,
    onTimerNameChanged,
    onPlayAudio,
  } = options;

  const ctxState = usePlocState(context);

  const getVolume = () => {
    // console.log(context.state.alarmVolume);
    return context.state.alarmVolume;
  };

  const worker = useRef<any>();
  const timerPloc = useRef(new TimerPlocState({
    // timerWorker: worker.current,
    timerId,
    timerName,
    timeValues: initTimeVals || DEFAULT_TIME_VALUES,
    onTimeupCb: (s) => {
      onPlayAudio({
        volume: getVolume(),
      });
      DocumentTitleDisplayer.handleRemoveTimeUpTime(s.timerId);
    }
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

  const handleEditTimerName = (e: ChangeEvent<any>) => {
    timerPloc.current.handleEditTimerName(e.target.value);
  };

  const handleTimeValueChanged = useCallback((_timeValues: TimeValues) => {
    onTimeValuesChanged && onTimeValuesChanged(timerId, {..._timeValues});
  }, [onTimeValuesChanged, timerId]);

  useEffect(() => {
    worker.current = new Worker(WORKER_PATH);
    timerPloc.current.registerUpdatingByTimerWorker(
      worker.current
    );
    timerPloc.current.addlistener((s) => {
      DocumentTitleDisplayer.handleAddOrUpdateTime(
        s.timerId,
        s.parsedMinSecStr,
      );
    }, s => [s.parsedMinSecStr, s.timerId]);
  }, []);

  useEffect(() => {
    const listener: Listener<TimerState> = (s) => {
      console.log(s.timerName);
      onTimerNameChanged(timerId, s.timerName);
    };
    timerPloc.current.addlistener(listener, s => [s.timerName]);
    return () => timerPloc.current.removeListener(listener);
  }, [onTimerNameChanged, timerId]);

  useEffect(() => {
    const listner: Listener<ToggleState> = s => {
      if(!s.toggle) {
        handleTimeValueChanged(timerPloc.current.state.timeValues);
      }
    };
    togglePloc.current.addlistener(listner, s => [s.toggle]);
    return () => togglePloc.current.removeListener(listner);
  }, [handleTimeValueChanged]);

  // useEffect(() => {
  //   console.log(ctxState.alarmVolume);
  // }, [ctxState.alarmVolume]);

  return ({
    ctxState,
    toggleState,
    timerState,
    handleEditTime,
    handleEditTimerName,
    handleStartPause,
    handleReset: timerPloc.current.handleResetTimer,
    handleToggleEditTime: togglePloc.current.setToggle,
  });
};

export default useWorkerTimer;