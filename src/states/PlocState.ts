/* eslint-disable no-underscore-dangle */
export type Listener<State> = (state: State) => Partial<State> | void | undefined
interface GetNewStateFn<State> {
  (s: State): Partial<State>
}

class PlocState<State> {
  _state: State

  get state(): State {
    return this._state;
  }

  listeners: ({
    compareVal: State[keyof State][]
    compareValFn?: (s: State) => State[keyof State][]
    listener: Listener<State>
  })[]

  constructor(initState: State) {
    this._state = initState;
    this.listeners = [];
  }

  checkShouldUpdateByListener(prevState: any[], getStateFn: (s: State) => any): boolean {
    for (let i = 0; i < prevState.length; i += 1) {
      if (prevState[i] !== getStateFn(this._state)[i]) return true;
    }
    return false;
  }

  private getNewState<NewState extends Partial<State> | GetNewStateFn<State>>(newState: NewState): Partial<State> {
    const _newState = (typeof newState === 'function' ? (newState as GetNewStateFn<State>)(this.state) : newState) as Partial<State>;
    return _newState;
  }

  updateState<NewState extends Partial<State> | GetNewStateFn<State>>(newState: NewState): void {
    const _newState = this.getNewState(newState);

    this._state = { ...this._state, ..._newState };
    this.listeners.forEach((l, i) => {
      if (l.compareValFn) {
        const shouldUpdateByCompareVal = this.checkShouldUpdateByListener(l.compareVal, l.compareValFn);
        if (!shouldUpdateByCompareVal) return;
      }

      const listenerReturnVal = l.listener(this._state);
      if (listenerReturnVal && typeof listenerReturnVal === 'object') {
        this._state = {
          ...this._state,
          ...listenerReturnVal,
        };
      }
      if (l.compareValFn) { this.listeners[i].compareVal = l.compareValFn(this._state); }
    });
  }

  addlistener(listener: Listener<State>, compareValFn?: (s: State) => State[keyof State][]): void {
    this.listeners.push({
      listener,
      compareValFn,
      compareVal: compareValFn ? compareValFn(this._state) : [],
    });
  }

  removeListener(listener: Listener<State>): void {
    const listenerIdx = this.listeners.findIndex((l) => l.listener === listener);
    if (listenerIdx !== -1) {
      this.listeners.splice(listenerIdx, 1);
    }
  }
}

export default PlocState;
