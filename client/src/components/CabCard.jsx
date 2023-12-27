import React, { useContext } from 'react'
import { Typography } from '@mui/material'
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CabCard = ({ cab, t, st, et, s, d }) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const obj = {
        user_mail: user.mail,
        cab_name: cab.name,
        nameplate: cab.nameplate,
        start_time: st,
        end_time: et,
        price: t * cab.price,
        source: s,
        destination: d,
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(`Confirm booking of ${cab.name} @₹${t * cab.price}?`);

        if (isConfirmed) {
            axios.post(`${process.env.REACT_APP_URL}/api/bookings`, obj, {
                withCredentials: true,
                credentials: 'include'
            })
                .then((res) => {
                    // console.log(res.data);
                    alert('Booking confirmed!');
                    navigate('/');
                })
                .catch((err) => {
                    alert('Booking not confirmed');
                    console.log(err);
                })
        } else {
            alert('Booking not confirmed')
            // console.log('Booking not confirmed');
        }
    }

    return (
        <div key={cab._id} onClick={handleSubmit} style={{ width: "200px", backgroundColor: "#7F7D9C", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset", color: "white", display: "flex", flexDirection: "column", alignContent: "center", justifyContent: "space-around", textAlign: 'center', gap: "1rem", padding: "1rem 0rem", cursor: "pointer" }}>
            <Typography variant='h5'>{cab.name}</Typography>
            <Typography variant='h7'>{cab.nameplate}</Typography>
            <Typography variant='h7'>Price : ₹{t * cab.price}</Typography>
        </div>
    )
}

export default CabCard