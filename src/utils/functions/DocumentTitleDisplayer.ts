const DEFAULT_TIMER_TITLE = 'Worker Timer!';
export interface DocumentTitleDisplayerState {
  timeStrList: string[]
}

const splitParsedMinSec = (parsedTime: string) => {
  const [
    min, sec
  ] = parsedTime.split(':').map(Number);
  return ({
    min, sec
  });
};

const DocumentTitleDisplayer = (() => {
  let state: DocumentTitleDisplayerState = {
    timeStrList: [],
  };
  const listners: ((s: DocumentTitleDisplayerState) => any)[] = [];
  listners.push(
    handleShowJoinedTimeOnTitle,
  );

  function handleShowJoinedTimeOnTitle(s: DocumentTitleDisplayerState) {
    // console.log(s.timeStrList);
    const filtered = s.timeStrList.filter(Boolean);
    if(!filtered.length) {
      document.title = DEFAULT_TIMER_TITLE;
    } else {
      document.title = filtered.join(' / ');
    }
  };

  const updateState = (newS: Partial<DocumentTitleDisplayerState>) => {
    state = {
      ...state,
      ...newS,
    };
    listners.forEach(l => l(state));
  };

  function handleRemoveTimeUpTime(timerId: number) {
    const newS = [...state.timeStrList];
    newS.splice(timerId);
    updateState({
      timeStrList: newS,
    });
  };

  const handleAddOrUpdateTime = (timerId: number, parsedTime: string) => {
    const _newS = [...state.timeStrList];
    // console.log(timerId, parsedTime, _newS);
    _newS[timerId] = parsedTime;
    updateState({
      timeStrList: _newS,
    });
  };

  return ({
    handleAddOrUpdateTime,
    handleRemoveTimeUpTime,
  });
})();

export default DocumentTitleDisplayer;
