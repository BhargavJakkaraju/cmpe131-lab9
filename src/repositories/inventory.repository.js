// repositories/user.repository.js (Using the 'sqlite' package)
const getDbPromise = require('../config/database.js'); // This is a promise now

class InventoryRepository {
    async findAll() {
        const db = await getDbPromise; // Get the resolved db connection
        console.log('DB instance in findAll:', db); // Debugging line
        return await db.all("SELECT * FROM inventory");
    }

    async findById(id) {
        const db = await getDbPromise;
        // The '?' placeholder is automatically handled
        return await db.get("SELECT * FROM inventory WHERE id = ?", id);
    }

    async create(data) {
        const db = await getDbPromise;
        const result = await db.run(
            'INSERT INTO inventory (productName, productQuantity) VALUES (?,?)',
            data.productName, data.productQuantity // You can pass params directly
        );
        // The result object CONTAINS lastID and changes!
        return { id: result.lastID, ...data };
    }

    async update(id, data) {
        const db = await getDbPromise;
        const result = await db.run(
           `UPDATE inventory set productName = COALESCE(?,productName), productQuantity = COALESCE(?,productQuantity) WHERE id = ?`,
           data.productName, data.productQuantity, id
        );
        return { changes: result.changes };
    }

    async delete(id) {
        const db = await getDbPromise;
        const result = await db.run('DELETE FROM inventory WHERE id = ?', id);
        return { changes: result.changes };
    }

    async incrementQuantity(productId, quantity) {
        const db = await getDbPromise;
        const result = await db.run(
            'UPDATE inventory SET productQuantity = productQuantity + ? WHERE id = ?',
            quantity, productId
        );
        return { changes: result.changes };
    }
}

module.exports = new InventoryRepository();
