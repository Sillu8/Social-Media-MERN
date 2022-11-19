import React from 'react'
import { Container, Box, Typography, Card, CardActions, CardContent, Button, CssBaseline, Grid, Toolbar, CardHeader } from '@mui/material'
import { useState } from 'react'


import sky from '../images/sky.jpg'

const Auth = () => {

    

    return (
        <div className='login'>
            <CssBaseline />
            <main>
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardHeader>{}</CardHeader>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Word of the Day
                                </Typography>
                                <Typography variant="h5" component="div">
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography variant="body2">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default Auth