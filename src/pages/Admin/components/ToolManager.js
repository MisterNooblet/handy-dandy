import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../utils/fireBaseConfig';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, Input } from '@mui/material';
const ToolManager = () => {
    const [categories, setCategories] = useState(null)
    const getToolCategories = async () => {
        const categoryIds = []
        const querySnapshot = await getDocs(collection(db, "tools"));
        querySnapshot.forEach((doc) => {
            categoryIds.push(doc.id)
        })
        setCategories(categoryIds)
    }
    useEffect(() => {
        getToolCategories()
        //eslint-disable-next-line
    }, [])

    const handleAddTool = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // const category = data.get('toolCategory')
        // const toolTitle = data.get('toolTitle')
        // const imageLink = data.get('imageLink')
        // const imageFile = data.get('imageFile')
        // const shortDescription = data.get('shortDescription')
    }

    return (
        <Box component='form' noValidate onSubmit={handleAddTool} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: { sm: '100%', md: '60%', lg: '50%' } }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>

                    <NativeSelect
                        defaultValue={'handTools'}
                        inputProps={{
                            name: 'toolCategory',
                            id: 'toolCategory',
                        }}
                    >
                        {categories && categories.map(cat => <option value={cat}>{cat.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</option>)}
                    </NativeSelect>
                </FormControl>
            </Box>
            <TextField inputProps={{
                name: 'toolTitle',
                id: 'toolTitle',
            }} label="Tool Title" variant="standard" />
            <TextField id="imageLink" name='imageLink' label="Image Source https://somewebsite.com/someimage.png" variant="standard" placeholder='' />
            <Input type='file' id='imageFile' name='imageFile' />
            <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Short Description"
                style={{ width: '100%' }}
                id='shortDescription'
                name='shortDescription'
            />
            <Button type='submit'>Add Tool</Button>

        </Box>
    )
}

export default ToolManager