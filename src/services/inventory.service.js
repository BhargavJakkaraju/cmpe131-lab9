// services/user.service.js
const inventoryRepository = require('../repositories/inventory.repository');

class InventoryService {
    async getAllProducts() {
        // Here you could add business logic, e.g., check user permissions
        return await inventoryRepository.findAll();
    }

    async getProductById(id) {
        const product = await inventoryRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async createProduct(productData) {
        // Example of business logic: validate email format
        if (!productData.productName || !productData.productQuantity) {
            throw new Error('Invalid product format');
        }
        // Example of business logic: check for duplicate email
        // Note: The database already has a UNIQUE constraint, but doing it here
        // allows for a friendlier error message.
        return await inventoryRepository.create(productData);
    }

    async updateProduct(id, productData) {
        const product = await inventoryRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await inventoryRepository.update(id, productData);
    }

    async deleteProduct(id) {
        const product = await inventoryRepository.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return await inventoryRepository.delete(id);
    }

    async incrementStock(items) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Invalid input: expected a non-empty array of {product_id, quantity} objects');
        }

        const results = [];
        for (const item of items) {
            if (!item.product_id || item.quantity === undefined || item.quantity === null) {
                throw new Error('Invalid item format: each item must have product_id and quantity');
            }
            if (item.quantity < 0) {
                throw new Error('Quantity must be non-negative');
            }

            // Check if product exists
            const product = await inventoryRepository.findById(item.product_id);
            if (!product) {
                throw new Error(`Product with id ${item.product_id} not found`);
            }

            const result = await inventoryRepository.incrementQuantity(item.product_id, item.quantity);
            results.push({
                product_id: item.product_id,
                quantity_added: item.quantity,
                changes: result.changes
            });
        }

        return results;
    }
}

module.exports = new InventoryService();
