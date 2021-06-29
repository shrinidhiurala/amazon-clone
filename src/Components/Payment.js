import userEvent from '@testing-library/user-event'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider';
import './payment.css'
import CheckoutProduct from './CheckoutProduct'
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import { db } from '../firebase';

const Payment = () => {
    const history = useHistory();
    const [{basket, user}, dispatch] = useStateValue();

    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // generate the special stripe secretr which allows us to charge a customer
        const getClientSecret = async () =>{
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket)*100}` // stripe needs price in chiller
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    //console.log("clientSecret", clientSecret);

    const handleSubmit = async (event) => {
        //submitting to the stripe
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            console.log("paymentIntent", paymentIntent);
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount/100,
                currency: paymentIntent.currency,
                created: paymentIntent.created
            })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders');
        })
    }

    const handleChange = (event) => {
        //listen change in card element
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">

                <h1>Checkout (<Link to="checkout">{basket?.length} items</Link>) </h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Sridurga , chitpady</p>
                        <p>Udupi, KA, India, 576101</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
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

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value)=>(
                                        <h3>Order Total: <strong>{value}</strong></h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                <button disabled={processing || disabled || succeeded }>
                                <span>{processing? <p>Processing</p>: "Buy now"}</span>
                            </button>
                            </div>
                            
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
