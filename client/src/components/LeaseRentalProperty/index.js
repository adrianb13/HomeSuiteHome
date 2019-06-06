import React, { Component } from 'react';
import API from '../../utils/API';

class LeaseRentalProperty extends Component {
    state = { 
        LeaseId: "1",
        RentalPropertyId: "1"
    }

    componentDidMount() {
        this.LeaseRentalProp();
    }

    LeaseRentalProp = () => {
        API.getLeaseProperties({
            LeaseId: this.state.LeaseId,
            RentalPropertyId: this.state.RentalPropertyId
        }).then(res => {console.log(res.data)})
       .catch(err => console.log(err));
    }


    render() { 
        return ( 
            <div>Hello Lease</div>
         );
    }
}
 
export default LeaseRentalProperty;