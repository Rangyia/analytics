import { React } from 'react';
import { Line } from 'react-chartjs-2'

function LineGraph(props) {
    const handleDataLabels = (data) => {
        let mappedLabels = [];
        for (let i in data) {
            mappedLabels.push(data[i][0])
        }
        return mappedLabels
    }

    const handleDataValues = (data) => {
        let mappedValues = [];
        for (let i in data) {
            mappedValues.push(data[i][1])
        }
        return mappedValues
    }

    return (
        <Line          
            className="stackedChart"
            data={{
                labels: handleDataLabels(props.data),
                datasets: [
                    {
                      label: props.title,
                      data: handleDataValues(props.data),
                      borderWidth: 3,
                      fill: false,
                      borderColor: "green"
                    }
                  ]
            }}
            options={{
                title: {
                    display: true,
                    text: "Days to Resolve"
                },
                maintainAspectRatio: true,
                responsive: true,
                legend: {
                    display: false,
                },
                type: 'line',
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
            height={null}>
        </Line>
    )
}

export default LineGraph