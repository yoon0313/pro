const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb+srv://devil:a1234@cluster0.u2r1k.mongodb.net/Cryptoberry?retryWrites=true&w=majority");
 autoIncrement.initialize(connection);


const Schema = mongoose.Schema;

let productSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    // title:{
    //     type: String,
    //     maxlength: 50
    // },

    //(동근이형올리실예정)
    //위에 토큰 클릭시 wallet 주소가 들어가감
    //판매자 주소, 토큰소유자 주소, 토큰 url(제품이미지), 제품이름, 브랜드이름, 제품생성날짜(자동생성)
    

    //내가해야할거
    //특정값 불러오기
    //제품등록날짜(수기입력)(자동입력하는거 있을거임 newdate)
    index:'number',
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
    date:{
        type: String,
        default:0,
        require: true
    }
},{timestamps:true});

productSchema.plugin(
    autoIncrement.plugin,
    { model : 'Product', field : 'index', startAt : 1,increment : 1 }
);


// const Product = mongoose.model('Product', productSchema);

// module.exports = { Product }
module.exports =  {
    Product : connection.model('Product',productSchema)//mongoose.model('Product', productSchema);
}