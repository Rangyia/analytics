import { React } from 'react';
import { Header, Card, Table, Divider } from 'semantic-ui-react';
import ReactTooltip from 'react-tooltip';

import '../../assets/css/components/TableTile.css'

function Tile(props) {

    let columnHeaders = () => {
        if (props.toolTips) {
            let d = [];
            for (let i in props.toolTips) {
                d.push(<Table.HeaderCell data-tip data-for={props.toolTips[i].id} key={props.columnHeaders[i]}>{props.columnHeaders[i]}</Table.HeaderCell>)
            }
            return d;
        }
        else {
            return props.columnHeaders.map(column => <Table.HeaderCell key={column}>{column}</Table.HeaderCell>)
        }
    }

    let tableData = props.tableData.map(data => <Table.Cell>{data}</Table.Cell>)

    let toolTips = (props.toolTips ? props.toolTips.map(tooltip => <ReactTooltip id={tooltip.id} place="top" effect="solid">{tooltip.text}</ReactTooltip>) : null)

    return (
        <div>
            <Header as='h3' dividing className="cardText" >
                {props.header}
            </Header>
                <Table celled inverted selectable>
                    <Table.Header>
                        <Table.Row>
                            {columnHeaders()}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            {tableData}
                        </Table.Row>
                    </Table.Body>
                </Table>
        {(props.toolTips ? toolTips : <></>)}
        </div>
    )
}

export default Tile
