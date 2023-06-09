import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync, selectLogged, logout, getUserIdAsync, selectUserId } from './loginSlice';
import ResetPassword from '../reset_password/Resetpassword';

const Login = () => {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged);
  const userId = useAppSelector(selectUserId);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
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
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsPopupVisible(true);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    setErrorMessage('');
    setSuccessMessage('');
    window.location.href = 'http://localhost:3000/';
  };

  const closePopup = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsPopupVisible(false);
  };

  return (
    <div>
      {logged ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          {isPopupVisible && (
            <div className="popup">
              <p>{successMessage}</p>
              <button onClick={closePopup}>Close</button>
            </div>
          )}
          {userId && <p>User ID: {userId}</p>}
        </>
      ) : (
        <>
          <h1>Log-in Please</h1>
          User name:
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />

          Password:
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {isPopupVisible && (
            <div className="popup">
              <p>{errorMessage}</p>
              <button onClick={closePopup}>Close</button>
            </div>
          )}
          <br />
          <br />
          <ResetPassword></ResetPassword>
        </>
      )}
    </div>
  );
};

export default Login;
