import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import Box from '@mui/material/Box';
import { bgRandomizer } from './../utils/utils'
import CardMedia from '@mui/material/CardMedia';


const LoginCard = () => {

    const [, setIsLoggedInCookie] = useCookies(['isLoggedIn']);

    const [bgImage, setbgImage] = useState('')
    useEffect(() => {
        setbgImage(bgRandomizer);

    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Replace with your predefined username and password
        const predefinedUsername = '123';
        const predefinedPassword = '123';

        if (username === predefinedUsername && password === predefinedPassword) {
            // Set a cookie to indicate that the user is logged in
            setIsLoggedInCookie('isLoggedIn', true, { path: '/', maxAge: 86400 });
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            padding={2}
        >
            <Card variant="elevation" sx={{ borderRadius: 5 }}>
                <CardMedia component="img"
                    src={bgImage}
                    height='150'
                    style={{
                        width: '100%'
                    }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" align="center" fontFamily={{}}>
                        Welcome to Spendlyzer
                    </Typography>
                    <form>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            size='small'
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            size='small'
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box display="flex" justifyContent="center" padding={2}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleLogin}
                                fullWidth
                            >
                                Log In
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>

    );
};

export default LoginCard;
