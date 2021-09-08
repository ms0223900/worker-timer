import { Callback, SetTimeValuesFn } from "common-types";
import { WORKER_MESSAGES, WORKER_PATH } from "../config";
import parseSecsToMinSec from "../utils/functions/parseSecsToMinSec";
import PlocState, { Listener, } from "./PlocState";

const getRemainSecs = (timeVals: TimeValues, passedSecs: number) => (
  timeVals.mins * 60 + timeVals.secs - passedSecs
);

export interface TimeValues {
  mins: number;
  secs: number;
}

export interface TimerState {
  timerName?: string
  remainSecs: number
  passedSecs: number
  paused: boolean
  timeValues: TimeValues
  parsedMinSecStr: string
  onTimeupCb?: Callback
  onTimeValuesChangedCb?: (timeValues: TimeValues) => any
}

export const initTimerState: TimerState = {
  timerName: '',
  remainSecs: 0,
  passedSecs: 0,
  paused: true,
  timeValues: {
    mins: 1,
    secs: 0,
  },
  parsedMinSecStr: '',
};

class TimerPlocState extends PlocState<TimerState> {
  timerWorker = new Worker(WORKER_PATH)

  constructor(initState?: Partial<TimerState>) {
    super({
      ...initTimerState,
      ...initState,
    });
    this.updateByTimerWorker();

    this.updateState(s => ({
      remainSecs: getRemainSecs(s.timeValues, s.passedSecs),
    }));
    this.updateState(s => ({
      parsedMinSecStr: parseSecsToMinSec(s.remainSecs)
    }));

    this.addlistener(s => {
      const remainSecs = getRemainSecs(s.timeValues, s.passedSecs);
      const parsedMinSecStr = parseSecsToMinSec(remainSecs);
      return ({
        remainSecs,
        parsedMinSecStr,
      });
    }, s => [s.passedSecs, s.timeValues, ]);

    this.addlistener(
      this.updateByRemainSecs,
      s => [s.remainSecs, s.paused]
    );
  }

  handleResetTimer = () => {
    console.log('reset');
    this.handlePauseTimer();
    this.updateState(s => ({
      passedSecs: 0,
      // parsedMinSecStr: parseSecsToMinSec(s.remainSecs)
    }));
  }

  handlePauseTimer() {
    console.log('timer paused');
    this.updateState(s => ({
      paused: true 
    }));
    this.timerWorker.postMessage(WORKER_MESSAGES.STOP);
  }

  handleStartTimer = () => {
    console.log('timer started');
    this.updateState(s => ({
      paused: false,
    }));
    this.timerWorker.postMessage(WORKER_MESSAGES.START);
  }

  handleStartOrPause = (_pause?: boolean) => {
    const { paused } = this.state;
    let newPaused = !paused;
    if(typeof _pause === 'boolean') {
      newPaused = _pause;
    }
    if(newPaused) {
      this.handlePauseTimer();
    } else {
      this.handleStartTimer();
    }
  }

  handleEditTimeVals = (name: any, val: string) => {
    this.updateState((s) => ({
      timeValues: ({
        ...s.timeValues,
        [name]: Number(val) < 0 ? 0 : Number(val)
      })
    }));
  }

  handleEditTimerName = (tName: string) => {
    this.updateState(s => ({
      timerName: tName,
    }));
  }

  handleAddPassedSecs() {
    !this.state.paused && this.updateState((s) => ({
      passedSecs: s.passedSecs + 1,
    }));
  }

  private updateByTimerWorker() {
    const tick = (e: MessageEvent<any>) => {
      if(e.data === WORKER_MESSAGES.TICK_FROM_WORKER) {
        this.handleAddPassedSecs();
      }
    };

    this.timerWorker.addEventListener('message', tick);
    return () => {
      this.timerWorker.removeEventListener('message', tick);
      this.timerWorker.postMessage(WORKER_MESSAGES.STOP);
    };
  }

  private updateByRemainSecs: Listener<TimerState> = (s) => {
    if(s.remainSecs < 0 && !s.paused) {
      this.handleResetTimer();
      s.onTimeupCb && s.onTimeupCb();
    }
  }
}

export default TimerPlocState;