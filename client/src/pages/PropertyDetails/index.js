import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import API from "../../utils/API";
import WorkOrderForm from "../../components/WorkOrderForm";
//import house from "../../assets/images/house.jpg";
import LeaseForm from "../../components/LeaseForm";
import dateFormat from "dateformat";

class PropertyDetails extends Component {
  state = {
    property: [],
    lease: [],
    lease2: [],
    leaseExists: false,
    showLeaseForm: false,
    id: null,
    streetNumber: "",
    streetName: "",
    cityName: "",
    stateCode: "",
    zipCode: "",
    imageLink: "",
    userRole: "",
    notdeleted: true,
    isManager: false
  }

  componentDidMount() {
    this.getLease();
    this.setState({
      RentalPropertyId: parseInt(this.props.match.params.id),
      id: parseInt(this.props.match.params.id)
    })
    this.propertyInfo();
  }

/*   getPropertyInfo = propertyId => {
    console.log(this.props.match.params.id)
    API.getProperty(this.props.match.params.id)
      .then(res => {
         this.setState({
          property: res.data
        })
      })
      .catch(err => console.log(err));
  }; */ 

  getLease = info => {
    let rentalId = parseInt(this.props.match.params.id)
    API.getLeases()
    .then(res => {
      let currLease = res.data.filter(lease => lease.RentalPropertyId === rentalId)
      this.setState({
        lease: currLease,
      })
      if(currLease.length > 0) {
        this.setState({
          leaseExists: true,
          showLeaseForm: false
        })
      }
    })
    .catch(err => console.log(err))
  };

  dateFormat = (date) => {
    return dateFormat(date,"mm/dd/yyyy");
  };

  showLeaseForm = event => {
    event.preventDefault();
    this.setState({
      showLeaseForm: true
    })
  };

  hideLeaseForm = event => {
    event.preventDefault();
    this.setState({
      showLeaseForm: false
    })
  };

  propertyInfo = () => {
    let rentalId = parseInt(this.props.match.params.id)
    let property1 = this.props.properties.filter(property => rentalId === property.id)
    this.setState({
      property: property1,
      id: property1[0].id,
      streetNumber: property1[0].streetNumber,
      streetName: property1[0].streetName,
      cityName: property1[0].cityName,
      stateCode: property1[0].stateCode,
      zipCode: property1[0].zipCode,
      imageLink: property1[0].imageLink,
      userRole: property1[0].UserRentalProperty.userRole
    })
    this.roleCheck(property1[0].UserRentalProperty.userRole);
  };

  roleCheck = (userRole) => {
    if(userRole === "Manager") {
      this.setState({
        isManager: true
      })
    } else if (userRole === "Tenant") {
      this.setState({
        isManager: false
      })
    }
  };

  deleteProperty = () => {
    API.deleteProperty(this.state.RentalPropertyId)
    .then(res => {
      this.props.userId()
      this.setState({
        notdeleted: false
      })
    })
    .catch(err => console.log(err))
  };

  deleteUserRental = () => {
    if(this.state.userRole === "Tenant") {
    API.deleteUserProperties({
      userRole: "Tenant",
      UserId: toString(this.props.id),
      RentalPropertyId: toString(this.state.RentalPropertyId)
    })
    .then(res => {
      this.props.userId()
      this.setState({
        notdeleted: false
      })
    })
    .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="backgroundDetail">
        {this.props.loggedIn ? (
          <div>
            {this.state.notdeleted ? (
              <div className="outer">
                <div className="container">
                  <br></br>
                  <h1 className="nb hed"><span>MY</span> PROPERTY</h1>
                  <div>
                    <div>  
                      <div key={this.state.id}>
                        <img src={this.state.imageLink} alt="my property" className="propDetailImg"></img>
                        <h5 className="nb hed6">{this.state.streetNumber} {this.state.streetName}</h5>
                        <h5 className="nr">{this.state.cityName} {this.state.stateCode}, {this.state.zipCode}</h5>
                        {this.state.isManager ? (
                          <button className="mt nb btn btn-danger bred btn-block" onClick={this.deleteProperty}>DELETE PROPERTY</button>
                        ) : (
                          <div>
                          {/* <button className="mt nb btn btn-danger bred btn-block" onClick={this.deleteUserRental}>REMOVE PROPERTY</button> */}
                          </div>
                        )}
                        <br></br>
                      </div>
                      {this.state.leaseExists ? (
                      <div>  
                        <div className="row">
                          <p className="col-12"><b>Lease Type: </b>{this.state.lease[0].leaseType}</p>
                        </div>
                        <div className="row">
                          <p className="col-12"><b>Lease Start Date: </b>{this.dateFormat(this.state.lease[0].leaseStartDate)}</p>
                        </div>
                        <div className="row">
                          <p className="col-12"><b>Lease End Date: </b>{this.dateFormat(this.state.lease[0].leaseEndDate)}</p>
                        </div>
                        <div className="row">
                          <p className="col-6"><b>Rent: </b>${this.state.lease[0].rentalRate}/Month</p>
                          <p className="col-6"><b>Late Fee: </b>${this.state.lease[0].lateFee}</p>
{/*                       <p className="red"><i className="fas fa-file-pdf"></i><b> PDF of your lease</b></p> */}
                        </div>
                        {this.state.isManager ? (
                        <div>
                          {this.state.showLeaseForm ? (
                            <div>
                              <LeaseForm 
                              id={this.props.match.params.id}
                              leaseExists={this.state.leaseExists}
                              leaseId={this.state.lease[0].id}
                              getLease={this.getLease}
                              />
                              <button className="nb btn btn-dark btn-block" onClick={this.hideLeaseForm}>HIDE LEASE FORM</button>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-12">
                                <button className="nb btn btn-dark btn-block" onClick={this.showLeaseForm}>SHOW LEASE FORM</button>
                              </div>
                            </div>
                          )}
                        </div>
                        ) : (
                          <span></span>
                        )}
                        </div>

                      ) : (
                      <div>
                        <div>No Lease Info Available</div>
                        {this.state.showLeaseForm && this.state.isManager ? (
                          <div>
                            <LeaseForm 
                            id={this.props.match.params.id}
                            leaseExists={this.state.leaseExists}
                            getLease={this.getLease}
                            />
                            <button className="nb btn btn-dark btn-block" onClick={this.hideLeaseForm}>HIDE LEASE FORM</button>
                          </div>
                        ) : (
                          <div>
                          {this.state.isManager ? (
                            <div>
                              <button className="nb btn btn-dark btn-block" onClick={this.showLeaseForm}>SHOW LEASE FORM</button>
                            </div>
                          ) : (
                            <span></span>
                          )}
                          </div>
                        )}

                      </div>
                      )}
                    </div>
{/*                     ))} */}
                  </div>
                  
                  <Link to="/properties">
                    <button className="mt nb btn btn-danger bred btn-block">BACK TO LIST</button>
                  </Link>
                  <br></br>
                  <WorkOrderForm
                    loggedIn={this.props.loggedIn}
                    id={this.props.match.params.id}
                    isManager={this.state.isManager}
                  >
                  </WorkOrderForm>
                </div>
              </div>
            ) : (
              <div>
                <Redirect to="/properties" />
              </div>
            )}
          </div>
        ) : (
          <div>
            <Redirect to="/" />
          </div>
        )}
      </div>
    )
  }
}

export default PropertyDetails;
