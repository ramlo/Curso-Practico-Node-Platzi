const auth = require('../../../auth')

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                console.log("Doing Update with action: ", action)
                const owner = req.body.id
                auth.check.own(req, owner)
                next();
                break;
            case 'follow':
                console.log("Doing the follow Action: ", action)
                auth.check.logged(req)
                next()
                break;
            default:
                next()
        }
    }
    return middleware
}