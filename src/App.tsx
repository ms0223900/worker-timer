import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimerItemContainer from './containers/TimerItemContainer';
import TimerListContainer from 'containers/TimerListContainer';

function App() {
  return (
    <div className="App">
      <TimerListContainer />
    </div>
  );
}

export default App;
