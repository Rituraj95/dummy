
import "./App.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableInputs from './TableInputs';





export default function TableComp({ row }) {


    return (
        <div className='table__container'>
            <TableContainer component={Paper} sx={{ maxHeight: "500px" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Phone Number</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Hobbies</TableCell>
                            <TableCell align="center">Select</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.map((row) => (
                            <TableInputs key={row._id} row={row}> </TableInputs>
                        ))}
                    </TableBody>
                </ Table>
            </TableContainer >

        </div>


    );
}
