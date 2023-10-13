import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Divider from '@mui/material/Divider';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useCSVData } from './CSVDataContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/joy/LinearProgress';



export default function AccountsCard() {
    const nextMonthName = getNextMonthName();
    const nextToNextMonthName = getNextToNextMonthName();

    const csvData = useCSVData();
    console.log("Account card ", csvData)

    const [balanceCircularProgress, setbalanceCircularProgress] = useState(0)
    const [nextMonethSavingCircularProgress, setnextMonethSavingCircularProgress] = useState(0)
    const [nextToNextMonthSavingCircularProgress, setnextToNextMonthSavingCircularProgress] = useState(0)

    const [balanceLinearProgress, setbalanceLinearProgress] = useState(0)
    const [nextMonethSavingLinearProgress, setnextMonethSavingLinearProgress] = useState(0)
    const [nextToNextMonthSavingLinearProgress, setnextToNextMonthSavingLinearProgress] = useState(0)






    useEffect(() => {
        setbalanceCircularProgress((csvData.thisMonth / 19000) * 100);
        setbalanceLinearProgress((csvData.thisMonth / 19000) * 100);

    }, [csvData.thisMonth]);


    useEffect(() => {
        setnextMonethSavingCircularProgress((csvData.nextMonth / 19000) * 100);
        setnextMonethSavingLinearProgress((csvData.nextMonth / 19000) * 100);

    }, [csvData.nextMonth]);

    useEffect(() => {
        setnextToNextMonthSavingCircularProgress((csvData.nextNextMonth / 19000) * 100);
        setnextToNextMonthSavingLinearProgress((csvData.nextNextMonth / 19000) * 100);
    }, [csvData.nextNextMonth]);

    return (
        <Card sx={{ maxWidth: 'xl' }}>
            <CardMedia
                component="img" // Use 'img' as the component type for displaying an image
                title="clouds" // Set a title for the image
                height='100'
                width='400'
                src='/static/images/cards/cardheader.jpg'
            />
            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <Typography level="h2">Accounts</Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={balanceCircularProgress}>
                    <AccountBalanceIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">Balance</Typography>
                    <Typography level="h2">Rs. {csvData.thisMonth}</Typography>
                    <LinearProgressWithLabel value={balanceLinearProgress} />
                </CardContent>
            </CardContent>

            <Divider variant="middle" />

            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={nextMonethSavingCircularProgress}>
                    <AccountBalanceWalletIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">{nextMonthName} Savings</Typography>
                    <Typography level="h2">Rs. {csvData.nextMonth}</Typography>
                    <LinearProgressWithLabel value={nextMonethSavingLinearProgress} />
                </CardContent>
            </CardContent>

            <CardContent orientation='horizontal' sx={{ padding: 2 }}>
                <CircularProgress size="lg" determinate value={nextToNextMonthSavingCircularProgress}>
                    <AccountBalanceWalletIcon />
                </CircularProgress>
                <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                    <Typography level="body-md">{nextToNextMonthName} Savings</Typography>
                    <Typography level="h2">Rs. {csvData.nextNextMonth}</Typography>
                    <LinearProgressWithLabel value={nextToNextMonthSavingLinearProgress} />
                </CardContent>
            </CardContent>

        </Card>

    );
}

function getNextMonthName() {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Get the name of the next month using toLocaleString
    const nextMonthName = nextMonth.toLocaleString('default', { month: 'long' });

    return nextMonthName;
}

function getNextToNextMonthName() {
    const today = new Date();
    const nextToNextMonth = new Date(today);
    nextToNextMonth.setMonth(nextToNextMonth.getMonth() + 2);

    // Get the name of the next to next month using toLocaleString
    const nextToNextMonthName = nextToNextMonth.toLocaleString('default', { month: 'long' });

    return nextToNextMonthName;
}

function LinearProgressWithLabel(props) {
    const isLessThan20 = props.value < 20;
    const barColor = isLessThan20 ? 'danger' : 'success'
  
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            color={barColor}
            determinate
            size="lg"
            variant="outlined"
            value ={props.value}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }