import TimerList from 'components/TimerList';
import useTimerList from 'hooks/useTimerList';
import React, { memo } from 'react';

const TimerListContainer = () => {
  const {
    timerListState,
    handleAddTimer,
    handleRemoveTimer,
    handleSetTimeValues
  } = useTimerList();

  return (
    <TimerList 
      timerListData={timerListState.timerList}
      onAddTimer={() => handleAddTimer()}
      onDeleteTimer={handleRemoveTimer}
      onTimeValuesChanged={handleSetTimeValues}
    />
  );
};

export default memo(TimerListContainer);