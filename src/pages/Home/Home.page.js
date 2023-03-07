import AutoComplete from '../../components/AutoComplete'
import React, { useEffect, useState } from 'react'
import Intro from './components/Intro'
import { dataFetcher } from '../../utils'
import Article from './components/Article'

const Home = () => {
    const [categories, setCategories] = useState(null)
    const [category, setCategory] = useState(null)
    const [articleNames, setArticleNames] = useState(null)
    const [articles, setArticles] = useState(null)
    const [article, setArticle] = useState(null)
    const [articleToDisplay, setArticleToDisplay] = useState(null)


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
        setArticleNames(prev => prev = articleNames)
        setArticles(prev => prev = result)
    }

    const forwardArticle = () => {
        if (articles) {
            const result = articles.filter(item => item.name === article)
            setArticleToDisplay(prev => prev = result)

        }
    }

    useEffect(() => {
        getArticleCategories()
    }, [])

    useEffect(() => {
        forwardArticle()
        //eslint-disable-next-line
    }, [article])

    useEffect(() => {
        if (categories && categories.includes(category)) {
            getArticleList()
        }
        //eslint-disable-next-line
    }, [category])
    // const dispatch = useDispatch()
    return (
        <>
            {categories && <AutoComplete label={'Category'} array={categories} setCategory={setCategory} />}
            {articleNames && <AutoComplete label={'Article'} array={articleNames} setCategory={setArticle} />}
            {!article && <Intro />}
            {articleToDisplay && <Article article={articleToDisplay[0]} />}
        </>
    )
}

export default Home