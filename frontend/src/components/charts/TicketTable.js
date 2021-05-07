import React from 'react';
import { Header, Table, TableCell, TableRow } from 'semantic-ui-react';
import dateUtils from '../../utils/dateUtils'

import '../../assets/css/components/TableTile.css'

export default function TicketTable(props) {

    const getTicketStatus = function (status) {

        if (status == null || status == undefined || status == "") {
            return "Unknown";
        }

        switch (status) {
            case 2:
                return "Open";
            case 3:
                return "Pending";

            case 4:
                return "Resolved";

            case 5: 
                return "Closed";

            case 8:
                return "Escalated";

            case 9:
                return "Investigating";

            case 10:
                return "Considering";

            case 11:
                return "On Hold";

            default:
                console.error("Ticket status is invalid: " + status);
        }
    };

    return (
        <div>
            <Header as='h3' dividing className="cardText" >
                Recently Open Tickets
            </Header>
            <Table style={{ backgroundColor:"#242228", color: "white", width: "500px"}} celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell style={{ backgroundColor: "#2688a6", color: "white" }}>ID</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#2688a6", color: "white" }}>Created At</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#2688a6", color: "white" }}>Status</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#2688a6", color: "white" }}>Type</Table.HeaderCell>
                        <Table.HeaderCell style={{ backgroundColor: "#2688a6", color: "white" }}>Subject</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {(!props.tickets ? <TableRow></TableRow> : props.tickets.map(ticket => (
                        <TableRow>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{dateUtils.formatDate(ticket.created)}</TableCell>
                            <TableCell>{getTicketStatus(ticket.status)}</TableCell>
                            <TableCell>{(ticket.type == null ? "Unknown" : ticket.type)}</TableCell>
                            <TableCell>{ticket.subject}</TableCell>
                        </TableRow>
                    )))}
                </Table.Body>
            </Table>
        </div>
    )
}
