import { useState, useEffect } from 'react';
import axios from 'axios';


function interpolate(start, end, t) {
    return start.map((start, i) => Math.round(start + (end[i] - start) * t));
}

// Map the change in yield to the intensity of the color based off of [timeframe].
function yieldChangeColor(yieldChange) {
    if (yieldChange == 0) {
        return "rgb(107, 114, 128)";
    }

    // Change this one depending on what timeframe I am working in.
    const intensity = Math.min(Math.abs(yieldChange) * 4, 1);
    // console.log(`Yield Change ${yieldChange}: Intensity ${intensity}`);
    const [r, g, b] = yieldChange > 0
        ? interpolate([127, 150, 127], [127, 255, 127], intensity)
        : interpolate([150, 127, 127], [255, 127, 127], intensity);

    return `rgb(${r}, ${g}, ${b})`;
}

const variants = {
    one_month: [ "DGS1MO", "1 Month"],
    one_year: ["DGS1", "1 Year"],
    five_year: ["DGS5", "5 Year"],
    ten_year: ["DGS10", "10 Year"],
    twenty_year: ["DGS20", "20 Year"],
}

function one_month_ago() {
    const todays_date = new Date().toISOString().split('T')[0].split('-');
    if (todays_date[1] == 1) {
        return `${todays_date[0]-1}-12-${todays_date[2]}`;
    } else if (todays_date[1] == 12 || todays_date == 11) {
        return `${todays_date[0]}-${todays_date[1]-1}-${todays_date[2]}`;
    } else {
        // Padding the after the arithmetic.
        return `${todays_date[0]}-0${todays_date[1]-1}-${todays_date[2]}`;

    }
    // console.log(`one month ago ${one_month_ago}`);
}

function getYieldChange(obData) {
    const stVal = obData[0].value;
    const endVal = obData[obData.length-1].value;
    // console.log(`Bam! Yield Change is ${endVal - stVal}`);
    return endVal - stVal;
}

/**
 * This component is a button that allows users to quickly see the Yield Spread
 * between a couple bond maturities. It's background color changes based off of
 * the change in yield in the past [timeframe]. The button pulls launches a
 * CharContainer component that displays the yield spread over time.
 */
function YieldSpreadComp({ className="", variant="one_month", ...props }) {
    const [yieldPct, setYieldPct] = useState();
    const [yieldChange, setYieldChange] = useState();

    const [loaded, setLoaded] = useState(false);

    // Overloads the FRED API, need to instead download this to a database and 
    // look it up from there.
    useEffect(() => {
        // Fetch the yield data from FRED API based on the variant.
        axios.get(`http://localhost:8000/bonds/series/${variants[variant][0]}`, {
            params: {
                ob_start: one_month_ago(),
                ob_end: "9999-12-31",
                frequency: "d",
                units: "lin",
            }
        }).then((response) => {
            const observations = response.data.data.observations;
            setYieldChange(getYieldChange(observations));
            const yieldPct = observations[observations.length-1].value;

            setYieldPct(parseFloat(yieldPct));
            setLoaded(true);
        }).catch((err) => console.error(err));
    }, [variant]);

    return (
        <>
            {
                loaded ?
                    <button
                        className={`
                            py-2 px-4 rounded-md
                            min-w-50 min-h-30
                            text-text-primary
                            transition-colors duration-300
                            shadow-md shadow-gray-500/50
                            hover:shadow-lg hover:shadow-gray-500/50
                            hover:bg-accent hover:text-text-on-accent
                            ${className}
                        `}
                        style={
                            { 
                                backgroundColor: yieldChangeColor(yieldChange),
                                cursor: "pointer",
                            }
                        }
                        {...props}
                        // onClick={() =>
                        //     // TODO: Launch a ChartContainer component that displays the yield spread over time.

                        // }
                    >
                        <div className="flex flex-col items-center justify-center">
                            {variants[variant][1]}
                            <h3 className="">{yieldPct.toFixed(2)}%</h3>
                            <div className="
                                bg-surface
                                rounded-md
                                px-2 py-1
                                mt-4
                                shadow-md shadow-gray-500/50
                                hover:shadow-lg hover:shadow-gray-500/50
                            ">
                                {
                                    yieldChange > 0 ? (
                                        <h3 className="
                                            text-green-500
                                        ">+{yieldChange.toFixed(3)}%</h3>
                                    ) : (
                                        <h3 className="
                                            text-red-500
                                        ">{yieldChange.toFixed(3)}%</h3>
                                    )
                                }
                            </div>
                        </div>
                    </button>
                : 
                <div className={`
                            py-2 px-4 rounded-md
                            min-w-50 min-h-30
                            text-text-primary
                            transition-colors duration-300
                            hover:shadow-lg hover:shadow-gray-500/50
                            ${className}
                        `}
                        style={
                            { 
                                backgroundColor: yieldChangeColor(yieldChange),
                                cursor: "pointer",
                            }
                        }
                        {...props}>
                    <div className="flex justify-center">
                        <div className="
                            w-6 h-6 border-3 border-gray-300
                            border-t-current rounded-full animate-spin
                            mt-10
                            "/>
                    </div>
                </div>
            }
        </>
        
    )



}

export default YieldSpreadComp;