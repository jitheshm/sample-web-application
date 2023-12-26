const db = require('../../config/dbConnection')
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    signup: (data) => {
        return new Promise((resolve, reject) => {
            db.get().collection('user').findOne({ email: data.email }).then((result) => {
                if (!result) {
                    bcrypt.hash(data.password, saltRounds).then(function (hash) {
                        // Store hash in your password DB.
                        data.password = hash;
                        db.get().collection('user').insertOne(data).then((result) => {
                            resolve("success")
                        })
                    });
                } else {
                    reject("email is already registered")
                }
            })

        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.get().collection('user').findOne({ email: data.email }).then((result) => {
                if (result != null) {
                    bcrypt.compare(data.password, result.password).then((res) => {
                        if (res) {
                            resolve({
                                success: true, data: {
                                    name: result.name

                                }
                            })
                        } else {
                            resolve({ success: false })
                        }
                    });
                } else {
                    resolve({ success: false })
                }
            })
        })
    }
}