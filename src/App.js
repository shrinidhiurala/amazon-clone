import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import Payment from './Components/Payment';
import Orders from './Components/Orders';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const promise = loadStripe('pk_test_51J41sxSDGMgam9h2PqOJLlSeMiwLFZAiUeZVH6F5Ok4xKud1LmG0eOeDejYMBbdLSn0y6seo9JO4ERNVFeYDy4hy00OXDncQLW');

function App() {
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            console.log('The user is >>>> ', authUser);
            if(authUser){
                // logged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser,
                })
            }else{
                // logged out
                dispatch({
                    type: 'SET_USER',
                    user: null,
                })
            }
        })
    }, [])

    return (
        <Router>
            <div className="app">
                
                <Switch>                    
                    <Route path="/login">                        
                        <Login />
                    </Route>
                    <Route path="/checkout">          
                        <Header />              
                        <Checkout />
                    </Route>
                    <Route path="/payment">          
                        <Header />
                        <Elements stripe={promise}>
                            <Payment />
                        </Elements>
                    </Route>
                    <Route path="/orders">          
                        <Header />          
                        <Orders />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
