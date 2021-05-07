import { React, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import '../assets/css/components/StackedBarChart.css'

function StackedBarChart(props) {
    const [graphLabels, setGraphLabels] = useState(0);
    const [graphData, setGraphData] = useState(0);
    const [xAxesLabels, setXAxesLabels] = useState(0);
    const [yAxesLabels, setYAxesLabels] = useState(0);
    const [dataSet, setDataSet] = useState(0);

    const handleDataSets = (labels, set) => {

        let mappedDataSet = [];

        for (let i in labels) {
            mappedDataSet.push(
                {
                    label: labels[i],
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    stack: 1,
                    hoverBackgroundColor: 'rgba(140,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: set[i]
                }
            );
        }

        return {
            labels: xAxesLabels,
            datasets: mappedDataSet
        }
    }
    
    useEffect(async () => {
        setGraphLabels(props.labels);
        setGraphData(props.data);
        setXAxesLabels(props.xAxes);
        setYAxesLabels(props.yAxes);
        setDataSet(() => handleDataSets(props.labels, props.data));
    }, [graphLabels, graphData, xAxesLabels, yAxesLabels, dataSet]);

    return (
        <div>
            <Bar
                className="stackedChart"
                data={dataSet}
                options={{
                    title: {
                        display: true,
                        text: props.title
                    },
                    maintainAspectRatio: true,
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    type: 'bar',
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }}
                width={null}
                height={null}
            />
        </div>
    )
}

export default StackedBarChart
