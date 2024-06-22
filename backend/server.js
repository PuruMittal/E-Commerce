const app = require('./app')
const dotenv = require("dotenv")
const connectDatabase = require('./config/database')

//Handling uncaught exception
process.on('uncaughtException', (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down due to Uncaught Exception`)
    process.exit(1)
})



//Config
dotenv.config({path : "backend/config/config.env"})

//Connect to database (after congig)
connectDatabase()

const server = app.listen(process.env.PORT,()=> {
    console.log(`Server is working on port : http://localhost:${process.env.PORT}`)
})
 
//Unhandled Promise Rejection - (like server string is wrong)
process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})