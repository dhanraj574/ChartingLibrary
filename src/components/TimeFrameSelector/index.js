import React from 'react'; 
import './index.css'


const TimeFrameSelector = (props) => {
    const {onSelecttimeframe }= props 

    const onClickTimeframe = (data) =>{
        onSelecttimeframe(data)
    }
    
    return (
        <div className="timeframe-btncont">
        <button className="timeframe-btn" onClick={() => onClickTimeframe("Daily")}>Daily</button>
        <button className="timeframe-btn" onClick={() => onClickTimeframe("Weekly")}>Weekly</button>
        <button className="timeframe-btn" onClick={() => onClickTimeframe("Monthly")}>Monthly</button>
    </div>
    )
}

export default TimeFrameSelector
    
