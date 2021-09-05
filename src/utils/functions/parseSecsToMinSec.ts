
const parseSecsToMinSec = (secs = 0) => {
  const addZero = (num = 0) => (num < 10 ? `0${num}` : num);
  const mins = Math.floor(secs / 60);
  const _secs = secs % 60;
  return `${addZero(mins)}:${addZero(_secs)}`;
};

export default parseSecsToMinSec;