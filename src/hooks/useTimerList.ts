import { useRef } from "react";
import TimerListPlocState, { getNewTimerList } from "states/TimerListPlocState";
import { TimeValues } from "states/TimerPlocState";
import usePlocState from "states/usePlocState";
import TimerStorage from "utils/handlers/TimerStorage";

const useTimerList = () => {
  const timerListPloc = useRef(new TimerListPlocState({
    latestId: TimerStorage.getTimersMaxId(
      TimerStorage.getLSData()
    ),
    timerList: TimerStorage.getLSData()
  }));
  const timerListState = usePlocState(timerListPloc.current);

  const {
    handleAddTimer,
    handleRemoveTimer,
  } = timerListPloc.current;

  const handleSetTimeValues = (id: number, timeValues: TimeValues) => {
    timerListPloc.current.handleUpdateTimerListByFn(
      getNewTimerList(id, timeValues)
    );
  };

  const handleSetTimerName = (id: number, timerName?: string) => {
    timerListPloc.current.handleUpdateTimerListByFn(
      getNewTimerList(id, undefined, timerName)
    );
  };

  return ({
    timerListState,
    handleAddTimer,
    handleSetTimeValues,
    handleSetTimerName,
    handleRemoveTimer,
  });
};

export default useTimerList;