import ChartContainer from "../ChartComponents/ChartContainer";
import YieldSpreadComp from "./YieldSpreadComp";


function Bonds() {

    return (
        <>
            <h1>Bonds Page!</h1>
            <div>
                <h2>US Treasury Securities</h2>
                <div className="flex flex-row gap-2 justify-center">
                    <YieldSpreadComp variant="one_month"/>
                    <YieldSpreadComp variant="one_year"/>
                    <YieldSpreadComp variant="five_year"/>
                    <YieldSpreadComp variant="ten_year"/>
                    <YieldSpreadComp variant="twenty_year"/>
                </div>
            </div>
            <div>
                <h2>FED Watch</h2>
                <h3>Next FOMC meeting</h3>
                <h3>Future predictions according to CME</h3>
            </div>
            <div>
                {/* Make this a button that pops out the ChartContainer. */}
                <h2>FRED Datasets</h2>
                <ChartContainer />
            </div>
        </>
    )
}

export default Bonds;