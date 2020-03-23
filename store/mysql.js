const mysql = require('mysql')
const config = require('../config/config')

const dbConfig = {
    host: config.mysql.host ,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function handleCon(){
    connection = mysql.createConnection(dbConfig)
    connection.connect((err)=>{
        if(err){
            console.error('[db error]', err)
            setTimeout(handleCon,2000)
        }else{
            console.log('DB Connected')
        }
    })
    connection.on('error', err=> {
        console.error('[db error]', err)
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon()
        }else{
            throw err
        }
    })
}

handleCon()

function list(table){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`,(err,data)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(data)
            }
        })
    })
}

function get(table, id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE ID= ?`,id,(err,data)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(data)
            }
        })
    })
}


function update(table, data){
    return new Promise((resolve, reject)=>{
        console.log("Data To be Updated: ",data);
        connection.query(`UPDATE ${table} SET ? WHERE id= ?`,[data,data.id],(err,result)=>{
            if(err){
                console.error("Update Cannot be done: ",err)
                return reject(err)
            }else{
                console.log("Update Done: ",err)
                return resolve(result)
            }
        })
    })
}

function insert(table, data){
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO ${table} SET ?`,data,(err,result)=>{
            if(err){
                console.error("###ERR###: ",err)
                return reject(err)
            }else{
                return resolve(result)
            }
        })
    })
}


function query(table,query){
    return new Promise ((resolve,reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE ?`,query,(err,result)=>{
            if(err){
                return reject(err)
            }else{
                return resolve(result[0] || null)
            }
        })
    })
}

function upsert(table,data){
    let row = get(table, data.id)
    if(row){
        console.log("Updating")
        return update(table,data)
    }else{
        return insert(table,data)
    }
}

module.exports= {
    list,
    get,
    upsert,
    query

}