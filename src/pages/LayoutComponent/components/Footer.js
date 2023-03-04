import React from 'react'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" component='div' color="text.secondary" sx={{ display: 'inline' }} {...props}>
            {'Copyright © '}
            <Link to={'/'}>
                <Typography sx={{ display: 'inline' }} color={'black'} >Handy Dandy</Typography>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    return (
        <div><Copyright sx={{ mt: 5, textAlign: 'center' }} /></div>
    )
}

export default Footer