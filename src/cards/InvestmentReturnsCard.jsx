import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { useCSVData } from './CSVDataContext';
import { LinearProgressWithLabelAndColor, getBoxShadow } from './AccountsCard'



export default function InvestmentReturnsCard() {
    const csvData = useCSVData();
    const [targetAchievement, settargetAchievement] = useState(0)

    useEffect(() => {

        const totalProfit = csvData.totalProfit;
        const profitTargetAmount = csvData.profitTargetAmount;
        let targetAchievement = (totalProfit / profitTargetAmount) * 100;
        targetAchievement = targetAchievement < 0 ? 0 : targetAchievement
        targetAchievement = targetAchievement > 100 ? 100 : targetAchievement
        settargetAchievement(targetAchievement);
    }, [csvData]);

    return (
        <Card sx={{
            padding: 1,
            borderRadius: 5,
            background: '#f0f3f5',
            boxShadow: '-5px 4px 9px #3e5b8b, #6c9ff1',
        }}>
            <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
                <Typography level="h2">Investment Returns</Typography>
            </CardContent>

            <Divider variant="middle" />

            <Returns {...{
                progress: targetAchievement,
                totalProfit: csvData.totalProfit,
                realisableProfit: csvData.realisableProfit,
                todaysIndexChange: csvData.todaysIndexChange,
                bondPerMonthIncome: csvData.bondPerMonthIncome,
                totalBonds: csvData.totalBonds
            }} />
        </Card>
    );
}

function Returns(returnsData) {
    const [profit, setprofit] = useState(0)
    const [profitColor, setprofitColor] = useState('success')
    const [realisableProfit, setrealisableProfit] = useState(0)
    const [returnsProgress, setreturnsProgress] = useState(0)
    const [todaysIndexChange, settodaysIndexChange] = useState(0)
    const [boxShadow, setboxShadow] = useState('')
    const [bondPerMonthIncome, setbondPerMonthIncome] = useState(0)
    const [totalBonds, settotalBonds] = useState(0)


    useEffect(() => {
        setprofit(returnsData.totalProfit)
        setprofitColor(returnsData.totalProfit < 0 ? 'danger' : 'success')
        setrealisableProfit(returnsData.realisableProfit)
        setreturnsProgress(returnsData.progress)
        settodaysIndexChange(returnsData.todaysIndexChange)
        setboxShadow(getBoxShadow({ invert: false, progress: returnsData.progress }))
        setbondPerMonthIncome(returnsData.bondPerMonthIncome)
        settotalBonds(returnsData.totalBonds)
    }, [returnsData]);

    return (
        <CardContent orientation='vertical' sx={{
            padding: 2,
            background: '#edf2f5',
            borderRadius: 10,
            margin: 1,
            boxShadow
        }}
        >
            <Typography level="title-md">Equity</Typography>
            <Typography level="h4" color={profitColor}>Rs. {profit}</Typography>
            <LinearProgressWithLabelAndColor value={returnsProgress} invert={true} color={'#1E7A20'} />
            {profit < 0 &&
                <Typography level="title-lg" sx={{ textAlign: 'center' }}>🚩🚩🚩HOLD on just wait a little more🚩🚩🚩</Typography>
            }
            <Typography level="body-lg" color={profitColor}>Realisable Profit Rs. {realisableProfit}</Typography>
            <Typography level="body-sm" color='neutral'> - Today's Index Change {todaysIndexChange}%</Typography>

            <Divider variant="fullWidth"  sx={{marginTop: 1, marginBottom: 1}}/>

            <Typography level="title-md">Bonds</Typography>
            <Typography level="h4" color={profitColor}>Rs. {bondPerMonthIncome} <Typography level='body-sm'>/ Per Day</Typography> </Typography>
            <Typography level='body-sm'>- Invested in {totalBonds} bonds</Typography>
        </CardContent>
    )

}