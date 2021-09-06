import { SingleTimer } from "../components/types";
import { DEFAULT_TIME_VALUES } from "../config";
import TimerStorage from "../utils/handlers/TimerStorage";
import PlocState, { Listener } from "./PlocState";
import { TimeValues } from "./TimerPlocState";

export interface TimerListState {
  timerList: SingleTimer[]
  latestId: number
}

const defaultTimerListState: TimerListState = {
  latestId: 0,
  timerList: []
};

export const getNewTimerList = (timerId: number, newTimeVals: TimeValues) => (s: TimerListState): TimerListState['timerList'] => {
  let res: TimerListState['timerList'] = [...JSON.parse(JSON.stringify(s.timerList))];
    
  const timerIdx = s.timerList.findIndex(t => t.timerId === timerId);
  if(timerIdx !== -1) {
    res[timerIdx].timeValues = {...newTimeVals};
  }
  return res;
};

class TimerListPlocState extends PlocState<TimerListState> {
  constructor(initS?:  Partial<TimerListState>) {
    super({
      ...defaultTimerListState,
      ...initS,
    });
    this.addlistener(
      this.listenToTimeListChanged,
      s => [[...s.timerList]]
    );
  }

  private makeNewTimer = (id: number, timeValues = DEFAULT_TIME_VALUES): SingleTimer => {
    return ({
      timerId: id,
      timeValues,
    });
  }

  private listenToTimeListChanged: Listener<TimerListState> = (s) => {
    TimerStorage.setLSData(s.timerList);
    return ({
      timerList: s.timerList,
    });
  }

  private getNewTimerList = (timerId: number, newTimeVals: TimeValues) => (s: TimerListState) => {
    let res = [...JSON.parse(JSON.stringify(s.timerList))];
      
    const timerIdx = s.timerList.findIndex(t => t.timerId === timerId);
    if(timerIdx !== -1) {
      res[timerIdx].timeValues = JSON.parse(JSON.stringify(newTimeVals));
    }
    return res;
  }

  handleAddTimer = (timeValues?: TimeValues) => {
    this.updateState(s => {
      const newId = s.latestId + 1;
      return ({
        latestId: newId,
        timerList: [...s.timerList, this.makeNewTimer(newId, timeValues)]
      });
    });
  }

  handleRemoveTimer = (id: number) => {
    this.updateState(s => ({
      timerList: s.timerList.filter(t => t.timerId !== id)
    }));
  }

  handleSetTimeValues(getNewTimerListFn: (params: any) => SingleTimer[]) {
    this.updateState(s => {
      return ({
        timerList: getNewTimerListFn(s),
      });
    });
  }
}

export default TimerListPlocState;