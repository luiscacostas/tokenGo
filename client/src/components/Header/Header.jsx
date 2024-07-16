import React from 'react';
import Nav from './Nav';

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <header>
      <h1>TokenGo</h1>
      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </header>
  );
};

export default Header;