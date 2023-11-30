import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Divider from '@mui/material/Divider';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { getMonthName } from './../utils/utils'
import { useCSVData } from './CSVDataContext';



export default function CreditCard() {
    const nextMonthName = getMonthName(1);
    const nextToNextMonthName = getMonthName(2);

    const [nextMonthUnbilledProgress, setnextMonethUnbilledProgress] = useState(0)
    const [nextToNextMonthUnbilledProgress, setnextToNextMonthUnbilledProgress] = useState(0)


    const csvData = useCSVData();

    useEffect(() => {
        setnextMonethUnbilledProgress(parseInt((csvData.unbilledNextMonth / 10000) * 100));

    }, [csvData]);

    useEffect(() => {
        setnextToNextMonthUnbilledProgress(parseInt((csvData.unbilledNextNextMonth / 10000) * 100));
    }, [csvData.unbilledNextNextMonth]);

    return (
        <Card sx={{ padding: 1, borderRadius: 5 }}>
            <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
                <Typography level="h2">Credit Cards</Typography>
            </CardContent>

            <Divider variant="middle" />

            <CCCards {...{
                progress: nextMonthUnbilledProgress,
                monthName: nextMonthName,
                unbilled: csvData.unbilledNextMonth,
                unbilledThresold: csvData.unbilledThresold,
                disposableThreshold: csvData.disposableThresold
            }} />
            <CCCards {...{
                progress: nextToNextMonthUnbilledProgress,
                monthName: nextToNextMonthName,
                unbilled: csvData.unbilledNextNextMonth,
                unbilledThresold: csvData.unbilledThresold,
                disposableThreshold: csvData.disposableThresold
            }} />


        </Card>
    );
}

function CircularProgressWithColor(props) {
    const isLessThan20 = props.value > 80;
    const barColor = isLessThan20 ? 'danger' : 'success'

    return (
        <CircularProgress
            size="lg"
            determinate
            variant="plain"
            color={barColor}
            value={props.value}
        >
            <CreditCardIcon />
        </CircularProgress>
    )
}

function CCCards(csvData) {
    console.log('cccards ', csvData);
    const [amtToRepay, setamtToRepay] = useState(0)
    const [limitLeft, setlimitLeft] = useState(0)
    const [disposableLeft, setdisposableLeft] = useState(0)
    const [limitLeftColor, setlimitLeftColor] = useState('success')
    const [amtToRepayColor, setamtToRepayColor] = useState('success')


    useEffect(() => {
        let amtToRepay = csvData.unbilled - csvData.unbilledThresold

        if (amtToRepay < 0) {
            amtToRepay = 0
        }

        setamtToRepay(parseInt(amtToRepay))

        let limitLeft = csvData.unbilledThresold - csvData.unbilled;
        if (limitLeft < 0) {
            limitLeft = 0
        }
        setlimitLeft(parseInt(limitLeft))

        //temp variable then with temp var we will set the original var
        const isLimitLeftLessThan20 = (100 - csvData.progress) < 20
        if (isLimitLeftLessThan20) {
            setlimitLeftColor('danger')
        }

        const isAmtToRepayLessThan20 = (amtToRepay > 2000)
        if (isAmtToRepayLessThan20){
            setamtToRepayColor('danger')
        }


        let disposableLeft = csvData.disposableThreshold - csvData.unbilled
        if (disposableLeft < 0) {
            disposableLeft = 0
        }
        setdisposableLeft(parseInt(disposableLeft))

    }, [csvData]);

    return (
        <CardContent orientation='horizontal' sx={{
            padding: 2,
            background: 'radial-gradient(circle, rgba(255,199,2,0.2399553571428571) 24%, rgba(252,176,69,0.23435311624649857) 100%)',
            borderRadius: 10,
            margin: 1,
        }}
        >
            <CircularProgressWithColor value={csvData.progress} />
            <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                <Typography level="body-md">{csvData.monthName} Unbilled</Typography>
                <Typography level="h4">Rs. {csvData.unbilled}</Typography>
                <Typography level="body-sm">Amount to balance rs. <Typography level='title-lg' color={amtToRepayColor}>{amtToRepay}</Typography></Typography>
                <Typography level="body-sm">Limit Left rs. <Typography level='title-lg' color={limitLeftColor}>{limitLeft}</Typography></Typography>
                <Typography level="body-sm">Disposable Left rs. <Typography level='title-lg' color='success'>{disposableLeft}</Typography></Typography>
            </CardContent>
        </CardContent>
    )

}