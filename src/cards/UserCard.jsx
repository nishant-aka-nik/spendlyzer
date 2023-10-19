import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
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
                height='150'
                style={{
                    width: '100%'
                }}
            />
            <CardContent orientation="horizontal" sx={{ padding: 2, }} >

                <Typography level='title-sm' >
                    Hi<Typography level='h4'> {csvData.name}, </Typography>{greeting}

                </Typography>

                {/* <DigitalClock /> */}

            </CardContent>
            <Divider variant="middle" />
        </Card>
    );
}
