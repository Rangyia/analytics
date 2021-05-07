import { React } from 'react';
import { Header, Card, Statistic, Icon, Button } from 'semantic-ui-react';
import CountUp from 'react-countup';
import dateUtils from '../../utils/dateUtils';
import '../../assets/css/components/NumberTile.css';

function Tile(props) {

    const getStatusSection = (options) => {
        if (options.percent.status > 0) {
            return (
                <div className="titleCardStatus">
                    <span className="titleCardDate">{dateUtils.getMonthFromDate(options.date)}</span>
                    <Icon className="status titleCardStatusArrowDown" name="triangle down" size="large"/>
                    <span className="titleCardStatusPercent">{options.percent.percentage}<span style={{ color: "#EC3E3E", marginLeft:"5px"}}>%</span></span>
                </div>
            )
        } else if (options.percent.status < 0) {
            return (
                <div className="titleCardStatus">
                    <span className="titleCardDate">{dateUtils.getMonthFromDate(options.date)}</span>
                    <Icon className="status titleCardStatusArrowUp" name="triangle up" size="large"/>
                    <span className="titleCardStatusPercent">{options.percent.percentage}<span style={{ color: "#42E780 ", marginLeft:"5px"}}>%</span></span>
                </div>
            )
        } else {
            return (
                <div className="titleCardStatus">
                    <span className="titleCardDate">{dateUtils.getMonthFromDate(options.date)}</span>
                    <Icon className="status titleCardStatusArrowNone" name="minus" size="large"/>
                    <span className="titleCardStatusPercent">{0}<span style={{ color: '#1369f2', marginLeft:"5px"}}>%</span></span>
                </div>
            )
        }
    }

    return (
        <Card className="tileCard" style={{"padding": "0px 0px 170px 0px"}}>
            <Card.Content>
                <Icon name="ellipsis vertical" className="tileCardIcon"/>
                <Card.Header as='h3' dividing className="tileCardHeader">
                    <Statistic>
                        <Statistic.Value className="tileCardValue">
                            <CountUp  end={props.count} separator="," useEasing={true} duration={2} />
                        </Statistic.Value>
                    </Statistic> {props.header}</Card.Header>
                <Card.Description style={{display: "flex"}}>
                    {props.statusOptions.map(el => getStatusSection(el))}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Tile
