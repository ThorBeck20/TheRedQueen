
function PMMarketSides({json}) {
    if (!json) return null;

    console.log(json);

    return (
        <>
            <div className="flex flex-row gap-2">
                <h3 className="min-h-10 min-w-50 text-text-primary text-lg">{json?.title ?? 'N/A'}</h3>
                <div className="flex flex-row justify-right min-w-20 px-5">
                    <h3 className="text-green-500 font-bold text-lg min-w-20">{Number(json.bestBidQuote?.value).toFixed(2) ?? '-'}</h3>
                    <h3 className="text-red-500 font-bold text-lg min-w-20">{Number(json.bestAskQuote?.value).toFixed(2) ?? '-'}</h3>
                </div>
            </div>
        
        </>
    )
}

export default PMMarketSides;