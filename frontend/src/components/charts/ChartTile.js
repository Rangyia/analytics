import React from 'react'
import { Line, Bar, Radar, Doughnut, Pie, Polar, Bubble, Scatter } from 'react-chartjs-2'

import '../../assets/css/components/ChartTile.css'

const chart = ({
    title="Title",
    chartType="Bar", 
    labels=["1", "2", "3"],
    dataLabel="Data Label",
    backgroundColor="rgba(220, 20, 60, 1)",
    data=[1, 2, 3],
    width="200",
    height="350",
    maxTicksLimit="3",
    labelFontColor="White",
    axesFontColor="White",
    labelFontSize=12,
    axesFontSize=12
    }) => {
        switch (chartType) {
            case "Line":
                return <div className="chartCard">
                            <Line
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                            fill: false,
                                            borderColor: backgroundColor
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                        ticks: {
                                            stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                            suggestedMin: 0,
                                            maxTicksLimit: maxTicksLimit,
                                            fontColor: axesFontColor,
                                            fontSize: axesFontSize
                                        }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                            fontColor: axesFontColor,
                                            fontSize: axesFontSize
                                            }
                                        }]
                                    }
                                }}
                            />
                        </div>
            case "Bar":
                return <div className="chartCard">
                            <Bar
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "StackedBar":
                return <div className="chartCard">
                            <Bar
                                data={{
                                    labels: labels,
                                    datasets: data,
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    title: {
                                        display: true,
                                        text: title,
                                        fontSize: 18,
                                        fontColor: labelFontColor
                                    },
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            stacked: true,
                                            ticks: {
                                                stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                                suggestedMin: 0,
                                                maxTicksLimit: maxTicksLimit,
                                                fontColor: axesFontColor,
                                                fontSize: axesFontSize
                                           },
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Total Tickets Created',
                                                fontColor: axesFontColor,
                                                fontSize: axesFontSize
                                            }
                                        }],
                                        xAxes: [{
                                            stacked: true,
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Radar":
                return <div className="chartCard">
                            <Radar
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Doughnut":
                return <div className="chartCard">
                            <Doughnut
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Pie":
                return <div className="chartCard">
                            <Pie
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Doughnut":
                return <div className="chartCard">
                            <Doughnut
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Polar":
                return <div className="chartCard">
                            <Polar
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Bubble":
                return <div className="chartCard">
                            <Bubble
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
            case "Scatter":
                return <div className="chartCard">
                            <Scatter
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: dataLabel,
                                            data: data,
                                            backgroundColor: backgroundColor,
                                        }
                                    ],
                                }}
                                height={height}
                                width={width}
                                options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        labels: {
                                            fontColor: labelFontColor,
                                            fontSize: labelFontSize
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                           ticks: {
                                              stepSize: 1,      //For setting y-axis to integer value (instead of float)
                                              suggestedMin: 0,
                                              maxTicksLimit: maxTicksLimit,
                                              fontColor: axesFontColor,
                                              fontSize: axesFontSize
                                           }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                               fontColor: axesFontColor,
                                               fontSize: axesFontSize
                                            }
                                         }]
                                     }
                                }}
                            />
                        </div>
        }
}
export default chart