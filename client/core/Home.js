import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import blade_runner from './../assets/images/blade_runner.jpg'

const StylizedCard = styled(Card)(({ theme }) => ({
    maxWidth: 300,
    margin: 'auto',
    marginTop: theme.spacing(5)
}))

const StylizedTypography = styled(Typography)(({ theme }) => ({
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
}))

const StylizedMedia = styled(CardMedia)(({ theme }) => ({
    minHeight: 400
}))

const Home = () => {
    return (
        <StylizedCard>
            <StylizedTypography variant='h6'>
                Home Page
            </StylizedTypography>
            <StylizedMedia image={blade_runner} title='Blade Runner' />
            <CardContent>
                <StylizedTypography variant='body2' component='p'>
                    Welcome to the secret shop
                </StylizedTypography>
            </CardContent>
        </StylizedCard>
    )
}

export default Home