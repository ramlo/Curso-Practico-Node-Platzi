const TABLA = 'user'
const nanoid = require('nanoid')
const auth = require('../auth')
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
    async function upsert(data) {
        const user = {
            name: data.name,
            username: data.username,
        }
        if (data.id) {
            user.id = data.id
        } else {
            user.id = nanoid()
        }
        console.log('Try to hash! ')
        if (data.username || data.password) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            })
        }

        return store.upsert(TABLA, user)
    }
    function remove(id) {
        return store.remove(TABLA, id)
    }

    function follow(from, to) {
        return store.upsert(
            TABLA + '_follow',
            {
                user_from: from,
                user_to: to,
            }
        )
    }

    function following(user){
        const join = {}
        join[TABLA] = 'user_to'; // {user: user_to}
        const query= { user_from: user }
        return store.query(`${TABLA}_follow`,query, join) 
    }

    return {
        list,
        get,
        upsert,
        remove,
        follow,
        following,
    }
}