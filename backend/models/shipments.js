const Pool = require('pg').Pool

const pool = new Pool({
  user: 'test', 
  host: 'postgres',
  database: 'inventory_app_db',
  password: 'test',
  port: 5432,
})

pool.query(`
    CREATE TABLE IF NOT EXISTS shipments (
        shipping_id SERIAL PRIMARY KEY,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        order_submitted_date DATE NOT NULL,
        order_shipped_date DATE,
        order_received_date DATE
    );
`, (err, res) => {console.log(err, res)})

module.exports = {pool}
