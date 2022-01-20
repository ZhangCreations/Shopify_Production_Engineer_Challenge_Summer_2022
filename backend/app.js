const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./src/queries')
const app = express()
const port = 5000

app.use(bodyParser.json())
app.use(express.static(`${__dirname}`));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({ origin: "http://localhost:3000" }))
app.get('/', (request, response) => {
  response.json({ info: 'API for Shopify Production Engineer Intern Challenge' })
})

app.get('/shipments', db.getShipments)
app.post('/shipments', db.createShipment)
app.put('/shipments/:id', db.updateShipment)
app.delete('/shipments/:id', db.deleteShipment)
app.get('/shipments/csv', db.getShipmentCSV)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

