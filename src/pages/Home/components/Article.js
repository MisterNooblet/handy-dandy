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
        <Card sx={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Typography textAlign={'center'} component={'h3'} variant='h3' >
                {article.name}
            </Typography>
            <Box sx={{ mb: 5, display: 'flex', flexDirection: { xs: 'column' }, justifyContent: 'center', alignItems: 'center' }}>

                <Box component={'div'} sx={{ background: `url('${article.image}') center center/contain no-repeat`, width: '300px', height: '300px', boxSizing: 'border-box', flexGrow: 1 }} />
                <Typography width={'fit-content'} >{article.description}</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Card sx={{ bgcolor: 'background.default' }}>
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
                </Card>
                <Card sx={{ bgcolor: 'background.default' }}>
                    <Typography >Tools Required:</Typography>
                    <List>
                        {article.tools.map(item => {
                            return (<ListItem onClick={() => handleOpenPopup(item, 'tool', userHasTool(item))}
                                sx={user.user && { color: userHasTool(item) ? 'green' : "red", cursor: 'pointer' }}
                                key={item.name}>
                                {item.name}<InfoIcon />
                            </ListItem>
                            )
                        })}
                    </List>
                </Card>
                <Card sx={{ bgcolor: 'background.default' }}>
                    <Typography>Our Tips for the job:</Typography>
                    <List>
                        {article.props.map(item => <ListItem key={item}>{item}</ListItem>)}
                    </List>
                    <ItemPopup open={open} setOpen={setOpen} item={currentItem} type={currentType} hasItem={hasItem} setHasItem={setHasItem} />
                </Card>
            </Box>
        </Card >

    )
}

export default Article