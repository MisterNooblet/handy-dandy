import AutoComplete from '../../components/AutoComplete'
import React, { useEffect, useState } from 'react'
import Intro from './components/Intro'
import dataFetcher from '../../utils/dataFetcher'
import { Button } from '@mui/material'

const Home = () => {
    const [categories, setCategories] = useState(null)
    const [category, setCategory] = useState(null)
    const [articles, setArticles] = useState(null)
    const [article, setArticle] = useState(null)


    const getArticleCategories = async () => {
        const result = await dataFetcher.getItemCategories('articles')
        setCategories(prev => prev = result)
        setCategory(prev => prev = result[0])
    }

    const getArticleList = async () => {
        const result = await dataFetcher.getArticles(category)
        let articleNames = result.reduce((acc, item) => {
            acc.push(item.name)
            return acc
        }, [])
        setArticles(prev => prev = articleNames)
    }

    const handleTest = () => {
        console.log(category);
    }

    useEffect(() => {
        getArticleCategories()
    }, [])

    useEffect(() => {
        getArticleList()
        //eslint-disable-next-line
    }, [category])
    // const dispatch = useDispatch()
    return (
        <>
            <AutoComplete label={'Category'} array={categories} setCategory={setCategory} />
            <AutoComplete label={'Article'} array={articles} setCategory={setArticle} />
            {!article && <Intro />}
        </>
    )
}

export default Home