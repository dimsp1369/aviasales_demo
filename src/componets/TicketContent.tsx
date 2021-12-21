import React, {FC} from 'react';
import {CardContent, Grid, Typography} from "@mui/material";
import {ITicketSegment} from "../types/types";

interface TicketSegmentProps {
    segment: ITicketSegment
}

const TicketContent: FC<TicketSegmentProps> = ({segment}) => {

    const departureTime = (date: string) => {
        const departureDate = new Date(date)
        const hours = departureDate.getUTCHours()
        let minutes = Math.round(departureDate.getUTCMinutes() / 10) * 10
        return `${hours}:${minutes}`
    }

    const arrivingTime = (date: string, duration: number) => {
        const arrivingDate = new Date(Date.parse(date) + duration * 60 * 1000)
        const hours = arrivingDate.getUTCHours()
        let minutes = Math.round(arrivingDate.getUTCMinutes() / 10) * 10
        return `${hours}:${minutes === 0 ? '00' : minutes}`
    }

    return (
        <CardContent>
            <Grid container justifyContent={'space-between'}>
                <Grid item xs='auto'>
                    <Typography color="text.secondary" gutterBottom variant={'subtitle2'}
                                sx={{fontSize: '12px', marginBottom: 0,}}>
                        {segment.origin} - {segment.destination}
                    </Typography>
                    <Typography variant={'subtitle1'} component={'div'}>
                        {`${departureTime(segment.date)} - ${arrivingTime(segment.date, segment.duration)}`}
                    </Typography>
                </Grid>
                <Grid item xs='auto'>
                    <Typography color="text.secondary" gutterBottom sx={{fontSize: '12px', marginBottom: 0,}}>
                        DURATION
                    </Typography>
                    <Typography>
                        {Math.floor(segment.duration / 60)} h {' '}
                        {Math.round((Math.round(((segment.duration / 60)
                            - (Math.floor(segment.duration / 60))) * 60)) / 10) * 10} m
                    </Typography>
                </Grid>
                <Grid item xs='auto' alignSelf={'center'} textAlign={'center'}>
                    {segment.stops.length
                        ? <>
                            <Typography color="text.secondary" gutterBottom sx={{fontSize: '12px', marginBottom: 0,}}>
                                {segment.stops.length} STOPS
                            </Typography>
                            <Typography>
                                {segment.stops.join(', ')}
                            </Typography>
                        </>
                        : <Typography color="text.secondary" gutterBottom sx={{fontSize: '12px'}}>
                            NON-STOP
                        </Typography>}
                </Grid>
            </Grid>
        </CardContent>
    );
};

export default TicketContent;
