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

export const getNewTimerList = (timerId: number, newTimeVals?: TimeValues, timerName?: string) => (s: TimerListState): TimerListState['timerList'] => {
  let res: TimerListState['timerList'] = [...JSON.parse(JSON.stringify(s.timerList))];
    
  const timerIdx = s.timerList.findIndex(t => t.timerId === timerId);
  if(timerIdx !== -1) {
    // console.log(res[timerId]);
    const timer = res[timerIdx];
    res[timerIdx] = {
      ...timer,
      timeValues: newTimeVals || timer.timeValues,
      timerName: timerName || timer.timerName,
    };
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
      timerName: '',
      timeValues,
    });
  }

  private listenToTimeListChanged: Listener<TimerListState> = (s) => {
    TimerStorage.setLSData(s.timerList);
    return ({
      timerList: s.timerList,
    });
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

  handleUpdateTimerListByFn(getNewTimerListFn: (params: any) => SingleTimer[]) {
    this.updateState(s => {
      return ({
        timerList: getNewTimerListFn(s),
      });
    });
  }
}

export default TimerListPlocState;