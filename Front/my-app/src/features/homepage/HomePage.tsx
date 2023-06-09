import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      HomePage <br />

      <div className="btn btn-info" role="alert">
        <Link to="/">Home Page</Link>
      </div>

      <div className="btn btn-info" role="alert">
        <Link to="/login">Login Page</Link>
      </div>

      <div className="btn btn-info" role="alert">
        <Link to="/register">Register Page</Link>
      </div>

      <div className="btn btn-info" role="alert">
        <Link to="/journal">Journal</Link>
      </div>

    </div>
  )
}

export default HomePage