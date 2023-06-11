import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { registerAsync, selectError, selectMessage } from './RegisterSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const message = useAppSelector(selectMessage);
  const error = useAppSelector(selectError);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleRegister = () => {
    // Perform form validation
    if (!username || !password || !email) {
      setIsPopupVisible(true);
      return;
    }

    // Dispatch registerAsync action
    dispatch(registerAsync({ username, password, email })).then(() => {
      setIsPopupVisible(true);
      setIsUserCreated(true);
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setIsUserCreated(false);
    // Redirect after closing the popup
    window.location.href = 'http://localhost:3000/';
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

              {isPopupVisible && !isUserCreated && (
                <div className="alert alert-danger mt-3" role="alert">
                  Please fill in all the fields.
                </div>
              )}

              {isPopupVisible && isUserCreated && (
                <div className="alert alert-success mt-3" role="alert">
                  User created. You can log in now.
                </div>
              )}

              <button className="btn btn-primary w-100" onClick={handleRegister}>Register</button>

              {isPopupVisible && <div className="overlay" onClick={closePopup} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
