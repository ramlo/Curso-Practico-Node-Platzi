const jwt = require('jsonwebtoken')
const config = require('../config/config')

let secret = config.jwt.secret

function sign(data){
    return jwt.sign(data, secret)
}

function verify(token, secret){
    jwt.verify(token, secret)
}


const check = {
    own: function (req, owner){
        const decoded = decodeHeader(req);
        console.log(decode)
    },
}

function getToken(auth){
    let tokenFormat = 'Bearer '
    if(!auth){
        throw new Error('No token has found')
    }

    if(auth.indexOf(tokenFormat)){
        throw new Error('Invalid token format')
    }

    let token = auth.replace('Bearer ', '')

    return token
}

function decodeHeader(req){
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization)
    const decoded = verify(token)
    
    req.user = decoded
    
    return decoded
}

module.exports = {
    sign,
    check,
}