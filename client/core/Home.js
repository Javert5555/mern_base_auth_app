import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import blade_runner from './../assets/images/blade_runner.jpg'

const StylizedCard = styled(Card)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(5)
}))

const StylizedTypographyTitle = styled(Typography)(({ theme }) => ({
    padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
    color: theme.palette.openTitle
}))

const StylizedMedia = styled(CardMedia)(({ theme }) => ({
    minHeight: 400
}))

const Home = () => {
    return (
        <StylizedCard>
            <StylizedTypographyTitle variant='h6'>
                Home Page
            </StylizedTypographyTitle>
            <StylizedMedia image={blade_runner} title='Blade Runner' />
            <CardContent>
                <Typography variant='body2' component='p'>
                    Welcome to the secret shop
                </Typography>
            </CardContent>
        </StylizedCard>
    )
}

export default Home