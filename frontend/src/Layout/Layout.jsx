import { Container, Grid } from '@mui/material'
import React from 'react'
import LeftSide from '../components/LeftSide/LeftSide'
import Search from '../components/LogoSearch/Search'
import PostSide from '../components/PostSide/PostSide'
import Suggestions from '../components/Suggestions/Suggestions'
import './Layout.scss'

const Layout = ({ children }) => {
    return (
        <Container maxWidth={'xxl'}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <LeftSide />
                </Grid>
                <Grid item xs={5}>
                    {children}
                </Grid>
                <Grid item xs={4} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Search/>
                    <Suggestions />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Layout