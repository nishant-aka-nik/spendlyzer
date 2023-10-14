import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from '@mui/material/CardMedia';
import {bgRandomizer} from './../utils/utils'



export default function UserCard() {

    const [bgImage, setbgImage] = useState('')

    useEffect(() => {
        setbgImage(bgRandomizer);

    }, []);


    return (
        <Card>
            <CardMedia component="img"
                title="clouds"
                src={bgImage}
                height='70'
            />
            <CardContent orientation="horizontal" sx={{ padding: 2 }}>

                <Typography level='title-sm' >
                    Hi,<Typography level='title-lg'> Saraswati Good Morning!</Typography>

                </Typography>


            </CardContent>
            <Divider variant="middle" />
        </Card>
    );
}
