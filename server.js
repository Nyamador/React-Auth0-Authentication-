const express = require('express');
require('dotenv').config();
const jwt = require("express-jwt"); //Validate JWT and set req.user
const jwtRsa = require("jwks-rsa"); //Retrieve RSA keys from a JSON Web Key (JWKS) endpoint 

const checkJwt = jwt({
    //Dynamically provide a signing key based on the kid in the header
    //and the signing keys provided by the JWKS endpoint
    secret: jwtRsa.expressJwtSecret({
        cache: true, //cache the signing key
        rateLimit: true,
        jwksRequestsPerMinute: 5, //Prevent attackers from requesting more than 5 per minute
        jwksUri: `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
            }/.well-known/jwks.json`
    }),

    //validate the audience and the issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    //This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
    algorithms: ["RS256"]
});

const app = express();

app.get('/public', function (req, res) {
    res.json({
        message: "Hello from my public api"
    });
});


app.get('/private', checkJwt, function (req, res) {
    res.json({
        message: "Hello from my private api"
    });
});


app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);