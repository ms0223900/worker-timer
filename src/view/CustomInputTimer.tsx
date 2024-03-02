import React, {useEffect, useRef, useState} from "react";
import {Callback} from "../common-types";
import useWorkerTimer from "../hooks/useWorkerTimer";

const INIT_TIME = {
    hour: 0,
    min: 0,
    sec: 0,
    totalSecs: 0,
};

interface InputTimerProps {
    onReset?: Callback
    onAlarm: Callback
}

const initTimeVals = {
    mins: 0,
    secs: 0,
};

function getHandledTime(num: number | string) {
    return Number(num) < 0 ? 0 : Number(num);
}

const InputTimer: React.FC<InputTimerProps> = ({
                                                   onReset,
                                                   onAlarm
                                               }) => {
    const inputElRef = useRef<HTMLInputElement>(null);
    const [inputVal, setInputVal] = useState("");

    const TIMER_NAME = 'INPUT_TIMER';
    const {
        timerState,
        getTimerPloc,
        handleReset,
        handleStartPause,
    } = useWorkerTimer({
        timerName: TIMER_NAME,
        initTimeVals: initTimeVals,
        onTimerEnd(): any {
            onReset && onReset()
            onAlarm()
        },
        onTimerNameChanged: () => {
        },
        timerId: ~~(Math.random() * 100000),
    });

    const time = (() => {
        const sec = inputVal.slice(inputVal.length - 2, inputVal.length) || "00";
        const min =
            inputVal.slice(Math.max(inputVal.length - 4, 0), inputVal.length - 2) ||
            "00";
        const hour = inputVal.slice(0, Math.max(inputVal.length - 4, 0)) || "00";
        return {
            hour: Number(hour),
            min: Number(min),
            sec: Number(sec),
            totalSecs: Number(hour) * 3600 + Number(min) * 60 + Number(sec),
        };
    })();

    const handleStartCountdown = () => {
        const handledTimeMin = getHandledTime(time.min);
        const handledTimeSec = getHandledTime(time.sec)

        getTimerPloc().current.handleEditTimeVals('mins', String(handledTimeMin))
        getTimerPloc().current.handleEditTimeVals('secs', String(handledTimeSec))

        handleStartPause()
    };

    const handleResetAndStop = () => {
        onReset && onReset()
        handleReset()
        setInputVal("");
    };

    useEffect(() => {
        inputElRef.current?.focus();
    }, []);

    return (
        <div>
            <div>
                <h3>{timerState.parsedMinSecStr}</h3>
                <input
                    ref={inputElRef}
                    autoFocus={true}
                    placeholder="Type time"
                    value={inputVal}
                    onChange={(e) => {
                        setInputVal(e.target.value);
                    }}
                />
                <button onClick={handleStartCountdown}>Start</button>
                <button onClick={handleResetAndStop}>Reset</button>
            </div>
        </div>
    );
};

export default InputTimer;
