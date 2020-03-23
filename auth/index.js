const jwt = require('jsonwebtoken')
const config = require('../config/config')
const error = require('../utils/error')
let secret = config.jwt.secret


function sign(data){
    console.log("This is the data to sing in: ",JSON.stringify(data), secret)
    return jwt.sign(JSON.stringify(data), secret)
}

function verify(token){
    return jwt.verify(token, secret)
}

const check = {
    own: function (req, owner){
        const decoded = decodeHeader(req)
        console.log(decoded)
        console.log('Owner: ',owner)
        console.log('Decoded Id: ',decoded.id)
        if(decoded.id !== owner){
            throw error('No puedes editar el usuario',401)
        }
        return decoded
    },
    logged: function(req){
        const decoded = decodeHeader(req)
        if(decoded.id === null || ''){
            throw error('The user is not logged')
        }
    }
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
    console.log("2.-",authorization)
    const token = getToken(authorization)
    console.log("3.-",token)
    const decoded = verify(token)
    console.log("4.-",decoded)
    req.user = decoded
    
    return decoded
}

module.exports = {
    sign,
    check,
    }