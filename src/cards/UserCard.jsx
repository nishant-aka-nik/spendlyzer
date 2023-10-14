import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from '@mui/material/CardMedia';
import {bgRandomizer, getGreetingByTimezone} from './../utils/utils'
import { useCSVData } from './CSVDataContext';


export default function UserCard() {
    const [bgImage, setbgImage] = useState('')
    useEffect(() => {
        setbgImage(bgRandomizer);

    }, []);

    const csvData = useCSVData();
    const greeting = getGreetingByTimezone();



    return (
        <Card>
            <CardMedia component="img"
                title="clouds"
                src={bgImage}
                height='70'
            />
            <CardContent orientation="vertical" sx={{ padding: 2 }}>

                <Typography level='title-sm' >
                    Hi<Typography level='h4'> {csvData.name}, </Typography>

                </Typography>
                <Typography level='title-md'>{greeting}</Typography>


            </CardContent>
            <Divider variant="middle" />
        </Card>
    );
}
