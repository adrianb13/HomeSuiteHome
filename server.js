const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");

// Requiring our models for syncing
var db = require("./models");

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static directory
//app.use(express.static("public"));

// Routes
app.use(routes);

// Sync Options
const syncOptions = { force: false };

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port http://localhost:${PORT}`);
  });
});
