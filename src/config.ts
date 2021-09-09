import { TimeValues } from "./states/TimerPlocState";

export const WORKER_PATH = process.env.PUBLIC_URL + '/js/worker.js';
export const AUDIO_PATH = process.env.PUBLIC_URL + '/assets/sounds';

export enum WORKER_MESSAGES {
  'STOP' = 'stop',
  'START' = 'start',
  'TICK_FROM_WORKER' = 'tick-from-worker'
}

export const DEFAULT_TIME_VALUES: TimeValues = {
  mins: 5,
  secs: 0,
};