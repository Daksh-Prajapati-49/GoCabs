import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CabCard from '../../components/CabCard';
import { GraphCanvas } from 'reagraph'

import { AuthContext } from "../../context/AuthContext";


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px',
    margin: 'auto',
    marginTop: '2rem',
  },
  container2: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '4rem auto',
    width: '600px',
    minWidth: '300px',
    maxWidth: '100%',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    gap: "2rem 1rem",
  },
  form: {
    width: '100%',
    maxWidth: 400,
    margin: 'auto',
    marginTop: '8px',
  },
  submit: {
    marginTop: '16 px',
  },
  txt: {
    // marginTop: '16 px',
    display: 'block',
    fontWeight: '500',
    width : '400px',
    // width : 'fit-content',
    // margin: '8px auto',
    'text-align': 'center'
  },
}));

const transformGraph = (graphArray) => {
  const nodes = [];
  const edges = [];

  const uniqueNodes = [...new Set(graphArray.flatMap(item => [item.v1, item.v2]))];

  nodes.push(...uniqueNodes.map((node, index) => ({ id: node, label: node })));

  edges.push(
    ...graphArray.map((edge, index) => ({
      source: edge.v1,
      target: edge.v2,
      id: `${edge.v1}-${edge.v2}`,
      label: edge.t1.toString()
    }))
  );

  edges.push(
    ...graphArray.map((edge, index) => ({
      source: edge.v2,
      target: edge.v1,
      id: `${edge.v2}-${edge.v1}`,
      label: edge.t1.toString()
    }))
  );

  return { nodes, edges };
};


const Home = () => {
  const navigate = useNavigate();
  const { user, error } = useContext(AuthContext);
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user])

  const [node, setNode] = useState([]);
  const [edge, setEdge] = useState([]);
  const [res, setRes] = useState([]);

  useEffect(() => {
    if (res.length === 0) return;
    console.log(node);
    console.log(edge);
  }, [res])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/paths`, {
      withCredentials: true,
      credentials: 'include'
    })
      .then((res) => {
        setRes(res.data);
        const { nodes, edges } = transformGraph(res.data);
        setNode(nodes);
        setEdge(edges);
        console.log(res.data);
      })
  }, [])


  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 5 * 60 + 30); // Add 5 hours and 30 minutes


  const classes = useStyles();

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [start_time, setStart_time] = useState(currentDate.toISOString().slice(0, 16));
  const [end_time, setEnd_time] = useState("");

  const [minTime, setMinTime] = useState("0");
  const [path, setPath] = useState([]);

  const [cabs, setCabsData] = useState([]);


  const getAvCabs = async () => {
    // console.log(start_time);
    // console.log(end_time);
    axios.post(`${process.env.REACT_APP_URL}/api/cabs/`, { startTime: start_time, endTime: end_time }, {
      withCredentials: true,
      credentials: 'include'
    })
      .then((res) => {
        // console.log(res.data);
        setCabsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (end_time === "") return;
    getAvCabs();
  }, [end_time])


  const getCabs = async () => {
    const startTimeDate = new Date(start_time);
    const endTimeDate = new Date(startTimeDate.getTime() + (330 + minTime) * 60 * 1000);

    // Format the endTimeDate to a string in the datetime-local format
    const endTimeString = endTimeDate.toISOString().slice(0, 16);
    setEnd_time(endTimeString);

    // console.log(start_time);
    // console.log(end_time);
  };
  // console.log(user);
  useEffect(() => {
    if (minTime === "0") return;
    getCabs();
  }, [minTime])



  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_URL}/api/paths/shortest_path`, { v1: source, v2: destination }, {
      withCredentials: true,
      credentials: 'include'
    })
      .then(async (res) => {
        setMinTime(res.data.time);
        setPath(res.data.path);
        // console.log(res.data);
        // console.log(start_time);
        getCabs();
      })
      .catch((err) => {
        console.log(err);
      });
    return
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      {node.length !== 0 ? (
        <div style={{ display: "block", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset", position: "relative", width: '400px', height: '400px', margin: "1rem auto", zIndex: "1", borderRadius: "10px" }}>
          <GraphCanvas labelType="all" nodes={node} edges={edge} /></div>
      ) : ("")}

      <Container component="main" maxWidth="xs" className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Fill Trip Details
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h7">Source</Typography>
          <Select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder='Source'
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
            style={{ marginBottom: '1rem' }}
          >
            {
              node.map((nd) => (
                <MenuItem key={nd.id} value={nd.id}>{nd.id}</MenuItem>
              ))
            }
          </Select>

          <Typography variant="h7">Destination</Typography>
          <Select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Destination'
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
            style={{ marginBottom: '1rem' }}
          >
            {
              node.map((nd) => (
                <MenuItem key={nd.id} value={nd.id}>{nd.id}</MenuItem>
              ))
            }
          </Select>

          {/* <Typography variant="h7">Source</Typography>
          <TextField
            hiddenLabel
            variant="outlined"
            // margin="normal"
            required
            fullWidth
            id="source"
            label="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          /> */}

          {/* <Typography variant="h7">Source</Typography> */}
          {/* <TextField
            variant="outlined"
            required
            fullWidth
            id="destination"
            label="Destination"
            name="destination"
            autoComplete="destination"
            autoFocus
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          /> */}
          <Typography variant="h7">Pick-Up Time</Typography>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="start_time"
            name="start_time"
            autoComplete="start_time"
            type='datetime-local'
            value={start_time}
            inputProps={{
              min: currentDate.toISOString().slice(0, 16),
            }}
            onChange={(e) => setStart_time(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Get Cabs
          </Button>
          {error && <span>{error.message}</span>}
        </form>
      </Container>
      <div className={classes.container2}>
        {minTime !== 0 ? (<Typography variant="h7" style={{ width:"400px", backgroundColor: "#3E3D53", color: "white", fontWeight: "100", padding: "1rem", fontSize: "1.3rem", borderRadius: "5px" }} className={classes.txt}>Minimum Time: {minTime} </Typography>) : ("")}
        {path !== "" ? (<Typography variant="h7" style={{ width:"400px", backgroundColor: "#3E3D53", color: "white", fontWeight: "100", padding: "1rem", fontSize: "1.3rem", borderRadius: "5px" }} className={classes.txt}>Path: {path} </Typography>) : ("")}
        {cabs.map((cab) => (
          <CabCard key={cab._id} cab={cab} t={minTime} st={start_time} et={end_time} s={source} d={destination} />
        ))}
      </div>

    </div>
  )
}

export default Home