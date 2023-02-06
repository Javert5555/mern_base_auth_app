import { createTheme } from '@mui/material/styles'
import { orange, teal } from '@mui/material/colors'

const theme = createTheme({
    typography: {
        useNextVariants: true,
    },
    // The theme exposes the following palette colors (accessible under theme.palette.)
    palette: {
        // primary - used to represent primary interface elements for a user.
        // It's the color displayed most frequently across your app's screens and components.
        primary: {
            light: '#52c7b8',
            main: '#009688',
            dark: '#00675b',
            contrastText: '#fff',
        },
        // secondary - used to represent secondary interface elements for a user.
        secondary: { 
            light: '#ffd95b',
            main: '#ffa726',
            dark: '#c77800',
            contrastText: '#000',
        },
        openTitle: teal['700'],
        protectedTitle: orange['700'],
        type: 'light'
    }
})

export default theme