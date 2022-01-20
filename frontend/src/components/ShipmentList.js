import React, { useEffect } from 'react';
import '../css/ShipmentList.css';
import ShipmentCard from './ShipmentCard';

function ShipmentList(props) {
    const {shipments, setShipments} = props
    

    useEffect( () => {
        console.log(shipments);
        async function fetchData() {
            try {
                const queryResults = await fetch("http://localhost:5000/shipments", {
                    "method": "GET",
                })
                .then(response => response.json())
                .catch(err => { console.log(err); 
                });
                setShipments(queryResults);
            } catch (err) {
                console.log(err);
            }
        }
        if(shipments === null) {
            fetchData();
        }
    }, [shipments, setShipments]);

    if(shipments == null){
        return <></>
    }    
    return <>{
        shipments.map(item => {
            return <ShipmentCard item={item} setShipments={setShipments}/>
    })}
    </>
}

export default ShipmentList;