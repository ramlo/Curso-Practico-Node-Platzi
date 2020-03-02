const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const config = require('../config/config.js');
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./../swagger.json')
const user = require('./components/user/network');

const PORT = config.api.port;


app.use(bodyParser.json());


// Router
app.use('/api/user',user)

//Documentation
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))

app.listen(PORT, ()=>{
    console.log(`App listen on port: ${PORT}....`)
})