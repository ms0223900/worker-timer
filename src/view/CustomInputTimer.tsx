import React, {KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {Callback} from "../common-types";
import useWorkerTimer from "../hooks/useWorkerTimer";

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

function parseTimeToHHMMSS(inputVal: string) {
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
            handleResetInput()
            onAlarm()
            handleFocusInput()
            getTimerPloc().current.handleEditTimeVals('mins', String(0))
            getTimerPloc().current.handleEditTimeVals('secs', String(0))
        },
        onTimerNameChanged: () => {
        },
        timerId: ~~(Math.random() * 100000),
    });

    const time = (() => {
        return parseTimeToHHMMSS(inputVal);
    })();

    const handleStartCountdown = () => {
        const handledTimeMin = getHandledTime(time.min);
        const handledTimeSec = getHandledTime(time.sec)

        getTimerPloc().current.handleEditTimeVals('mins', String(handledTimeMin))
        getTimerPloc().current.handleEditTimeVals('secs', String(handledTimeSec))

        handleStartPause()
    };

    function handleResetInput() {
        onReset && onReset()
        setInputVal("");
    }

    const handleResetAndStop = () => {
        handleResetInput();
        handleReset()
    };

    function handleFocusInput() {
        inputElRef.current?.focus();
    }

    useEffect(() => {
        handleFocusInput();
    }, []);

    const handleKeyboardSupport: KeyboardEventHandler<HTMLInputElement> = e => {
        console.log("e.key: ", e.key);
        if (e.key === 'Enter') {
            handleStartCountdown()
        }

    };

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
                    onKeyUp={handleKeyboardSupport}
                />
                <button onClick={handleStartCountdown}>Start</button>
                <button onClick={handleResetAndStop}>Reset</button>
            </div>
        </div>
    );
};

export default InputTimer;
