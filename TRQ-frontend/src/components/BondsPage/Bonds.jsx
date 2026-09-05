import ChartContainer from "../ChartComponents/ChartContainer";


function Bonds() {

    return (
        <>
            <h1>Bonds Page!</h1>
            <div>
                <h2>Bond yield spread</h2>
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