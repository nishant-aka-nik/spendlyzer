import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { useCSVData } from './CSVDataContext';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/joy/LinearProgress';
import { getMonthName } from './../utils/utils'


export default function AccountsCard() {
  const nextMonthName = getMonthName(1);
  const nextToNextMonthName = getMonthName(2);

  const csvData = useCSVData();

  const [balanceLinearProgress, setbalanceLinearProgress] = useState(0)
  const [nextMonethSavingLinearProgress, setnextMonethSavingLinearProgress] = useState(0)
  const [nextToNextMonthSavingLinearProgress, setnextToNextMonthSavingLinearProgress] = useState(0)
  const [disposableMoney, setdisposableMoney] = useState(0)
  const [perDay, setperDay] = useState(0)

  useEffect(() => {
    setbalanceLinearProgress((csvData.thisMonth / csvData.totalSaving) * 100);
    setnextMonethSavingLinearProgress((csvData.nextMonth / csvData.totalSaving) * 100);
    setnextToNextMonthSavingLinearProgress((csvData.nextNextMonth / csvData.totalSaving) * 100);
    setdisposableMoney(getDisposableMoney(csvData))
    setperDay(perDayCalculator(csvData.thisMonth))
  }, [csvData]);

  return (
    <Card sx={{ padding: 1, borderRadius: 5, background: '#ffded6' }}>
      <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Typography level="h2">Account</Typography>
      </CardContent>

      <Divider variant="middle" />

      <CardContent orientation='horizontal' sx={{
        padding: 1, background: '#f7d7cd', borderRadius: 10, margin: 1,
        boxShadow: 'inset -1px 1px 5px #c6bbb8,inset 1px -1px 5px #c6bbb8',
      }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="body-md">Balance</Typography>
          <Typography level="h3">Rs. {csvData.thisMonth}</Typography>
          <LinearProgressWithLabel value={balanceLinearProgress} />
          <Typography level="body-sm">- Per day spend limit rs. <Typography level='title-lg' color={'success'}>{perDay}</Typography></Typography>
          <Typography level="body-sm">- Disposable cash rs. <Typography level='title-lg' color={'success'}>{disposableMoney}</Typography></Typography>
        </CardContent>
      </CardContent>

      <Divider variant="middle" />

      <CardContent orientation='horizontal' sx={{
        padding: 1, background: '#b3e099', borderRadius: 10, margin: 1,
        boxShadow: 'inset -1px 1px 5px #8fb37a,inset 1px -1px 5px #8fb37a',
      }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="title-md">
            {nextMonthName} Savings</Typography>
          <Typography level="title-lg">Rs. {csvData.nextMonth}</Typography>
          <LinearProgressWithLabel value={nextMonethSavingLinearProgress} />
        </CardContent>
      </CardContent>

      <CardContent orientation='horizontal' sx={{
        padding: 1, background: '#b3e099', borderRadius: 10, margin: 1,
        boxShadow: 'inset -1px 1px 5px #8fb37a,inset 1px -1px 5px #8fb37a',
      }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="title-md">{nextToNextMonthName} Savings</Typography>
          <Typography level="title-lg">Rs. {csvData.nextNextMonth}</Typography>
          <LinearProgressWithLabel value={nextToNextMonthSavingLinearProgress} />
        </CardContent>
      </CardContent>

    </Card>

  );
}

function LinearProgressWithLabel(props) {
  const { value, invert } = props;
  let isLessThan20 = 0
  if (invert) {
    isLessThan20 = value > 80;
  } else {
    isLessThan20 = value < 20;
  }
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

function LinearProgressWithLabelAndColor(props) {
  const { value, invert, color } = props;
  let isLessThan20 = 0
  if (invert) {
    isLessThan20 = value > 80;
  } else {
    isLessThan20 = value < 20;
  }
  const barColor = isLessThan20 ? 'danger' : color
  const roundedValue = isNaN(props.value) ? 0 : Math.round(props.value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          determinate
          size="lg"
          variant="plain"
          value={roundedValue}
          sx={{ color: barColor }}
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
  if (disposable < 0 || isNaN(disposable)) {
    return 0;
  }
  return disposable
}

function perDayCalculator(amount) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the last date of the current month
  // To find the last date of the month, we set the day to 0 of the next month
  const lastDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Calculate the time difference in milliseconds between the last date of the month and the current date
  const timeDifference = lastDateOfMonth.getTime() - currentDate.getTime();

  // Calculate the number of days in between by dividing the time difference by the number of milliseconds in a day
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return parseInt(amount / (daysDifference + 1))
}

export { LinearProgressWithLabel, LinearProgressWithLabelAndColor };