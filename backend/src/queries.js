const ObjectsToCsv = require('objects-to-csv')
const fs = require("fs");
var path = require('path');
const pool = require('../models/shipments').pool

const getShipments = (request, response) => {
  pool.query('SELECT * FROM shipments ORDER BY shipping_id ASC', (error, results) => {
    if (error) {
      return response.status(404).send(`Shipments not found`)
    }
    response.status(200).json(results.rows)
  })
}

const createShipment = (request, response) => {
  const { product_id, quantity, order_submitted_date, order_shipped_date, order_received_date} = request.body

  pool.query('INSERT INTO shipments (product_id, quantity, order_submitted_date, order_shipped_date, order_received_date) VALUES ($1, $2, $3, $4, $5)', [product_id, quantity, order_submitted_date, order_shipped_date, order_received_date], (error, results) => {
    if (error) {
      return response.status(400).send(`Shipment not created`)
    }
    response.status(201).send(`Shipment added with ID: ${results.insertId}`)
  })
}

const updateShipment = (request, response) => {
  const id = parseInt(request.params.id)
  const { product_id, quantity, order_submitted_date, order_shipped_date, order_received_date} = request.body
  console.log(request.body, id)
  pool.query(
    'UPDATE shipments SET product_id = $1, quantity = $2, order_submitted_date =$3, order_shipped_date=$4, order_received_date=$5 WHERE shipping_id = $6',
    [product_id, quantity, order_submitted_date, order_shipped_date, order_received_date, id],
    (error, results) => {
      if (error) {
        return response.status(404).send(`User with ID ${id} not found`)
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteShipment = (request, response) => {
  const shipping_id = parseInt(request.params.id)

  pool.query('DELETE FROM shipments WHERE shipping_id = $1', [shipping_id], (error, results) => {
    if (error) {
      return response.status(404).send(`Shipment with ID ${shipping_id} not found`)
    }
    response.status(200).send(`Shipment deleted with ID: ${shipping_id}`)
  })
}

const getShipmentCSV = (request, response) => {

  const time = new Date()
  const fileName = `${time}-shipments.csv`

  var ws = fs.createWriteStream(fileName);

  pool.query('SELECT * FROM shipments ORDER BY shipping_id ASC', (error, results) => {
    if (error) {
      return response.status(404).send(`Shipments not found`)
    }
    console.log(results.rows);
    const csv = new ObjectsToCsv(results.rows);
    csv.toDisk(`./${fileName}`).then(
      () => {
        fs.readdir('./', (err, files) => {
          files.forEach(file => {
             console.log(file);
          });
        });
        response.header('Content-Type', 'text/csv');
        response.sendFile(fileName, {root: './', headers: { 'filename': fileName }});
      })
  })

  // var query = pool.query(`\copy shipments to '${path.join(__dirname, fileName)}' csv header;`);
  // query.on('row', function(row) {
  //     var values = [];
  //     // process column values; if you need to do special formatting (i.e. dates) don't loop and instead handle each one specially
  //     columns.forEach(function(col) {
  //         values = row[col];
  //     });
  //     ws.write(values.join('| '));
  // });

  // query.on('end', function(result) {
  //     ws.close();
  // });
  // fs.readdir('./tmp', (err, files) => {
  //   files.forEach(file => {
  //      console.log(file);
  //   });
  // });
  // const ws = fs.createWriteStream(path.join(__dirname, "./tmp", fileName));
  // pool.connect((err, client, done) => {
  //   if (err) throw err;
  //   const queryString = `\copy shipments TO '${path.join(__dirname, fileName)}' WITH CSV DELIMITER ',' HEADER;`
  //   client.query(queryString, (err, response) => {
  //     done();
  //     if (err) {
  //       console.log(err.stack);
  //     }
  //   });
  // });
  // fs.readdir('./tmp', (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // });
  // fs.readdir('./', (err, files) => {
  //   files.forEach(file => {
  //     console.log(file);
  //   });
  // });
}


module.exports = {
  getShipments,
  createShipment,
  updateShipment,
  deleteShipment,
  getShipmentCSV
}