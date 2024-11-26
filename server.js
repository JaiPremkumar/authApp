const app = require('./app')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('./database')


dotenv.config({path:path.join(__dirname,'config.env')})
connectDB()


app.listen(process.env.PORT,()=>{
    console.log(`listen in: ${process.env.PORT}`)
})

//postmanApi = https://identity.getpostman.com/accounts?continue=https%3A%2F%2Fgo.postman.co%2Fredirect%2Fworkspace%3Ftype%3Dteam%26recentlyVisited%3Dtrue