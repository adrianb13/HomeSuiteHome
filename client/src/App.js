import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import API from "./utils/API";
import "./App.css";

import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./pages/UserRegistration";
import RentalProperties from "./pages/RentalProperties";
import PropertyRegistration from "./pages/PropertyRegistration";
import PropertyDetails from "./pages/PropertyDetails";
//import UserRentalProperty from "./components/UserRentalProperty";
//import WorkOrderForm from "./components/WorkOrderForm";
//import LeaseForm from "./components/LeaseForm";
//import Profile from "./components/Profile";
import NoMatch from "./pages/NoMatch";
//import Settings from "./components/Settings";
//import Inbox from "./components/Inbox";

class App extends Component {
  state = {
    currUsers: [],
    firstName: "",
    lastName: "",
    phone1: "",
    email: "",
    password: "",
    confirmPassword: "",
    id: null,
    properties: [],
    loggedIn: false
  };

// Pulls Existing User When Logging In
  getUserInfo = info => {
      API.getUser(this.state.email)
      .then(res => {
        if(res.data.email !== this.state.email) {
          alert("Email is case sensitive or email may not be registered!")
        } else {
          if(res.data.email === this.state.email && res.data.password === this.state.password) {
             this.setState({
              currUsers: res.data,
              id: res.data.id,
              loggedIn: true 
            })
            this.userId()
          } else if (res.data.password !== this.state.password) {
            alert("Your Password Is Incorrect")
          }
        }
      })
      .catch(err => {
        console.log(err) 
        alert("Your Email Is Incorrect")
      });
  };

  userId = () => {
    API.getUserId(this.state.id)
    .then(res => {
      this.setState({
        properties: res.data.RentalProperties
      })
    })
    .catch(err => console.log(err))
  };

// Saves data from User Registration Form
  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  };

// Saves New User from Registration to SQL
  createNewUser = event => {
    event.preventDefault();
    if(this.state.firstName === (null || "") || this.state.lastName === (null || "") || this.state.email === (null|| "") || this.state.phone1 === (null || "") || this.state.password === (null || "")) {
      alert("Please Fill Out Form Completely")
    } else if(this.state.password !== this.state.confirmPassword) {
      alert("Password and Confirmation Did Not Match");
    } else {
/* This is to check if the user already exists by way of email */
      API.getUser(this.state.email)
      .then(res => {
        if(res.data.email === this.state.email) {
          alert("This Email Is Already Registered. Please Login.")
        } 
      })
      .catch(err => {
/* Not an "error", just means there is not email match in our database */
/* If they don't exist, it will create a new user */
        API.saveUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone1: this.state.phone1,
            email: this.state.email,
            password: this.state.password,
        })
        .then(res => {
          this.setState({
            currUsers: res.data,
            id: res.data.id,
            loggedIn: true
          })
          console.log(res.data);
          return (
            <Redirect to="/properties"></Redirect>
          )
        })
        .catch(err => console.log(err));
      });
    }
  };

// Buttons Logic
// Handles "Login" Button
  handleLogin = event => {
    event.preventDefault();
    this.getUserInfo(this.state.email)
  };

  logout = event => {
    event.preventDefault();
    this.setState({
      loggedIn: false,
      email: "",
      id: null,
      properties: []
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Nav
            loggedIn={this.state.loggedIn}
            logout={this.logout}
          >
          </Nav>
          <Switch>
            <Route exact path="/" render={() => (
//              <UserRentalProperty />
              <Login
                handleInputChange={this.handleInputChange}
                handleLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
              /> )}
            />
            <Route exact path="/register" render={() => (
              <Register
                handleInputChange={this.handleInputChange}
                createNewUser={this.createNewUser}
                loggedIn={this.state.loggedIn}
              />)} 
            /> />
            <Route exact path="/properties" render={() => (
              <RentalProperties
                loggedIn={this.state.loggedIn}
                email={this.state.email}
                properties={this.state.properties}
                id={this.state.id}
                userId={this.userId}
              />)}  
            />
            <Route exact path="/properties/new" render={() => (
              <PropertyRegistration
                loggedIn={this.state.loggedIn}
                email={this.state.email}
                id={this.state.id}
                userId={this.userId}
              />)}  
            />
            <Route path="/properties/:id" render={(props) => (
              <PropertyDetails
                loggedIn={this.state.loggedIn}
                email={this.state.email}
                id={this.state.id}
                userId={this.userId}
                properties={this.state.properties}
                {...props}
              />)}  
            />
{/*             <Route exact path="/workorders/:id" component={PropertyDetails} />
            <Route exact path="/settings" component={Settings} /> 
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/inbox" component={Inbox} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;