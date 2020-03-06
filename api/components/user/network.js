const express = require('express')

const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

router.get('/', (req, res) => {
    controller.list()
        .then((lista) => {
            response.success(req, res, 200, lista)
        })
        .catch((err) => {
            response.error(req, res, 500, err.message)
        })
})

router.get('/:id', (req, res) => {
    controller.get(Number(req.params.id))
        .then((user)=>{
            response.success(req,res,200,user)
        })
        .catch((err)=>{
            response.error(req,res,500,err)
        })
})

router.post('/', (req,res)=>{
    console.log('Data: ',req.body)
    controller.upsert(req.body)
        .then((user)=>{
            console.log('User: ',user)
            response.success(req,res,200,user)
        })
        .catch((err)=>{
            console.error("#ERROR#", err)
            response.error(req,res,500,err)
        })
})


router.put('/', (req,res)=>{
    console.log('Data: ',req.body)
    controller.upsert(req.body)
        .then((user)=>{
            console.log('User: ',user)
            response.success(req,res,200,user)
        })
        .catch((err)=>{
            console.error("#ERROR#", err)
            response.error(req,res,500,err)
        })
})


router.delete('/:id', (req,res)=>{
    controller.remove(req.params.id)
        .then((user)=>{
            console.log('User Delete: ',user)
            response.success(req,res,200,user)
        })
        .catch((err)=>{
            console.error("#ERROR#")
            response.error(req,res,500,err)
        })
})


module.exports = router;