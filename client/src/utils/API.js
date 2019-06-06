import axios from "axios";

export default {
  // PROPERTIES
  ////////////////////////////////////////////////////////

  // Gets all properties
  getProperties: function() {
    return axios.get("/api/properties");
  },
  // Gets the property with the given id
  getProperty: function(id) {
    return axios.get("/api/properties/" + id);
  },
  // Deletes the property with the given id
  deleteProperty: function(id) {
    return axios.delete("/api/properties/" + id);
  },
  // Saves a property to the database
  saveProperty: function(propertyData) {
    return axios.post("/api/properties", propertyData);
  },

  // USERS
  ////////////////////////////////////////////////////////

  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user info
  getUser: function(email) {
    return axios.get("/api/users/" + email);
  },
  getUserId: function(id) {
    return axios.get("/api/users/id/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  // WORK ORDERS
  ////////////////////////////////////////////////////////

  // Gets all work orders
  getWorkOrders: function() {
    return axios.get("/api/workorders");
  },
  // Gets the work order with the given id
  getWorkOrder: function(id) {
    return axios.get("/api/workorders/" + id);
  },
  // Deletes the work order with the given id
  deleteWorkOrder: function(id) {
    return axios.delete("/api/workorders/" + id);
  },
  updateWorkOrder: function(id) {
    return axios.put("/api/workorders/", id);
  },
  // Saves a work order to the database
  saveWorkOrder: function(workOrderData) {
    return axios.post("/api/workorders", workOrderData);
  },

  // LEASES
  ////////////////////////////////////////////////////////

  // Gets all leases
  getLeases: function() {
    return axios.get("/api/leases");
  },
  // Gets the lease with the given id
  getLease: function(RentalPropertyId) {
    return axios.get("/api/leases/" + RentalPropertyId);
  },
  // Deletes the lease with the given id
  deleteLease: function(id) {
    return axios.delete("/api/leases/" + id);
  },
  updateLease: function(id) {
    return axios.put("/api/leases/", id);    
  },
  // Saves a lease to the database
  saveLease: function(leaseData) {
    return axios.post("/api/leases", leaseData);
  },

  saveUserProperties: function(userProperty) {
    return axios.post("/api/userproperties", userProperty);
  },
  deleteUserProperties: function(userProperty) {
    return axios.delete("/api/userproperties", userProperty);
  }

};
