const nanoid = require('nanoid')
const auth = require('../auth')
const TABLE = 'post'

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list(){
        return store.list(TABLE)
    }

    function get(id){
        return store.get(TABLE, id)
    }

    function upsert(post){
     console.log('Data on upsert Controller post: ', post)
        if(post.id){
            ///update
            return store.upsert(TABLE,post)
        }else{
           return store.upsert(TABLE,post)
        }

    }


/*****
 * TODO: Create the rest of the functions:
 *  upsert,
 *  remove
 */

    
    return{
        list,
        get,
        upsert,
        //remove,
    }
}