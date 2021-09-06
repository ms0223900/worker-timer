import { TimeValues } from "states/TimerPlocState";

export type Callback = (...params: any) => any


export type SetTimeValuesFn = (id: number, timeValues: TimeValues) => any