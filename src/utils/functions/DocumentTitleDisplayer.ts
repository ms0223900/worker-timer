export interface DocumentTitleDisplayerState {
  timeStrList: string[]
}

const DocumentTitleDisplayer = (() => {
  let state: DocumentTitleDisplayerState = {
    timeStrList: [],
  };
  const listners: ((s: DocumentTitleDisplayerState) => any)[] = [];
  listners.push(
    handleShowOnTitle,
  );

  function handleShowOnTitle(s: DocumentTitleDisplayerState) {
    if(!s.timeStrList.length) return;
    document.title = s.timeStrList.filter(Boolean).join(' / ');
  };

  const updateState = (newS: Partial<DocumentTitleDisplayerState>) => {
    state = {
      ...state,
      ...newS,
    };
    listners.forEach(l => l(state));
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
  });
})();

export default DocumentTitleDisplayer;
