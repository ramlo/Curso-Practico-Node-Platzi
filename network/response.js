exports.success = 
    (req, res, status, message) => {
        let statusCode = status || 200;
        msg = message || ''
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body : msg,
        })
    }

exports.error = 
    (req, res, status, message) => {
        let statusCode = status || 500;
        msg = message || 'Internal server error'
        res.status(statusCode).send({
            error: true,
            status: statusCode,
            message : msg,
        })
    }