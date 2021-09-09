import { SingleSelectorValText } from 'common-types';
import AudioSelector from 'components/AudioSelector';
import { AudioSelectorProps } from 'components/types';
import React, { memo, useEffect } from 'react';
import useSelect from 'utils/functions/useSelect';
import SettingsStorage from 'utils/handlers/SettingsStorage';

export interface AudioSelectorContainerProps extends Pick<AudioSelectorProps, 'selectorListData'> {
  onAudioValueChanged: (url: string) => any
}

const AudioSelectorContainer = (props: AudioSelectorContainerProps) => {
  const {
    selectorListData,
    onAudioValueChanged,
  } = props;

  const initSelectVal = SettingsStorage.getLSData()?.selectedAudio || selectorListData[2]?.value;

  const {
    val,
    handleSelect,
  } = useSelect(initSelectVal, onAudioValueChanged);

  useEffect(() => {
    SettingsStorage.setLSData({
      selectedAudio: val,
    });
  }, [val]);

  return (
    <AudioSelector
      {...props}
      value={val}
      onChangeSelect={handleSelect}
    />
  );
};

export default memo(AudioSelectorContainer);