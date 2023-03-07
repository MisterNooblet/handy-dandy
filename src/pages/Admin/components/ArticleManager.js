import React, { useEffect, useReducer, useState } from 'react'
import { arrayUnion, doc, updateDoc, } from "firebase/firestore";
import { db, storage } from '../../../utils/fireBaseConfig';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, Input, Typography } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ProgressBar from './ProgressBar';
import { normalizeCC } from '../../../utils/normalizeCamelCase';
import TransferList from './TransferList';
import toolFetcher from '../../../utils/toolFetcher';
import adminData from './adminData';

const initialState = {
    categories: null,
    currentCategory: null,
    subCategories: null
}

const formInitialState = {
    title: '',
    properties: '',
    description: '',
    file: null,
    imageSrc: null,
}

function toolReducer(state, action) {
    if (action.type === 'setCategories') {
        return {
            ...state,
            categories: action.categories,
            currentCategory: action.categories[0]
        };
    } else if (action.type === 'setSubCategories') {
        return {
            ...state,
            subCategories: action.subCategories
        };
    } else if (action.type === 'setCategory') {
        return {
            ...state,
            currentCategory: action.category
        }
    }
    throw Error('Unknown action.');
}
function formReducer(state, action) {
    if (action.type === 'updateTitle') {
        return {
            ...state,
            title: action.value,
        };
    } else if (action.type === 'updateProps') {
        return {
            ...state,
            properties: action.value
        };
    } else if (action.type === 'updateDescription') {
        return {
            ...state,
            description: action.value
        };
    } else if (action.type === 'updateFile') {
        return {
            ...state,
            file: action.value
        }
    } else if (action.type === 'updateImageSrc') {
        return {
            ...state,
            imageSrc: action.value
        }
    } else if (action.type === 'clearForm') {
        return { ...formInitialState }
    }
    throw Error('Unknown action.');
}

const ArticleManager = () => {
    const [categories, toolDispatch] = useReducer(toolReducer, initialState)
    const [formData, formDispatch] = useReducer(formReducer, formInitialState)
    const [percent, setPercent] = useState(0)
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);


    const loadTools = async (subcategory) => {
        const result = await toolFetcher.getTools('tools', categories.currentCategory, subcategory)
        setLeft(result)
    }
    const getItemCategories = async () => {
        const categoryIds = await adminData.getItemCategories('tools')
        console.log(categoryIds);
        toolDispatch({ type: 'setCategories', categories: categoryIds })
    }

    const getItemSubCategories = async () => {
        const subCategoryList = await adminData.getItemSubCategories('tools', categories.currentCategory)
        toolDispatch({ type: 'setSubCategories', subCategories: subCategoryList })
    }

    useEffect(() => {
        console.log(getItemCategories);
        getItemCategories()
        //eslint-disable-next-line
    }, [])



    useEffect(() => {
        getItemSubCategories()
        //eslint-disable-next-line
    }, [categories.currentCategory])

    function handleFileChange(event) {
        const file = event.target.files[0]

        formDispatch({ type: 'updateFile', value: file })
    }


    const handleUpload = () => {
        const storageRef = ref(storage, `/articleimages/${Math.random()}${formData.file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, formData.file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => { formDispatch({ type: 'updateImageSrc', value: url }) });
            }
        );
    };

    const addNewItem = async (category, subCategory, tool) => {
        const toolCatRef = doc(db, `articles`, category);

        await updateDoc(toolCatRef, {
            [subCategory]: arrayUnion({ ...tool })
        });
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const category = data.get('itemCategory')
        const subCategory = data.get('itemSubCategory')
        const itemTitle = data.get('itemTitle')
        const itemProps = data.get('itemProps').split('|').map(str => str.trim())
        const imageFile = formData.imageSrc
        const shortDescription = data.get('shortDescription')
        const toolObj = { name: itemTitle, description: shortDescription, image: imageFile, props: itemProps, category: category, subCategory: subCategory }
        if (category && subCategory && itemTitle && itemProps.length > 0 && imageFile && shortDescription) {
            addNewItem(category, subCategory, toolObj)
            formDispatch({ type: 'clearForm' })
            setPercent(0)
        }
    }

    return (
        <Box component='form' noValidate onSubmit={handleAddItem} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: { sm: '100%', md: '60%', lg: '50%' } }}>


            <Box p={3} sx={{ border: '1px solid black', borderRadius: '10px' }}>
                <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-around' }}>


                    <Box sx={{ minWidth: 120 }}>
                        <FormControl >
                            <NativeSelect
                                onChange={(e) => { toolDispatch({ type: 'setCategory', category: e.target.value }) }}
                                inputProps={{
                                    name: 'itemCategory',
                                    id: 'itemCategory',
                                }}
                            >
                                {categories.categories && categories.categories.map(cat => <option value={cat}>{normalizeCC(cat)}</option>)}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl >
                            <NativeSelect
                                onChange={(e) => loadTools(e.target.value)}
                                inputProps={{
                                    name: 'itemSubCategory',
                                    id: 'itemSubCategory',
                                }}
                            >
                                {categories.subCategories && categories.subCategories.map(cat => cat !== 'categoryInfo' && <option value={cat}>{normalizeCC(cat)}</option>)}
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </Box>
                <Box p={3} sx={{ border: '1px solid black', borderRadius: '10px' }}>

                    <Typography mb={2} textAlign={'center'}>Needed tools</Typography>
                    <TransferList setChecked={setChecked} setLeft={setLeft} setRight={setRight} checked={checked} left={left} right={right} />
                </Box>
            </Box>



            <TextField inputProps={{
                name: 'itemTitle',
                id: 'itemTitle',
            }} label={`Article Title`} variant="standard" value={formData.title} onChange={(e) => formDispatch({ type: 'updateTitle', value: e.target.value })} />
            <TextField id="itemProps" name='itemProps' label={`Article properties seperated by | ex: Good grip | Sturdy`} variant="standard" value={formData.properties} onChange={(e) => formDispatch({ type: 'updateProps', value: e.target.value })} />
            <Input type='file' id='imageFile' name='imageFile' onChange={handleFileChange} />
            {percent > 0 && <ProgressBar value={percent} />}
            {formData.file && <><Button onClick={handleUpload} type='button'>Upload image</Button></>}
            <TextareaAutosize
                value={formData.description} onChange={(e) => formDispatch({ type: 'updateDescription', value: e.target.value })}
                aria-label="minimum height"
                minRows={3}
                placeholder="Short Description"
                style={{ width: '100%' }}
                id='shortDescription'
                name='shortDescription'
            />
            <Button type='submit' disabled={percent !== 100 && true}>Add Article</Button>
        </Box>
    )
}

export default ArticleManager