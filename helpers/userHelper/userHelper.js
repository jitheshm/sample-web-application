const db = require('../database/config')
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    signup: (data) => {
        return new Promise((resolve, reject) => {
            
            bcrypt.hash(data.password, saltRounds).then(function(hash) {
                // Store hash in your password DB.
                data.password=hash;
                db.get().collection('user').insertOne(data).then((result)=>{
                    resolve("success")
                })
            });
        })
    }
}