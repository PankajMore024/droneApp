import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div>
      <img src='https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/jpft6yjrhauqndcriay1' className="App-logo" alt='flytbase logo' />

      {auth ?
        <ul className="Navbar-ul">
          <li><Link to="/">Profile</Link></li>
          <li><Link to="/drones">Drones</Link></li>
          <li><Link to="/sites">Sites</Link></li>
          <li><Link to="/missions">Missions</Link></li>
          <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
        :
        <ul className="Navbar-ul Nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      }
    </div>
  );
}

export default Navbar;
