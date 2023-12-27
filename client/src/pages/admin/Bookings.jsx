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



const Bookings = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    if(!user) navigate('/login');
    if(!user.isAdmin) navigate('/');
  },[user])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/bookings`, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(res => {
        setBookings(res.data);
        // console.log(bookings);
        // console.log(res.data);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{width:'fit-content', margin:'auto'}}>
        <Typography variant='h4' style={{margin:"1rem auto"}}>
          Bookings
        </Typography>
      <TableContainer component={Paper} >
        <Table  sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">User Mail ID</StyledTableCell>
              <StyledTableCell align="center">Cab Name</StyledTableCell>
              <StyledTableCell align="right">Nameplate</StyledTableCell>
              <StyledTableCell align="right">Start Time</StyledTableCell>
              <StyledTableCell align="right">End Time</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Source</StyledTableCell>
              <StyledTableCell align="right">Destination</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.user_mail}
                </StyledTableCell>
                <StyledTableCell align="right">{row.cab_name}</StyledTableCell>
                <StyledTableCell align="right">{row.nameplate}</StyledTableCell>
                <StyledTableCell align="right">{row.start_time}</StyledTableCell>
                <StyledTableCell align="right">{row.end_time}</StyledTableCell>
                <StyledTableCell align="right">{row.price}</StyledTableCell>
                <StyledTableCell align="right">{row.source}</StyledTableCell>
                <StyledTableCell align="right">{row.destination}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Bookings