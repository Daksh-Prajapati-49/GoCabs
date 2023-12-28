import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";


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

const Register = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Add your Register logic here
    try {
      const credentials = { 
        mail : email,
        password : password 
      };
      const res = await axios.post(`${process.env.REACT_APP_URL}/api/auth/register`, credentials, {
        withCredentials: true,
        credentials: 'include'
      });
      // console.log(res);
      navigate("/login")
    } catch (err) {
      // console.log("hii");
      // dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err.response.data.message);
      setError(err.response.data.message)
    }
    // console.log('Email:', email, 'Password:', password);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          type="email"
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
          Register
        </Button>
        <Typography variant='h7' className={classes.txt}>Already had an Account <Link to="/login" style={{
          textDecoration: 'none',
          color: 'blue',
          'font-weight': 'bold',
        }}>Sign In</Link></Typography>
        {error && <span>{error.message}</span>}
      </form>
    </Container>
  );
};

export default Register;
