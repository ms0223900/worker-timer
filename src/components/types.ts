import {TimerItemContainerProps} from "containers/types";
import {UseWorkerTimerOptions} from "hooks/useWorkerTimer";
import {ChangeEvent} from "react";
import {Callback, SingleSelectorValText} from "../common-types";
import {TimeValues} from "../states/TimerPlocState";

export interface AudioSelectorProps {
    value: string
    selectorListData: SingleSelectorValText[]
    onChangeSelect: (e: ChangeEvent<any>) => any
}

export interface SingleTimer {
    timerId: number
    timerName?: string
    timeValues: TimeValues
}

export interface TimerItemProps {
    timerName?: string
    isEdit: boolean
    paused: boolean
    timeStr: string
    timeValues: TimeValues
    onStartPause: Callback
    onReset: Callback
    onDeleteTimer: Callback
    onEditTime: Callback
    onEditTimerName: (e: ChangeEvent<any>) => any
    onToggleEditTime: (toggle: boolean) => () => any
}

type PickedUseWorkerTimerOptions = Pick<UseWorkerTimerOptions, 'onTimeValuesChanged' | 'onTimerNameChanged'>

export interface TimerListProps extends Pick<TimerItemContainerProps, 'onTimerEnd'>, PickedUseWorkerTimerOptions {
    timerListData: SingleTimer[]
    onAddTimer: Callback
    onDeleteTimer: (id: number) => any
}
