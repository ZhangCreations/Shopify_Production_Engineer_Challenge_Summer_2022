import React, { useState, useEffect } from 'react';
import dateConversion from '../utils/dateConversion';

function EditShipmentForm(props) {
    const {setShipments, setEditMode, shipmentID, initialProductID, initialQuantity, initialOrderSubmittedDate, initiaOrderShippedDate, initialOrderReceivedDate} = props;
    const [productID, setproductID] = useState(initialProductID);
    const [quantity, setQuantity] = useState(initialQuantity);
    const [orderSubmittedDate, setOrderSubmittedDate] = useState(dateConversion(initialOrderSubmittedDate));
    const [orderShippedDate, setOrderShippedDate] = useState(initiaOrderShippedDate ? dateConversion(initiaOrderShippedDate) : null);
    const [orderReceivedDate, setOrderReceivedDate] = useState(initialOrderReceivedDate ? dateConversion(initialOrderReceivedDate) : null);
    
    function handleSubmit(event) {
        event.preventDefault();
        try {
            const data = {
                product_id: productID,
                quantity: quantity,
                order_submitted_date: dateConversion(orderSubmittedDate),
                order_shipped_date: orderShippedDate ? dateConversion(orderShippedDate): null,
                order_received_date: orderReceivedDate ? dateConversion(orderReceivedDate) : null
            }
            fetch("http://localhost:5000/shipments/" + parseInt(shipmentID), {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then((response) => {
                if(response.status === 200) {
                    setShipments(null);
                    setEditMode(false);
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
        <div>
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
                    value={orderShippedDate ? orderShippedDate : ""}
                    onChange={(e) => setOrderShippedDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="orderReceivedDate">Order Received Date</label>
                    <input
                    id="orderReceivedDate"
                    type="date"
                    value={orderReceivedDate ? orderReceivedDate : ""}
                    onChange={(e) => setOrderReceivedDate(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => {setEditMode(false)}}> Cancel</button>
        </div>
    );  
}

export default EditShipmentForm;