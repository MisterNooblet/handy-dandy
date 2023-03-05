import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/fireBaseConfig'


const CardBox = ({ params, array, isItem }) => {
    const [results, setResults] = useState(null)

    const fetchCategories = async () => {
        const categories = []

        const querySnapshot = await getDocs(collection(db, params.category));
        querySnapshot.forEach((doc) => {
            let id = doc.id
            let info = doc.get('categoryInfo')
            categories.push({ ...info, id: id })
        })
        setResults(categories)
    }


    useEffect(() => {
        if (params && !params.item && !params.subcategories && params.category) {
            fetchCategories()
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
                    <Grid item key={card.name} xs={12} sm={6} md={4}>
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
                                <Link to={`${card.id}`}>
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