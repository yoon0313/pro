const { Binary } = require('mongodb');
const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection('mongodb+srv://angel:a1234@cluster0.0bdxl.mongodb.net/Cryptoberry?retryWrites=true&w=majority');
 autoIncrement.initialize(connection);


const Schema = mongoose.Schema;

let productSchema = mongoose.Schema({


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
    date:{
        type: String,
        default:0,
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
},{sysdate:true});

productSchema.plugin(
    autoIncrement.plugin,
    { model : 'Product', field : 'index', startAt : 1,increment : 1 }
);


module.exports =  {
    Product : connection.model('Product',productSchema)//mongoose.model('Product', productSchema);
}