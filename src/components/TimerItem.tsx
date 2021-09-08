import { ReactComponent as StartIcon } from "../static/play_arrow_black_24dp.svg";
import { ReactComponent as PauseIcon } from "../static/pause_black_24dp.svg";
import { ReactComponent as DeleteIcon } from "../static/delete_black_24dp.svg";
import { ReactComponent as ResetIcon } from "../static/restart_alt_black_24dp.svg";
import { ReactComponent as DoneIcon } from "../static/done_black_24dp.svg";
import { TimerItemProps } from "./types";
import useToggle from "utils/functions/useToggle";

const TimerInput = (props: any) => (
  <input
    {...props}
    type="number"
    style={{
      width: 60,
      padding: 4,
      fontSize: 30,
      textAlign: "right",
      border: "none",
      backgroundColor: "#eee",
      borderRadius: 6
    }}
  />
);

const TimerItem = ({
  isEdit,
  paused,
  timerName,
  timeStr,
  timeValues,
  onStartPause,
  onReset,
  onDeleteTimer,
  onEditTime,
  onToggleEditTime,
  onEditTimerName,
}: TimerItemProps) => {
  const {
    toggle: isEditName,
    handleToggle,
    setToggle,
  } = useToggle(false);
  return (
    <div
      style={{
        paddingBottom: 8
      }}
    >
      <div className={"timer-wrapper"}>
        <div>
          <div onClick={handleToggle}>
            {(!timerName && !isEditName) && (
              <span className={'input-timer-name-hint'}>
                {'Double click to add name'}
              </span>
            )}
            {isEditName ? (
              <input
                autoFocus={true}
                value={timerName}
                placeholder={'Timer Name'}
                onChange={onEditTimerName}
                onBlur={() => setToggle(false)} 
              />
            ): (
              <p className={!timerName ? 'hint' : ''}>{timerName}</p>
            )}
          </div>
          <div onDoubleClick={onToggleEditTime(true)}>
            {isEdit ? (
              <form
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
                onChange={onEditTime}
              >
                <TimerInput name="mins" value={String(timeValues.mins)} />
                <div
                  style={{
                    padding: "0px 4px",
                    fontSize: 30,
                    fontWeight: "bolder"
                  }}
                >
                  {" : "}
                </div>
                <TimerInput name="secs" value={String(timeValues.secs)} />
                <DoneIcon onClick={onToggleEditTime(false)} />
              </form>
            ) : (
              <h1>{timeStr}</h1>
            )}
          </div>
        </div>
        <div className={"button-wrapper"}>
          <button className={"timer-btn"} onClick={() => onStartPause()}>
            {paused ? <StartIcon /> : <PauseIcon />}
          </button>
          <button className={"timer-btn"} onClick={onReset}>
            <ResetIcon />
          </button>
          <button className={"timer-btn"} onClick={onDeleteTimer}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerItem;
