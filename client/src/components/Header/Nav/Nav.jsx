import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
//<Link to="/logout">Logout</Link>
//<Link to="/dashboard">Dashboard</Link>

