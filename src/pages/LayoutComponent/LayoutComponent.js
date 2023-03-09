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
            main: '#40513B',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#EDF1D6',
            paper: '#9DC08B',
        },
        text: {
            primary: '#000',
            secondary: '#000',
        }
    },

})

const LayoutComponent = () => {
    return (
        <ThemeProvider theme={theme}>

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Navbar />
                <Container maxWidth='xl' sx={{ flexGrow: '1', backgroundColor: '#EDF1D6' }}>
                    <Outlet />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    )
}

export default LayoutComponent