import { Card, List, ListItem, Typography } from '@mui/material'
import { Box, } from '@mui/system'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ItemPopup from './ItemPopup'
import InfoIcon from '@mui/icons-material/Info';


const Article = ({ article }) => {
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null)
    const [currentType, setCurrentType] = useState(null)
    const [hasItem, setHasItem] = useState(null)
    const handleClickOpen = () => {
        setOpen(true);
    };


    const user = useSelector((state) => state.auth)

    const handleOpenPopup = (item, type, hasCurrentItem) => {
        setCurrentItem(prev => prev = item)
        setCurrentType(prev => prev = type)
        setHasItem(prev => prev = hasCurrentItem)
        handleClickOpen()
    }

    const userHasTool = (item) => {
        if (user.user && item) {
            const userOwns = user.userExtras.toolbox.find(tool => tool.name === item.name)
            return userOwns ? true : false
        }
        return false
    }

    return (
        <Card sx={{ padding: 5, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gridTemplateRows: 'repeat(12, 1fr)' }}>
            <Typography textAlign={'center'} component={'h3'} variant='h3' sx={{ gridArea: '1 / 1 / 2 / 10' }} >
                {article.name}
            </Typography>
            <Box component={'img'} sx={{ background: `url('${article.image}') center center/contain no-repeat`, width: { xs: 300 }, height: { xs: 300 }, gridArea: '2 / 1 / 5 / 4' }} />
            <Typography sx={{ gridArea: '2/4/13/10' }}>{article.description}</Typography>
            <Box sx={{ gridArea: '5 / 1 / 8 / 4' }}>
                <Typography>Materials Required:</Typography>
                <List>
                    {article.materials.map(item => {
                        return (<ListItem onClick={() => handleOpenPopup(item, 'material', userHasTool(item))}
                            sx={user.user && { color: userHasTool(item) ? 'green' : "red", cursor: 'pointer' }}
                            key={item.name}>
                            {item.name}<InfoIcon />
                        </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Box sx={{ gridArea: '8 / 1 / 11 / 4' }}>
                <Typography>Tools Required:</Typography>
                <List>
                    {user.user && article.tools.map(item => {
                        return (<ListItem onClick={() => handleOpenPopup(item, 'material', userHasTool(item))}
                            sx={user.user && { color: userHasTool(item) ? 'green' : "red", cursor: 'pointer' }}
                            key={item.name}>
                            {item.name}<InfoIcon />
                        </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Box sx={{ gridArea: '11 / 1 / 13 / 4' }}>
                <Typography>Our Tips for the job:</Typography>
                <ul>
                    {article.props.map(item => <li key={item}>{item}</li>)}
                </ul>
                <ItemPopup open={open} setOpen={setOpen} item={currentItem} type={currentType} hasItem={hasItem} setHasItem={setHasItem} />
            </Box>
        </Card>
    )
}

export default Article