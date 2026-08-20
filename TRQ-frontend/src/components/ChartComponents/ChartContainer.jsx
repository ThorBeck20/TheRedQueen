import { useState } from 'react';
import SimpleLineChart from './SimpleLineChart';
import { Input } from './Input';
import axios from 'axios';
import QuickDateChangeButton from './QuickDateChangeButton';


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

    // Set content to something while loading

    return (
    <div className="flex flex-col bg-surface-raised p-4 m-2 rounded-lg">
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
                    <QuickDateChangeButton variant="one_month"/>
                    <QuickDateChangeButton variant="one_year"/>
                    <QuickDateChangeButton variant="five_year"/>
                    <QuickDateChangeButton variant="ten_year"/>
                    <QuickDateChangeButton variant="max"/>
                </div>
                
            </div>
            <div>
                <button
                    className="bg-accent px-8 py-4 rounded-lg shadow-xl"
                    onClick={() => handleRequest(seriesId, obStart, obEnd)}
                >Submit</button>
            </div>
        </div>
        <div className="min-w-4/5">
            {data &&
                content
            }
        </div>
    </div>
    );
}

export default ChartContainer;