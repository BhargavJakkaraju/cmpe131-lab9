// app.js
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

// 1. Import the router
const inventoryRoutes = require('./api/routes/inventory.routes.js');

const app = express();

// Use the cors middleware
// This will allow all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// --- Read and parse the OpenAPI YAML file ---
// The 'fs' module reads the file content as a string
const YAMLSOURCE = path.join(__dirname, '../New Collection-OpenApi31Yaml-2.yaml');
try {
    const file = fs.readFileSync(YAMLSOURCE, 'utf8');
    // The 'yaml' package parses the string into a JavaScript object
    const swaggerDocument = YAML.parse(file);
    // --- Serve Swagger UI at /api-docs ---
    // The swaggerUi.serve middleware serves the static files for the UI
    // The swaggerUi.setup middleware configures the UI with your OpenAPI document
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
    console.warn('Could not load Swagger documentation:', err.message);
}

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
});

// 2. Mount the router
// This tells Express to use the inventoryRoutes for any request that starts with "/api"
app.use('/api', inventoryRoutes);

// Default response for any other request (404)
app.use(function (req, res) {
    // You might want to send a proper 404 response
    res.status(404).json({ "error": "Endpoint not found" });
});

// Export the configured app
module.exports = app;
