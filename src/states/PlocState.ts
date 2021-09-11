/* eslint-disable no-underscore-dangle */
export type Listener<State> = (state: State) => Partial<State> | void | undefined
interface GetNewStateFn<State> {
  (s: State): Partial<State>
}

export interface SingleListenerWithCompare<State> {
  compareVal: State[keyof State][]
  compareValFn?: (s: State) => State[keyof State][]
  listener: Listener<State>
}

class PlocState<State> {
  private _state: State
  private _prevState: State

  get state(): State {
    return this._state;
  }

  listeners: (SingleListenerWithCompare<State>)[]

  constructor(initState: State) {
    this._state = initState;
    this._prevState = initState;
    this.listeners = [];
  }

  private checkShouldUpdateByListener(prevState: any[], getStateFn: (s: State) => any): boolean {
    for (let i = 0; i < prevState.length; i += 1) {
      const prevVal = prevState[i];
      const newVal = getStateFn(this.state)[i];
      // console.log('checkShouldUpdateByListener: ', prevVal, newVal);
      if (JSON.stringify(prevVal) !== JSON.stringify(newVal)) return true;
    }
    return false;
  }

  private getNewState<NewState extends Partial<State> | GetNewStateFn<State>>(newState: NewState): Partial<State> {
    const _newState = (typeof newState === 'function' ? (newState as GetNewStateFn<State>)(this.state) : newState) as Partial<State>;
    return _newState;
  }

  private compareStateIsSame(newState: State) {
    return JSON.stringify(this._prevState) === JSON.stringify(newState);
  }

  private syncPrevState() {
    this._prevState = JSON.parse(JSON.stringify(this.state));
  }

  private syncStateWithPartialNewState(partialState: Partial<State>) {
    this._state = {
      ...this.state,
      ...partialState,
    };
  }

  updateState<NewState extends Partial<State> | GetNewStateFn<State>>(newState: NewState): void {
    const _newState = this.getNewState(newState);

    this.syncStateWithPartialNewState(_newState);
    // if(this.compareStateIsSame(this._state)) return;

    this.listeners.forEach((l, i) => {
      if (l.compareValFn) {
        const shouldUpdateByCompareVal = this.checkShouldUpdateByListener(l.compareVal, l.compareValFn);
        if (!shouldUpdateByCompareVal) return;
      }

      const listenerReturnVal = l.listener(this.state);
      if (listenerReturnVal && typeof listenerReturnVal === 'object') {
        this.syncStateWithPartialNewState(listenerReturnVal);
      }
      if (l.compareValFn) { l.compareVal = [...l.compareValFn(this.state)]; }
    });
    this.syncPrevState();
  }

  addlistener(listener: Listener<State>, compareValFn?: (s: State) => State[keyof State][]): void {
    const singleListener: SingleListenerWithCompare<State> = {
      listener,
      compareValFn,
      compareVal: compareValFn ? [...compareValFn(this.state)] : [],
    };
    // console.log(singleListener);
    this.listeners.push(singleListener);
  }

  removeListener(listener: Listener<State>): void {
    const listenerIdx = this.listeners.findIndex((l) => l.listener === listener);
    if (listenerIdx !== -1) {
      this.listeners.splice(listenerIdx, 1);
    }
  }
}

export default PlocState;
