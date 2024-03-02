import {TimerItemProps, TimerListProps} from "../components/types";
import {UseWorkerTimerOptions} from "../hooks/useWorkerTimer";

type PickedTimerItemProps = Pick<TimerItemProps, 'onDeleteTimer' | 'timerName'>

export interface TimerItemContainerProps extends UseWorkerTimerOptions, PickedTimerItemProps {
    // onSetTimeValues: SetTimeValuesFn
}

type PickedTimerListProps = Pick<TimerListProps, 'onTimerEnd'>

export interface TimerListContainerProps extends PickedTimerListProps {

}
