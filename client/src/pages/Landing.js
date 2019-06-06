import React, { Component } from "react";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

//const Background = here....

class Landing extends Component {
   render() {
       return (
        <Background>
            <Nav />
                <Login />
                    <Footer />      
        </Background>
       );
   } 
}

export default Landing;