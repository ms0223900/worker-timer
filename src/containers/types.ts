import { Callback } from "../common-types";
import { TimerItemProps, TimerListProps } from "../components/types";
import { UseWorkerTimerOptions } from "../hooks/useWorkerTimer";
import { TimeValues } from "../states/TimerPlocState";

type PickedTimerItemProps = Pick<TimerItemProps, 'onDeleteTimer'>

export interface TimerItemContainerProps extends UseWorkerTimerOptions, PickedTimerItemProps {
  // onSetTimeValues: SetTimeValuesFn
}

type PickedTimerListProps = Pick<TimerListProps, 'onPlayAudio'>
export interface TimerListContainerProps extends PickedTimerListProps {
  
}