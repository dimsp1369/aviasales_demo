import React, {FC, useState} from 'react';
import {Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {v4 as uuidv4} from "uuid";
import {ITicket} from "../types/types";

interface CheckBosFilterProps {
    tickets: ITicket[],
    setFilteredList: (arg: ITicket[]) => void
}

const CheckBoxFilter: FC<CheckBosFilterProps> = ({tickets, setFilteredList}) => {
    const [currentFilter, setCurrentFilter] = useState<String[]>([])
    const [filter, setFilter] = useState([
        {
            value: '0',
            isChecked: false
        }, {
            value: '1',
            isChecked: false
        }, {
            value: '2',
            isChecked: false
        }, {
            value: '3',
            isChecked: false
        },
    ])

    const filterStops = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target

        const newCurrentFilter = [...currentFilter]
        if (!newCurrentFilter.includes(name)) {
            newCurrentFilter.push(name)
        } else {
            newCurrentFilter.splice(newCurrentFilter.indexOf(name), 1)
        }
        setCurrentFilter(newCurrentFilter)

        setFilter([...filter].map((el) => el.value === name ? {...el, isChecked: !el.isChecked} : el))

        const newFilterList: ITicket[] = []

        for (let i = 0; i <= newCurrentFilter.length; i++) {
            const list = [...tickets]
                .filter(ticket => ticket.segments[0].stops.length === Number(newCurrentFilter[i])
                    || ticket.segments[1].stops.length === Number(newCurrentFilter[i]))
            newFilterList.push(...list)
        }
        setFilteredList(newCurrentFilter.length ? newFilterList : [...tickets])
    }

    return (
        <Card sx={{width: 230, maxHeight: 250}}>
            <CardHeader title={'STOPS'}/>
            <CardContent>
                <FormGroup>
                    {filter.map(({value, isChecked}) => <FormControlLabel
                        control={<Checkbox name={value} checked={isChecked} onChange={filterStops}/>}
                        label={value === '0' ? 'Non-Stop' : value === '1' ? `${value} stop` : `${value} stops`}
                        key={uuidv4()}/>)}
                </FormGroup>
            </CardContent>
        </Card>
    );
};

export default CheckBoxFilter;
