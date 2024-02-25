import React, {useEffect, useRef, useState} from "react";
import {Callback} from "../common-types";

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

const InputTimer: React.FC<InputTimerProps> = ({
    onReset,
    onAlarm
                    }) => {
    const inputElRef = useRef<HTMLInputElement>(null);
    const timer = useRef<NodeJS.Timeout | null>(null);
    const [inputVal, setInputVal] = useState("");
    const [countdownTime, setTime] = useState(INIT_TIME);

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
    const joinedTime = `${countdownTime.hour}:${countdownTime.min}:${countdownTime.sec}`;

    function getRemainTime(totalSecs: number) {
        const remainSecs = totalSecs - 1;
        const hour = Math.floor(remainSecs / 3600);
        const min = Math.floor((remainSecs - hour * 3600) / 60);
        const sec = remainSecs - hour * 3600 - min * 60;
        return {remainSecs, hour, min, sec};
    }

    const handleStartCountdown = () => {
        setTime(time);
        timer.current = setInterval(() => {
            setTime(({ totalSecs }) => {
                const {remainSecs, hour, min, sec} = getRemainTime(totalSecs);
                if (remainSecs === 0) {
                    onAlarm()
                    handleResetAndStop()
                    return {
                        totalSecs: remainSecs,
                        hour,
                        min,
                        sec,
                    };
                }
                return {
                    totalSecs: remainSecs,
                    hour,
                    min,
                    sec,
                };
            });
        }, 1000);
    };

    const handleResetAndStop = () => {
        onReset && onReset()
        setTime(INIT_TIME);
        setInputVal("");
        timer.current && clearInterval(timer.current);
    };

    useEffect(() => {
        inputElRef.current?.focus();
    }, []);

    return (
        <div>
            <div>
                <h3>{joinedTime}</h3>
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
