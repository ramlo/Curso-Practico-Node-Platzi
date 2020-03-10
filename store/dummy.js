const db = {
    'user': [
        { id: 1, name: 'Ramiro' },
        { id: 2, name: 'Alberto' }
    ]
};

async function list(tabla) {
    return db[tabla] || []
}
async function get(tabla, id) {
    console.log('Get Function: ', tabla, id)
    let col = db[tabla];
    return col.filter(item => item.id === id)[0] || null
}
async function upsert(tabla, data) {
    console.log('This: ', data.Nombre)
    if(!db[tabla]){
        db[tabla] = []
    }
    db[tabla].push(data)
    console.log('DB Upserted: ', db)
    
    //return data.id
}

async function remove(tabla, id) {
    return id;
}

async function query(tabla,q){
    let col = await list(tabla)
    let keys = Object.keys(q)
    let key = keys[0] 
    return col.filter(item => item[key] === q[key])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}