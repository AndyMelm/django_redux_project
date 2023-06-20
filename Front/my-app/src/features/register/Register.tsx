import React, { useState } from 'react';
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

              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>

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
