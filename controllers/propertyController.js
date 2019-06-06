const db = require("../models");

module.exports = {
///////// Property Database
  findAllProperties: (req, res) => {
    db.RentalProperty
      .findAll({
        include: [{model: db.Lease}]
      })
      .then(dbRentalProperty => res.json(dbRentalProperty))
      .catch(err => res.status(422).json(err));
  },
  findByPropertyId: (req, res) => {
    db.RentalProperty
      .findOne({
        include: [
          {model: db.Lease}, 
          {model: db.WorkOrder},
          {model: db.User}
        ],      
        where: {id: req.params.id}
      })
      .then(dbRentalProperty => res.json(dbRentalProperty))
      .catch(err => res.status(422).json(err));
  },
  findRentalPropertyLeases: (req,res) => {
    db.RentalProperty
      .findOne({
        where: {id: req.params.id}
      })
      .then(dbRentalProperty => res.json(dbRentalProperty))
      .catch(err => res.status(422).json(err));
  },
  createProperty: (req, res) => {
    db.RentalProperty
      .create({
        rentalPropertyType: "residential",  
        streetNumber: req.body.streetNumber,
        streetName: req.body.streetName,
        unitNumber: req.body.unitNumber,
        cityName: req.body.cityName,
        stateCode: req.body.stateCode,
        zipCode: req.body.zipCode,
        email: req.body.email,
        imageLink: req.body.imageLink,
        isActive: true
      })
      .then(dbRentalProperty => res.json(dbRentalProperty))
      .catch(err => res.status(422).json(err));
  },
  removeProperty: (req, res) => {
    db.RentalProperty
      .destroy({ 
        where: {
          id: req.params.id
        } 
      })
      .then(dbRentalProperty => res.json(dbRentalProperty))
      .catch(err => res.status(422).json(err));
  },
  updateProperty: (req, res) => {
    db.RentalProperty
      .update(req.body,{where: {id: req.params.id}})
      .then(dbRentalProperty => res.json(dbRentalProperty))
      .catch(err => res.status(422).json(err));
  },

///////// User Database
  findAllUsers: (req, res) => {
    db.User
      .findAll({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: (req, res) => {
    db.User
      .findOne({
        where: {email: req.params.email}
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.User
      .findOne({
        where: {id: req.params.id},
        include: [{
          model: db.RentalProperty
        }]
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  createUser: (req, res) => {
    db.User
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone1: req.body.phone1,
        email: req.body.email,
        password: req.body.password,
        isActive: true,
        isEmailVerified: false
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  removeUser: (req, res) => {
    db.User
      .destroy({ 
        where: {
          id: req.params.id
        } 
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  updateUser: (req, res) => {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

/////// Lease Agreements
  findAllLeases: (req, res) => {
    db.Lease
      .findAll({include: [{model: db.RentalProperty}]})
      .then(dbLease => res.json(dbLease))
      .catch(err => res.status(422).json(err));
  },
  findByLeaseId: (req, res) => {
    db.Lease
      .findOne({
        where: {RentalPropertyId: req.params.RentalPropertyId}
      })
      .then(dbLease => res.json(dbLease))
      .catch(err => res.status(422).json(err));
  },
  createLease: (req, res) => {
    db.Lease
      .create({
        leaseType: req.body.leaseType,
        leaseStartDate: req.body.leaseStartDate,
        leaseEndDate: req.body.leaseEndDate,
        rentalRate: req.body.rentalRate,
        securityDeposit: req.body.securityDeposit,
        lateFee: req.body.lateFee,
        nsfFee: req.body.nsfFee,
        RentalPropertyId: req.body.RentalPropertyId
      })
      .then(dbLease => res.json(dbLease))
      .catch(err => res.status(422).json(err));
  },
  removeLease: (req, res) => {
    db.Lease
      .destroy({ 
        where: {
          id: req.params.id
        } 
      })
      .then(dbLease => res.json(dbLease))
      .catch(err => res.status(422).json(err));
  },
  updateLease: (req, res) => {
    db.Lease
      .update(req.body, {where: {id: req.body.id }})
/*       .findOneAndUpdate({ id: req.body.id }, req.body) */
      .then(dbLease => res.json(dbLease))
      .catch(err => res.status(422).json(err));
  },

//////// Work Orders Database
  findAllOrders: (req, res) => {
    db.WorkOrder
      .findAll({
/*         where: {RentalPropertyId: req.body.RentalPropertyId} */
      })
      .then(dbWorkOrder => res.json(dbWorkOrder))
      .catch(err => res.status(422).json(err));
  },
  findByOrderId: (req, res) => {
    db.WorkOrder
      .findById(req.params.id)
      .then(dbWorkOrder => res.json(dbWorkOrder))
      .catch(err => res.status(422).json(err));
  },
  createOrder: (req, res) => {
    db.WorkOrder
      .create({
        RentalPropertyId: req.body.RentalPropertyId,
        workOrderName: req.body.workOrderName,
        workOrderType: req.body.workOrderType,
        workOrderPriority: req.body.workOrderPriority,
        workOrderDescription: req.body.workOrderDescription,
        workOrderStatus: "Waiting Approval",
        incidentDate: req.body.incidentDate
      })
      .then(dbWorkOrder => res.json(dbWorkOrder))
      .catch(err => res.status(422).json(err));
  },
  removeOrder: (req, res) => {
    db.WorkOrder
      .destroy({ 
        where: {
          id: req.params.id
        } 
      })
      .then(dbWorkOrder => res.json(dbWorkOrder))
      .catch(err => res.status(422).json(err));
  },
  updateOrder: (req, res) => {
    db.WorkOrder
//      .findOneAndUpdate({ id: req.params.id }, req.body)
      .update(req.body, {where: {id: req.body.id }})
      .then(dbWorkOrder => res.json(dbWorkOrder))
      .catch(err => res.status(422).json(err));
  },

  associateTenantToProperty: (req,res) => {
    db.UserRentalProperty
    .create({
      userRole: req.body.userRole,
      UserId: req.body.UserId, //the user id for the person logged in,
      RentalPropertyId: req.body.RentalPropertyId // this is what the user types into the form
    })
    .then(dbAssociateUserProperty => res.json(dbAssociateUserProperty))
    .catch(err => res.status(422).json(err));
  },
  associateDeleteTenant: (req, res) => {
    db.UserRentalProperty
    .destroy({
      where: {
        userRole: "Tenant",
        UserId: req.body.UserId,
        RentalPropertyId: req.body.RentalPropertyId
      }
    })
    .then(dbAssociateUserProperty => res.json(dbAssociateUserProperty))
    .catch(err => res.status(422).json(err));
  }
};