// api/controllers/user.controller
const inventoryService = require('../../services/inventory.service');

class InventoryController {

    //ENDPOINT #2
    async getProductById(req, res) {
        try {
            const product = await inventoryService.getProductById(req.params.id);
            res.json({ message: "success", data: product });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }

    //ENDPOINT #1: POST /api/inventory - Add a product to the inventory
    async createProduct(req, res) {
        try {
            const newProduct = await inventoryService.createProduct(req.body);
            res.status(201).json({ message: "success", data: newProduct });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    //TEST ENDPOINTS
    async getAllProducts(req, res) {
        try {
            const products = await inventoryService.getAllProducts();
            res.json({ message: "success", data: products });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const result = await inventoryService.updateProduct(req.params.id, req.body);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: "success", changes: result.changes });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const result = await inventoryService.deleteProduct(req.params.id);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: "deleted", changes: result.changes });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    //ENDPOINT #4: POST /api/inventory/increment - Add quantities back to stock
    async incrementStock(req, res) {
        try {
            const results = await inventoryService.incrementStock(req.body);
            res.json({ message: "success", data: results });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new InventoryController();
