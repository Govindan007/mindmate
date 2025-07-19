import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const Login = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState({ name: "", pass: "" });

  const adminname = "Admin";
  const adminpass = "password";

  const inputHandler = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    if (inp.name === adminname && inp.pass === adminpass) {
      navigate("/admin");
    } else {
      alert("Wrong name or password");
      location.reload();
    }
  };

  return (
    <div id="login">
      <Typography variant="h4">Admin Login</Typography>
      <div id="loginbox">
        <TextField
          label="Name"
          name="name"
          value={inp.name}
          onChange={inputHandler}
          placeholder="Enter your name"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="pass"
          value={inp.pass}
          onChange={inputHandler}
          type="password"
          placeholder="Enter your password"
          fullWidth
          margin="normal"
        />
        <Button className="btn" id="loginbtn" color="inherit" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Login;
