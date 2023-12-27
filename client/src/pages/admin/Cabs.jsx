import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Cab from '../../components/Cab'
import CreateCab from '../../components/CreateCab'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));




const Cabs = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    if(!user) navigate('/login');
    if(!user.isAdmin) navigate('/');
  },[user])
  const [cabs, setCabs] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/cabs`, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(res => {
        setCabs(res.data);
        // console.log(cabs);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ width: '700px', margin: 'auto' }}>
      <div style={{ width: '700px', display: 'flex', 'justify-content': 'space-around', 'margin': '10px auto' }}>
        <Typography variant='h4'>
          Cabs
        </Typography>
        {/* <Button variant="outlined" color="primary" startIcon={<AddBoxIcon />}>
          Create
        </Button> */}
        <CreateCab setCabs={setCabs} />
      </div>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Nameplate</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
              {/* <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {cabs.map((cab) => (
              <Cab key={cab._id} cab={cab} setCabs={setCabs} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Cabs