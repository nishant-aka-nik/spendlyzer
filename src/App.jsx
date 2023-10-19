import React from 'react';
import AccountsCard from './cards/AccountsCard';
import UserCard from './cards/UserCard';
import CreditCard from './cards/CreditCard';
import { CSVDataProvider } from './cards/CSVDataContext';
import { Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import LoginCard from './cards/LoginCard';
import MenuCard from './cards/MenuCard';


const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(0deg, rgba(174,238,206,1) 0%, rgba(148,233,203,0) 100%)',
    },
};

const App = () => {
    const [cookies] = useCookies(['isLoggedIn']);
    const isLoggedIn = cookies.isLoggedIn === true;
    console.log('isloggedin cookie ---', cookies.isLoggedIn)
    console.log('isloggedin ---', isLoggedIn)


    return (
        <CSVDataProvider>
            <div style={styles.container}>
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
                        <Grid item>
                            <MenuCard/>
                        </Grid>
                        <Grid item>
                            <AccountsCard />
                        </Grid>
                        <Grid item>
                            <CreditCard />
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
