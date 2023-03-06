import { Button, Card, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ItemCard = ({ item }) => {
    const navigate = useNavigate()

    return (
        <Card sx={{ maxHeight: '100%', display: 'flex' }}>
            <Box p={4} sx={{ display: 'flex' }}>
                <CardMedia sx={{ maxHeight: '50vh', objectFit: 'contain' }} component={'img'} image={item.image} />
            </Box>
            <Box p={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography textAlign={'center'} variant='h2' component={'h1'}>
                    {item.name}
                </Typography>
                <Typography>{item.description}</Typography>
                <ul>
                    {item.props.length > 0 && item.props.map(prop => prop && <li><Typography>{prop}</Typography></li>)}
                </ul>
                <Box>
                    <Button sx={{ width: 'fit-content' }}>Add to my Toolbox</Button>
                    <Button sx={{ width: 'fit-content' }} onClick={() => navigate(-1)}>Back to Categorty</Button>
                </Box>
            </Box>

        </Card>
    )
}

export default ItemCard