import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { getMonthName } from './../utils/utils'
import { useCSVData } from './CSVDataContext';
import { LinearProgressWithLabel } from './AccountsCard'

/*--------------------------------------------------------*/
const textColor = '#D8F3DC'
const digitColor = '#C3F550'
/*--------------------------------------------------------*/

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
        <Card sx={{ padding: 1, borderRadius: 5 , background: '#255f4e'}}>
            <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
                <Typography level="h2" sx={{color:textColor}}>Credit Cards</Typography>
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
    console.log('cccards ', csvData);
    const [amtToRepay, setamtToRepay] = useState(0)
    const [limitLeft, setlimitLeft] = useState(0)
    const [disposableLeft, setdisposableLeft] = useState(0)
    const [limitLeftColor, setlimitLeftColor] = useState(digitColor)
    const [amtToRepayColor, setamtToRepayColor] = useState(digitColor)


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

    }, [csvData]);

    return (
        <CardContent orientation='vertical' sx={{
            padding: 2,
            background: '#14452F',
            borderRadius: 10,
            margin: 1,
            marginBottom:2,
            boxShadow: '-5px 5px 10px #102922,5px -5px 10px #205344',
        }}
        >
            {/* <CircularProgressWithColor value={csvData.progress} /> */}

            {/* <CardContent orientation='vertical' sx={{ paddingLeft: 2 }}> */}
                <Typography level="title-md" sx={{color:textColor}}>{csvData.monthName} Unbilled</Typography>
                <Typography level="h4" sx={{color:textColor}}>Rs. {csvData.unbilled}</Typography>
            <LinearProgressWithLabel value={csvData.progress} invert={true}/>

                <Typography level="body-sm" sx={{color:textColor}}>- Amount to balance rs. <Typography level='title-lg' sx={{color:amtToRepayColor}}>{amtToRepay}</Typography></Typography>
                <Typography level="body-sm" sx={{color:textColor}}>- Limit Left rs. <Typography level='title-lg' sx={{color:limitLeftColor}}>{limitLeft}</Typography></Typography>
                <Typography level="body-sm" sx={{color:textColor}}>- Disposable Left rs. <Typography level='title-lg' sx={{color:digitColor}}>{disposableLeft}</Typography></Typography>
            </CardContent>
        // </CardContent>
    )

}