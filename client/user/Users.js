import React, { useEffect, useState } from 'react'
import { ArrowForward, Person } from '@mui/icons-material'
import { Avatar, IconButton, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, styled, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { list } from './api-user'

const StylizedPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    margin: theme.spacing(5)
}))

const StylizedTypography = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.openTitle
}))


const Users = () => {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        list(signal).then(data => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return (
        <StylizedPaper elevation={4}>
            <StylizedTypography variant="6">
                All Users
            </StylizedTypography>
            <List dense>
                {users.map((item, i) => {
                    return (
                        <Link to={`/user/${item._id}`} key={`user-${i}`}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItemButton>
                        </Link>
                    )
                })}
            </List>
        </StylizedPaper>
    )
}

export default Users