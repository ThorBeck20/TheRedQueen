import { useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { Input } from './Input';
import axios from 'axios';
import QuickDateChangeButton from './QuickDateChangeButton';

function getTheme(varName) {
    const style = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
    if(!style) {
        console.warn(`Theme color ${varName} is not defined.`);
    }
    console.log(`Theme color is: ${style}`);
    return style;
}

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

    const textColor = getTheme('--color-text-primary');

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
            text: "test",
            left: "center",
            textStyle: {
                fontSize: 20,
                fontWeight: 'normal',
                fontFamily: getTheme('--text-font'),
                color: textColor
            },
            padding: 5,
        },
        grid: {
            top: 60,
            right: 36,
            bottom: 36,
            left: 36,
            backgroundcolor: '',
            opacity: 1,
            borderWidth: 1,
            borderColor: getTheme('--border'),
            show: true,
            coordinateSystem: 'cartesian2d',
        },
        xAxis: {
            type: 'time',
            name: '',
            nameLocation: 'middle',
            nameGap: 30,
            axisLine: {
                lineStyle: {
                    color: '',
                },
            },
            axisLabel: {
                color: textColor,
            },
            axispointer: {
                show: true,
                snap: true,
                label: {
                    show: true,
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'Percent (%)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
                fontSize: 14,
                fontWeight: 'normal',
                fontFamily: getTheme('--text-font'),
                color: textColor

            },
            axisLabel: {
                color: textColor,
            },
        },
        series: [
            {
                type: 'line',
                data: dates.map((date, i) => [date, values[i]]),
                showSymbol: false,
            }
        ],
        tooltip: {
            trigger: 'axis',
            backgroundColor: getTheme('--color-surface'),
            axisPointer: {
                type: 'line',
            },
            textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: getTheme('--text-font'),
                color: textColor
            }
        },
        toolbox: {
            show: false
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
            console.log(`Recieved Data: ${response.data.headers} with ${response.data.data.observations.length} observations.`);
            setData(response.data);

            const dates = response.data.data.observations.map(obs => obs.date)
            const values = response.data.data.observations.map(obs => obs.value)

            setDates(dates);
            setValues(values);
            setTitle(response.data.headers.seriess.title);

            
            setHasData(true);
            console.log(`Data has been set.`);
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
            {hasData ?
                <ReactECharts
                    ref={chartRef}
                    option={options}
                    style={{width: "100%", height: "500px"}}
                />
                :
                <div className="flex justify-center items-center minh-500px">
                    <p className="text-text-primary">No data to display. Please enter a valid FRED Series ID and date range.</p>
                </div>
            }
        </div>
    </div>
    );
}

export default ChartContainer;