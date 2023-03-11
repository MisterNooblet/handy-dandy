import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../utils/fireBaseConfig'
import ErrorAPI from '../Error/ErrorAPI.page'
import ItemCard from './components/ItemCard'

const Item = () => {
    const [item, setItem] = useState(null)
    const params = useParams()

    useEffect(() => {
        getTool()
        //eslint-disable-next-line
    }, [])

    const getTool = async () => {

        const docRef = doc(db, `${params.category}`, params.subcategories)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const subCategoryObject = docSnap.data()
            const ordered = Object.keys(subCategoryObject).sort().reduce(
                (obj, key) => {
                    obj[key] = subCategoryObject[key];
                    return obj;
                },
                {}
            );
            for (const prop in ordered) {
                if (prop === params.tools) {
                    ordered[`${prop}`].forEach(element => {
                        if (element.name === params.name) {
                            setItem(prev => prev = element)

                        }

                    })
                }
            }

        } else {
            return <ErrorAPI />
        }
    }

    if (item) {
        return <ItemCard item={item} />
    }

}

export default Item