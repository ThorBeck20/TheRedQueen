

/**
 * 
 * This function is designed to quickly change the timeframe of a chart.
 * 
 * TODO: Visually indicate the selected state.
 * TODO: Do some base styling
 * 
 *  @param {Object} props
 *  @param {string} [props.className] - Additional classes merged into props.
 *  @param { 'one_month' | 'one_year' | 'five_year' | 'ten_year' | 'max'} [prop.variant="one_year"] - Which timeframe this button represents.
 * 
 */
export default function QuickDateChangeButton(
    { className="", variant = "one_year", chartRef, ...props}
) {
    const variants = {
        one_month: "1mo",
        one_year: '1yr',
        five_year: "5yr",
        ten_year: "10yr",
        max: "Max"
    }

    const RANGE_MONTHS = {
        one_month: 1,
        one_year: 12,
        five_year: 60,
        ten_year: 120,
        max: null
    }

    function getStartDate(variant) {
        const end = new Date();
        const start = new Date();

        if (variant === 'max') {
            start.setTime(Date.parse('1776-07-04'));
            return ({ startValue: start, endValue: end });
        }

        start.setMonth(start.getMonth() - RANGE_MONTHS[variant]);

        // console.log(`Calculated start date for variant ${variant}: ${start.toISOString().split('T')[0]}`);
        
        
        return { startValue: start, endValue: end };

    }


    return(
        <button
            className={`
                text-text-primary
                disabled:cursor-not-allowed
                px-2 py-2 rounded-md
                hover:bg-accent hover:text-text-on-accent
                transition-colors duration-300
                theme-transition
                ${className}    
            `}
            {...props}
            onClick={() => {
                if (chartRef.current) {
                    const chartInstance = chartRef.current.getEchartsInstance();
                    // console.log(`Chart instance obtained:`, chartInstance);
                    const { startValue, endValue } = getStartDate(variant);
                    console.log(`Dispatching dataZoom action for variant: ${variant}`);
                    chartInstance.dispatchAction({
                        type: 'dataZoom',
                        startValue: startValue,
                        endValue: endValue
                    })
                }
            }}
        >{`${variants[variant]}`}</button>
    )
}