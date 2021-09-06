import React, { memo } from 'react';
import { ReactComponent as AddIcon } from 'static/add_black_24dp.svg';
import TimerItemContainer from '../containers/TimerItemContainer';
import { TimerListProps } from './types';

const TimerList = ({
  timerListData,
  onAddTimer,
  onDeleteTimer,
  onTimeValuesChanged,
}: TimerListProps) => {
  return (
    <>
      {timerListData.map(({ timerId: id, timeValues }) => (
        <TimerItemContainer
          key={id}
          timerId={id}
          initTimeVals={timeValues}
          onDeleteTimer={() => onDeleteTimer(id)}
          onTimeValuesChanged={onTimeValuesChanged}
        />
      ))}
      <button className={"timer-btn"} onClick={onAddTimer}>
        <AddIcon />
      </button>
    </>
  );
};

export default memo(TimerList);