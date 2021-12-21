import React from 'react';
import {Button, ButtonGroup} from "@mui/material";

interface ButtonsProps {
    cheapestTrip: () => void,
    shortestTrip: () => void,
    optimalSort: () => void,
}

const Buttons: React.FC<ButtonsProps> = ({cheapestTrip, shortestTrip, optimalSort}) => {
    return (
        <ButtonGroup variant={'contained'} sx={{width: 500, display: 'flex', marginBottom: 2, '& > *': {flexGrow: 1}}}
                     size="large"
                     aria-label="large button group">
            <Button onClick={() => cheapestTrip()}>Cheapest</Button>
            <Button onClick={() => shortestTrip()}>Shortest</Button>
            <Button onClick={() => optimalSort()}>Optimal</Button>
        </ButtonGroup>
    );
};

export default Buttons;
