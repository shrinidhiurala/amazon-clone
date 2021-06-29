import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import './orders.css';
import { db, auth } from '../firebase';
import Order from './Order';

const Orders = () => {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created','desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    }, [])
    
    return (
        <div className="orders">
            <h1>Your orders</h1>
            <div className="orders__order">
                {
                    orders.map(order =>(
                        <Order order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
