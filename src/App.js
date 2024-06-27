import './App.css';
import React, { useState } from 'react';
import TimeFrameSelector from './components/TimeFrameSelector'
import Chart from './components/Chart'

function App() {
  const [activeTimeframe, setActiveTimeframe] = useState("Daily");

  const handleActiveTimeframe = (timeframe) =>{
      setActiveTimeframe(timeframe)
  }

  

  return (
    <div className="app">
      <h1 className="header">Chart Library in React</h1>
      <TimeFrameSelector onSelecttimeframe={handleActiveTimeframe}/>
      <Chart timeframevalue={activeTimeframe}/>
      
    </div>
  );
}

export default App;
