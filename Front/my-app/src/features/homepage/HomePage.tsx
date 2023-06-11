import React from 'react'
import { Link } from 'react-router-dom'
import { selectLogged } from '../login/loginSlice'
import { useAppSelector } from '../../app/hooks'

const HomePage = () => {

  const logged = useAppSelector(selectLogged)
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

      <div className="btn btn-info" role="alert">
        <Link to="/journaldata">Journal Data</Link>
      </div>

      <div className="btn btn-info" role="alert">
        <Link to="/stockdata">Stock Data</Link>
      </div>

      {/* {logged ? (
        <div className="btn btn-info" role="alert">
          <Link to="/journal">Journal</Link>
        </div>
      ) : null}
      {logged ? (
        <div className="btn btn-info" role="alert">
          <Link to="/journaldata">Journal Data</Link>
        </div>
      ) : null}
      {logged ? (
        <div className="btn btn-info" role="alert">
          <Link to="/stockdata">Stock Data</Link>
        </div>
      ) : null} */}
    </div>
  )
}

export default HomePage