import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from './Nav'

const Home = () => {
  return (
    <div id="homepage">
        
      <Typography variant='h2'>MindMate</Typography><br />
      <Typography variant='h5'>
      <p className="text-lg md:text-xl text-gray-700 mb-6">
          A safe, anonymous space for students to share mental health concerns.<br />
          Let AI assist while counselors respond personally.
        </p>
        </Typography>
        <br/>
       <div>
       <Link to={'/ask'} ><Button className="btn" color="inherit" >Ask</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={'/qa'} ><Button className="btn" color="inherit">View</Button></Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to={'/login'} ><Button className="btn" color="inherit">Admin</Button></Link>
       </div>
       <br /><br />
       <footer id="footer">
        Built with ❤️ using Firebase, Gemini, React
      </footer>
    </div>
  )
}

export default Home



