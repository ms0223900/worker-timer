import { TimeValues } from "states/TimerPlocState";

export type Callback = (...params: any) => any


export type SetTimeValuesFn = (id: number, timeValues: TimeValues) => any

export interface SingleSelectorValText {
  text: string
  value: string
}