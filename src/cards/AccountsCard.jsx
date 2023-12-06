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
  const [finalBalance, setfinalBalance] = useState(0)
  const [todaysCashTransaction, settodaysCashTransaction] = useState([])

  const [boxShadow, setboxShadow] = useState('')

  useEffect(() => {
    const progress = (csvData.thisMonth / csvData.totalSaving) * 100
    setbalanceLinearProgress(progress);
    setnextMonethSavingLinearProgress((csvData.nextMonth / csvData.totalSaving) * 100);
    setnextToNextMonthSavingLinearProgress((csvData.nextNextMonth / csvData.totalSaving) * 100);
    setdisposableMoney(getDisposableMoney(csvData))
    setperDay(perDayCalculator(getFinalBalance(csvData)))
    setfinalBalance(getFinalBalance(csvData))

    setboxShadow(getBoxShadow({ invert: false, progress}))
    settodaysCashTransaction(parseTodaysCashTransaction(csvData))

  }, [csvData]);

  return (
    <Card sx={{ padding: 1, borderRadius: 5, background: '#f0f3f5' }}>
      <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
        <Typography level="h2">Account</Typography>
      </CardContent>

      <Divider variant="middle" />

      <CardContent orientation='horizontal' sx={{
        padding: 1, background: '#edf2f5', borderRadius: 10, margin: 1,
        boxShadow,
      }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="title-md">Balance</Typography>
          <Typography level="h3">Rs. {finalBalance}</Typography>
          <LinearProgressWithLabel value={balanceLinearProgress} />
          <Typography level="title-sm">- Per day spend limit rs. <Typography level='title-lg' color={'success'}>{perDay}</Typography></Typography>
          <Typography level="body-sm">- Cash rs. <Typography level='title-lg' color={'success'}>{csvData.thisMonth}</Typography></Typography>
          <Typography level="body-sm">- Disposable cash rs. <Typography level='title-lg' color={'success'}>{disposableMoney}</Typography></Typography>
        </CardContent>
      </CardContent>

      <Divider variant="middle" />

      <CardContent orientation='horizontal' sx={{
        padding: 1, background: '#edf2f5', borderRadius: 10, margin: 1,
        boxShadow,
      }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="title-md">
            {nextMonthName} Savings</Typography>
          <Typography level="title-lg">Rs. {csvData.nextMonth}</Typography>
          <LinearProgressWithLabel value={nextMonethSavingLinearProgress} />
        </CardContent>
      </CardContent>

      <CardContent orientation='horizontal' sx={{
        padding: 1, background: '#edf2f5', borderRadius: 10, margin: 1,
        boxShadow,
      }}>
        <CardContent orientation='vertical' sx={{ paddingLeft: 1 }}>
          <Typography level="title-md">{nextToNextMonthName} Savings</Typography>
          <Typography level="title-lg">Rs. {csvData.nextNextMonth}</Typography>
          <LinearProgressWithLabel value={nextToNextMonthSavingLinearProgress} />
        </CardContent>
      </CardContent>



      <Divider variant="middle" />

      {todaysCashTransaction.length > 0 && (
        <CardContent orientation="horizontal" sx={{
          padding: 1, background: '#edf2f5', borderRadius: 10, margin: 1,
          boxShadow: 'inset -1px 1px 5px #ebaeeb,inset 1px -1px 5px #ebaeeb',
        }}>
          <CardContent orientation="vertical" sx={{ paddingLeft: 1 }}>
            <Typography level="title-md">Today's Cash Transaction</Typography>
            <Divider variant="fullWidth" />

            {todaysCashTransaction.map((transaction, index) => (
              <CardContent orientation="horizontal" key={index}>
                <Typography level="body-sm" sx={{ color: '#570957' }}>- {transaction.paidAt} of rs. <Typography level="title-md" sx={{ color: '#800080' }}>{transaction.amount}</Typography> </Typography>
              </CardContent>
            ))}
          </CardContent>
        </CardContent>
      )}



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
  let barColor = ''
  if (invert) {
    const isGreaterThan80 = value > 80;
    barColor = isGreaterThan80 ? color : '#73add1'
  } else {
    const isLessThan20 = value < 20;
    barColor = isLessThan20 ? '#73add1' : color
  }
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
  const disposable = csvData.thisMonth - (csvData.totalSaving * (csvData.disposableThresholdPercentage / 100))
  if (disposable < 0 || isNaN(disposable)) {
    return 0;
  }
  return disposable
}

function getFinalBalance(csvData) {
  const currentDate = new Date();
  const day = currentDate.getDate();

  const unbilledValue = day < csvData.minCCBillingDate ? csvData.unbilledNextMonth : csvData.unbilledNextNextMonth;

  const finalBalance = +csvData.thisMonth + (+csvData.unbilledThresold - +unbilledValue);

  return finalBalance;
}

function parseTodaysCashTransaction(csvData) {
  console.error('csvData.todaysTransaction---', csvData.todaysTransaction)
  if (csvData.todaysTransaction) {
    const decodedString = atob(csvData.todaysTransaction);
    const jsonObject = JSON.parse(decodedString);
    console.log('jsonObject', jsonObject)
    return jsonObject.todaysCashTransaction
  }

  return []
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

function getBoxShadow(req) {
  let { invert, progress } = req
  console.info('JSON.stringify(req)',JSON.stringify(req))

  if (invert){
    return (progress > 80) ? 'inset -1px 1px 5px #f28383,inset 1px -1px 5px #f28383' : 'inset -1px 1px 5px #a5ce8d,inset 1px -1px 5px #a5ce8d';
  } else {
    return (progress < 20) ? 'inset -1px 1px 5px #f28383,inset 1px -1px 5px #f28383' : 'inset -1px 1px 5px #a5ce8d,inset 1px -1px 5px #a5ce8d';
  }
}

export { LinearProgressWithLabel, LinearProgressWithLabelAndColor, getBoxShadow };