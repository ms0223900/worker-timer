import { Callback } from "../common-types";
import { TimeValues } from "../states/TimerPlocState";

export interface SingleTimer {
  timerId: number
  timeValues: TimeValues
}

export interface TimerItemProps {
  isEdit: boolean
  paused: boolean
  timeStr: string
  timeValues: TimeValues
  onStartPause: any
  onReset: any
  onDeleteTimer: any
  onEditTime: any
  onToggleEditTime: (toggle: boolean) => () => any
}

export interface TimerListProps {
  timerListData: SingleTimer[]
  onAddTimer: Callback
  onDeleteTimer: (id: number) => any
  onTimeValuesChanged: (id: number, timerVals: TimeValues) => any
}