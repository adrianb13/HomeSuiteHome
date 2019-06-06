import React from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import API from "../../utils/API";
import dateFormat from "dateformat";

class WorkOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RentalPropertyId: null,
      workOrderName: "",
      workOrderType: "",
      workOrderPriority: "",
      workOrderDescription: "",
      incidentDate: new Date(),
      workOrderStatus: "",
      workOrders: [],
      viewOrders: false
    };
    this.handleIncidentDateChange = this.handleIncidentDateChange.bind(this);
  }
  
  componentDidMount() {
    this.getWorkOrders()
  }

  handleIncidentDateChange(date) {
    this.setState({
      incidentDate: date,
    })
  }

  dateFormat = (date) => {
    return dateFormat(date,"mm/dd/yyyy");
  }

  getWorkOrders = () => {
    let pId = parseInt(this.props.id)
    this.setState({
      RentalPropertyId: this.props.id
    });
    API.getWorkOrders()
    .then(res => {
      let orders = res.data.filter(workOrder => workOrder.RentalPropertyId === pId)
      this.setState({
        workOrders: orders
      })
    })
    .catch(err => console.log(err))
  }

  seeWorkOrders = () => {
    this.setState({
      viewOrders: true
    });
  };

  hideWorkOrders = () => {
    this.setState({
      viewOrders: false
    });
  };

  handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
    console.log(this.state)
  };

  createWorkOrder = () => {
    if(this.state.workOrderName === (null || "")) {
      alert("Please Enter A Work Order Name")
    } else if (this.state.workOrderType === (null || "")) {
      alert("Please Choose A Work Order Type")
    } else if (this.state.workOrderPriority === (null || "")) {
      alert("Please Choose A Work Priority")
    } else if (this.state.workOrderDescription === (null || "")) {
      alert("Please Enter A Description")  
    } else if (this.state.incidentDate === (null || "")) {
      alert("Please Enter The Date Of The Incident")
    } else {
      API.saveWorkOrder({
        RentalPropertyId: this.state.RentalPropertyId,
        workOrderName: this.state.workOrderName,
        workOrderType: this.state.workOrderType,
        workOrderPriority: this.state.workOrderPriority,
        workOrderDescription: this.state.workOrderDescription,
        incidentDate: this.state.incidentDate
      })
      .then(res => {
        this.setState({
          workOrders: res.data
        });
        alert("Your Request Has Been Submitted");
        this.getWorkOrders();
        this.clearForm();
      })
      .catch(err => console.log(err))
    };
  };

  clearForm = () => {
    this.setState({
      workOrderName: "",
      workOrderType: "",
      incidentDate: ""
    });
  };

  updateOrder = (order) => {
    console.log(order)
    API.updateWorkOrder({
      id: order.id,
      RentalPropertyId: this.state.RentalPropertyId,
      workOrderStatus: this.state.workOrderStatus,
      workOrderName: order.workOrderName,
      workOrderType: order.workOrderType,
      workOrderPriority: order.workOrderPriority,
      workOrderDescription: order.workOrderDescription,
      incidentDate: order.incidentDate
    })
    .then(res => {
      console.log(res)
      this.getWorkOrders();
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        {this.props.isManager ? (
          <div>
            {this.state.viewOrders ? (
              <div>
                {this.state.workOrders.map(workOrder => (
                <div className="grey_border" key={workOrder.id}>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="nb">{workOrder.workOrderName}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                    <h6 className="nr left">Incident Date: {workOrder.incidentDate}</h6>
                    <h6 className="nr left">Type: {workOrder.workOrderType}</h6>
                    <h6 className="nr left">Priority: {workOrder.workOrderPriority}</h6>
                    <h6 className="nr left">Status: {workOrder.workOrderStatus}</h6>
                    </div>
                  </div>
                  <div className="row" onClick={this.handleInputChange} onChange={this.handleInputChange}>
                    <div className="col-12">
                      <label htmlFor="workOrderStatus">Update Status:</label>
                      <select className="form-control" id="workOrderStatus" name="workOrderStatus">
                        <option>Waiting Approval</option>
                        <option>Setting Appointment</option>
                        <option>Parts Order</option>
                        <option>Work In Progress</option>
                        <option>Completed</option>
                        <option>Rejected</option>
                      </select>
                      <br></br>
                      <button type="submit" className="nb btn btn-danger bred btn-block" onClick={() => this.updateOrder(workOrder)}>UPDATE</button>
                    </div>
                  </div>
                </div>
                ))}
              <button type="submit" className="nb btn btn-dark btn-block" onClick={this.hideWorkOrders}>HIDE WORK ORDERS</button>
              </div>
            ) : (
              <button type="submit" className="nb btn btn-dark btn-block" onClick={this.seeWorkOrders}>VIEW WORK ORDERS</button>
            )}
          </div>
        ) : (
        <div>
          <h3 className="cs fhed">ENTER A WORK ORDER REQUEST</h3>
          <form onChange={this.handleInputChange} onClick={this.handleInputChange}>
            <div className="form-group">
              <label htmlFor="workOrderName">Request Name</label>
              <input type="text" className="form-control" id="workOrderName" name="workOrderName" placeholder="i.e.: Broken Window"/>
            </div>
            <div className="form-group">
              <label htmlFor="incidentDate">Incident Date </label>
              <br></br>
              <DatePicker selected={this.state.incidentDate} onChange={this.handleIncidentDateChange} />
            </div>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="workOrderType">Type</label>
                <select className="form-control" id="workOrderType" name="workOrderType">
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="physical">Physical</option>
                    <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="workOrderPriority">Priority</label>
                <select className="form-control" id="workOrderPriority" name="workOrderPriority">
                    <option>1 (Low)</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5 (High)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="workOrderDescription">Description</label>
              <textarea className="form-control" id="workOrderDescription" name="workOrderDescription" rows="3"></textarea>
            </div>
            <button type="submit" className="nb btn btn-danger bred btn-block" onClick={this.createWorkOrder}>SUBMIT</button>
          </form>
          <br></br>
          {this.state.viewOrders ? (
            <div>
              {this.state.workOrders.map(workOrder => (
              <div className="grey_border" key={workOrder.id}>
                <div className="row">
                  <div className="col-12">
                    <h5 className="nb">{workOrder.workOrderName}</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                  <h6 className="nr left">Incident Date: {this.dateFormat(workOrder.incidentDate)}</h6>
                  <h6 className="nr left">Type: {workOrder.workOrderType}</h6>
                  <h6 className="nr left">Priority: {workOrder.workOrderPriority}</h6>
                  <h6 className="nr left">Status: {workOrder.workOrderStatus}</h6>
                  </div>
                </div>
              </div>
              ))}
            <button type="submit" className="nb btn btn-dark btn-block" onClick={this.hideWorkOrders}>HIDE WORK ORDERS</button>
            </div>
          ) : (
            <button type="submit" className="nb btn btn-dark btn-block" onClick={this.seeWorkOrders}>VIEW WORK ORDERS</button>
          )}
        </div>
        )}
        <br></br>
      </div>
    );
  }
}
export default WorkOrder;