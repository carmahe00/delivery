import React from 'react'
import { Box, Grid, Avatar, Typography, CssBaseline, Paper } from '@mui/material'
import { LockClockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import FormLogin from '../components/FormLogin';


const LoginPage = () => {
    
    return (
        <Grid container sx={{ height: '100vh' }} >
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/images/home-image.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} elevation={6} component={Paper} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box  sx={{ mt: 1 }}>
                        <FormLogin />
                    </Box>
                </Box>

            </Grid>
        </Grid>

    )
}

export default LoginPage
