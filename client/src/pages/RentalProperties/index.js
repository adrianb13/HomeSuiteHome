import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import API from "../../utils/API";

class Properties extends Component {
   state = {
    addExisting: false,
    RentalPropertyId: "",
    userRole: "Tenant"
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
    console.log(this.state)
  }; 

  showExisting = () => {
    this.setState({
      addExisting: true,
    })
  };

  hideExisting = () => {
    this.setState({
      addExisting: false
    })
  };

  UserRentalProp = () => {
    API.saveUserProperties({
      userRole: "Tenant",
      UserId: this.props.id,
      RentalPropertyId: this.state.RentalPropertyId
    })
    .then(res => {
      this.props.userId()
    })
   .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="backgroundPic">
        {this.props.loggedIn ? (
        <div className="outer">
          <div className="container">
            <h1 className="text-center pt-3">Properties</h1>
            
            <div className="text-center">
              <div className="row">
                <div className="col-12">
                  <Link to="/properties/new">
                    <button className="nb btn btn-dark btn-block"><i className="fas fa-plus"></i>ADD RENTAL PROPERTY</button>
                  </Link>
                </div>
              </div>
              <h3 className="m-3">For Tenants</h3>
              {this.state.addExisting ? (
                <div className="row" onChange={this.handleInputChange}> 
                  <div className="col-12">             
                    <label htmlFor="RentalPropertyId">Existing Property ID#</label>
                    <input type="text" className="form-control" id="RentalPropertyId" name="RentalPropertyId" placeholder="0"/>
                    <button className="nb btn btn-danger bred btn-block" onClick={this.UserRentalProp}><i className="fas fa-plus"></i>ADD EXISTING PROPERTY</button>
                    <button className="nb btn btn-dark btn-block" onClick={this.hideExisting}>CANCEL</button>
                  </div>
                </div>
              ) : (
                <button className="nb btn btn-danger bred btn-block" onClick={this.showExisting}><i className="fas fa-plus"></i>ADD EXISTING PROPERTY</button>
              )}
              <h3 className="m-3">List of Properties</h3>
            
              <div>
                {this.props.properties.map(property => (
                  <Link to={"/properties/"+ property.id} key={property.id}>
                  <div key={property.id} className="grey_border">
                    <div className="row">
                      <div className="col-4">
                         <img src={property.imageLink}/* "http://placehold.it/125" */
                            className="card-img-left imgSize"
                            alt="Home"></img>
                      </div>
                      <div className="col-8">
                        <h6 className="nb hed6 left">{property.streetNumber} {property.streetName}</h6>
                        <h6 className="nr left">{property.cityName} {property.stateCode}, {property.zipCode}</h6>
                        <h6 className="nr left">Property ID: {property.id}</h6>
                        <h6 className="nr left">Role: {property.UserRentalProperty.userRole}</h6>
                        <div>Click for more details</div>
                      </div>
                    </div>
                  </div>
                  </Link>
                ))}
                <br></br>
              </div>

            </div>
            
          </div>
        </div>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  };
};

export default Properties;