import React, {memo} from 'react';
import {ReactComponent as AddIcon} from 'static/add_black_24dp.svg';
import TimerItemContainer from '../containers/TimerItemContainer';
import {TimerListProps} from './types';

const TimerList = ({
                       timerListData,
                       onAddTimer,
                       onDeleteTimer,
                       onTimerNameChanged,
                       onTimeValuesChanged,
                       onTimerEnd,
                   }: TimerListProps) => {
    return (
        <>
            {timerListData.map(({timerId: id, timeValues, timerName,}) => (
                <TimerItemContainer
                    key={id}
                    timerId={id}
                    timerName={timerName}
                    initTimeVals={timeValues}
                    onDeleteTimer={() => onDeleteTimer(id)}
                    onTimeValuesChanged={onTimeValuesChanged}
                    onTimerNameChanged={onTimerNameChanged}
                    onTimerEnd={onTimerEnd}
                />
            ))}
            <button className={"timer-btn"} onClick={onAddTimer}>
                <AddIcon/>
            </button>
        </>
    );
};

export default memo(TimerList);
