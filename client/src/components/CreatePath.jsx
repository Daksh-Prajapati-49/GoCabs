import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    width: '140px'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CreatePath = ({setPaths}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = useState({ v1: '', v2: '', t1: '' });
    const handleSave = () => {
        // console.log(data);
        axios.post(`${process.env.REACT_APP_URL}/api/paths/create`, data, {
            withCredentials: true,
            credentials: 'include'
      })
            .then(res => {
                // console.log(res.data);
                setPaths(prev => [...prev, res.data.data]);
                // path = res.data;
                handleClose();
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Button
                disabled={false}
                size="medium"
                variant="outlined" 
                color="primary" 
                startIcon={<AddBoxIcon />}
                onClick={handleOpen}
            >
                CREATE
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                    <TableContainer component={Paper} style={{ width: '600px' }}>
                        <Table style={{ width: '600px' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">City 1</StyledTableCell>
                                    <StyledTableCell align="center">City 2</StyledTableCell>
                                    <StyledTableCell align="center">Time</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow>
                                    {/* <StyledTableCell align="center" component="th" scope="row">
                                            {path.v1}
                                        </StyledTableCell> */}
                                    <StyledTableCell>
                                        <TextField
                                            hiddenLabel
                                            id="filled-hidden-label-normal"
                                            // defaultValue={path.v1}
                                            variant="filled"
                                            align="center"
                                            size="small"
                                            value={data.v1}
                                            onChange={(e) => { setData({ ...data, v1: e.target.value }) }}
                                            style={{ backgroundColor: 'white', margin: '0px', padding: '0px' }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <TextField
                                            hiddenLabel
                                            id="filled-hidden-label-normal"
                                            // defaultValue={path.v2}
                                            variant="filled"
                                            align="center"
                                            size="small"
                                            value={data.v2}
                                            onChange={(e) => { setData({ ...data, v2: e.target.value }) }}
                                            style={{ backgroundColor: 'white', margin: '0px', padding: '0px' }}
                                        />
                                    </StyledTableCell>
                                    {/* <StyledTableCell align="center">{path.v2}</StyledTableCell> */}
                                    <StyledTableCell>
                                        <TextField
                                            hiddenLabel
                                            id="filled-hidden-label-normal"
                                            // defaultValue={path.t1}
                                            variant="filled"
                                            align="center"
                                            size="small"
                                            type='number'
                                            value={data.t1}
                                            onChange={(e) => { setData({ ...data, t1: e.target.value }) }}
                                            style={{ backgroundColor: 'white', margin: '0px', padding: '0px' }}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{ width: 'fit-content', margin: '10px auto 0px auto' }}>
                        <Button variant="contained" endIcon={<SaveIcon />} onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CreatePath