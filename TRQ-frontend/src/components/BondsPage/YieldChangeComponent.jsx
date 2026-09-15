
function getMonthlyChange(obData) {
    const stVal = obData[0].value;
    const endVal = obData[obData.length-1].value;
    return endVal - stVal;
}

function getWeeklyChange(obData) {
    const stVal = obData[obData.length-8].value;
    const endVal = obData[obData.length-1].value;
    return endVal - stVal;
}

function getDailyChange(obData) {
    const stVal = obData[obData.length-2].value;
    const endVal = obData[obData.length-1].value;
    return endVal - stVal;
}

const variants = {
    "monthly" : getMonthlyChange,
    "weekly" : getWeeklyChange,
    "daily" : getDailyChange,
}

function YieldChangeComponent({ data, variant }) {

    const yieldChange = variants[variant](data);

    return (
        <div className="flex flex-col items-center justify-center">
            <p className="">{variant}</p>
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
    )

}

export default YieldChangeComponent;