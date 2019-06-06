USE homesuitehome;

ALTER TABLE Users CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Users CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE RentalProperties CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE RentalProperties CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Leases CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE Leases CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE LeaseRentalProperty CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE LeaseRentalProperty CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE UserRentalProperty CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE UserRentalProperty CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE WorkOrders CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE WorkOrders CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;


INSERT INTO Users (
    firstName,
    lastName,
    phone1,
    phone2,
    email,
    password,
    isActive,
    isEmailVerified,
    lastPasswordChangeDate
) VALUES (
    "cody",
    "rush",
    "555-555-1212",
    "555-555-2112",
    "codyrush@gmail.com",
    "pass1234",
    true,
    true,
    '2019-04-24'
), (
    "amy",
    "biltz",
    "333-555-1234",
    "222-555-2112",
    "amy.biltz@yahoo.com",
    "pass1234",
    true,
    true,
    '2019-04-24'
), (
    "gregory",
    "schmidt",
    "444-555-6666",
    "333-111-2222",
    "gregory.schmidt@mac.com",
    "pass1234",
    true,
    true,
    '2019-04-24'
), (
    "adrian",
    "briones",
    "777-555-6666",
    "888-333-4444",
    "adrianb13@yahoo.com",
    "pass1234",
    true,
    true,
    '2019-04-24'
);

INSERT INTO RentalProperties (
    rentalPropertyType,
    streetNumber,
    streetName,
    unitNumber,
    cityName,
    stateCode,
    zipCode,
    email,
    imageLink,
    isActive
) VALUES (
    "residential",
    "12345",
    "Anystreet Ave.",
    "A",
    "San Diego",
    "CA",
    92116,
	"codyrush@gmail.com",
    "/assets/images/house3.jpg",
    true
), (
    "commercial",
	"1111",
    "Home St.",
    null,
    "San Diego",
    "CA",
    92119,
	"amy.blitz@yahoo.com",
    "/assets/images/house5.jpg",
    true
), (
    "residential",
	"55",
    "City Rd.",
    null,
    "San Diego",
    "CA",
    92007,
	"gregory.schmidt@mac.com",
    "/assets/images/house.jpg",
    true
), (
    "commercial",
	"900",
    "Dwelling Rd.",
    null,
    "San Diego",
    "CA",
    92008,
	"adrianb13@yahoo.com",
    "/assets/images/house2.jpg",
    true
), (
	"residential",
    "13",
    "My Pl.",
    null,
    "San Diego",
    "CA",
    92119,
    "adrianb13@yahoo.com",
    "/assets/images/house4.jpg",
    true
);

INSERT INTO UserRentalProperty (
    RentalPropertyId,
    UserId,
    userRole
) VALUES (
    "1",
    "1",
    "Manager"
), (
    "2",
    "2",
    "Manager"
), (
    "3",
    "3",
    "Manager"
), (
    "4",
    "4",
    "Manager"
), (
	"5",
    "4",
    "Manager"
);

INSERT INTO Leases (
    userId,
    leaseType,
    leaseStartDate,
    leaseEndDate,
    rentalRate,
    securityDeposit,
    lateFee,
    nsfFee,
    RentalPropertyId,
    isActive
) VALUES (
    "1",
    "Annual",
    "04-24-2019",
    "04-24-2020",
    "1500.00",
    "1500.00",
    "50.00",
    "25.00",
    "1",
    true
), (
    "2",
    "Monthly",
    "04-24-2019",
    "04-24-2020",
    "900.00",
    "900.00",
    "25.00",
    "25.00",
    "2",
    true
), (
    "3",
    "Other",
    "03-15-2019",
    "03-15-2020",
    "1200.00",
    "1200.00",
    "50.00",
    "25.00",
    "3",
    true
), (
    "4",
    "Annual",
    "04-24-2019",
    "04-24-2020",
    "1500.00",
    "1500.00",
    "50.00",
    "25.00",
    "4",
    true
);

INSERT INTO WorkOrders (
    workOrderName,
    workOrderType,
    workOrderPriority,
    workOrderDescription,
    incidentDate,
    workOrderPrice,
    workOrderStatus,
    RentalPropertyId
) VALUES (
    "Work Order No 1",
    "plumbing",
    "5",
    "This is the first work order for property 1.",
    "05-06-2019",
    "50.00",
    "not started",
    1
), (
    "Work Order No 2",
    "electrical",
    "3",
    "This is the first work order for property 2.",
    "04-06-2019",
    "250.00",
    "completed",
    2
), (
    "Broken Handle",
    "other",
    "1",
    "Broken door handle",
    "03-06-2019",
    "25.00",
    "rejected",
    4
);


INSERT INTO LeaseRentalProperty (
    leaseId,
    rentalPropertyId
) VALUES (
    1,
    1
), (
    2,
    2
), (
    3,
    3
), (
	4,
    4
);

USE homesuitehome;
SELECT * FROM Users;
SELECT * FROM RentalProperties;
SELECT * FROM LeaseRentalProperty;
SELECT * FROM UserRentalProperty;
SELECT * FROM Leases;
SELECT * FROM WorkOrders;
