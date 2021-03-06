const { Binary } = require('mongodb');
const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb+srv://angel:a1234@cluster0.0bdxl.mongodb.net/Cryptoberry?retryWrites=true&w=majority');
 autoIncrement.initialize(connection);


const Schema = mongoose.Schema;

let newSchema = mongoose.Schema({

    index:'number',
    brand:{
        type: String,
        require: true
    },
    productName:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: String,
        require: true
    },
    images:{
        type: Buffer,
        default:[],
        require: true
    },

    tokenUri:{
        type: String,
        require: true
    },
    
},{sysdate:true});

newSchema.plugin(
    autoIncrement.plugin,
    { model : 'New', field : 'index', startAt : 1,increment : 1 }
);


module.exports =  {
    New : connection.model('New', newSchema)
}