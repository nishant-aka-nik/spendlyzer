import React, {  } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";


export default function CashFlowGeneratorCard() {

    return (
        <Card sx={{
            padding: 1,
            borderRadius: 5,
            background: '#f0f3f5',
            boxShadow: '-5px 4px 9px #3e5b8b, #6c9ff1',
        }}>
            <CardContent orientation='vertical' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
                <Typography level="h2">Cash Flow generator</Typography>
                <Typography level="body-lg">- Coming soon...</Typography>
            </CardContent>
        </Card>
    )
    
}