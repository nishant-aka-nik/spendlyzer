import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/material/Divider";
import CardMedia from '@mui/material/CardMedia';



export default function UserCard() {

    return (
        <Card>
            <CardMedia component="img"
                title="clouds"
                src='/static/images/cards/cardheader.jpg'
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
