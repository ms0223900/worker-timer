import AudioSelectorContainer from 'containers/AudioSelectorContainer';
import TimerListContainer from 'containers/TimerListContainer';
import React, {ChangeEventHandler, memo, useRef} from 'react';
import AudioPlocState from 'states/AudioPlocState';
import {context} from 'states/context';
import {ContextActionsEnum} from 'states/ContextPlocState';
import usePlocState from 'states/usePlocState';
import './styles.scss';
import CustomInputTimer from "./CustomInputTimer";

export interface UseWorkerTimerViewProps {
  
}

const useWorkerTimerView = () => {
  const audioPloc = useRef(
    new AudioPlocState({
      volume: 0.7,
      playTimeout: 3000,
      repeatTimes: 3,
      selectedAudio: 'heyListen'
    })
  );
  const audioState = usePlocState(audioPloc.current);
  const ctx = usePlocState(context);

  const handleChangeVolume: ChangeEventHandler<HTMLInputElement> = (e) => {
    context.dispatch({
      type: ContextActionsEnum.SET_VOLUME,
      payload: { volume: Number(e.target.value) / 100 }
    });
  };

  return ({
    ctx,
    audioPloc,
    audioState,
    handleChangeVolume,
  });
};

const WorkerTimerView = () => {
  const {
    ctx,
    audioPloc,
    audioState,
    handleChangeVolume,
  } = useWorkerTimerView();

  return (
    <div className={'worker-timer-view--wrapper container'}>
      <h1>{'Worker Timer!'}</h1>
      <AudioSelectorContainer
        selectorListData={audioState.audioNameUrlList.map(a => ({
          text: a.name,
          value: a.url,
        }))} 
        onAudioValueChanged={audioPloc.current.handleSetAudioUrl}
      />
      <input 
        type={'range'}
        id={'volume'}
        name={'volume'}
        min={'0'}
        max={'100'}
        step={'11'}
        value={String(ctx.alarmVolume * 100)}
        onChange={handleChangeVolume}
      />
      <TimerListContainer
        onPlayAudio={audioPloc.current.handleRepeatPlay}
      />
        <CustomInputTimer onAlarm={audioPloc.current.handleRepeatPlay}
                          onReset={audioPloc.current.handlePause}/>
    </div>
  );
};

export default memo(WorkerTimerView);
