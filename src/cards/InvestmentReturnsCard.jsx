import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/material/Divider';
import { useCSVData } from './CSVDataContext';
import { LinearProgressWithLabelAndColor } from './AccountsCard'



export default function InvestmentReturnsCard() {
    const csvData = useCSVData();
    const [targetAchievement, settargetAchievement] = useState(0)


    useEffect(() => {

        const totalProfit = csvData.totalProfit;
        const profitTargetAmount = csvData.profitTargetAmount;
        const targetAchievement = (totalProfit / profitTargetAmount) * 100;
        settargetAchievement(targetAchievement);
    }, [csvData]);

    return (
        <Card sx={{ padding: 1, 
        borderRadius: 5, 
        background:'#f0f3f5',
        boxShadow:  '-5px 4px 9px #3e5b8b, #6c9ff1',
        }}>
            <CardContent orientation='horizontal' sx={{ paddingLeft: 2, paddingTop: 2, paddingBottom: 1 }}>
                <Typography level="h2">Investment Returns</Typography>
            </CardContent>

            <Divider variant="middle" />

            <Returns {...{
                progress: targetAchievement,
                totalProfit: csvData.totalProfit,
            }} />
        </Card>
    );
}

function Returns(returnsData) {
    const [profit, setprofit] = useState(0)


    useEffect(() => {
        setprofit(returnsData.totalProfit)
    }, [returnsData]);

    return (
        <CardContent orientation='vertical' sx={{
            padding: 2,
            background: '#edf2f5',
            borderRadius: 10,
            margin: 1,
            boxShadow: 'inset -1px 1px 4px #a5cee8,inset 1px -1px 4px #a5cee8'
        }}
        >
            <Typography level="title-md">Target achievement</Typography>
            <Typography level="h4">Rs. {profit}</Typography>
            <LinearProgressWithLabelAndColor value={returnsData.progress} invert={true} color={'#1E7A20'} />
        </CardContent>
    )

}