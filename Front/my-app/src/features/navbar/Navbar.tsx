import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../login/loginSlice';
import { useAppDispatch } from '../../app/hooks';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [isLogoutMessageVisible, setIsLogoutMessageVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsLogoutMessageVisible(true);
  };

  const closeLogoutMessage = () => {
    setIsLogoutMessageVisible(false);
    navigate('/');
  };

  const getTokenFromSessionStorage = () => {
    const storedToken = sessionStorage.getItem('token');
    return storedToken;
  };

  const userHasToken = getTokenFromSessionStorage() !== null;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-success bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            Home
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!userHasToken && (
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
            {userHasToken && (
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
                    Market Charts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cryptousdconvert">
                    Crypto USD Convertor
                  </Link>
                </li>
              </>
            )}
          </ul>
          {userHasToken && (
            <>
              <button className="btn btn-secondary btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      {isLogoutMessageVisible && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card mt-5">
                <div className="card-body" style={{ backgroundColor: '#FFC0CB' }}>
                  <div className="alert alert-danger mt-3" role="alert">
                    <p>Logged out successfully.</p>
                    <button className="btn btn-secondary btn-danger" onClick={closeLogoutMessage}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
