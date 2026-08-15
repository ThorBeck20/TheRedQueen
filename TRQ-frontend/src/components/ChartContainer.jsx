import { useState } from 'react';
import axios from 'axios';


function ChartContainer() {
    /*
        Make sure to validate text! Maybe switch to a calendar picker?
    */
    const [seriesId, setSeriesId] = useState("DGS1MO");
    const [obStart, setObStart] = useState("1776-07-04");
    const [obEnd, setObEnd] = useState("9999-12-31");

    const [data, setData] = useState([]);

    const handleRequest = async(series_id, obStart, obEnd) => {
        axios.get('http://localhost:8000/bonds/series', {
            params: {
                series_id: `${series_id}`,
                ob_start: `${obStart}`,
                ob_end: `${obEnd}`,
                frequency: "d",
                units: "lin"
        }
        })
        .then(response => {
            console.log(`Recieved Data: ${response.data}`)
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
    <>
        <div>
            <>
                <p>Series ID:</p>
                <input
                    type="text"
                    value={seriesId}
                    onChange={(e) => setSeriesId(e.target.value)}
                    defaultValue={'DGS1MO'}
                />
            </>
            <>
                <p>
                    Observation Start Date:
                </p>
                <input
                    type="text"
                    value={obStart}
                    onChange={(e) => setObStart(e.target.value)}
                    defaultValue={'YYYY-MM-DD'}
                />
            </>
            <>
                Observation End Date:
                <input
                    type="text"
                    value={obEnd}
                    onChange={(e) => setObEnd(e.target.value)}
                    defaultValue={'YYYY-MM-DD'}
                />
            </>
            <>
                <button onClick={handleRequest(seriesId, obStart, obEnd)}>Submit</button>
            </>
        </div>
        <div>
            {data &&
                <SimpleLineChart
                    seriesX={}
                    seriesY={}
                    title={}
                    width={auto}
                    height={auto}
                />
            }
        </div>
    </>
    );
}

export default ChartContainer;