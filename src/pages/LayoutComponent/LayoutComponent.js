import { Box, Container, display } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const LayoutComponent = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navbar />
            <Container maxWidth='xl' sx={{ flexGrow: '1' }}>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    )
}

export default LayoutComponent