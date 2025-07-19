import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Nav = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#2c3e50" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">MindMate</Typography>
        <div>
          <Button color="inherit" id="navbtn" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" id="navbtn" component={Link} to="/ask">
            Ask
          </Button>
          <Button color="inherit" id="navbtn" component={Link} to="/qa">
            View
          </Button>
          <Button color="inherit" id="navbtn" component={Link} to="/login">
            Admin
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
