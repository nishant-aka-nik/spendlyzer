import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { getMonthName } from './../utils/utils'
import { useCSVData } from './CSVDataContext';
import { LinearProgressWithLabel, getBoxShadow } from './AccountsCard'



export default function CreditCard() {
    const nextMonthName = getMonthName(1);
    const nextToNextMonthName = getMonthName(2);

    const [nextMonthUnbilledProgress, setnextMonethUnbilledProgress] = useState(0)
    const [nextToNextMonthUnbilledProgress, setnextToNextMonthUnbilledProgress] = useState(0)
    const [todaysCCTransaction, settodaysCCTransaction] = useState([])


    const csvData = useCSVData();

    useEffect(() => {
        setnextMonethUnbilledProgress(parseInt((csvData.unbilledNextMonth / 10000) * 100));
        settodaysCCTransaction(parseTodaysCCTransaction(csvData))

    }, [csvData]);

    useEffect(() => {
        setnextToNextMonthUnbilledProgress(parseInt((csvData.unbilledNextNextMonth / 10000) * 100));
    }, [csvData.unbilledNextNextMonth]);

    return (
        <Card sx={{ padding: 1, borderRadius: 5, background: '#f0f3f5' }}>
            <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
                <Typography level="h2">Credit Cards</Typography>
            </CardContent>

            <Divider variant="middle" />

            <CCCards {...{
                progress: nextMonthUnbilledProgress,
                monthName: nextMonthName,
                unbilled: csvData.unbilledNextMonth,
                unbilledThresold: csvData.unbilledThresold,
                disposableThreshold: csvData.disposableCCThreshold
            }} />
            <CCCards {...{
                progress: nextToNextMonthUnbilledProgress,
                monthName: nextToNextMonthName,
                unbilled: csvData.unbilledNextNextMonth,
                unbilledThresold: csvData.unbilledThresold,
                disposableThreshold: csvData.disposableCCThreshold
            }} />


            <Divider variant="middle" />

            {todaysCCTransaction.length > 0 && (
                <CardContent orientation="horizontal" sx={{
                    padding: 1, background: '#edf2f5', borderRadius: 10, margin: 1,
                    boxShadow: 'inset -1px 1px 5px #ebaeeb,inset 1px -1px 5px #ebaeeb',
                }}>
                    <CardContent orientation="vertical" sx={{ paddingLeft: 1 }}>
                        <Typography level="title-md">Today's CC Transaction</Typography>
                        <Divider variant="fullWidth" />

                        {todaysCCTransaction.map((transaction, index) => (
                            <CardContent orientation="horizontal" key={index}>
                                <Typography level="body-sm" sx={{ color: '#570957' }}>- {transaction.paidAt} of rs. <Typography level="title-md" color='danger'>{transaction.amount}</Typography> </Typography>
                            </CardContent>
                        ))}
                    </CardContent>
                </CardContent>
            )}


        </Card>
    );
}

// function CircularProgressWithColor(props) {
//     const isLessThan20 = props.value > 80;
//     const barColor = isLessThan20 ? 'danger' : 'success'

//     return (
//         <CircularProgress
//             size="lg"
//             determinate
//             variant="plain"
//             color={barColor}
//             value={props.value}
//         >
//             <CreditCardIcon />
//         </CircularProgress>
//     )
// }

function CCCards(csvData) {
    const [amtToRepay, setamtToRepay] = useState(0)
    const [limitLeft, setlimitLeft] = useState(0)
    const [disposableLeft, setdisposableLeft] = useState(0)
    const [limitLeftColor, setlimitLeftColor] = useState('success')
    const [amtToRepayColor, setamtToRepayColor] = useState('success')
    const [boxShadow, setboxShadow] = useState('')


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
        if (isAmtToRepayLessThan20) {
            setamtToRepayColor('danger')
        }


        let disposableLeft = csvData.disposableThreshold - csvData.unbilled
        if (disposableLeft < 0) {
            disposableLeft = 0
        }
        setdisposableLeft(parseInt(disposableLeft))

        setboxShadow(getBoxShadow({ invert: true, progress: csvData.progress}))

    }, [csvData]);

    return (
        <CardContent orientation='vertical' sx={{
            padding: 2,
            background: '#edf2f5',
            borderRadius: 10,
            margin: 1,
            boxShadow
        }}
        >
            {/* <CircularProgressWithColor value={csvData.progress} /> */}

            {/* <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}> */}
            <Typography level="title-md">{csvData.monthName} Unbilled</Typography>
            <Typography level="h4">Rs. {csvData.unbilled}</Typography>
            <LinearProgressWithLabel value={csvData.progress} invert={true} />

            <Typography level="body-sm">- Amount to balance rs. <Typography level='title-lg' color={amtToRepayColor}>{amtToRepay}</Typography></Typography>
            <Typography level="body-sm">- Limit Left rs. <Typography level='title-lg' color={limitLeftColor}>{limitLeft}</Typography></Typography>
            <Typography level="body-sm">- Disposable Left rs. <Typography level='title-lg' color='success'>{disposableLeft}</Typography></Typography>
        </CardContent>
        // </CardContent>
    )

}

function parseTodaysCCTransaction(csvData) {
    console.error('csvData.todaysTransaction---', csvData.todaysTransaction)
    if (csvData.todaysTransaction) {
        const decodedString = atob(csvData.todaysTransaction);
        const jsonObject = JSON.parse(decodedString);
        console.log('jsonObject', jsonObject)
        return jsonObject.todaysCCTransaction
    }

    return []
}