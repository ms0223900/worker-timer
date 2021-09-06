import { Callback } from "../common-types";
import { TimerItemProps } from "../components/types";
import { UseWorkerTimerOptions } from "../hooks/useWorkerTimer";
import { TimeValues } from "../states/TimerPlocState";

type PickedTimerItemProps = Pick<TimerItemProps, 'onDeleteTimer'>

export interface TimerItemContainerProps extends UseWorkerTimerOptions, PickedTimerItemProps {
  // onSetTimeValues: SetTimeValuesFn
}