import React from 'react'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';


function Copyright(props) {
    return (
        <Typography variant="body2" component='div' color="#fff" sx={{ display: 'inline' }} {...props}>
            {'Copyright © '}
            <Link to={'/'}>
                <Typography sx={{ display: 'inline' }} color={'#EDF1D6'} >Handy Dandy</Typography>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    return (
        <Box sx={{ background: '#40513B', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
            <Copyright sx={{ mt: 5, background: '#40513B', margin: '20px 0' }} />
        </Box>

    )
}

export default Footer