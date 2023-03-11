import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../utils/fireBaseConfig';
import { updateToolbox } from '../../../store/authSlice';

const paths = {
    tools: 'wiki/tools/p/',
    materials: 'wiki/materials/p/'
}

export default function ResponsiveDialog({ setOpen, open, item, type, hasItem, setHasItem }) {
    const user = useSelector((state) => state.auth)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch()

    const addNewItemToToolbox = async () => {
        const toolCatRef = doc(db, `users`, user.user.uid);

        await updateDoc(toolCatRef, {
            toolbox: arrayUnion({ ...item })
        });
        dispatch(updateToolbox(item))
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {item && item.name}
                </DialogTitle>
                <DialogContent>
                    <>
                        <List>

                            {item && item.props.map(prop => prop.length > 0 && <ListItem key={prop}>{prop}</ListItem>)}
                        </List>
                    </>
                </DialogContent>
                <DialogActions >
                    <Button sx={{ color: 'white' }} autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Link to={type && `${type === 'tool' ? paths.tools : paths.materials}${item.category}/tools/${item.subCategory}/item/${item.name}`} target='_blank' >
                        <Button sx={{ color: 'white' }} onClick={() => {
                            handleClose()

                        }} autoFocus>
                            Read more in Tool-O-Pedia
                        </Button>
                    </Link>
                    {user.user && <Button sx={{ color: 'white' }}
                        onClick={() => {
                            setHasItem(prev => prev = !prev)
                            addNewItemToToolbox()
                        }} autoFocus disabled={hasItem && true}>
                        {hasItem ? 'In toolbox' : 'Add to toolbox'}
                    </Button>}
                </DialogActions>
            </Dialog>
        </div>
    );
}