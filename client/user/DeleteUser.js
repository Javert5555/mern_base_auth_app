import React from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const DeleteUser = () => {
    return (
        <Link to={`/`}>
            <IconButton aria-label='Delete' color='error'>
                <DeleteIcon />
            </IconButton>
        </Link>
    )
}

export default DeleteUser