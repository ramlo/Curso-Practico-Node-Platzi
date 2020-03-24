const express = require('express')

const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

//Routes 
router.get('/', list);

//Functions
function list(req, res, next) {
    controller.list()
        .then((list) => {
            response.success(req, res, 200, list)
        })
        .catch(next)
}

module.exports = router