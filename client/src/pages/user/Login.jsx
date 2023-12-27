import React, { useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '64px',
  },
  form: {
    width: '100%',
    maxWidth: 300,
    marginTop: '8px',
  },
  submit: {
    marginTop: '16 px',
  },
  txt: {
    // marginTop: '16 px',
    display: 'block',
    width: '100%',
    // width : 'fit-content',
    margin: '8px auto',
    'text-align': 'center'
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const { error, dispatch } = useContext(AuthContext);


  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your Login logic here
    dispatch({ type: "LOGIN_START" });
    try {
      const credentials = {
        mail: email,
        password: password
      };
      const res = await axios.post(`${process.env.REACT_APP_URL}/api/auth/login`, credentials,{
        withCredentials: true,
        credentials: 'include'
      });
      // console.log(res);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      // const expirationDate = new Date();
      // expirationDate.setTime(expirationDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours in milliseconds

      // // // Check if the connection is secure (HTTPS)
      // const isSecure = window.location.protocol === 'https:';
      // const cookieString = `access_token=${res.data.token}; expires=${expirationDate.toUTCString()}; path=/ ${isSecure ? '; Secure' : ''}`;

      // document.cookie = cookieString;

      // // Create the cookie string
      // const cookieString = `access_token=${res.data.token}; expires=${expirationDate.toUTCString()}; path=/${isSecure ? '; Secure' : ''}`;

      // // Set the cookie
      // document.cookie = cookieString;
      // document.cookie = res.data.token;
      navigate("/")
    } catch (err) {
      // console.log("hii");
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    // console.log('Email:', email, 'Password:', password);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
        <Typography variant='h7' className={classes.txt}>Don't have an Account <Link to="/register" style={{
          textDecoration: 'none',
          color: 'blue',
          'font-weight': 'bold',
        }}>Sign Up</Link></Typography>
        {error && <span>{error.message}</span>}
      </form>
    </Container>
  );
};

export default Login;
