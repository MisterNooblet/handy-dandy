import { Card, Typography } from '@mui/material'
import { Box, } from '@mui/system'
import React from 'react'

const Article = ({ article }) => {
    console.log(article);
    return (
        <Card sx={{ padding: 5, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(12, 1fr)' }}>

            <Typography textAlign={'center'} component={'h3'} variant='h3' sx={{ gridArea: '1 / 1 / 2 / 10' }} >
                {article.name}
            </Typography>
            <Box component={'img'} sx={{ background: `url('${article.image}') center center/contain no-repeat`, width: { xs: 300 }, height: { xs: 300 }, gridArea: '2 / 1 / 5 / 4' }} />
            <Typography sx={{ gridArea: '2/4/13/10' }}>{article.description}</Typography>
            <Box sx={{ gridArea: '5 / 1 / 8 / 4' }}>
                <Typography>Materials Required:</Typography>
                <ul>

                    {article.materials.map(item => <li>{item.name}</li>)}
                </ul>
            </Box>
            <Box sx={{ gridArea: '8 / 1 / 11 / 4' }}>
                <Typography>Tools Required:</Typography>
                <ul>

                    {article.tools.map(item => <li>{item.name}</li>)}
                </ul>
            </Box>
            <Box sx={{ gridArea: '11 / 1 / 13 / 4' }}>
                <Typography>Our Tips for the job:</Typography>
                <ul>

                    {article.props.map(item => <li>{item}</li>)}
                </ul>
            </Box>
        </Card>
    )
}

export default Article