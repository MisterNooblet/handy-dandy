import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/fireBaseConfig'


const CardBox = ({ params, array, isItem }) => {
    const [results, setResults] = useState(null)

    const fetchCategories = async (location) => {
        const categories = []

        const querySnapshot = await getDocs(collection(db, location));
        querySnapshot.forEach((doc) => {
            let id = doc.id
            let info = doc.get('categoryInfo')
            categories.push({ ...info, id: id })
        })
        setResults(categories)
    }

    const getItemSubCategories = async () => {
        let subCategoryList = []
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
                if (prop !== 'categoryInfo') {
                    ordered[`${prop}`].forEach(element => {
                        if (element.type === 'categoryInfo') {
                            subCategoryList.push({ ...element, id: prop })
                        }
                    })
                }
            }
        } else {
            console.log("No such document!");
        }
        setResults(subCategoryList)
    }

    const getTools = async () => {
        let subCategoryList = []
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
                        if (element.type !== 'categoryInfo') {
                            subCategoryList.push(element)
                        }

                    })
                }
            }
        } else {
            console.log("No such document!");
        }
        setResults(subCategoryList)
    }

    useEffect(() => {
        if (params && !params.tools && !params.subcategories && params.category) {
            fetchCategories(params.category)
        } else if (params && !params.tools && params.subcategories) {
            getItemSubCategories(params.subcategories)
        } else if (params && params.tools) {
            getTools()
        }
        // eslint-disable-next-line
    }, [])


    if (params === undefined) {
        return (
            <>
                {array.map((card) => (
                    <Grid item key={card.title} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '0',
                                }}
                                image={card.image}
                                alt={card.title}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.title}
                                </Typography>
                                <Typography>{card.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`${card.title.toLowerCase()}`}>
                                    <Button size="small">View</Button>
                                </Link>
                                {isItem && <Button size="small">Edit</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </>
        )
    } else if (results) {
        return (
            <>
                {results.map((card) => (
                    <Grid item key={Math.random()} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '0',
                                }}
                                image={card.image}
                                alt={card.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.name}
                                </Typography>
                                <Typography>{card.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={!params.subcategories && !params.categories ? `p/${card.id}` : params.subcategories ? `tools/${card.id}` : null}>
                                    <Button size="small">View</Button>
                                </Link>
                                {isItem && <Button size="small">Edit</Button>}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </>
        )
    }

}

export default CardBox