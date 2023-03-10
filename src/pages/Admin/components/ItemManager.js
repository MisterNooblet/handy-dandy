import React, { useEffect, useReducer, useState } from 'react'
import { arrayUnion, doc, updateDoc, } from "firebase/firestore";
import { db } from '../../../utils/fireBaseConfig';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import { normalizeCC } from '../../../utils/normalizeCamelCase';
import { dataFetcher } from '../../../utils';
import ImageUpload from '../../../components/ImageUpload';

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

const ItemManager = ({ type }) => {
    const [categories, dispatch] = useReducer(reducer, initialState)
    const [formData, formDispatch] = useReducer(formReducer, formInitialState)
    const [percent, setPercent] = useState(0)

    const getItemCategories = async () => {
        const categoryIds = await dataFetcher.getItemCategories(`${type}s`)
        dispatch({ type: 'setCategories', categories: categoryIds })
    }

    const getItemSubCategories = async () => {
        if (type && categories.currentCategory) {
            const subCategoryList = await dataFetcher.getItemSubCategories(`${type}s`, categories.currentCategory)
            dispatch({ type: 'setSubCategories', subCategories: subCategoryList })
        }
    }

    useEffect(() => {
        getItemCategories()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getItemCategories()
        //eslint-disable-next-line
    }, [type])

    useEffect(() => {
        getItemSubCategories()
        //eslint-disable-next-line
    }, [categories.currentCategory])

    const addNewItem = async (category, subCategory, tool) => {
        const toolCatRef = doc(db, `${type}s`, category);

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
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <NativeSelect
                        onChange={(e) => { dispatch({ type: 'setCategory', category: e.target.value }) }}
                        inputProps={{
                            name: 'itemCategory',
                            id: 'itemCategory',
                        }}
                    >
                        {categories.categories && categories.categories.map(cat => <option key={cat} value={cat}>{normalizeCC(cat)}</option>)}
                    </NativeSelect>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <NativeSelect

                        inputProps={{
                            name: 'itemSubCategory',
                            id: 'itemSubCategory',
                        }}
                    >
                        {categories.subCategories && categories.subCategories.map(cat => cat !== 'categoryInfo' && <option key={cat} value={cat}>{normalizeCC(cat)}</option>)}
                    </NativeSelect>
                </FormControl>
            </Box>
            <TextField inputProps={{
                name: 'itemTitle',
                id: 'itemTitle',
            }} label={`${type} Title`} variant="standard" value={formData.title} onChange={(e) => formDispatch({ type: 'updateTitle', value: e.target.value })} />
            <TextField id="itemProps" name='itemProps' label={`${type} properties seperated by | ex: Good grip | Sturdy`} variant="standard" value={formData.properties} onChange={(e) => formDispatch({ type: 'updateProps', value: e.target.value })} />
            <ImageUpload type={'item'} location={`${type}images`} percentControl={setPercent} urlControl={formDispatch} />
            <TextareaAutosize
                value={formData.description} onChange={(e) => formDispatch({ type: 'updateDescription', value: e.target.value })}
                aria-label="minimum height"
                minRows={3}
                placeholder="Short Description"
                style={{ width: '100%' }}
                id='shortDescription'
                name='shortDescription'
            />
            <Button type='submit' disabled={percent !== 100 && true}>Add {type}</Button>
        </Box>
    )
}

export default ItemManager