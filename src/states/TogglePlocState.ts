import PlocState from "./PlocState";

export interface ToggleState {
  toggle: boolean
}

class TogglePlocState extends PlocState<ToggleState> {
  handleToggle = () => {
    this.updateState(s => ({
      toggle: !s.toggle
    }));
  }

  setToggle = (_toggle: ToggleState['toggle']) => {
    this.updateState({
      toggle: _toggle
    });
  }
}

export default TogglePlocState;