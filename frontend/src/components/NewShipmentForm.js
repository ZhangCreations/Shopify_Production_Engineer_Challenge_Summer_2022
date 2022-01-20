import React, { useState, useEffect } from 'react';
import dateConversion from '../utils/dateConversion';

function NewShipmentForm(props) {
    const {setShipments} = props;
    const [productID, setproductID] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [orderSubmittedDate, setOrderSubmittedDate] = useState(dateConversion(new Date()));
    const [orderShippedDate, setOrderShippedDate] = useState(null);
    const [orderReceivedDate, setOrderReceivedDate] = useState(null);
    
    function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = {
                product_id: productID,
                quantity: quantity,
                order_submitted_date: orderSubmittedDate,
                order_shipped_date: orderShippedDate,
                order_received_date: orderReceivedDate
            }
            fetch("http://localhost:5000/shipments", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((response) => {
                if(response.status === 201) {
                    setShipments(null);
                    setproductID(0);
                    setQuantity(0);
                    setOrderSubmittedDate(dateConversion(new Date()));
                    setOrderShippedDate(null);
                    setOrderReceivedDate(null);
                }
            })
            .catch(err => {
                console.log(err); 
            });
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        console.log(orderSubmittedDate);
    }, [orderSubmittedDate])

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="productID">Product ID</label>
            <input
            id="product_id"
            type="text"
            value={productID}
            onChange={(e) => setproductID(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="quantity">Quantity</label>
            <input
            id="quantity"
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="orderSubmittedDate">Order Submission Date</label>
            <input
            id="orderSubmittedDate"
            type="date"
            value={orderSubmittedDate}
            onChange={(e) => setOrderSubmittedDate(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="orderShippedDate">Order Shipment Date</label>
            <input
            id="orderShippedDate"
            type="date"
            value={orderShippedDate}
            onChange={(e) => setOrderShippedDate(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="orderReceivedDate">Order Received Date</label>
            <input
            id="orderReceivedDate"
            type="date"
            value={orderReceivedDate}
            onChange={(e) => setOrderReceivedDate(e.target.value)}
            />
        </div>
        <button type="submit">Submit</button>
        </form>
    );  
}

export default NewShipmentForm;