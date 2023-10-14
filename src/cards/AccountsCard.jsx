import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { useCSVData } from './CSVDataContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/joy/LinearProgress';



export default function AccountsCard() {
    const nextMonthName = getNextMonthName();
    const nextToNextMonthName = getNextToNextMonthName();

    const csvData = useCSVData();

    const [balanceLinearProgress, setbalanceLinearProgress] = useState(0)
    const [nextMonethSavingLinearProgress, setnextMonethSavingLinearProgress] = useState(0)
    const [nextToNextMonthSavingLinearProgress, setnextToNextMonthSavingLinearProgress] = useState(0)






    useEffect(() => {
        setbalanceLinearProgress((csvData.thisMonth / 19000) * 100);

    }, [csvData.thisMonth]);


    useEffect(() => {
        setnextMonethSavingLinearProgress((csvData.nextMonth / 19000) * 100);

    }, [csvData.nextMonth]);

    useEffect(() => {
        setnextToNextMonthSavingLinearProgress((csvData.nextNextMonth / 19000) * 100);
    }, [csvData.nextNextMonth]);

    return (
        <Card >
            <CardContent orientation='horizontal' sx={{ paddingLeft:2, paddingTop:2, paddingBottom:1 }}>
                <Typography level="h2">Account</Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent orientation='horizontal' sx={{ padding: 1 }}>
                <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
                    <Typography level="body-md">Balance</Typography>
                    <Typography level="title-lg">Rs. {csvData.thisMonth}</Typography>
                    <LinearProgressWithLabel value={balanceLinearProgress} />
                </CardContent>
            </CardContent>

            <Divider variant="middle" />

            <CardContent orientation='horizontal' sx={{ padding: 1 }}>
                <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
                    <Typography level="body-md">
                      {nextMonthName} Savings</Typography>
                    <Typography level="title-lg">Rs. {csvData.nextMonth}</Typography>
                    <LinearProgressWithLabel value={nextMonethSavingLinearProgress} />
                </CardContent>
            </CardContent>

            <CardContent orientation='horizontal' sx={{ padding: 1 }}>
                <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
                    <Typography level="body-md">{nextToNextMonthName} Savings</Typography>
                    <Typography level="title-lg">Rs. {csvData.nextNextMonth}</Typography>
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