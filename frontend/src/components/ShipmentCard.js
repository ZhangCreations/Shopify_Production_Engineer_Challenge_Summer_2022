import React, {useState} from "react";
import dateConversion from "../utils/dateConversion";
import EditShipmentForm from "./EditShipmentForm";

function ShipmentCard(props) {

    const {item, setShipments} = props;
    const [editMode, setEditMode] = useState(false);

    function onDelete (event) {
        event.preventDefault();
        try {
            fetch("http://localhost:5000/shipments/" + parseInt(item.shipping_id), {
                method: "DELETE",
            })
            .then(response => {
                if(response.status === 200){
                    setShipments(null);
                }
            })
            .catch(err => {console.log(err)})
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <div class="card" key={item.shipping_id}>
            <div class="container">
                {editMode ? 
                    <EditShipmentForm
                        setShipments={setShipments}
                        setEditMode={setEditMode}
                        shipmentID={item.shipping_id}
                        initialProductID={item.product_id}
                        initialQuantity={item.quantity}
                        initialOrderSubmittedDate={item.order_submitted_date}
                        initiaOrderShippedDate={item.order_shipped_date}
                        initialOrderReceivedDate={item.order_received_date}
                    /> : <>
                    <h4><b>Shipping ID: {item.shipping_id}</b></h4>
                    <p>Product ID: {item.product_id}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Submitted Date: {dateConversion(item.order_submitted_date)}</p>
                    <p>Shipped Date: {item.order_shipped_date == null ? "Not Shipped" : dateConversion(item.order_shipped_date)}</p>
                    <p>Received Date: {item.order_received_date == null ? "Not Received" : dateConversion(item.order_received_date)}</p>
                    <button onClick={() => {setEditMode(true)}}> Edit </button>
                    <button onClick={(e) => onDelete(e)}> Delete </button>
                </>}
            </div>
        </div>
    )
}

export default ShipmentCard;