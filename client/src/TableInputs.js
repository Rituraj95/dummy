import { Delete } from "@mui/icons-material"
import { Button, ButtonGroup, Checkbox, TableCell, TableRow } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import { useValue } from "./DataProvider"
import Loader from "./Loader"
import UpdateModal from "./UpdateModal"

export default function TableInputs({ row }) {
    const [opendel, setopendel] = useState(false)
    const [openupdate, setopenupdate] = useState(false)
    const [state, dispatch] = useValue()
    const [check, setCheck] = useState(false)
    const handleCheckbox = (e) => {
        setCheck(e.target.checked)
        if (!check) {
            dispatch({
                type: "ADD",
                payload: row
            })
        }
        else if (check) {
            dispatch({
                type: "REMOVE",
                payload: row
            })
        }
    }

    return (<>
        <UpdateModal open={openupdate} onClose={() => { setopenupdate(false) }} row={row} />
        <DeleteModal open={opendel} onClose={() => { setopendel(false) }} row={row} />
        <TableRow>
            <TableCell>{row._id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell align="left">{row.phoneNumber}</TableCell>
            <TableCell align="left">{row.email}</TableCell>
            <TableCell align="left">{row.hobby}</TableCell>
            <TableCell align='left'><Checkbox checked={check} onChange={handleCheckbox} /></TableCell>
            <TableCell align='left'>
                <ButtonGroup variant="contained">
                    <Button onClick={() => { setopenupdate(true) }}>Update</Button>
                    <Button color="error" onClick={() => { setopendel(true) }}>Delete</Button>
                </ButtonGroup></TableCell>
        </TableRow>
    </>);
}
