const { MongoClient } = require("mongodb");
var database;
module.exports = {
    connect: () => {
        return new Promise((resolve, reject) => {
            const uri = "mongodb://localhost:27017";
            const client = new MongoClient(uri);
            client.connect().then(() => {
                
                database = client.db('sample-webApplication')
                console.log("connected to database");
                resolve()
            }).catch((err) => {
                console.log("error:"+err);
                reject()
            })

        })


    },
    get: () => {
        return database
    }


}