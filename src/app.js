// index.js
const express = require('express');
// 1. Import the router
const inventoryRoutes = require('./api/routes/inventory.routes.js'); 

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"});
});

// 2. Mount the router
// This tells Express to use the userRoutes for any request that starts with "/api"
app.use('/api', inventoryRoutes);

// Default response for any other request (404)
app.use(function(req, res){
    // You might want to send a proper 404 response
    res.status(404).json({ "error": "Endpoint not found" });
});

// Export the configured app
module.exports = app;

