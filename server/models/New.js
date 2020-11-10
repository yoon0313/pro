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

    price:{
        type: String,
        require: true
    },

    tokenUri1:{
        type: String,
        require: true
    },
    tokenUri2:{
        type: String,
        require: true
    },
    tokenUri3:{
        type: String,
        require: true
    },
},{timestamps:true});

newSchema.plugin(
    autoIncrement.plugin,
    { model : 'New', field : 'index', startAt : 1,increment : 1 }
);


module.exports =  {
    New : connection.model('New', newSchema)
}