const db = {
    'user': [
        { id: 1, name: 'Ramiro' },
        { id: 2, name: 'Alberto' }
    ]
};

async function list(tabla) {
    return db[tabla]
}
async function get(tabla, id) {
    console.log('Get Function: ', tabla, id)
    let col = db[tabla];
    return col.filter(item => item.id === id)[0] || null
}
async function upsert(tabla, data) {
    console.log('This: ', data.Nombre)
    db[tabla].push(data)
    console.log('DB Upserted: ', db)
    
    return data.id
}
async function remove(tabla, id) {
    return id;
}

module.exports = {
    list,
    get,
    upsert,
    remove
}