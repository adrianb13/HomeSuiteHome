# Home Suite Home App
Deployed: https://home-suite-home.herokuapp.com/

The application is a way for Property Managers to manage their rental properties while being able to connect to their Tenants as well. The property manager is able to see a list of their properties, and once a property is selected, display Lease information and any Work Orders for that property.  The Tenant is also able to log in with their own username/password to view their Lease Info or create a Work Order.  The idea was to connect both parties with a simple to use application.

The application uses MySQL, Node, Express, and React as the main techs involved.  Additional techs are Bootstrap-React, Material UI, axios (npm), sequelize (npm), date format (npm) and date formatter (npm). 

## Starting the app locally (if you don't want to use the Heroku link above)
Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.
* If the client folder node modules do not install, please move into your client folder and run another "npm install" while in your client folder.  You will know if they are install or not because there should have been a folder "node modules" created in your client folder as well.

You will also need to setup your MySQL database and connection. Assuming you already have MySQL installed in your computer, in the "config" folder in the root directory, there is a config.js file. You should see the following:

username: process.env.MYSQL_USER,
password: process.env.MYSQL_PASS,
database: process.env.MYSQL_DB,

Replace the above with your username, password, and use the database schema held within the Models folder in the root.

username: "Your MySQL Username",
password: "Your MySQL Password",
database: "Database name from schema"

After both installations complete and MySQL is connected, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

