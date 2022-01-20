import React, {useState} from 'react';
import './css/App.css';
import ShipmentList from './components/ShipmentList';
import NewShipmentForm from './components/NewShipmentForm';

function App() {

  const [shipments, setShipments] = useState(null);

  function getCSV() {
    let fileName = "shipments.csv";
    
    fetch("http://localhost:5000/shipments/csv",
    {
      method: "GET",
      headers: {
        'Content-Type': 'text/csv',
      },
    })
    .then((response) => {
      fileName = response.path;
      return response.blob()
    })
    .then((blob) => {
      // Create blob link to download
      console.log(blob)
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        fileName,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return <div>
    <NewShipmentForm setShipments={setShipments}/>
    <ShipmentList shipments={shipments} setShipments={setShipments}/>
    <button onClick={() => {getCSV()}}> Get CSV </button>
  </div>
}

export default App;
