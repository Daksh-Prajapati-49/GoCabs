import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Path from '../../components/Path'
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
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import CreatePath from '../../components/CreatePath';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
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

const Paths = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    if(!user) navigate('/login');
    if(!user.isAdmin) navigate('/');
  },[user])

  const [paths, setPaths] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/paths`, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(res => {
        setPaths(res.data);
        // console.log(paths);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ width: '700px', margin: 'auto' }}>
      <div style={{ width : '700px',display:'flex', 'justify-content':'space-around', 'margin':'10px auto'}}>
        <Typography variant='h4'>
          Paths
        </Typography>
        {/* <Button variant="outlined" color="primary" startIcon={<AddBoxIcon />}>
          Create
        </Button> */}
        <CreatePath setPaths={setPaths}/>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">City 1</StyledTableCell>
              <StyledTableCell align="center">City 2</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paths.map((path) => (
              <Path key={path._id} path={path} setPaths={setPaths}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Paths