const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
const CurrencyFormat = require("react-currency-format");

const stripe = require("stripe")('sk_test_51J41sxSDGMgam9h2mUAKy7H2G8JdE79ihNrWecUrO8qV2sTIIqxwWWsgTsRccJyZ07bivDrFcCP77z62AQoFsUDM00YWuP7kDx');

//api


// app config 
const app =  express();

// middelware
app.use(cors({ origin: true}));
app.use(express.json());

//api routes
app.get('/', (request, response) => response.status(200).send('hello world'));
app.get('/sharingan', (request, response) => response.status(200).send('uchiha itachi'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request recived ',total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency:'inr',
        description:"payment",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
});

// listen command
exports.api = functions.https.onRequest(app);
