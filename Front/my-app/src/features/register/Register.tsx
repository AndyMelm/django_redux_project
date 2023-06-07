import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { registerAsync, selectError, selectMessage } from './RegisterSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const message = useAppSelector(selectMessage);
  const error = useAppSelector(selectError);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleRegister = () => {
    // Perform form validation
    if (!username || !password || !email) {
      alert('Please fill in all the fields.');
      return;
    }

    // Dispatch registerAsync action
    dispatch(registerAsync({ username, password, email })).then(() => {
      setIsPopupVisible(true);
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    // Redirect after closing the popup
    window.location.href = 'http://localhost:3000/';
  };

  return (
    <div>
      <h1>Register Form</h1>
      <br />
      *Note we are not validating you email, but if you will forget your password, only valid emails will receive an reset password email.
      <br /><br />
      User name:
      <input
      //TODO @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ FORM CONTROL CHECK THIS OUT
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
      email:
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      {isPopupVisible && (
        <div className="popup">
          <p>{message || error}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}

      {isPopupVisible && <div className="overlay" onClick={closePopup} />}
    </div>
  );
};

export default Register;
