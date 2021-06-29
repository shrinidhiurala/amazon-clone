import React from 'react';
import { useStateValue } from '../StateProvider';
import './checkoutProduct.css';

const CheckoutProduct = ({image, title, price, rating, id, hideButton}) => {
    
    const [{basket, user}, dispatch] = useStateValue();

    const removeFromBasket = (id) =>{
        //remove from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className="kartItem">
            <div className="kartItem__image">
                <img src={image} alt="" />
            </div>
            <div className="kartItem__info">
                <p><b>{title}</b></p>
                <p className="kartItem__price">
                    <strong>₹ {price}</strong>
                </p>
                <div className="kartItem__rating">
                    {
                        Array(rating).fill().map((_, i) =>(
                            <p>⭐</p>
                        ))
                    }
                </div>
                {!hideButton &&(
                    <button onClick={()=> removeFromBasket(id)}>Remove from Basket</button>
                )}                
            </div>
        </div>
    )
}

export default CheckoutProduct
