import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { registerAsync, selectError, selectMessages, selectRegSuccess } from './RegisterSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const messages = useAppSelector(selectMessages);
  const error = useAppSelector(selectError);
  const regSuccess = useAppSelector(selectRegSuccess);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleRegister = () => {
    // Perform form validation
    if (!username || !password || !email) {
      alert('Please fill in all the fields.');
      return;
    }

    // Perform email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Dispatch registerAsync action
    dispatch(registerAsync({ username, password, email })).then(() => {
      setIsPopupVisible(true);
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    // Redirect after closing the popup only if registration was successful
    if (regSuccess) {
      window.location.href = 'http://localhost:3000/';
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Register Form</h1>
              <p className="text-center">
                *Note we are not validating your email, but if you forget your password, only valid emails will receive a reset password email.
              </p>

              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
              /><br /><br />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              /> <br /><br />

              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              /> <br /> <br />

              <Button
                variant="contained"
                color="success"
                className="w-100"
                onClick={handleRegister}
              >
                Register
              </Button>

              {isPopupVisible && (
                <div className={`alert ${regSuccess ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                  {messages.map((message, index) => (
                    <p key={index} className={regSuccess ? 'text-success' : 'text-danger'}>{message}</p>
                  ))}
                  <button className={`btn ${regSuccess ? 'btn-success' : 'btn-danger'}`} onClick={closePopup}>
                    Close
                  </button>
                </div>
              )}

              {isPopupVisible && <div className="overlay" onClick={closePopup} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
