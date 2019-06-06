import React from 'react';
import { Redirect } from "react-router-dom";

function UserRegistration(props) {
  return (
    <div className="backgroundRed">
      {props.loggedIn ? (
        <Redirect to="/properties" />
      ) : (
      <div className="container2">
        <form className="backgroundWhite" onChange={props.handleInputChange}>
          <div className="form-group">
            <div className="row">
                <div className="col-6">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="First Name" name="firstName" />              
                </div>
                <div className="col-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control" id="lastName" placeholder="Last Name" name="lastName" />
                </div>
            </div>
            <div className="row marginTop">  
              <div className="col-6">
                <label htmlFor="email">Email Address</label>
                <input type="email" className="form-control" id="emailAddress" placeholder="name@domain.com" name="email" />
              </div>
              <div className="col-6">
                <label htmlFor="phone1">Phone Number</label>
                <input type="tel" className="form-control" id="phone1" placeholder="888-123-4567" name="phone1" />
              </div>
            </div>
            <div className="row marginTop">
              <div className="col-6">
                <label htmlFor="password">Password (Min: 8 Characters)</label>
                <input type="password" className="form-control" id="password"  name="password" />
              </div>
              <div className="col-6">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword"  name="confirmPassword" />
              </div>
              <div className="form-group marginTop2 marginleft">
                <button type="submit" className="nb btn-dark btn-block" onClick={props.createNewUser}>REGISTER</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      )}
    </div>
  );
}

export default UserRegistration;