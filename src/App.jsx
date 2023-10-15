import React from 'react';
import AccountsCard from './cards/AccountsCard';
import UserCard from './cards/UserCard';
import CreditCard from './cards/CreditCard';
import { CSVDataProvider } from './cards/CSVDataContext';
import { Grid } from '@mui/material';

const App = () => {
    return (
        <CSVDataProvider>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"

                spacing={2}
                sx={{
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                }}
            >
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <UserCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <AccountsCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <CreditCard />
                </Grid>
            </Grid>
        </CSVDataProvider>
    );
}

export default App;
