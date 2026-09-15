import ChartContainer from "../ChartComponents/ChartContainer";
import YieldSpreadComp from "./YieldSpreadComp";
import EventsPreview from "../PolyMarketComponents/EventsPreview";


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
                <div>
                    {/* <link to="https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html">
                        CME FED Watch Tool
                    </link> */}
                </div>
                <div className="flex flex-row justify-center gap-4">
                    <div className="bg-surface-raised rounded-md p-2 theme-transition">
                        <h2 className="text-primary">FOMC Schedule</h2>
                    </div>
                    <EventsPreview slug="usfed-fomc-2026-09-16"/>
                </div>
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