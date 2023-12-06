import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardMedia from '@mui/material/CardMedia';
import { bgRandomizer, getGreetingByTimezone } from './../utils/utils'
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
                src={bgImage}
                height='125'
                style={{
                    width: '100%'
                }}
            />
            <CardContent orientation="horizontal" sx={{ padding: 2, backgroundImage:'radial-gradient(circle, #051937, #004d7a, #008793, #00bf72, #a8eb12)'}} >

                <Typography level='title-sm' sx={{color:'white'}}>
                    Hi<Typography level='h4'> {csvData.name}, </Typography>{greeting}

                </Typography>

                {/* <DigitalClock /> */}

            </CardContent>
        </Card>
    );
}
