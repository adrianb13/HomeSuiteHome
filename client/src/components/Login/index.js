import React from 'react';
import { Redirect } from "react-router-dom";
import logoPic from '../../assets/images/HSHLOGO.svg';
import Footer from "../Footer";

function Login(props) {

  if(props.loggedIn) {
    return (
      <div>
        <Redirect to="/properties" />
      </div>
    )
  } 

  return (
    <div className="backgroundRed">
      <div className="login">
      <img className="logo" src={logoPic} alt="logo"></img>
        <div className="logincontainer container">
          <form onChange={props.handleInputChange} onClick={props.handleInputChange}>
            <div className="form-group">
                <input type="email" className="form-control" id="email" name="email" placeholder="Email Address"></input>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
            </div>
            <button type="submit" className="nb btn-dark btn-block" onClick={props.handleLogin}>LOGIN
            </button>
          </form>
        </div>
      </div>
       <Footer />
    </div>
  );
}

export default Login;