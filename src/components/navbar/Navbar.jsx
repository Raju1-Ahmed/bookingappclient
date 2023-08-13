import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import your CSS file

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('userDetails'));
  console.log(user);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const handleLogout = () => {
    // Clear user details from local storage and reload the page 
    // localStorage.removeItem('reloadCount');
    localStorage.removeItem('userDetails');    
   
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navContainer flex justify-between items-center pt-3">
        <Link to="/" className="logo-link">
          <span className="logo">VillaVerse</span>
        </Link>
        <div className="navItems flex items-center">
          {user && (
            <>
              {isLogoutVisible && ( 
              <> 
                <li className='list-none bg-green-700 rounded p-2 hover:text-black text-white mr-2 mt-3'><a href="https://64d8fa96aee1732a5b8eff6c--dulcet-sprinkles-c68c49.netlify.app/">Admin</a></li>

              <button className=" bg-green-700 rounded p-2 hover:text-black text-white mr-2 mt-3" onClick={handleLogout}>
                  Log Out
                </button>
                </>
              )}
              <img
                src={user.img}
                alt=""
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={() => setIsLogoutVisible(!isLogoutVisible)}
              />
            </>
          )}
          {!user && (
            <div className="navButtons">
              <button className="navButton">
                <Link to="/register">Register</Link>
              </button>
              <button className="navButton">
                <Link to="/login">Login</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
