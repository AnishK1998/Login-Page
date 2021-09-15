var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017"

const dbClient = new MongoClient(url, { useUnifiedTopology: true });
dbClient.connect()
    .then(()=>{
        console.log("Succesfully connected to DataBase")
    }) 
    .catch((err)=>{
        console.log("Error in connecting to DataBase", err);
    })

// here now client is succesfully established
module.exports = dbClient;
