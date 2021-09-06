import { SingleTimer } from "../../components/types";
import { DEFAULT_TIME_VALUES } from "../../config";
import { TimeValues } from "../../states/TimerPlocState";

const TimerStorage = {
  LSKey: "worker-timer",

  defaultTimers: [
    {
      timerId: 0,
      timeValues: DEFAULT_TIME_VALUES
    }
  ],

  getLSData(): SingleTimer[] {
    const data = localStorage.getItem(this.LSKey);
    if (!data) {
      return this.defaultTimers;
    }
    const parsed = JSON.parse(data);

    return !parsed.length ? this.defaultTimers : parsed;
  },

  setLSData(timers: SingleTimer[]) {
    const data = JSON.stringify(timers);
    localStorage.setItem(this.LSKey, data);
  },

  getTimersMaxId: (timers: SingleTimer[]) => {
    const ids = timers.map((t) => t.timerId);
    return Math.max(...ids);
  }
};

export default TimerStorage;
