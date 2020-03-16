function error (message, code){
    let msg = message || 'Internal Error!'
    let e = new Error(msg);

    if(code){
        e.statusCode = code;
    }
    return e;
}

module.exports = error;