import React, { Component } from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/API";

class LeaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaseType: "",
      leaseStartDate: new Date(),
      leaseEndDate: new Date(),
      rentalRate: null,
      securityDeposit: null,
      lateFee: null,
      nsfFee: null,
      RentalPropertyId: ""
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }
  
  
    componentDidMount() {
        this.setState({
            RentalPropertyId: this.props.id
        })
    }

    handleStartChange(date) {
      
      this.setState({
        leaseStartDate: date,
      })

    }

    handleEndChange(date) {
      
      this.setState({
        leaseEndDate: date,
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

  createLease = () => {
    if(this.state.leaseType === (null || "")) {
        alert("Please Choose A Lease Type ")
      } else if (this.state.leaseStartDate === (null || "")) {
        alert("Please Enter A Start Date")
      } else if (this.state.leaseEndDate === (null || "")) {
        alert("Please Enter A End Date")
      } else if (this.state.rentalRate === (null || "")) {
        alert("Please Enter A Rental Rate")  
      } else if (this.state.securityDeposit === (null || "")) {
        alert("Please Enter A Security Deposit Amount")
      } else if (this.state.lateFee === (null || "")) {
        alert("Please Enter A Late Fee")
      } else if (this.state.nsfFee === (null || "")) {
        alert("Please Enter An NSF Fee")
      } else {
        API.saveLease({
          leaseType: this.state.leaseType,
          leaseStartDate: this.state.leaseStartDate,
          leaseEndDate: this.state.leaseEndDate,
          rentalRate: this.state.rentalRate,
          securityDeposit: this.state.securityDeposit,
          lateFee: this.state.lateFee,
          nsfFee: this.state.nsfFee,
          RentalPropertyId: this.state.RentalPropertyId
        })
        .then(res => {
          console.log(res)
          this.props.getLease();         
        })
        .catch(err => console.log(err))
      }
  };

  updateLease = () => {
    if(this.state.leaseType === (null || "")) {
        alert("Please Choose A Lease Type ")
      } else if (this.state.leaseStartDate === (null || "")) {
        alert("Please Enter A Start Date")
      } else if (this.state.leaseEndDate === (null || "")) {
        alert("Please Enter A End Date")
      } else if (this.state.rentalRate === (null || "")) {
        alert("Please Enter A Rental Rate")  
      } else if (this.state.securityDeposit === (null || "")) {
        alert("Please Enter A Security Deposit Amount")
      } else if (this.state.lateFee === (null || "")) {
        alert("Please Enter A Late Fee")
      } else if (this.state.nsfFee === (null || "")) {
        alert("Please Enter An NSF Fee")
      } else {
    API.updateLease({
      leaseType: this.state.leaseType,
      leaseStartDate: this.state.leaseStartDate,
      leaseEndDate: this.state.leaseEndDate,
      rentalRate: this.state.rentalRate,
      securityDeposit: this.state.securityDeposit,
      lateFee: this.state.lateFee,
      nsfFee: this.state.nsfFee,
      id: this.props.leaseId
    })
    .then(res => {
      console.log(res)
      this.props.getLease();
    })
    .catch(err => console.log(err))
    }
  };
  

  render() {
    return (
        <div>
          <h3 className="cs fhed">Lease Information</h3>
          <form onChange={this.handleInputChange} onClick={this.handleInputChange}>
            <div className="row">
                <div className="form-group col-md-12">
                <label htmlFor="leaseType">Lease Type</label>
                <select className="form-control" id="leaseType" name="leaseType">
                    <option value="Annual">Annual Lease Agreement</option>
                    <option value="Monthly">Month-to-Month Agreement</option>
                    <option value="Other">Other Type Of Agreement</option>
                </select>
            </div>
            <div className="row">
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="leaseStartDate">Lease Start Date</label>
                    <DatePicker selected={this.state.leaseStartDate} onChange={this.handleStartChange}/>            
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="leaseEndDate">Lease End Date</label>
                    <DatePicker selected={this.state.leaseEndDate} onChange={this.handleEndChange}/>
                </div>
            </div>

            
            <div className="row">
                <div className="form-group col-6">
                    <label htmlFor="securityDeposit">Rental Rate ($)</label>
                    <input type="text" className="form-control" id="securityDeposit" name="rentalRate" placeholder="1500"/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="securityDeposit">Security Deposit ($)</label>
                    <input type="text" className="form-control" id="securityDeposit" name="securityDeposit" placeholder="1500"/>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-4">
                    <label htmlFor="lateFee">Late Fee</label>
                    <input type="text" className="form-control" id="lateFee" name="lateFee" placeholder="50"/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="nsfFee">NSF Fee</label>
                    <input type="text" className="form-control" id="nsfFee" name="nsfFee" placeholder="50"/>
                </div>
            </div>
            {this.props.leaseExists ? (
                <button type="submit" className="nb btn btn-danger bred btn-block" onClick={this.updateLease}>UPDATE</button>
            ) : (
                <button type="submit" className="nb btn btn-danger bred btn-block" onClick={this.createLease}>SUBMIT</button>
            )}

          </form>
        <br></br>
        </div>
    );
  }
}
export default LeaseForm;