const mongoose = require('mongoose');
const mongoUri = 'mongodb://127.0.0.1:27017/Ecommerce'

const connectToMongo = async()=>{
    mongoose.connect(mongoUri,()=>{
        console.log('Connected To Mongo Db Successfully')
    })
}

module.exports = connectToMongo