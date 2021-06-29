import React from 'react'
import './checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from '../StateProvider'

const Checkout = () => {
    const [{basket, user}, dispatch] = useStateValue();

    const removeFromBasket = (id) =>{
        //remove from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad"
                    alt=""
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/1500x150_V2_Eng._CB412582591_.jpg"
                />
                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">Your shopping basket</h2>
                    
                    <div className="checkout__items">
                        
                        {
                            basket.map(item =>(
                                <CheckoutProduct
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    rating={item.rating}
                                    id={item.id}
                                />
                            ))
                        }
                    </div>

                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
