const express = require('express')

const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

//Routes 
router.get('/', list)
router.get('/:id', getPost)
router.put('/:id', upsert)
router.post('/', upsert)
router.delete('/:id',del)

//Functions
function list(req, res, next) {
    controller.list()
        .then((list) => {
            response.success(req, res, 200, list)
        })
        .catch(next)
}

function getPost(req, res, next) {
    controller.get(req.params.id)
        .then((post) => {
            response.success(req, res, 200, post)
        })
        .catch(next)
}

function upsert(req,res,next){
    let param= req.params.id
    let data= req.body
    //console.log('This is the data to be inserted: ',data)
    controller.upsert(data)
        .then((result)=>{
            response.success(req,res,200,result)
        })
        .catch(next)
}

function del(req,res,next){
    controller.remove(id)
        .then((result)=>{
            response.success(req,res,200,result)
        })
        .catch(next)
}

module.exports = router