import { Button, IconButton, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import './Modal.css'
import { validationSchema } from './validation/validationSchema';
import CloseIcon from '@mui/icons-material/Close';
import Loader from './Loader';


function UpdateModal({ open, onClose, row }) {

    const [load, setLoad] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: row?.name,
            phoneNumber: row?.phoneNumber,
            email: row?.email,
            hobby: row?.hobby
        },
        onSubmit: async (values) => {
            try {

                setLoad(true)
                await axios.put("http://localhost:4000/", { ...values, _id: row._id })
                setLoad(false)
                onClose();
            } catch (error) {
                setLoad(false)
                alert(error.message);
            }
        },
        validationSchema: validationSchema
    })



    if (open) {
        return (<div className="modal__background">
            <Loader load={load} />
            <Paper elevation={3} className="modal__container">
                <form onSubmit={formik.handleSubmit}>
                    <TextField id="name" name="name" label="Name" variant="outlined" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && (formik.errors.name)} />
                    <TextField id="phoneNumber" name="phoneNumber" label="Phone Number" variant="outlined" value={formik.values.phoneNumber} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.phoneNumber)} helperText={formik.touched.phoneNumber && (formik.errors.phoneNumber)} />
                    <TextField id="email" label="Email" name="email" variant="outlined" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && (formik.errors.email)} />
                    <TextField id="hobby" label="hobby" name="hobby" variant="outlined" value={formik.values.hobby} onChange={formik.handleChange} error={formik.touched.hobby && Boolean(formik.errors.hobby)} helperText={formik.touched.hobby && (formik.errors.hobby)} />
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                    <Button variant="contained" color="error" endIcon={<CloseIcon />} onClick={onClose} >
                        Close
                    </Button>
                </form>

            </Paper>
        </div>
        )
    }
}

export default UpdateModal 