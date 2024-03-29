import React from 'react';
import AccountsCard from './cards/AccountsCard';
import UserCard from './cards/UserCard';
import CreditCard from './cards/CreditCard';
import { CSVDataProvider } from './cards/CSVDataContext';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import LoginCard from './cards/LoginCard';
import InvestmentReturnsCard from './cards/InvestmentReturnsCard';
import CashFlowGeneratorCard from './cards/CashFlowGeneratorCard'

import './App.css';

const App = () => {
    const [cookies, setIsLoggedInCookie] = useCookies(['isLoggedIn']);
    const isLoggedIn = cookies.isLoggedIn === true;
    if (isLoggedIn) {
        console.log('isloggedin cookie ---', cookies)
        console.log('isloggedin ---', isLoggedIn)
        setIsLoggedInCookie('isLoggedIn', true, { path: '/', maxAge: 86400 });
    }



    return (
        <CSVDataProvider>
            <div className="app-container">
                {isLoggedIn ? (
                    <Grid
                        container
                        direction="column"
                        rowSpacing={1}
                        xs={12} sm={6} md={5} lg={4}
                        padding={1}
                    >
                        <Grid item>
                            <UserCard />
                        </Grid>
                        {/* <Grid item>
                            <MenuCard/>
                        </Grid> */}
                        <Grid item>
                            <AccountsCard />
                        </Grid>
                        <Grid item>
                            <CreditCard />
                        </Grid>
                        {/* <Grid item>
                            <DataCard />
                        </Grid> */}
                        <Grid item>
                            <InvestmentReturnsCard />
                        </Grid>
                        <Grid item>
                            <CashFlowGeneratorCard />
                        </Grid>
                    </Grid>
                ) : (
                    <LoginCard />
                )}

            </div>
        </CSVDataProvider>
    );
}

export default App;
