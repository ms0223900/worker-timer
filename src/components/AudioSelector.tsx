import React, { memo } from 'react';
import { AudioSelectorProps } from './types';

const AudioSelector = ({
  value,
  selectorListData,
  onChangeSelect,
}: AudioSelectorProps) => {
  return (
    <div className={'audio-selector--wrapper'}>
      <h3>{'Audio: '}</h3>
      <select value={value} onChange={onChangeSelect}>
        {selectorListData.map(s => (
          <option value={s.value}>
            {s.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(AudioSelector);