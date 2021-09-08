import { SingleSelectorValText } from 'common-types';
import AudioSelector from 'components/AudioSelector';
import { AudioSelectorProps } from 'components/types';
import React, { memo } from 'react';
import useSelect from 'utils/functions/useSelect';

export interface AudioSelectorContainerProps extends Pick<AudioSelectorProps, 'selectorListData'> {
  onAudioValueChanged: (url: string) => any
}

const AudioSelectorContainer = (props: AudioSelectorContainerProps) => {
  const {
    selectorListData,
    onAudioValueChanged,
  } = props;
  const {
    val,
    handleSelect,
  } = useSelect(selectorListData[0]?.value, onAudioValueChanged);

  return (
    <AudioSelector
      {...props}
      value={val}
      onChangeSelect={handleSelect}
    />
  );
};

export default memo(AudioSelectorContainer);