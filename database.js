const mongoose = require('mongoose')

const connectDB=()=>{
    mongoose.connect(process.env.LOCAL_DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true

        }).then(con=>{
            console.log(`DB Connect in: ${con.connection.host}`)
        }).catch(err=>{
            console.log(err)
        })
    }


    module.exports = connectDB