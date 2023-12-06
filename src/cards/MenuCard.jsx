import React, {  } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/material/Divider";
import Button from '@mui/material-next/Button';


export default function MenuCard() {


    return (
        <Card sx={{ borderRadius: 10 }}>
            <CardContent orientation="horizontal" sx={{ padding: 1, justifyContent:'space-around' }} >

                <Button onClick={{}} color='tertiary' sx={{fontSize:18}} size='small'  variant="filledTonal">Home</Button>
                <Button sx={{fontSize:18}} variant="filledTonal" size='small'>Expenses</Button>
                <Button sx={{fontSize:18}} variant="filledTonal" size='small'>Settings</Button>

            </CardContent>
            <Divider variant="middle" />
        </Card>
    );
}
