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
        </Card>
    )
}

export default Article