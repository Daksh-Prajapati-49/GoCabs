import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Users = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    if(!user) navigate('/login');
    if(!user.isAdmin) navigate('/');
  },[user])

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/users`, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(res => {
        setUsers(res.data);
        // console.log(users);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{width:'700px', margin:'auto'}}>
        <Typography variant='h4' style={{margin:"1rem auto"}}>
          Users
        </Typography>
      <TableContainer component={Paper} >
        <Table  sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">User Mail ID</StyledTableCell>
              <StyledTableCell align="center">isAdmin</StyledTableCell>
              {/* <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.mail}
                </StyledTableCell>
                <StyledTableCell align="center">{(row.isAdmin)?("Admin"):("User")}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users