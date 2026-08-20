

/**
 * 
 * This function is designed to quickly change the timeframe of a chart.
 * 
 *  @param {Object} props
 *  @param {string} [props.className] - Additional classes merged into props.
 *  @param { 'one_month' | 'one_year' | 'five_year' | 'ten_year' | 'max'} [prop.variant="one_year"] - Which timeframe this button represents.
 * 
 */
export default function QuickDateChangeButton(
    { className="", variant = "one_year", ...props}
) {
    const variants = {
        one_month: "1mo",
        one_year: '1yr',
        five_year: "5yr",
        ten_year: "10yr",
        max: "Max"
    }

    return(
        <button
            className={`
                text-text-primary
                ${className}    
            `}
            {...props}
        >{`${variants[variant]}`}</button>
    )
}