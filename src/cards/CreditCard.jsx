import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Divider from '@mui/material/Divider';
import CreditCardIcon from '@mui/icons-material/CreditCard';



export default function CreditCard() {
    return (
        <Card >
            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <Typography level="h2">Credit cards</Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={20}>
                    <CreditCardIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">November Unbilled</Typography>
                    <Typography level="h2">Rs. 432.6M</Typography>
                </CardContent>
            </CardContent>

            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={20}>
                    <CreditCardIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">December Unbilled</Typography>
                    <Typography level="h2">Rs. 432.6M</Typography>
                </CardContent>
            </CardContent>

        </Card>
    );
}