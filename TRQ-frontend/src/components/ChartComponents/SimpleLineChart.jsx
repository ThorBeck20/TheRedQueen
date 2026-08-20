import ReactECharts from 'echarts-for-react';

/**
 * TODO: Transition to dataset once I have more experience.
 * TODO: Implement the dataZoom.
 * 
 * 
 */
const Page = ({seriesX, seriesY, title, width, height}) => {
    const options = {
        title: {
            text: title,
            left: "center",
            textStyle: {
                fontSize: 20,
                fontWeight: 'bolder'
            },
            padding: 0,
            color: ""
        },
        grid: {
            top: 60,
            right: 36,
            bottom: 36,
            left: 36,
            backgroundcolor: '',
            opacity: 1,
            show: true
        },
        xAxis: { type: 'category', data: seriesX },
        yAxis: { type: 'value' },
        dataset: {
            source: [

            ]
        },
        series: [
            {
                type: 'line',
                data: seriesY
                // data: seriesX.map((x, i) => [x, seriesY[i]]),
            }
        ],
        tooltip: {
            trigger: 'axis'
        }
    };

    return <ReactECharts option={options} style={{width:width, height:height}}/>;
}

export default Page;