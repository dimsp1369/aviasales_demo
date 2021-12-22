import React, {useEffect, useState} from 'react';
import './App.scss';
import {v4 as uuidv4} from 'uuid';
import {ITicket} from "./types/types";
import axios from "axios";
import {Box, Button, Grid} from "@mui/material";
import Loading from "./componets/Loading";
import MainLayout from "./componets/MainLayout";
import CheckBoxFilter from "./componets/CheckBoxFilter";
import Buttons from "./componets/Buttons";
import Ticket from "./componets/Ticket";


function App() {
    const [tickets, setTickets] = useState<ITicket[]>([])
    const [filteredList, setFilteredList] = useState<ITicket[]>([])
    const [openedTickets, setOpenedTickets] = useState<number>(5)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async (data: any) => {
            try {
                const listData = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${data.searchId}`)
                setTickets(prevState => prevState.concat(listData.data.tickets))
                setFilteredList(prevState => prevState.concat(listData.data.tickets))
                if (listData.data.stop) setIsLoading(true)
                if (!listData.data.stop) fetchData(data)
            } catch {
                console.log('Server error')
                await fetchData(data)
            }
        }
        axios.get('https://front-test.beta.aviasales.ru/search').then(({data}) => {
            fetchData(data)
        })
    }, [])

    const cheapestTrip = () => {
        setFilteredList([...filteredList].sort((a, b) => a.price - b.price))
    }

    const shortestTrip = () => {
        setFilteredList([...filteredList]
            .sort((a, b) => a.segments
                .reduce((sum, x) => sum + x.duration, 0) - b.segments
                .reduce((sum, x) => sum + x.duration, 0)))
    }

    const optimalSort = () => {
        setFilteredList([...filteredList]
            .sort((a, b) => (a.price + a.segments
                .reduce((sum, x) => sum + x.duration, 0)) - (b.price + b.segments
                .reduce((sum, x) => sum + x.duration, 0))))
    }

    if (!isLoading) return <Loading/>
    return (
        <MainLayout>
            <CheckBoxFilter tickets={tickets} setFilteredList={setFilteredList}/>
            <Box>
                <Buttons cheapestTrip={cheapestTrip} shortestTrip={shortestTrip} optimalSort={optimalSort}/>
                <Grid container spacing={3} direction={'column'}>
                    {filteredList.slice(0, openedTickets).map((ticket) => <Grid item key={uuidv4()}>
                        <Ticket ticket={ticket}/></Grid>)}
                </Grid>
                <Button onClick={() => setOpenedTickets(openedTickets + 5)} variant={'contained'}
                        sx={{width: 500, marginTop: 2}}>
                    Show 5 more
                </Button>
            </Box>
        </MainLayout>
    );
}

export default App;
