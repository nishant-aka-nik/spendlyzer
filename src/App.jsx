import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MediaCard from './cards/MediaCard';
import AccountCard from './cards/AccountCard';

import { Grid } from '@mui/material';



const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position='relative' color='primary'>
                <Typography variant="h3" align='center' component="div" sx={{ flexGrow: 1 }}>
                    Spendlyzer
                </Typography>
            </AppBar>

            <Grid
                container
                justifyContent="center"
                alignItems="flex-start"
                spacing={2} // Add spacing here
                sx={{ padding: 2 }} // Add padding using sx prop
            >
                <Grid item xs={12} sm={6} md={4}>
                    <AccountCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <MediaCard />
                </Grid>
            </Grid>
        </>
    );
}

export default App;