import React from 'react';
import AccountsCard from './cards/AccountsCard';
import UserCard from './cards/UserCard';
import CreditCard from './cards/CreditCard';
import { CSVDataProvider } from './cards/CSVDataContext';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import LoginCard from './cards/LoginCard';
import InvestmentReturnsCard from './cards/InvestmentReturnsCard';
import './App.css';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0e1111',
        margin: 0,
        padding: 0,
        height: '100vh'
    },
};

const App = () => {
    const [cookies] = useCookies(['isLoggedIn']);
    const isLoggedIn = cookies.isLoggedIn === true;
    console.log('isloggedin cookie ---', cookies.isLoggedIn)
    console.log('isloggedin ---', isLoggedIn)


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
                    </Grid>
                ) : (
                    <LoginCard />
                )}

            </div>
        </CSVDataProvider>
    );
}

export default App;
