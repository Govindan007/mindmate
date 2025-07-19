import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    var navigate = useNavigate()
    var[inp,setInp]=useState({name:"", pass:""})
    var adminname="Admin";
    var adminpass="password";
  const inputHandler=(e)=>{
    setInp({...inp, [e.target.name]:e.target.value});
    console.log(inp)
  };
    const submitHandler=()=>{
        if(inp.name == adminname && inp.pass == adminpass)
        {
            navigate('/admin')
        }
        else{
            alert("Wrong name or password");
            location.reload();
        }
    }
  return (
    
    <div id='login'>
        <Typography variant='h3'>Admin Login</Typography>
        <div id='loginbox'>
        <TextField variant='outlined' label="Name:" name='name' value={inp.name} required onChange={inputHandler} placeholder='Enter you name'/><br />
        <TextField variant='outlined' label="Password:" name='pass' value={inp.pass} required onChange={inputHandler} type='password' placeholder='Enter your password'/><br />
      <Button className="btn" color="inherit" onClick={submitHandler}>Submit</Button>
      </div>
    </div>
  )
}

export default Login
