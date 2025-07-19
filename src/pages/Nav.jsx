import React from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Ask from './Ask';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div id='nav'>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MindMate
          </Typography>
          <Link to={'/'} ><Button className="btn" color="inherit" variant='contained'>Home</Button></Link>&nbsp;
          <Link to={'/ask'} ><Button className="btn" color="inherit" variant='contained'>Ask</Button></Link>&nbsp;
          <Link to={'/qa'} ><Button className="btn" color="inherit" variant='contained'>View</Button></Link>&nbsp;
          <Link to={'/login'} ><Button className="btn" color="inherit" variant='contained'>Admin</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Nav
