import { FormControl, NativeSelect, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useReducer, useState } from 'react'
import { dataFetcher } from '../../../utils';
import { normalizeCC } from '../../../utils/normalizeCamelCase';
import toolFetcher from '../../../utils/toolFetcher';
import TransferList from './TransferList';

const initialState = {
    categories: null,
    currentCategory: null,
    subCategories: null
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


const RequirementManager = ({ target, neededTools, neededMaterials, setNeededMaterials, setNeededTools }) => {
    const [categories, toolDispatch] = useReducer(toolReducer, initialState)
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    useEffect(() => {
        console.log(getItemCategories);
        getItemCategories()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (target === 'tools') {
            setNeededTools(right)
        } else if (target === 'materials') {
            setNeededMaterials(right)
        }
    }, [right, target, setNeededMaterials, setNeededTools])

    useEffect(() => {
        getItemSubCategories()
        //eslint-disable-next-line
    }, [categories.currentCategory])


    const loadTools = async (subcategory) => {
        const result = await toolFetcher.getTools(target, categories.currentCategory, subcategory)
        setLeft(result)
    }

    const getItemCategories = async () => {
        const categoryIds = await dataFetcher.getItemCategories(target)
        console.log(categoryIds);
        toolDispatch({ type: 'setCategories', categories: categoryIds })
    }

    const getItemSubCategories = async () => {
        const subCategoryList = await dataFetcher.getItemSubCategories(target, categories.currentCategory)
        toolDispatch({ type: 'setSubCategories', subCategories: subCategoryList })
    }


    return (
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

                <Typography mb={2} textAlign={'center'}>Needed {target}</Typography>
                <TransferList setChecked={setChecked} setLeft={setLeft} setRight={setRight} checked={checked} left={left} right={right} />
            </Box>
        </Box>
    )
}

export default RequirementManager