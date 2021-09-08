import TimerList from 'components/TimerList';
import useTimerList from 'hooks/useTimerList';
import React, { memo } from 'react';
import { TimerListContainerProps } from './types';

const TimerListContainer = (props: TimerListContainerProps) => {
  const {
    timerListState,
    handleAddTimer,
    handleRemoveTimer,
    handleSetTimeValues
  } = useTimerList();

  return (
    <TimerList 
      {...props}
      timerListData={timerListState.timerList}
      onAddTimer={() => handleAddTimer()}
      onDeleteTimer={handleRemoveTimer}
      onTimeValuesChanged={handleSetTimeValues}
    />
  );
};

export default memo(TimerListContainer);