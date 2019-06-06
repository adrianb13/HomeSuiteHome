import React from "react";
import { Redirect, Link } from "react-router-dom";
import API from "../../utils/API";

class RentalPropertyForm extends React.Component {
  state = {
    streetNumber: "",
    streetName: "",
    unitNumber: "",
    cityName: "",
    stateCode: "",
    zipCode: "",
    imageLink: "",
    needReg: true,
    userRole: "",
    UserId: "",
    RentalPropertyId: ""
  }

  componentDidMount() {
    this.setState({
      UserId: this.props.id
    })
  }

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
    console.log(this.state)
  };

  createNewProperty = event => {
    event.preventDefault();
    if (this.state.streetNumber === (null || "")) {
      alert("Street Number Is Invalid");
    } else if (this.state.streetName === (null || "")) {
      alert("Street Name Is Invalid");
    } else if (this.state.cityName === (null || "")) {
      alert("City Is Invalid");
    } else if (this.state.stateCode === (null || "")) {
      alert("State Is Invalid");
    } else if (this.state.zipCode === (null || "")) {
      alert("Zip Code Is Invalid");
    } else {
      if(this.state.imageLink === (null || "")) {
        API.saveProperty({
          streetNumber: this.state.streetNumber,
          streetName: this.state.streetName,
          unitNumber: this.state.unitNumber,
          cityName: this.state.cityName,
          stateCode: this.state.stateCode,
          zipCode: this.state.zipCode,
          email: this.props.email,
          imageLink: "/assets/images/lilhouse.png"
        })
        .then(res => {
          this.setState({
            RentalPropertyId: res.data.id,
            userRole: "Manager",
            needReg: false
          })
          this.userRentalProp();
        console.log(res.data)
        console.log(this.state.RentalPropertyId)
        })
        .catch(err => alert("Inputs Are Not Valid"));
      } else {
        this.createPropertyFunc()
      }
    };
  };  
  
  createPropertyFunc = () => {
    API.saveProperty({
      streetNumber: this.state.streetNumber,
      streetName: this.state.streetName,
      unitNumber: this.state.unitNumber,
      cityName: this.state.cityName,
      stateCode: this.state.stateCode,
      zipCode: this.state.zipCode,
      email: this.props.email,
      imageLink: this.state.imageLink
    })
    .then(res => {
        this.setState({
          RentalPropertyId: res.data.id,
          userRole: "Manager",
          needReg: false
      })
      this.userRentalProp()
    console.log(res.data)
    console.log(this.state.RentalPropertyId)
    })
    .catch(err => alert("Inputs Are Not Valid"));
  };

  userRentalProp = () => {
    API.saveUserProperties({
        userRole: this.state.userRole,
        UserId: this.state.UserId,
        RentalPropertyId: this.state.RentalPropertyId
    }).then(res => {
      console.log(res.data)
      this.props.userId();  
    })
   .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="new backgroundPic">
      {this.props.loggedIn && this.state.needReg ? (
        <div className="container2">
          <form className="backgroundWhite" onChange={this.handleInputChange}>
            <div className="row">
              <div className="col-2">
                <div className="form-group">
                    <label htmlFor="streetNumber">Street No.</label>
                    <input type="text" className="form-control" id="streetNumber" placeholder="12345" name="streetNumber" />
                </div>
              </div>
              <div className="col-8">
                <label htmlFor="streetName">Street Name</label>
                <input type="text" className="form-control" id="streetName" placeholder="Something St." name="streetName" />
              </div>
              <div className="col-2">
                <label htmlFor="unitNumber">Unit No.</label>
                <input type="text" className="form-control" id="unitNumber" placeholder="#100" name="unitNumber" />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="cityName">City</label>
                <input type="text" className="form-control" id="cityName" placeholder="San Diego" name="cityName" />
              </div>
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="stateCode">State</label>
                  <input type="text" className="form-control" id="stateCode" placeholder="CA" name="stateCode" />
                </div>
              </div>
              <div className="col-4">
                <label htmlFor="zipCode">Zip</label>
                <input type="text" className="form-control" id="zipCode" placeholder="92116" name="zipCode" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label htmlFor="imageLink">Image Link For Property (If Available)</label>
                <input type="text" className="form-control" id="imageLink" placeholder="(If Available)" name="imageLink" />
              </div>
            </div>
            <br></br>
            <div className="col-12">
            <button type="submit" className="nb btn-dark btn-block text-center" onClick={this.createNewProperty}>
              Create
            </button>
            <br></br>
            <Link to="/properties">
              <button type="submit" className="mt nb btn btn-danger bred btn-block">
                Back
              </button>
            </Link>
            </div>
          </form>
        </div>
      ) : (
        <Redirect to="/" />
      )}
      </div>
    );
  }
}

export default RentalPropertyForm;