import React, { useState } from 'react'
import { useSelector } from 'react-redux'

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


const Toolbox = () => {
    const [moreInfo, setMoreInfo] = useState(null)
    const user = useSelector((state) => state.auth)
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



    if (!user.user) {
        return (
            <div>Please login to use this feature.</div>
        )
    } else {
        return (
            <>
                {toolbox.length === 0 ? <div>Toolbox empty</div> : (
                    <Box sx={{ display: 'flex' }}>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {toolbox.map((value, idx) => {
                                const labelId = `checkbox-list-label-${value.name}`;

                                return (
                                    <ListItem
                                        key={value.name}
                                        secondaryAction={<IconButton edge="end" aria-label="comments" onClick={() => setMoreInfo(toolbox[idx])}>
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
                        {moreInfo && <ItemInfo item={moreInfo} />}
                    </Box>

                )}
            </>
        )
    }
}

export default Toolbox