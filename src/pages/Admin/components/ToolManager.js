import React, { useEffect, useReducer, useState } from 'react'
import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc, } from "firebase/firestore";
import { db, storage } from '../../../utils/fireBaseConfig';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, Input } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ProgressBar from './ProgressBar';

const initialState = {
    categories: null,
    currentCategory: null,
    subCategories: null
}


function reducer(state, action) {
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


const ToolManager = () => {
    const [categories, dispatch] = useReducer(reducer, initialState)

    // const [categories, setCategories] = useState(null)
    const [percent, setPercent] = useState(0)
    const [file, setFile] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)

    const getToolCategories = async () => {
        const categoryIds = []
        const querySnapshot = await getDocs(collection(db, "tools"));
        querySnapshot.forEach((doc) => {
            categoryIds.push(doc.id)
        })
        dispatch({ type: 'setCategories', categories: categoryIds })
        // setCategories(categoryIds)
    }

    const getToolSubCategories = async () => {
        const docRef = doc(db, 'tools', categories.currentCategory)
        const docSnap = await getDoc(docRef);
        let subCategoryList = []

        if (docSnap.exists()) {
            const subCategoryObject = docSnap.data()
            for (const prop in subCategoryObject) {
                subCategoryList.push(prop)
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        dispatch({ type: 'setSubCategories', subCategories: subCategoryList })
    }

    useEffect(() => {
        getToolCategories()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getToolSubCategories()
        //eslint-disable-next-line
    }, [categories.currentCategory])

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }


    const handleUpload = () => {

        const storageRef = ref(storage, `/toolimages/${Math.random()}${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setImageSrc(url)
                });
            }
        );
    };

    const addNewTool = async (category, subCategory, tool) => {
        const toolCatRef = doc(db, 'tools', category);

        await updateDoc(toolCatRef, {
            [subCategory]: arrayUnion({ ...tool })
        });
    }

    const handleAddTool = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const category = data.get('toolCategory')
        const subCategory = data.get('toolSubCategory')
        const toolTitle = data.get('toolTitle')
        const toolProps = data.get('toolProps').split('|').map(str => str.trim())
        const imageFile = imageSrc
        const shortDescription = data.get('shortDescription')
        const toolObj = { name: toolTitle, description: shortDescription, image: imageFile, props: toolProps, category: category, subCategory: subCategory }
        if (category && subCategory && toolTitle && toolProps.length > 0 && imageFile && shortDescription) {
            addNewTool(category, subCategory, toolObj)
        }
    }

    return (
        <Box component='form' noValidate onSubmit={handleAddTool} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: { sm: '100%', md: '60%', lg: '50%' } }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>

                    <NativeSelect
                        onChange={(e) => { dispatch({ type: 'setCategory', category: e.target.value }) }}
                        inputProps={{
                            name: 'toolCategory',
                            id: 'toolCategory',
                        }}
                    >
                        {categories.categories && categories.categories.map(cat => <option value={cat}>{cat.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</option>)}
                    </NativeSelect>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>

                    <NativeSelect

                        inputProps={{
                            name: 'toolSubCategory',
                            id: 'toolSubCategory',
                        }}
                    >
                        {categories.subCategories && categories.subCategories.map(cat => <option value={cat}>{cat.replace(/([a-z0-9])([A-Z])/g, '$1 $2')}</option>)}
                    </NativeSelect>
                </FormControl>
            </Box>
            <TextField inputProps={{
                name: 'toolTitle',
                id: 'toolTitle',
            }} label="Tool Title" variant="standard" />
            <TextField id="toolProps" name='toolProps' label="Tool properties seperated by | ex: Good grip | Sturdy" variant="standard" placeholder='' />
            <Input type='file' id='imageFile' name='imageFile' onChange={handleFileChange} />
            {percent > 0 && <ProgressBar value={percent} />}
            {file && <><Button onClick={handleUpload} type='button'>Upload image</Button></>}
            <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Short Description"
                style={{ width: '100%' }}
                id='shortDescription'
                name='shortDescription'
            />
            <Button type='submit' disabled={percent !== 100 && true}>Add Tool</Button>

        </Box>
    )
}

export default ToolManager