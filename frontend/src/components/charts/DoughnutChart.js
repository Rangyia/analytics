import { React } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart(props) {

    const data = {
        labels: props.labels,
        datasets: props.dataset
    };

    return (
        <div>
            <Doughnut
                data={data}
                width={325}
                height={325}
                options={{
                    title: {
                        display: true,
                        text: props.title,
                        fontColor: "white"
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontColor: "white",
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    cutoutPercentage: 60
                }}
            />
        </div>
    )
}
