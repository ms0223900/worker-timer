import AudioSelectorContainer from 'containers/AudioSelectorContainer';
import TimerListContainer from 'containers/TimerListContainer';
import React, { memo, useRef } from 'react';
import AudioPlocState from 'states/AudioPlocState';
import usePlocState from 'states/usePlocState';
import './styles.scss';

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

  return ({
    audioPloc,
    audioState,
  });
};

const WorkerTimerView = () => {
  const {
    audioPloc,
    audioState,
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
      <TimerListContainer
        onPlayAudio={audioPloc.current.handleRepeatPlay}
      />
    </div>
  );
};

export default memo(WorkerTimerView);