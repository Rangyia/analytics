// dependencies
import { React, useState, useEffect } from 'react'
import { Segment, Card, Divider, GridColumn, Grid, GridRow } from 'semantic-ui-react'
import metricUtils from '../utils/metricUtils';
import dateUtils from '../utils/dateUtils';
import ReactTooltip from 'react-tooltip';

// components
import Loader from '../components/controls/Loader';
import TitleBar from '../components/controls/TitleBar';
import NumberTile from '../components/charts/NumberTile'
import TableTile from '../components/charts/TableTile';
import ChartTile from '../components/charts/ChartTile';
import DoughnutChart from '../components/charts/DoughnutChart';
import TickeTable from '../components/charts/TicketTable';

function analytics(props) {
    var colorPalette = ["#d46159", "#4f97e0", "#de35b7", "#72e6e8", "#DC2F02", "#E85D04", "#F48C06", "#FAA307", "#4287f5", "#de459c", "#7ebf8e", "#b4ba0f",]
    return (
        <div style={{ marginTop: "1px" }}>
            <Segment.Group>
                <Segment.Group >
                    <Segment className="segmentStyle">
                        {
                            (!props.data ? 
                            <Loader company={props.filter.company}/>
                            :
                            <div style={{ marginTop: "1px", paddingBottom: "100px" , overflowY: "scroll", height: "100vh" }}>
                            <TitleBar company={props.filter.company} logo={props.imageUri} />
                            <div style={{ marginTop: 50 }}>
                                <div>
                                    <h2>Open Tickets</h2>
                                    <Divider />
                                </div>
                                <Card.Group centered itemsPerRow={4} style={{ marginTop: "1px", justifyContent: "space-around" }}>
                                <NumberTile
                                    header={"Open"}
                                    label={"TICKETS"}
                                    count={metricUtils.getNumberValue(props.data.analytics[0], "ticket_open")}
                                    buttonLabel={"Additional Info"}
                                    statusOptions={[
                                        { percent: metricUtils.getMetricStatus(props.data.analytics[1], props.data.analytics[0], "ticket_open"), date: props.data.analytics[1].date },
                                        { percent: metricUtils.getMetricStatus(props.data.analytics[2], props.data.analytics[1], "ticket_open"), date: props.data.analytics[2].date },
                                        { percent: metricUtils.getMetricStatus(props.data.analytics[3], props.data.analytics[2], "ticket_open"), date: props.data.analytics[3].date },
                                    ]} />
                                <DoughnutChart 
                                    title={`Total Types: ${metricUtils.getNumberValue(props.data.analytics[0], "ticket_open")}`}
                                    labels={['Question', 'Data Request', 'Program Error', 'Onboarding Issue', 'Suggestion', 'Error/Defect', 'Performance', 'Data Access', 'Enhancement', 'Unknown']}
                                    dataset={[{
                                        label: 'Type',
                                        data: [
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_question"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_data_request"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_program_error"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_onboarding_issue"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_suggestion"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_defect"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_performance"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_dataaccess"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_enhancement"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "type_unknown")
                                        ],
                                        backgroundColor: [
                                            'rgb(138, 192, 242)',
                                            'rgb(245, 195, 110)',
                                            'rgb(182, 134, 227)',
                                            'rgb(240, 132, 65)',
                                            'rgb(22, 134, 33)',
                                            'rgb(80, 44, 227)',
                                            'rgb(55, 132, 65)',
                                            'rgb(22, 44, 33)',
                                            'rgb(2, 44, 227)',
                                            'rgb(80, 44, 233)',
                                        ],
                                        hoverOffset: 4
                                    }]}
                                    />
                                <DoughnutChart 
                                    title={`Total Severities: ${metricUtils.getNumberValue(props.data.analytics[0], "ticket_open")}`}
                                    labels={['Urgent', 'High', 'Medium', 'Low']}
                                    dataset={[{
                                        label: 'Severity',
                                        data: [
                                            metricUtils.getNumberValue(props.data.analytics[0], "severity_urgent"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "severity_high"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "severity_medium"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "severity_low"),
                                        ],
                                        backgroundColor: [
                                            'rgb(138, 192, 242)',
                                            'rgb(245, 195, 110)',
                                            'rgb(182, 134, 227)',
                                            'rgb(182, 22, 227)',
                                            'rgb(182, 134, 143)',
                                        ],
                                        hoverOffset: 4
                                    }]}
                                    />
                                <DoughnutChart 
                                    title={`Total Status: ${metricUtils.getNumberValue(props.data.analytics[0], "ticket_open")}`}
                                    labels={['Investigating', 'Pending Customer', 'Escalated']}
                                    dataset={[{
                                        label: 'Status',
                                        data: [
                                            metricUtils.getNumberValue(props.data.analytics[0], "status_unknown") + metricUtils.getNumberValue(props.data.analytics[0], "status_open") + metricUtils.getNumberValue(props.data.analytics[0], "status_investigating"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "status_pending") + metricUtils.getNumberValue(props.data.analytics[0], "status_onhold"),
                                            metricUtils.getNumberValue(props.data.analytics[0], "status_escalated"),
                                        ],
                                        backgroundColor: [
                                            'rgb(138, 192, 242)',
                                            'rgb(245, 195, 110)',
                                            'rgb(182, 134, 227)',
                                            'rgb(182, 22, 227)',
                                        ],
                                        hoverOffset: 4
                                    }]}
                                    />
                                <TickeTable tickets={props.tickets} />
                                </Card.Group>
                                <Grid style={{ marginTop: "100px", marginRight: "50px", marginLeft: "50px"}} columns={1}>
                                    <GridColumn>
                                        <TableTile
                                            header={"Open Tickets By Type:  " + metricUtils.getNumberValue(props.data.analytics[0], "ticket_open")}
                                            columnHeaders={["Questions", "Data Requests", "Program Errors", "Onboarding Issues", "Suggestions", "Defect/Error", "Performance", "Data Access", "Enhancement", "Unknown"]}
                                            tableData={[
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_question"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_data_request"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_program_error"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_onboarding_issue"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_suggestion"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_defect"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_performance"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_dataaccess"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_enhancement"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "type_unknown"),
                                            ]}
                                        />
                                    </GridColumn>
                                    <GridColumn>
                                        <TableTile
                                            header={"Open Tickets By Status:  " + metricUtils.getNumberValue(props.data.analytics[0], "ticket_open")}
                                            columnHeaders={["Investigating", "Pending Customer", "Escalated", "Enhancement"]}
                                            tableData={[
                                                metricUtils.getNumberValue(props.data.analytics[0], "status_unknown") + metricUtils.getNumberValue(props.data.analytics[0], "status_open") + metricUtils.getNumberValue(props.data.analytics[0], "status_investigating"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "status_pending") + metricUtils.getNumberValue(props.data.analytics[0], "status_onhold"),
                                                metricUtils.getNumberValue(props.data.analytics[0], "status_escalated"),
                                            ]}
                                            toolTips={[
                                                { id: "investigating", text: "Investigating = (status_Open + status_Investigating + status_Uknown)" },
                                                { id: "pendingCustomer", text: "Pending Customer = (status_Pending + status_OnHold)" },
                                                { id: "escalated", text: "Escalated" },
                                            ]}
                                        />
                                    </GridColumn>
                                </Grid>
                            </div>
                            <div style={{ marginTop: "100px"}}>
                                <div>
                                    <h2>Tickets Created By Month</h2>
                                    <Divider />
                                </div>
                                <Card.Group centered itemsPerRow={2} style={{marginTop: "1px", justifyContent: "space-around" }}>
                                    <ChartTile
                                        title="Ticket Types By Month"
                                        chartType="StackedBar"
                                        maxTicksLimit={9}
                                        data={[
                                            {
                                                label: "Questions",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_question"],
                                                    props.data["analytics"][4]["type_by_month_question"],
                                                    props.data["analytics"][3]["type_by_month_question"],
                                                    props.data["analytics"][2]["type_by_month_question"],
                                                    props.data["analytics"][1]["type_by_month_question"],
                                                    props.data["analytics"][0]["type_by_month_question"]
                                                ],
                                                backgroundColor: colorPalette[0],
                                            },
                                            {
                                                label: "Data Requests",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_data_request"],
                                                    props.data["analytics"][4]["type_by_month_data_request"],
                                                    props.data["analytics"][3]["type_by_month_data_request"],
                                                    props.data["analytics"][2]["type_by_month_data_request"],
                                                    props.data["analytics"][1]["type_by_month_data_request"],
                                                    props.data["analytics"][0]["type_by_month_data_request"],
                                                ],
                                                backgroundColor: colorPalette[1],
                                            },
                                            {
                                                label: "Program Errors",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_program_error"],
                                                    props.data["analytics"][4]["type_by_month_program_error"],
                                                    props.data["analytics"][3]["type_by_month_program_error"],
                                                    props.data["analytics"][2]["type_by_month_program_error"],
                                                    props.data["analytics"][1]["type_by_month_program_error"],
                                                    props.data["analytics"][0]["type_by_month_program_error"]
                                                ],
                                                backgroundColor: colorPalette[2],
                                            },
                                            {
                                                label: "Onboarding Issues",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_onboarding_issue"],
                                                    props.data["analytics"][4]["type_by_month_onboarding_issue"],
                                                    props.data["analytics"][3]["type_by_month_onboarding_issue"],
                                                    props.data["analytics"][2]["type_by_month_onboarding_issue"],
                                                    props.data["analytics"][1]["type_by_month_onboarding_issue"],
                                                    props.data["analytics"][0]["type_by_month_onboarding_issue"]
                                                ],
                                                backgroundColor: colorPalette[3],
                                            },
                                            {
                                                label: "Suggestions",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_suggestion"],
                                                    props.data["analytics"][4]["type_by_month_suggestion"],
                                                    props.data["analytics"][3]["type_by_month_suggestion"],
                                                    props.data["analytics"][2]["type_by_month_suggestion"],
                                                    props.data["analytics"][1]["type_by_month_suggestion"],
                                                    props.data["analytics"][0]["type_by_month_suggestion"]
                                                ],
                                                backgroundColor: colorPalette[4],
                                            },
                                            {
                                                label: "Defects",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_defect"],
                                                    props.data["analytics"][4]["type_by_month_defect"],
                                                    props.data["analytics"][3]["type_by_month_defect"],
                                                    props.data["analytics"][2]["type_by_month_defect"],
                                                    props.data["analytics"][1]["type_by_month_defect"],
                                                    props.data["analytics"][0]["type_by_month_defect"]
                                                ],
                                                backgroundColor: colorPalette[3],
                                            },
                                            {
                                                label: "Performance",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_performance"],
                                                    props.data["analytics"][4]["type_by_month_performance"],
                                                    props.data["analytics"][3]["type_by_month_performance"],
                                                    props.data["analytics"][2]["type_by_month_performance"],
                                                    props.data["analytics"][1]["type_by_month_performance"],
                                                    props.data["analytics"][0]["type_by_month_performance"]
                                                ],
                                                backgroundColor: colorPalette[4],
                                            },
                                            {
                                                label: "Data Access",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_dataaccess"],
                                                    props.data["analytics"][4]["type_by_month_dataaccess"],
                                                    props.data["analytics"][3]["type_by_month_dataaccess"],
                                                    props.data["analytics"][2]["type_by_month_dataaccess"],
                                                    props.data["analytics"][1]["type_by_month_dataaccess"],
                                                    props.data["analytics"][0]["type_by_month_dataaccess"]
                                                ],
                                                backgroundColor: colorPalette[5],
                                            },
                                            {
                                                label: "Enhancement",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_enhancement"],
                                                    props.data["analytics"][4]["type_by_month_enhancement"],
                                                    props.data["analytics"][3]["type_by_month_enhancement"],
                                                    props.data["analytics"][2]["type_by_month_enhancement"],
                                                    props.data["analytics"][1]["type_by_month_enhancement"],
                                                    props.data["analytics"][0]["type_by_month_enhancement"]
                                                ],
                                                backgroundColor: colorPalette[6],
                                            },
                                            {
                                                label: "Unknown",
                                                data: [
                                                    props.data["analytics"][5]["type_by_month_unknown"],
                                                    props.data["analytics"][4]["type_by_month_unknown"],
                                                    props.data["analytics"][3]["type_by_month_unknown"],
                                                    props.data["analytics"][2]["type_by_month_unknown"],
                                                    props.data["analytics"][1]["type_by_month_unknown"],
                                                    props.data["analytics"][0]["type_by_month_unknown"]
                                                ],
                                                backgroundColor: colorPalette[8]
                                            }
                                        ]}
                                        labels={dateUtils.setMonthLabels(6, props.data)}
                                        dataLabel={"Type"}
                                    />
                                    <ChartTile
                                        title="Ticket Severity By Month"
                                        chartType="StackedBar"
                                        maxTicksLimit={9}
                                        data={[
                                            {
                                                label: "Low",
                                                data: [
                                                    props.data["analytics"][5]["severity_by_month_low"],
                                                    props.data["analytics"][4]["severity_by_month_low"],
                                                    props.data["analytics"][3]["severity_by_month_low"],
                                                    props.data["analytics"][2]["severity_by_month_low"],
                                                    props.data["analytics"][1]["severity_by_month_low"],
                                                    props.data["analytics"][0]["severity_by_month_low"]
                                                ],
                                                backgroundColor: colorPalette[0],
                                            },
                                            {
                                                label: "Medium",
                                                data: [
                                                    props.data["analytics"][5]["severity_by_month_medium"],
                                                    props.data["analytics"][4]["severity_by_month_medium"],
                                                    props.data["analytics"][3]["severity_by_month_medium"],
                                                    props.data["analytics"][2]["severity_by_month_medium"],
                                                    props.data["analytics"][1]["severity_by_month_medium"],
                                                    props.data["analytics"][0]["severity_by_month_medium"],
                                                ],
                                                backgroundColor: colorPalette[1],
                                            },
                                            {
                                                label: "High",
                                                data: [
                                                    props.data["analytics"][5]["severity_by_month_high"],
                                                    props.data["analytics"][4]["severity_by_month_high"],
                                                    props.data["analytics"][3]["severity_by_month_high"],
                                                    props.data["analytics"][2]["severity_by_month_high"],
                                                    props.data["analytics"][1]["severity_by_month_high"],
                                                    props.data["analytics"][0]["severity_by_month_high"]
                                                ],
                                                backgroundColor: colorPalette[2],
                                            },
                                            {
                                                label: "Urgent",
                                                data: [
                                                    props.data["analytics"][5]["severity_by_month_urgent"],
                                                    props.data["analytics"][4]["severity_by_month_urgent"],
                                                    props.data["analytics"][3]["severity_by_month_urgent"],
                                                    props.data["analytics"][2]["severity_by_month_urgent"],
                                                    props.data["analytics"][1]["severity_by_month_urgent"],
                                                    props.data["analytics"][0]["severity_by_month_urgent"]
                                                ],
                                                backgroundColor: colorPalette[3],
                                            },
                                            {
                                                label: "Unknown",
                                                data: [
                                                    props.data["analytics"][5]["severity_by_month_unknown"],
                                                    props.data["analytics"][4]["severity_by_month_unknown"],
                                                    props.data["analytics"][3]["severity_by_month_unknown"],
                                                    props.data["analytics"][2]["severity_by_month_unknown"],
                                                    props.data["analytics"][1]["severity_by_month_unknown"],
                                                    props.data["analytics"][0]["severity_by_month_unknown"]
                                                ],
                                                backgroundColor: colorPalette[4],
                                            }
                                        ]}
                                        labels={dateUtils.setMonthLabels(6, props.data)}
                                        dataLabel={"Type"}
                                    />
                                </Card.Group>
                            </div>
                        </div>
                        )}
                    </Segment>
                </Segment.Group>
            </Segment.Group>
        </div>
    )
}

export default analytics
