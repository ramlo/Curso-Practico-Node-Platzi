const TABLA = 'user'
const nanoid = require('nanoid')
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    function list() {
        return store.list(TABLA)
    }
    function get(id) {
        return store.get(TABLA, id)
    }
    function upsert(data) {
        const user = {
            name: data.name,
            username: data.username,
        }
        if (data.id) {
            user.id = data.id
        } else {
            user.id = nanoid()
        }
        if(data.username || data.password){
            auth.upsert({
                id : user.id,
                username: user.username,
                password: data.password
            })
        }

        return store.upsert(TABLA, user)
    }
    function remove(id) {
        return store.remove(TABLA, id)
    }
    return {
        list,
        get,
        upsert,
        remove
    }
}