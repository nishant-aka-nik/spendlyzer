import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { useCSVData } from './CSVDataContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/joy/LinearProgress';
import { getNextMonthName, getNextToNextMonthName } from './../utils/utils'


export default function AccountsCard() {
  const nextMonthName = getNextMonthName();
  const nextToNextMonthName = getNextToNextMonthName();

  const csvData = useCSVData();

  const [balanceLinearProgress, setbalanceLinearProgress] = useState(0)
  const [nextMonethSavingLinearProgress, setnextMonethSavingLinearProgress] = useState(0)
  const [nextToNextMonthSavingLinearProgress, setnextToNextMonthSavingLinearProgress] = useState(0)
  const [disposableMoney, setdisposableMoney] = useState(0)

  useEffect(() => {
    setbalanceLinearProgress((csvData.thisMonth / csvData.totalSaving) * 100);
    setnextMonethSavingLinearProgress((csvData.nextMonth / csvData.totalSaving) * 100);
    setnextToNextMonthSavingLinearProgress((csvData.nextNextMonth / csvData.totalSaving) * 100);
    setdisposableMoney(getDisposableMoney(csvData))
  }, [csvData]);

  return (
    <Card sx={{padding:1, borderRadius:5}}>
      <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Typography level="h2">Account</Typography>
      </CardContent>

      <Divider variant="middle" />

      <CardContent orientation='horizontal' sx={{ padding: 1, background:'#f7d7cd', borderRadius:10, margin:1 }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="body-md">Balance</Typography>
          <Typography level="h3">Rs. {csvData.thisMonth}</Typography>
          <LinearProgressWithLabel value={balanceLinearProgress} />
          <Typography level="body-sm">Disposable Rs. {disposableMoney}</Typography>
        </CardContent>
      </CardContent>

      <Divider variant="middle" />

      <CardContent orientation='horizontal' sx={{ padding: 1, background:'#b3e099', borderRadius:10, margin:1 }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="body-md">
            {nextMonthName} Savings</Typography>
          <Typography level="title-lg">Rs. {csvData.nextMonth}</Typography>
          <LinearProgressWithLabel value={nextMonethSavingLinearProgress} />
        </CardContent>
      </CardContent>

      <CardContent orientation='horizontal' sx={{ padding: 1, background:'#b3e099', borderRadius:10, margin:1 }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="body-md">{nextToNextMonthName} Savings</Typography>
          <Typography level="title-lg">Rs. {csvData.nextNextMonth}</Typography>
          <LinearProgressWithLabel value={nextToNextMonthSavingLinearProgress} />
        </CardContent>
      </CardContent>

    </Card>

  );
}

function LinearProgressWithLabel(props) {
  const isLessThan20 = props.value < 20;
  const barColor = isLessThan20 ? 'danger' : 'success'
  const roundedValue = isNaN(props.value) ? 0 : Math.round(props.value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          color={barColor}
          determinate
          size="lg"
          variant="plain"
          value={roundedValue}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${roundedValue}%`}
        </Typography>
      </Box>
    </Box>
  );
}

function getDisposableMoney(csvData) {
  const disposable = csvData.thisMonth - (csvData.totalSaving * 0.2)
  if (disposable < 0 || isNaN(disposable)){
    return 0;
  }
  return disposable
}