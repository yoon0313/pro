const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
        
    },
    // title:{
    //     type: String,
    //     maxlength: 50
    // },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        default:0,
        require: true
    },
    images:{
        type: Array,
        default:[],
        require: true
    },
    // sold:{
    //     type:Number,
    //     maxlength: 100,
    //     default: 0
    // },
    // views:{
    //     type:Number,
    //     default:0
    // }

},{timestamps:true})

// const Product = mongoose.model('Product', productSchema);

// module.exports = { Product }
module.exports =  mongoose.model('Product', productSchema);