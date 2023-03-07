import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ItemInfo from './ItemInfo';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../utils/fireBaseConfig';
import { setToolBox } from '../../store/authSlice';


const Toolbox = () => {
    const [moreInfo, setMoreInfo] = useState(null)
    const [listHeight, setListHeight] = useState('80%')
    const user = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const toolbox = user.userExtras.toolbox

    console.log(user.userExtras);


    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const handleUpdateToolbox = async () => {
        const newToolBox = toolbox.filter(item => !checked.includes(item.name))
        const cityRef = doc(db, 'users', user.user.uid);
        setDoc(cityRef, { toolbox: newToolBox }, { merge: true });
        dispatch(setToolBox(newToolBox))
        setChecked([0])

    }


    if (!user.user) {
        return (
            <div>Please login to use this feature.</div>
        )
    } else {
        return (
            <>
                {toolbox.length === 0 ? <div>Toolbox empty</div> : (
                    <Box component={'div'} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
                        <Box component={'div'} sx={{ height: { xs: listHeight, md: '80vh' } }}>
                            <List sx={{ width: { xs: '100%', md: '360px' }, height: '100%', overflowY: 'scroll', bgcolor: 'background.paper' }}>
                                {toolbox.map((value, idx) => {
                                    const labelId = `checkbox-list-label-${value.name}`;

                                    return (
                                        <ListItem
                                            key={value.name}
                                            secondaryAction={<IconButton edge="end" aria-label="comments" onClick={() => {
                                                setMoreInfo(toolbox[idx])
                                                setListHeight('40%')
                                            }}>
                                                <InfoIcon />
                                            </IconButton>}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value.name)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.indexOf(value.name) !== -1}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }} />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={`${value.name}`} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                            <Button onClick={handleUpdateToolbox} disabled={checked.length > 1 ? false : true}>REMOVE checked items from Toolbox</Button>
                        </Box>
                        {moreInfo && <ItemInfo item={moreInfo} />}
                    </Box>

                )
                }
            </>
        )
    }
}

export default Toolbox