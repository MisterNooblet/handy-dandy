import { Box, Container } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
})

const LayoutComponent = () => {
    return (
        <ThemeProvider theme={theme}>

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Navbar />
                <Container maxWidth='xl' sx={{ flexGrow: '1' }}>
                    <Outlet />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default LayoutComponent