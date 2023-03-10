import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toolFetcher } from '../../../utils'



const CardBox = ({ params, array, isItem }) => {
    const [results, setResults] = useState(null)
    const navigate = useNavigate()


    const fetchCategories = async (location) => {
        const result = await toolFetcher.fetchCategories(location)
        setResults(result)
    }

    const getItemSubCategories = async () => {
        const result = await toolFetcher.getItemSubCategories(params.category, params.subcategories)
        setResults(result)
    }

    const getTools = async () => {
        const result = await toolFetcher.getTools(params.category, params.subcategories, params.tools)
        setResults(result)
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
                    <Grid item key={card.title} xs={12} sm={6} md={4} m={3}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <CardMedia
                                component="div"
                                sx={{ background: `url('${card.image}')  center/cover no-repeat`, objectFit: 'scale-down', width: '100%', height: '150px' }}

                                alt={card.name}
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
                {results.length === 0 && <Box>
                    <Typography component={'h3'} variant={'h3'}>No data yet..</Typography>
                    <Button onClick={() => { navigate(-1) }}>Go Back?</Button></Box>}
                {results.map((card) => (
                    <Grid item key={Math.random()} xs={12} sm={6} md={4} m={3}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="div"
                                sx={{ background: `url('${card.image}')  center/cover no-repeat`, objectFit: 'scale-down', width: '100%', height: '125px' }}

                                alt={card.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {card.name}
                                </Typography>
                                <Typography>{card.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={!params.subcategories && !params.categories ? `p/${card.id}` : params.subcategories && !params.tools ? `tools/${card.id}` : `item/${card.name}`}>
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