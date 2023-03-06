import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../utils/fireBaseConfig'

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
        console.log(docSnap);
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
            console.log(item);
        } else {
            console.log("No such document!");
        }

    }


    return (
        <div>{item && item.name}</div>
    )
}

export default Item