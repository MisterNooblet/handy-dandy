import AutoComplete from '../../components/AutoComplete'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Intro from './components/Intro'

const Home = () => {

    const [category, setCategory] = useState(null)
    const api = useSelector((state) => state.api)
    // const dispatch = useDispatch()
    return (
        <>
            <AutoComplete visibility={!category && 'hidden'} label={'Country'} array={api.countries} setCategory={setCategory} />
            <AutoComplete visibility={!category && 'hidden'} label={'Country'} array={api.countries} />
            <Intro />
        </>
    )
}

export default Home