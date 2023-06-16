import React from 'react';
import { Link } from 'react-router-dom';
import { selectLogged, logout } from '../login/loginSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-primary bg-primary`}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!logged && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {logged && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/journal">
                      Journal
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/journaldata">
                      Journal Data
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/marketdata">
                      Market Data
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {logged && (
              <button className="btn btn-secondary btn-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;
