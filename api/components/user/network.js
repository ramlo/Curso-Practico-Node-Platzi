const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response');
const controller = require('./index')

const router = express.Router();

/*****
 * TODO:
 *      * Separete function get/post/delete,etc into function
 */

router.post('/follow/:id', secure('follow'), (req, res, next) => {
    console.log("The user to be logged is: ", req.user.id)
    controller.follow(req.user.id, req.params.id)
        .then((data) => {
            console.log("Follow ! Data: ", data)
            response.success(req, res, 201, data)
        })
        .catch(next)
})

router.get('/:id/following', (req, res, next) => {
    console.log("#########################")
    console.log("Get List Of followers from user: ", req.params.id)
    controller.following(req.params.id)
        .then((list) => {
            console.log(list)
            response.success(req, res, 200, list)
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    controller.list()
        .then((lista) => {
            response.success(req, res, 200, lista)
        })
        .catch((err) => {
            console.error("Error at GET")
            response.error(req, res, 500, err.message)
        })
})


router.get('/:id', (req, res, next) => {
    controller.get(Number(req.params.id))
        .then((user) => {
            response.success(req, res, 200, user)
        })
        .catch((err) => {
            console.error("Error at GET by id")
            response.error(req, res, 500, err)
        })
})

router.post('/', (req, res, next) => {
    console.log('Data: ', req.body)
    controller.upsert(req.body)
        .then((user) => {
            console.log('User: ', user)
            response.success(req, res, 200, user)
        })
        .catch((err) => {
            response.error(req, res, 500, err)
        })
})


router.put('/', secure('update'), (req, res, next) => {
    console.log('Data: ', req.body)
    controller.upsert(req.body)
        .then((user) => {
            console.log('User: ', user)
            response.success(req, res, 201, user)
        })
        .catch((err) => {
            response.error(req, res, 500, err)
        })
})


router.delete('/:id', (req, res, next) => {
    controller.remove(req.params.id)
        .then((user) => {
            console.log('User Delete: ', user)
            response.success(req, res, 200, user)
        })
        .catch((err) => {
            response.error(req, res, 500, err)
        })
})

module.exports = router;