// seed.js (with Faker)
const dbPromise = require('../../config/database');
const { faker } = require('@faker-js/faker');

async function seed() {
    try {
        const db = await dbPromise;
        
        console.log('Deleting existing products...');
        await db.run('DELETE FROM inventory');
        await db.run('DELETE FROM sqlite_sequence WHERE name = ?', 'inventory');
        console.log('Inserting 20 fake products...');

        const insertPromises = [];
        for (let i = 0; i < 20; i++) {            
            const productName = faker.commerce.productName();
            const productQuantity = Math.floor(Math.random() * 50) + 1;
            const sql = 'INSERT INTO inventory (productName, productQuantity) VALUES (?, ?)';
            insertPromises.push(db.run(sql, productName, productQuantity))
        }

        await Promise.all(insertPromises);

        console.log('Database seeded with fake data!');

    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        const db = await dbPromise;
        await db.close();
        console.log('Database connection closed.');
    }
}

seed();