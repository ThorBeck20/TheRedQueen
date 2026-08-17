import { useEffect, useState } from 'react';
import SimpleLineChart from './SimpleLineChart';
import './ChartContainer.css';
import axios from 'axios';


function ChartContainer() {
    /*
        Make sure to validate text! Maybe switch to a calendar picker?
    */
    const [seriesId, setSeriesId] = useState("DGS1MO");
    const [obStart, setObStart] = useState("1776-07-04");
    const [obEnd, setObEnd] = useState("9999-12-31");

    const [data, setData] = useState([]);
    const [content, setContent] = useState();

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

            setContent(
                <SimpleLineChart
                    seriesX={dates}
                    seriesY={values}
                    title={response.data.headers.seriess.title}
                    width={500}
                    height={500}
                />
            );
        })
        .catch(error => {
            console.error(error);
        });
    }

    // Set content to something while 

    return (
    <>
        <div>
            <>
                <p>Series ID:</p>
                <input
                    type="text"
                    onChange={(e) => setSeriesId(e.target.value)}
                    defaultValue={'DGS1MO'}
                />
            </>
            <>
                <p>
                    Observation Start Date:
                </p>
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setObStart(e.target.value)}
                    defaultValue={'YYYY-MM-DD'}
                />
            </>
            <>
                <p>
                    Observation End Date:
                </p>
                <input
                    type="text"
                    onChange={(e) => setObEnd(e.target.value)}
                    defaultValue={'YYYY-MM-DD'}
                />
            </>
            <div>
                <button onClick={() => handleRequest(seriesId, obStart, obEnd)}>Submit</button>
            </div>
        </div>
        <div>
            {data &&
                content
            }
        </div>
    </>
    );
}

export default ChartContainer;