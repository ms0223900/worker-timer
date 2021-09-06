import { useRef } from "react";
import TimerListPlocState, { getNewTimerList } from "states/TimerListPlocState";
import { TimeValues } from "states/TimerPlocState";
import usePlocState from "states/usePlocState";
import TimerStorage from "utils/handlers/TimerStorage";

const useTimerList = () => {
  const timerListPloc = useRef(new TimerListPlocState({
    timerList: TimerStorage.getLSData()
  }));
  const timerListState = usePlocState(timerListPloc.current);

  const {
    handleAddTimer,
    handleRemoveTimer,
  } = timerListPloc.current;

  const handleSetTimeValues = (id: number, timeValues: TimeValues) => {
    timerListPloc.current.handleSetTimeValues(
      getNewTimerList(id, timeValues)
    );
  };

  return ({
    timerListState,
    handleAddTimer,
    handleSetTimeValues,
    handleRemoveTimer,
  });
};

export default useTimerList;