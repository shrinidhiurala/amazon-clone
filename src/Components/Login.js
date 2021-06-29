import React, { useState } from 'react';
import './login.css';
import {Link, useHistory} from 'react-router-dom';
import { db, auth } from '../firebase';


const Login = () => {
    const history = useHistory();
    const [mail, setMial] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) =>{
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(mail, password)
        .then((auth) => {
            console.log(auth);
            if(auth){
                history.push('/');
            }
        })
        .catch(error => alert(error.message))
    }
    const register = (e) =>{
        e.preventDefault();

        auth
        .createUserWithEmailAndPassword(mail, password)
        .then((auth) => {
            console.log(auth);
            db.collection("users").doc(auth.user.uid).set({
                email: auth.user.email,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

            if(auth){
                history.push('/');
            }
        })
        .catch(error => alert(error.message))
    }
    return (
        <div className="login">
            <Link to="/">
                <img className="login__image" alt="" src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>

                <form >
                    <h5>Email</h5>
                    <input type="text" value={mail} onChange={e => setMial(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button 
                        type="submit"
                        className="login__signInButton"
                        onClick={signIn}
                    >Sign In</button>

                    <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                    <button 
                        className="login__registerButton"
                        onClick={register}
                    >Create Your Amazon Account</button>
                </form>
            </div>
        </div>
    )
}

export default Login
