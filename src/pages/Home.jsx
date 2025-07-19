import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Typography variant='h2'>MindMate</Typography>
      <Typography variant='h5'>
      <p className="text-lg md:text-xl text-gray-700 mb-6">
          A safe, anonymous space for students to share mental health concerns.<br />
          Let AI assist while counselors respond personally.
        </p>
        </Typography>
       
       <Link to={'/ask'} ><Button id='homebutton' color="inherit" >Ask</Button></Link>
        <Link to={'/qa'} ><Button id='homebutton' color="inherit">View</Button></Link>
       
       <br /><br />
       <footer className="footer">
        Built with ❤️ using Firebase, Gemini, React
      </footer>
    </div>
  )
}

export default Home



{/* <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 text-gray-800 p-8 flex flex-col items-center justify-center">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-800">
          MindMate 🧠
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          A safe, anonymous space for students to share mental health concerns.
          Let AI assist while counselors respond personally.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/ask"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow"
          >
            Ask a Question
          </Link>
          <Link
            to="/qa"
            className="bg-white hover:bg-gray-100 text-blue-700 border border-blue-600 px-6 py-3 rounded-lg text-lg shadow"
          >
            View Q&A
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        Built with ❤️ using Firebase, Gemini, React
      </footer>
    </div> */}