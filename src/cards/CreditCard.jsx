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
        <Card >
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
            variant="outlined"
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

    useEffect(() => {
        let amtToRepay = csvData.unbilled - csvData.unbilledThresold

        if (amtToRepay < 0) {
            amtToRepay = 0
        }

        setamtToRepay(parseInt(amtToRepay))
    }, [csvData]);

    return (
        <CardContent orientation='horizontal' sx={{ padding: 2 }}>
            <CircularProgressWithColor value={csvData.progress} />
            <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}>
                <Typography level="body-md">{csvData.monthName} Unbilled</Typography>
                <Typography level="h3">Rs. {csvData.unbilled}</Typography>
                <Typography level="body-sm">Amount to repay Rs. {amtToRepay}</Typography>
            </CardContent>
        </CardContent>
    )

}