import { useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { Input } from './Input';
import axios from 'axios';
import QuickDateChangeButton from './QuickDateChangeButton';


function ChartContainer() {
    /*
        TODO: Make sure to validate text! Maybe switch to a calendar picker?
        TODO: Have a way to download the dataset as a .xlsx and maybe include
        some pages that have frequently used equations.
    */
    const [seriesId, setSeriesId] = useState("DGS1MO");
    const [obStart, setObStart] = useState("1776-07-04");
    const [obEnd, setObEnd] = useState("9999-12-31");

    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [values, setValues] = useState([]);
    const [title, setTitle] = useState("");
    const [hasData, setHasData] = useState(false);

    const chartRef = useRef(null);

    const options = {
        dataZoom: [
            {
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter',
            },
        ],
        title: {
            text: title,
            left: "center",
            textStyle: {
                fontSize: 20,
                fontWeight: 'bolder'
            },
            padding: 0,
            color: ""
        },
        grid: {
            top: 60,
            right: 36,
            bottom: 36,
            left: 36,
            backgroundcolor: '',
            opacity: 1,
            show: true
        },
        xAxis: { type: 'category', data: dates },
        yAxis: { type: 'value' },
        dataset: {
            source: [

            ]
        },
        series: [
            {
                type: 'line',
                data: values,
                // data: seriesX.map((x, i) => [x, seriesY[i]]),
            }
        ],
        tooltip: {
            trigger: 'axis'
        }
    };

    const handleRequest = async(series_id, obStart, obEnd) => {
        axios.get(`http://localhost:8000/bonds/series/${series_id}`, {
            params: {
                ob_start: obStart,
                ob_end: obEnd,
                frequency: "d",
                units: "lin",

        }
        })
        .then(response => {
            console.log(`Recieved Data: ${response.data}`)
            setData(response.data);

            const dates = response.data.data.observations.map(obs => obs.date)
            const values = response.data.data.observations.map(obs => obs.value)

            setDates(dates);
            setValues(values);
            setTitle(response.data.headers.seriess.title);

            setHasData(true);
        })
        .catch(error => {
            console.error(error);
        });
    }

    // Set content to something while loading

    return (
    <div className="flex flex-col bg-surface-raised p-4 m-2 rounded-lg theme-transition">
        <div className="flex flex-col justify-center">
            <>
                
            </>
            <div className="flex flex-row justify-start">
                <Input
                    className="input m-2"
                    label="FRED Series ID"
                    type="text"
                    onChange={(e) => setSeriesId(e.target.value)}
                    defaultValue={'DGS1MO'}
                />
                <Input
                    className="input m-2"
                    type="text"
                    label="Start Date"
                    onChange={(e) => setObStart(e.target.value)}
                    defaultValue={'YYYY-MM-DD'}
                />
                <Input
                    className="input m-2"
                    type="text"
                    label="End Date"
                    onChange={(e) => setObEnd(e.target.value)}
                    defaultValue={'YYYY-MM-DD'}
                />
                <div className="flex flex-row gap-2">
                    <QuickDateChangeButton variant="one_month" chartRef={chartRef}/>
                    <QuickDateChangeButton variant="one_year" chartRef={chartRef}/>
                    <QuickDateChangeButton variant="five_year" chartRef={chartRef}/>
                    <QuickDateChangeButton variant="ten_year" chartRef={chartRef}/>
                    <QuickDateChangeButton variant="max" chartRef={chartRef}/>
                </div>
                
            </div>
            <div>
                <button
                    className="bg-accent px-8 py-4 rounded-lg shadow-xl"
                    onClick={() => handleRequest(seriesId, obStart, obEnd)}
                >Submit</button>
            </div>
        </div>
        <div className="flex justify-center minw-4/5">
            {hasData &&
                <ReactECharts
                    ref={chartRef}
                    option={options}
                    style={{width: "100%", height: "500px"}}
                />
            }
        </div>
    </div>
    );
}

export default ChartContainer;