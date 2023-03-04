import { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ToolManager from './components/ToolManager';
import ArticleManager from './components/ArticleManager';


export default function Admin() {
    const user = useSelector((state) => state.auth)
    const [form, setForm] = useState(null)

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display={'flex'} justifyContent={'center'}  >
                <Button sx={{ textAlign: 'left' }} variant="text" onClick={() => { setForm('Tools') }}>Manage Tools</Button>
                <Button variant="text" onClick={() => { setForm('Articles') }}>Manage Articles</Button>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                {!form && <Typography component='h3'>Hello {user.user.displayName} what needs managing?</Typography>}
                {form === 'Tools' ? <ToolManager /> : form === 'Articles' ? <ArticleManager /> : null}
            </Box>
        </Box>
    )
}