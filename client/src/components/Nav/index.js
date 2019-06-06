import React from 'react';
import { Link } from "react-router-dom";

function Nav(props) {
  return (
  <div> 
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">Home Suite Home</Link>
        </div>
        <nav pullright="true">

          {props.loggedIn ? (
            <Link to="/">
              <button color="inherit" className="btn btn-dark" onClick={props.logout}>Logout</button>
            </Link>
          ) : (
            <div>
              <Link to="/register">
                <button color="inherit" className="btn btn-dark">Register</button>
              </Link>
              <Link to="/">
                <button color="inherit" className="btn btn-dark">Login</button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </nav>
  </div>  
  );
}

export default Nav;