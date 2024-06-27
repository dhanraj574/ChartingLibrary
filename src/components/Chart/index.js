import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format, parseISO, endOfWeek, startOfWeek } from 'date-fns';
import data from '../../Data/data.json';
import { toPng, toJpeg } from 'html-to-image';
import { saveAs } from 'file-saver';
import './index.css'


const Chart = (props) => {
    const { timeframevalue } = props;
    const [activeTimeframe, setActiveTimeframe] = useState(null);
    const [activeViews, setActiveViews] = useState(null);
    const [formattedData, setFormattedData] = useState(data);
    const [xAxisDomain, setXAxisDomain] = useState([]);

    useEffect(() => {
        const filteredData = filterData();
        setFormattedData(filteredData);
    }, [timeframevalue]);

    const filterData = () => {
        if (timeframevalue === "Daily") {
            return data
        } else if (timeframevalue === "Weekly") {
            const weeklyData = [];
            let views = 0;
            let currentStartOfWeek = parseISO('2023-01-01'); 
            let currentEndOfWeek = endOfWeek(currentStartOfWeek);

            data.forEach((entry, index) => {
                const entryDate = parseISO(entry.timestamp);
                if (entryDate <= currentEndOfWeek) {
                    views += entry.value;
                } else {
                    weeklyData.push({
                        timestamp: `${format(currentStartOfWeek, 'yyyy-MM-dd')} - ${format(currentEndOfWeek, 'yyyy-MM-dd')}`,
                        value: views
                    });
                    currentStartOfWeek = startOfWeek(entryDate);
                    currentEndOfWeek = endOfWeek(entryDate);
                    views = entry.value;
                }
                if (index === data.length - 1) {
                    weeklyData.push({
                        timestamp: `${format(currentStartOfWeek, 'yyyy-MM-dd')} - ${format(currentEndOfWeek, 'yyyy-MM-dd')}`,
                        value: views
                    });
                }
            });

            return weeklyData;
        } else if (timeframevalue === "Monthly") {
            const monthlyData = [];
            let views = 0;
            let startIndex = 0;

            for (let i = 0; i < data.length; i++) {
                views += data[i].value;
                const startMonth = new Date(data[startIndex].timestamp).getMonth();
                const currentMonth = new Date(data[i].timestamp).getMonth();
                if (startMonth !== currentMonth || i === data.length - 1) {
                    const monthStartDate = parseISO(data[startIndex].timestamp);
                    const monthEndDate = parseISO(data[i].timestamp);
                    monthlyData.push({
                        timestamp: `${format(monthStartDate, 'yyyy-MM-dd')} - ${format(monthEndDate, 'yyyy-MM-dd')}`,
                        value: views
                    });
                    views = 0;
                    startIndex = i;
                }
            }
            return monthlyData;
        }
        return [];
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        if (timeframevalue === "Daily") {
            return format(parseISO(timestamp), "dd/MM/yyyy");
        } else if (timeframevalue === "Weekly" || timeframevalue === "Monthly") {
            const [startTimestamp, endTimestamp] = timestamp.split(' - ');
            if (!startTimestamp || !endTimestamp) return '';
            const startTime = format(parseISO(startTimestamp.trim()), "dd/MM/yyyy");
            const endTime = format(parseISO(endTimestamp.trim()), "dd/MM/yyyy");
            return `${startTime} - ${endTime}`;
        }
        return timestamp;
    };

    const handleLinkClick = (payload) => {
        const clickedData = formattedData.find(d => d.timestamp === payload.timestamp);
        setActiveTimeframe(clickedData.timestamp);
        setActiveViews(clickedData.value);
    };

    const CustomTooltip = () => {
        if (activeTimeframe !== null) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-item">{formatTimestamp(activeTimeframe)}</p>
                    <p className="tooltip-item">{`${activeViews} views`}</p>
                </div>
            );
        }
        return null;
    };


    const exportToPNG = () => {
      const chart = document.getElementById('chart');
      toPng(chart).then(dataUrl => {
        saveAs(dataUrl, 'chart.png');
      });
    };
  
    const exportToJPEG = () => {
      const chart = document.getElementById('chart');
      toJpeg(chart).then(dataUrl => {
        saveAs(dataUrl, 'chart.jpg');
      });
    };

    return (
      <div className='chart-cont'>
        <ResponsiveContainer id="chart" height={400}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={formatTimestamp}  domain={[1,10]} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    activeDot={{
                        onClick: (e, payload) => handleLinkClick(payload.payload),
                        r: 8
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
      <div className='export-btn-cont'>
        <button onClick={exportToPNG} className='export-btn'>Export to PNG</button>
        <button onClick={exportToJPEG} className='export-btn'>Export to JPEG</button>
      </div>
      </div>
        
    );
};

export default Chart;
