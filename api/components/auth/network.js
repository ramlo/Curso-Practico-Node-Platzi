const express = require('express')

const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

router.post('/login', (req,res)=>{
        controller.login(req.body.username, req.body.password)
        .then(token => {
            response.success(req,res,200, token)
        })
        .catch(e=>{
            console.error(e)
            response.error(req,res,400,e.message)
        })
})

module.exports = router;