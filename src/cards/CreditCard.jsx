import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Divider from '@mui/material/Divider';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { getNextMonthName, getNextToNextMonthName } from './../utils/utils'
import { useCSVData } from './CSVDataContext';



export default function CreditCard() {
    const nextMonthName = getNextMonthName();
    const nextToNextMonthName = getNextToNextMonthName();

    const [nextMonthUnbilledProgress, setnextMonethUnbilledProgress] = useState(0)
    const [nextToNextMonthUnbilledProgress, setnextToNextMonthUnbilledProgress] = useState(0)


    const csvData = useCSVData();

    useEffect(() => {
        setnextMonethUnbilledProgress((csvData.unbilledNextMonth / 10000) * 100);

    }, [csvData]);

    useEffect(() => {
        setnextToNextMonthUnbilledProgress((csvData.unbilledNextNextMonth / 10000) * 100);
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
            }} />
            <CCCards {...{
                progress: nextToNextMonthUnbilledProgress,
                monthName: nextToNextMonthName,
                unbilled: csvData.unbilledNextNextMonth,
                unbilledThresold: csvData.unbilledThresold,
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

    useEffect(() => {
        let amtToRepay = csvData.unbilled - csvData.unbilledThresold

        if (amtToRepay < 0) {
            amtToRepay = 0
        }

        setamtToRepay(parseInt(amtToRepay))

        let limitLeft = csvData.unbilledThresold - csvData.unbilled
        if (limitLeft < 0) {
            limitLeft = 0
        }
        setlimitLeft(parseInt(limitLeft))

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
                <Typography level="body-sm">Amount to balance Rs. {amtToRepay}</Typography>
                <Typography level="body-sm">Limit Left Rs. {limitLeft}</Typography>
            </CardContent>
        </CardContent>
    )

}