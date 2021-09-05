import React, { memo } from 'react';
import TimerItem from '../components/TimerItem';
import useWorkerTimer from '../hooks/useWorkerTimer';

const TimerItemContainer = () => {
  const {
    toggleState,
    timerState,
    handleEditTime,
    handleReset,
    handleStartPause,
    handleToggleEditTime,
  } = useWorkerTimer();

  return (
    <TimerItem
      isEdit={toggleState.toggle}
      paused={timerState.paused}
      timeStr={timerState.parsedMinSecStr}
      timeValues={timerState.timeValues}
      onEditTime={handleEditTime}
      onStartPause={handleStartPause}
      onReset={handleReset}
      onDeleteTimer={() => {}}
      onToggleEditTime={(toggle: boolean) => () => handleToggleEditTime(toggle)}
    />
  );
};

export default memo(TimerItemContainer);