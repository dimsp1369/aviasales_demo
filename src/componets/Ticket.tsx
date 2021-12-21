import React from 'react';
import {Box, Card, Typography} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import {ITicket} from "../types/types";
import TicketContent from "./TicketContent";

interface TicketProps {
    ticket: ITicket
}

const Ticket: React.FC<TicketProps> = ({ticket}) => {
    return (
        <Card sx={{maxWidth: 500}}>
            <Box className={'TicketHeader'}>
               <Typography variant={'h5'}>{ticket.price} P</Typography>
               <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={`${ticket.carrier}`}/>
            </Box>
            {ticket.segments.map((segment) => <TicketContent key={uuidv4()} segment={segment}/>)}
        </Card>
    );
};

export default Ticket;
