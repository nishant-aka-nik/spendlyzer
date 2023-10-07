import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Divider from '@mui/material/Divider';



export default function MediaCard() {
    return (
        <Card sx={{ maxWidth: 'xl' }}>
            <CardMedia
                component="img" // Use 'img' as the component type for displaying an image
                title="clouds" // Set a title for the image
                height='200'
                width='400'
                src='/static/images/cards/cardheader.jpg'
            />
            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={20}>
                    <AccountBalanceWalletIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">Balance</Typography>
                    <Typography level="h2">$ 432.6M</Typography>
                </CardContent>
            </CardContent>
            <Divider variant="middle" />
            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={20}>
                    <AccountBalanceWalletIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">Balance</Typography>
                    <Typography level="h2">$ 432.6M</Typography>
                </CardContent>
            </CardContent>
        </Card>
    );
}