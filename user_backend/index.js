
const express = require('express');
const app = express();
app.use(express.json());
const {connection} = require('./db')

// Import the microservices
const fetchDataMicroservice = require('./MicroServices/FetchApiMicroservice');
const csvFileCreationMicroservice = require('./MicroServices/CSVFileCreationMicroservice');
const updateDataMicroservice = require('./MicroServices/UpdateDataMicroservice');


app.get("/",(req,res)=>{
    console.log("HOME");
    res.send("WELCOME TO GOLD STONE HOME PAGE")
})

// Mount the microservices on their respective routes
app.use('/fetch', fetchDataMicroservice);
app.use('/update', updateDataMicroservice);
app.use('/csv', csvFileCreationMicroservice);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected")

    }catch(err){
        console.log("NOT Connected");
        console.log(err);
    }
    console.log(`CONNECT SERVER TO ${process.env.port} PORT`)
})
