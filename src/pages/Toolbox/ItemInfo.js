import { Box, Typography } from '@mui/material'
import React from 'react'

const ItemInfo = ({ item }) => {
    const { name, description, image, props } = item
    return (
        <Box p={4} sx={{ flexGrow: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: "start", md: 'center' } }}>
            <Box textAlign={'center'}>
                <Typography variant='h5'  >{name}</Typography>
                <Box component={'img'} sx={{ background: `url(${image}) center center/contain no-repeat`, height: { xs: '100px', md: '300px' }, width: { xs: '100px', md: '300px' } }} />
            </Box>
            <Box p={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='p'>{description}</Typography>
                <ul>
                    {props && props.map(prop => prop.length > 0 ? <li key={prop}>{prop}</li> : null)}
                </ul>
            </Box>
        </Box>
    )
}

export default ItemInfo