import React, { useReducer, useState } from 'react'
import { arrayUnion, doc, updateDoc, } from "firebase/firestore";
import { db, storage } from '../../../utils/fireBaseConfig';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, FormControl, NativeSelect } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ProgressBar from './ProgressBar';
import RequirementManager from './RequirementManager';
import { normalizeCC } from '../../../utils/normalizeCamelCase';
import { dataFetcher } from '../../../utils';
import { useSelector } from 'react-redux';

const formInitialState = {
    title: '',
    properties: '',
    description: '',
    file: null,
    imageSrc: null,
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
    const [formData, formDispatch] = useReducer(formReducer, formInitialState)
    const [percent, setPercent] = useState(0)
    const [neededTools, setNeededTools] = useState(null)
    const [neededMaterials, setNeededMaterials] = useState(null)
    const [categories, setCategories] = useState(null)
    const [category, setCategory] = useState(null)

    const user = useSelector((state) => state.auth)

    function handleFileChange(event) {
        const file = event.target.files[0]

        formDispatch({ type: 'updateFile', value: file })
    }

    const getArticleCategories = async () => {
        const result = await dataFetcher.getItemCategories('articles')
        setCategories(prev => prev = result)
        setCategory(prev => prev = result[0])
    }

    useState(() => {
        getArticleCategories()
    }, [])

    const handleUpload = () => {
        if (!formData.file.name.match(/\.(jpg|jpeg|png|gif|bmp)$/)) return
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

    const addNewItem = async (category, article) => {
        const toolCatRef = doc(db, `articles`, category);

        await updateDoc(toolCatRef, {
            articles: arrayUnion({ ...article })
        });
    }

    const handleAddItem = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const itemTitle = data.get('itemTitle')
        const itemProps = data.get('itemProps').split('|').map(str => str.trim())
        const imageFile = formData.imageSrc
        const articleText = data.get('shortDescription')
        const articleObj = { name: itemTitle, description: articleText, image: imageFile, props: itemProps, category: category, tools: neededTools, materials: neededMaterials, author: user.user.displayName, authorImg: user.user.photoUrl }
        if (category && itemTitle && itemProps.length > 0 && imageFile && articleText) {
            addNewItem(category, articleObj)
            formDispatch({ type: 'clearForm' })
            setPercent(0)
        }
    }

    return (
        <Box component='form' noValidate onSubmit={handleAddItem} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: { sm: '100%', md: '60%', lg: '50%' } }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth >
                    {categories && <NativeSelect

                        onChange={(e) => setCategory(e.target.value)}
                        inputProps={{
                            name: 'itemCategory',
                            id: 'itemCategory',
                        }}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{normalizeCC(cat)}</option>)}
                    </NativeSelect>}
                </FormControl>
            </Box>

            <TextField inputProps={{
                name: 'itemTitle',
                id: 'itemTitle',
            }} label={`Article Title`} variant="standard" value={formData.title} onChange={(e) => formDispatch({ type: 'updateTitle', value: e.target.value })} />
            <TextareaAutosize
                value={formData.description} onChange={(e) => formDispatch({ type: 'updateDescription', value: e.target.value })}
                aria-label="minimum height"
                minRows={3}
                placeholder="Article main text"
                style={{ width: '100%' }}
                id='shortDescription'
                name='shortDescription'
            />
            <TextField id="itemProps" name='itemProps' label={`Article short tips seperated by | ex: Dangerous | Wear safety gear`} variant="standard" value={formData.properties} onChange={(e) => formDispatch({ type: 'updateProps', value: e.target.value })} />
            <RequirementManager target={'tools'} neededTools={neededTools} neededMaterials={neededMaterials} setNeededMaterials={setNeededMaterials} setNeededTools={setNeededTools} />
            <RequirementManager target={'materials'} neededTools={neededTools} neededMaterials={neededMaterials} setNeededMaterials={setNeededMaterials} setNeededTools={setNeededTools} />
            <input type='file' id='imageFile' name='imageFile' accept='image/*' onChange={handleFileChange} />
            {percent > 0 && <ProgressBar value={percent} />}
            {formData.file && <><Button onClick={handleUpload} type='button'>Upload image</Button></>}
            <Button type='submit' disabled={percent !== 100 && true} >Add Article</Button>
        </Box>
    )
}

export default ArticleManager