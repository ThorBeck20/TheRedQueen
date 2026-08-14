import ReactECharts from 'echarts-for-react';

const Page = ({seriesX, seriesY, title, width, height}) => {
    /*
        Transition to dateset once I have more experince with this library.

    */
    const options = {
        title: {
            text: title,
            left: "center",
            textStyle: {
                fontSize: 30,
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
            backgroundcolor: 'rgb(219, 10, 10)',
            opacity: 1,
            show: true
        },
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                data: seriesX.map((x, i) => [x, seriesY[i]]),
                type: 'line',
            }
        ],
        tooltip: {
            trigger: 'axis'
        }
    };

    return <ReactECharts option={options} style={{width:width, height:height}}/>;
}

export default Page;