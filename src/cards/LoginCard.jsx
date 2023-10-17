import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';

const LoginCard = () => {

    const [,setIsLoggedInCookie] = useCookies(['isLoggedIn']);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Replace with your predefined username and password
        const predefinedUsername = 'yourUsername';
        const predefinedPassword = 'yourPassword';

        if (username === predefinedUsername && password === predefinedPassword) {
            // Set a cookie to indicate that the user is logged in
            setIsLoggedInCookie('isLoggedIn', true, { path: '/', maxAge: 86400 });
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div" align="center">
                    Login
                </Typography>
                <form>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginCard;
