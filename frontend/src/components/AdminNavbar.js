import React from 'react';
import '../pages/Home.css'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UseToken from './UseToken';
function AdminNavbar()
{
  const{removeToken}=UseToken();
    const [isMenuOpen, setMenuOpen] = useState(false);
    let navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
      };
      
  const handleLogOut = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      removeToken();
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("Mood");
      sessionStorage.removeItem("PHQ");
      sessionStorage.removeItem("SRQ");
      navigate("/");
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  
    return(
        <div className='outer'>
        <div className='inner1'>
          <div className='logoBlock'>
          <NavLink to='/admin/dashboard'><h3 className='logo'>CampusCalm Coach Admin</h3></NavLink>
          </div>
          <nav className={`navBlock ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <NavLink to='/admin/dashboard'><li>Moderate Users</li></NavLink>
              <NavLink to='/admin/adminblog'><li>Moderate Blogs</li></NavLink>
              <NavLink to='/admin/psy'><li>Moderate Psychiatrists</li></NavLink>
              <li style={{"cursor":"pointer"}} onClick={handleLogOut}>Log Out</li>
            </ul>
          </nav>
          <div className={`menuToggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className='hamburger'></div>
          </div>
        </div>
      </div>
    )
};
export default AdminNavbar

