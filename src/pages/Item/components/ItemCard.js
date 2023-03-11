import { Button, Card, CardMedia, List, ListItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../utils/fireBaseConfig'
import { updateToolbox } from '../../../store/authSlice'

const ItemCard = ({ item }) => {
    const user = useSelector((state) => state.auth)
    const [userHasTool, setUserHasTool] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addNewItemToToolbox = async () => {
        const toolCatRef = doc(db, `users`, user.user.uid);

        await updateDoc(toolCatRef, {
            toolbox: arrayUnion({ ...item })
        });
        dispatch(updateToolbox(item))
    }

    useEffect(() => {
        if (user.user) {
            const userOwns = user.userExtras.toolbox.find(tool => tool.name === item.name)
            userOwns && setUserHasTool(prev => userOwns)
        }
    }, [user, item.name])

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
                <List>
                    {item.props.length > 0 && item.props.map(prop => prop && <ListItem key={prop}><Typography >{prop}</Typography></ListItem>)}
                </List>
                <Box>
                    {user.user && !userHasTool && <Button sx={{ width: 'fit-content' }} onClick={addNewItemToToolbox}>Add to my Toolbox</Button>}
                    {user.user && userHasTool && <Button sx={{ width: 'fit-content' }} onClick={() => navigate('/toolbox')}>You own this tool! to toolbox?</Button>}
                    <Button sx={{ width: 'fit-content' }} onClick={() => navigate(-1)}>Back to Category</Button>
                </Box>
            </Box>

        </Card>
    )
}

export default ItemCard