import { TimeValues } from "./states/TimerPlocState";

export const WORKER_PATH = 'js/worker.js';

export enum WORKER_MESSAGES {
  'STOP' = 'stop',
  'START' = 'start',
  'TICK_FROM_WORKER' = 'tick-from-worker'
}

export const DEFAULT_TIME_VALUES: TimeValues = {
  mins: 5,
  secs: 0,
};