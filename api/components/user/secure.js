const auth = require('../../../auth')

module.exports = function(req,res,next){
    function middleware(req,res,next){
        switch(action){
            case 'update':
                const owner = req.body.id
                auth.check.own(req, owner)
            break
        default:
            next()
        }
    }
    return middleware
}