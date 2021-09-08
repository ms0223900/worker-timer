import { TimerItemContainerProps } from "containers/types";
import { ChangeEvent } from "react";
import { Callback, SingleSelectorValText } from "../common-types";
import { TimeValues } from "../states/TimerPlocState";

export interface AudioSelectorProps {
  value: string
  selectorListData: SingleSelectorValText[]
  onChangeSelect: (e: ChangeEvent<any>) => any
}

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

export interface TimerListProps extends Pick<TimerItemContainerProps, 'onPlayAudio'> {
  timerListData: SingleTimer[]
  onAddTimer: Callback
  onDeleteTimer: (id: number) => any
  onTimeValuesChanged: (id: number, timerVals: TimeValues) => any
}