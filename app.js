// whole express application logic
const express = require("express"); 
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middlewares = require("./utils/middlewares");
const todoRouter = require("./controllers/todo")
// const connectToMongo = new Promise((resolve, reject)=> {   // one way to connect to the mongo
//     try {
//         mongoose.connect(config.MONGO_URI);
//         resolve("connected to the Mongo DB");
//     }
//     catch(error) {
//         reject(`mongo Error: ${error}`);
//     }
// })
// connectToMongo.then((res)=> {
//     logger.info(res);
// })
// .catch((error)=> {
//     throw new Error(error)
// })

mongoose.connect(config.MONGO_URI);      //alternate way to handle
const dbConnection = mongoose.connection;

dbConnection.on("error", (error) => {
    logger.error(`MongoDB connection error: ${error}`);
});

dbConnection.once("open", () => {
    logger.info( `Connected to the MongoDB database ${config.MONGO_URI}`);
});


/*********** Important Middlewares to be used  *********** */

app.use(cors());
app.use(express.json());
app.use(middlewares.requestLogger);

//routes
app.use("/api/todos", todoRouter);

//error handling middleware

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)




module.exports = app;