import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MediaCard from './cards/mediaCard';
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
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{p:1}}
            >
                <MediaCard />
            </Grid>
        </>
    );
}

export default App;