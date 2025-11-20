// api/routes/user.routes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory.controller.js');

// --- Inventory API Routes ---

//ENDPOINT #1: 
//POST/api/inventory: Add a product to the inventory


//ENDPOINT #2: 
//GET/api/inventory/:id: Get the current stock for a product
router.get("/inventory/:id", inventoryController.getProductById);

//ENDPOINT #3: 
//POST /api/inventory/decrement: Takes a list of {product_id, quantity} to decrement from stock

//ENDPOINT #4: 
//POST /api/inventory/increment: akes a list of {product_id, quantity} to add back to stock


//TEST ENDPOINTS:
// GET /api/inventory - Retrieve all products
router.get("/inventory", inventoryController.getAllProducts);

// POST /api/inventory - Create a new product
router.post("/inventory", inventoryController.createProduct);

// PATCH /api/inventory/:id - Update an existing product's details
router.patch("/inventory/:id", inventoryController.updateProduct);

// DELETE /api/inventory/:id - Delete a product
router.delete("/inventory/:id", inventoryController.deleteProduct);

module.exports = router;

