import { Button, Paper } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import Loader from './Loader'
import './Modal.css'

function DeleteModal({ open, onClose, row }) {
    const [load, setLoad] = useState(false)


    const handleDelete = async () => {
        try {
            onClose();
            setLoad(true)
            await axios.delete(`http://localhost:4000/${row._id}`)
            setLoad(false)
        } catch (error) {
            onClose();
            setLoad(false)
            alert(error.message)

        }
    }


    if (open) {
        return (
            <>
                <Loader load={load} />

                <div className='modal__background'><Paper elevation={3} className="delete__modal__container">
                    <h2>Are you sure ?</h2>
                    <div >
                        <Button variant="contained" color='error' onClick={handleDelete}>Yes</Button>
                        <Button variant="contained" onClick={onClose}>No</Button>

                    </div>
                </Paper></div>
            </>

        )
    }

}

export default DeleteModal