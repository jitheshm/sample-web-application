const { MongoClient } = require("mongodb");
var database;
module.exports = {
    connect: () => {
        const uri = "mongodb://localhost:27017";
        const client = new MongoClient(uri);
        database=client.db('sample-webApplication')
        console.log("connected to database");

    },
    get: () => {
        return database
    }


}