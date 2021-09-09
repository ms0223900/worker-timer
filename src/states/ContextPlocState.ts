import SettingsStorage from "utils/handlers/SettingsStorage";
import PlocState from "./PlocState";

export interface ContextState {
  alarmVolume: number
}

export const defaultContextState: ContextState = {
  alarmVolume: 0.7,
};

export enum ContextActionsEnum {
  'SET_VOLUME' = 'SET_VOLUME'
}

type SetVolumeAction = {
  type: ContextActionsEnum.SET_VOLUME,
  payload: { volume: number }
}

type ContextAction = 
  SetVolumeAction


const reducer = (state: ContextState, action: ContextAction): ContextState => {
  switch (action.type) {
    case ContextActionsEnum.SET_VOLUME:
      return ({
        ...state,
        alarmVolume: action.payload.volume,
      });
    default:
      return state;
  }
};

class ContextPlocState extends PlocState<ContextState> {
  constructor(initS?: Partial<ContextState>) {
    super({
      ...defaultContextState,
      ...initS,
      alarmVolume: 
        SettingsStorage.getLSData()?.volume || 
        defaultContextState.alarmVolume
    });
    this.addlistener(s => {
      SettingsStorage.setLSData({ volume: s.alarmVolume, });
    }, s => [s.alarmVolume]);
  }

  dispatch(action: ContextAction) {
    this.updateState(s => reducer(s, action));
  }
}

export default ContextPlocState;