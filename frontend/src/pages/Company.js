// dependencies
import { React } from 'react';
import { Segment, Card, Divider } from 'semantic-ui-react';
import metricUtils from '../utils/metricUtils';
import dateUtils from '../utils/dateUtils'

// styles
import '../assets/css/pages/samplecompanyPage.css';

// components
import Loader from '../components/controls/Loader';
import TitleBar from '../components/controls/TitleBar';
import TableTile from '../components/charts/TableTile';
import NumberTile from '../components/charts/NumberTile';
import DoughnutChart from '../components/charts/DoughnutChart';

function samplecompany(props) {
    return (
        <div style={{ marginTop: "1px" }}>
            <Segment.Group>
                <Segment.Group >
                    <Segment className="segmentStyle">
                        {
                            (!props.data ? 
                            <Loader company={props.filter.company}/>
                            :
                                <div style={{ marginTop: "1px", overflowY: "scroll", height: "100vh" }}>
                                <TitleBar company={props.filter.company} logo={props.imageUri} />
                                <div style={{marginTop: 50}}>
                                    <h2>samplecompany Usage For {dateUtils.getMonthFromDate(props.data.samplecompany[0].date)} 2021</h2>
                                    <Divider />
                                </div>
                                <Card.Group centered itemsPerRow={3} style={{ marginTop: "1px" }}>
                                        <NumberTile 
                                            header={"Users"} 
                                            label={"USERS"} 
                                            count={metricUtils.getNumberValue(props.data.samplecompany[0], "users")} 
                                            buttonLabel={"Additional Info"} 
                                            statusOptions={[
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[1], props.data.samplecompany[0], "users"), date: props.data.samplecompany[1].date}, 
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[2], props.data.samplecompany[1], "users"), date: props.data.samplecompany[2].date },
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[3], props.data.samplecompany[2], "users"), date: props.data.samplecompany[3].date },
                                        ]}/>
                                        <NumberTile
                                            header={"Active Users"}
                                            label={"USERS"}
                                            count={metricUtils.getNumberValue(props.data.samplecompany[0], "users_active")}
                                            buttonLabel={"Additional Info"}
                                            statusOptions={[
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[1], props.data.samplecompany[0], "users_active"), date: props.data.samplecompany[1].date },
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[2], props.data.samplecompany[1], "users_active"), date: props.data.samplecompany[2].date },
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[3], props.data.samplecompany[2], "users_active"), date: props.data.samplecompany[3].date },
                                            ]} />
                                        <NumberTile
                                            header={"Logins"}
                                            label={"USERS"}
                                            count={metricUtils.getNumberValue(props.data.samplecompany[0], "users_login")}
                                            buttonLabel={"Additional Info"}
                                            statusOptions={[
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[1], props.data.samplecompany[0], "users_login"), date: props.data.samplecompany[1].date },
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[2], props.data.samplecompany[1], "users_login"), date: props.data.samplecompany[2].date },
                                                { percent: metricUtils.getMetricStatus(props.data.samplecompany[3], props.data.samplecompany[2], "users_login"), date: props.data.samplecompany[3].date },
                                            ]} />
                                </Card.Group>
                                <Card.Group itemsPerRow={2} style={{ marginTop: "1px", justifyContent: "space-around"}}>
                                    <div style={{ marginTop: 50 }}>
                                        <h2>Application Usage</h2>
                                        <Divider />
                                        <TableTile
                                            header={"Apps"}
                                            columnHeaders={["Files", "Projects", "RFIs", "Submittals", "Budgets", "Contracts", "Issues", "Daily Reports"]}
                                            tableData={[
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_file"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_project"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_rfi"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_submittal"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_budget"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_contract"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_issue"),
                                                metricUtils.getNumberValue(props.data.samplecompany[0], "app_dailyreport"),
                                            ]}
                                            />
                                    </div>
                                    <div style={{ marginTop: 50 }}>
                                        <h2>License Info</h2>
                                        <Divider />
                                            <DoughnutChart 
                                                title={`Total Licenses: ${metricUtils.getNumberValue(props.data.samplecompany[0], "license")}`}
                                                labels={['Unassigned', 'Assigned', 'Pending']}
                                                dataset={[{
                                                    label: 'Licenses',
                                                    data: [
                                                        (metricUtils.getNumberValue(props.data.samplecompany[0], "license") - (metricUtils.getNumberValue(props.data.samplecompany[0], "license_assigned") + metricUtils.getNumberValue(props.data.samplecompany[0], "license_pending"))),
                                                        metricUtils.getNumberValue(props.data.samplecompany[0], "license_assigned"),
                                                        metricUtils.getNumberValue(props.data.samplecompany[0], "license_pending")
                                                    ],
                                                    backgroundColor: [
                                                        'rgb(138, 192, 242)',
                                                        'rgb(245, 195, 110)',
                                                        'rgb(182, 134, 227)'
                                                    ],
                                                    hoverOffset: 4
                                                }]}
                                                />
                                    </div>
                                </Card.Group>
                            </div> 
                            )
                        }
                    </Segment>
                </Segment.Group>
            </Segment.Group>
        </div>
    );
};

export default samplecompany