# React Charting Library Assignment

This is a React.js application that displays a chart using the Recharts library. The chart supports timeframe breakdowns (daily, weekly, monthly) and interactive click events. The chart data is provided in JSON format.

## Features

- Display a line chart using Recharts
- Timeframe breakdown: daily, weekly, monthly
- Interactive click events to display data point details

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/](https://github.com/dhanraj574/ChartingLibrary.git)

Navigate to the project directory:

cd chartapp
Install the dependencies:
npm install
Usage
Start the development server:
npm start

Open your browser and navigate to http://localhost:3000 to view the application.
Data
The chart data is stored in src/Data/data.json. Here is an example of the data structure:

json
[
    { "timestamp": "2023-01-01T00:00:00Z", "value": 10 },
    { "timestamp": "2023-01-02T00:00:00Z", "value": 12 },
    { "timestamp": "2023-01-03T00:00:00Z", "value": 5 },
    { "timestamp": "2023-01-04T00:00:00Z", "value": 8 },
    { "timestamp": "2023-01-05T00:00:00Z", "value": 15 },
    { "timestamp": "2023-01-06T00:00:00Z", "value": 7 },
    { "timestamp": "2023-01-07T00:00:00Z", "value": 9 },
    { "timestamp": "2023-01-08T00:00:00Z", "value": 11 },
    { "timestamp": "2023-01-09T00:00:00Z", "value": 13 },
    { "timestamp": "2023-01-10T00:00:00Z", "value": 6 },
    { "timestamp": "2023-01-11T00:00:00Z", "value": 8 },
    { "timestamp": "2023-01-12T00:00:00Z", "value": 14 },
    { "timestamp": "2023-01-13T00:00:00Z", "value": 10 },
    { "timestamp": "2023-01-14T00:00:00Z", "value": 7 },
    { "timestamp": "2023-01-15T00:00:00Z", "value": 12 },
    { "timestamp": "2023-01-16T00:00:00Z", "value": 13 },
    { "timestamp": "2023-01-17T00:00:00Z", "value": 9 },
    { "timestamp": "2023-01-18T00:00:00Z", "value": 11 },
    { "timestamp": "2023-01-19T00:00:00Z", "value": 14 },
    { "timestamp": "2023-01-20T00:00:00Z", "value": 10 },
]


License
This project is licensed under the MIT License.
