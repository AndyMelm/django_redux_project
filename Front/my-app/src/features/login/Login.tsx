import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync, selectLogged, logout, getUserIdAsync, selectUserId } from './loginSlice';
import ResetPassword from '../reset_password/Resetpassword';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert } from '@mui/material';

const Login = () => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged);
  const userId = useAppSelector(selectUserId);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (logged) {
      dispatch(getUserIdAsync(sessionStorage.getItem('token') || ''));
    }
  }, [logged, dispatch]);

  const handleLogin = () => {
    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then(() => {
        setSuccessMessage('Successfully logged in');
        setIsPopupVisible(true);
        dispatch(getUserIdAsync(sessionStorage.getItem('token') || ''));
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsPopupVisible(true);
      });
  };

  const closePopupError = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsPopupVisible(false);
  };

  const closePopup = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsPopupVisible(false);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              {logged ? (
                <>
                  {isPopupVisible && (
                    <div className="alert alert-success mt-3" role="alert">
                      <p>{successMessage}</p>
                      <button className="btn btn-secondary btn-success" onClick={closePopup}>Close</button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className="card-title text-center mb-4">Log In</h1>
                  <div className="mb-3">
                    <TextField
                      type="text"
                      label="Username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      type="password"
                      label="Password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <Button variant="contained" color="success" onClick={handleLogin}>
                    Log In
                  </Button>
                  {isPopupVisible && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <p>{errorMessage}</p>
                      <button className="btn btn-secondary btn-danger" onClick={closePopupError}>
                        Close
                      </button>
                    </div>
                  )}
                  <div className="text-center mt-4">
                    <ResetPassword />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
