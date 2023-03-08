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

const paths = {
    tools: 'wiki/tools/p/',
    materials: 'wiki/materials/p/'
}

export default function ResponsiveDialog({ setOpen, open, item, type }) {
    console.log(item);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



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
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Link to={type && `${type === 'tool' ? paths.tools : paths.materials}${item.category}/tools/${item.subCategory}/item/${item.name}`} target='_blank' >
                        <Button onClick={() => {
                            handleClose()

                        }} autoFocus>
                            Read more in Tool-O-Pedia
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}