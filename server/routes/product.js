const express = require('express');
const router = express.Router();
const multer = require('multer')
const Mongodb_URI = require('../config/dev').mongoURI
const {Product} = require('../models/Product');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(Mongodb_URI);
var DB;
let getNextSequence
let updateOldSellReceipt
client.connect().then( res =>{
  DB = client.db('Cryptoberry')
  console.log(DB)

  getNextSequence = async function(){
    let pd = DB.collection('products')
    var ret = await pd.findOneAndUpdate(
      { _id: "index" },
      { $inc: { seq: 1 } },
      {
        returnOriginal: false
      })
    return ret.value.seq;
  }

  updateOldSellReceipt = async function(tokenIndex, _sell_receipt){
    
    let pd = DB.collection('products')
    var ret = await pd.findOneAndUpdate(
      { tokenIndex : tokenIndex },
      { $set: { sell_receipt: _sell_receipt } },
      {
        returnOriginal: true
      })
    return ret.value;
  }

  console.log(getNextSequence)
})
//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage }).single("file")


router.post('/image',(req,res) => {
    //프론트에서 가져온 이미지를 저장해줌 (2)
    upload(req, res, err =>{
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path , fileName: res.req.file.filename})
    })

})

router.post('/',(req,res) => {
  //받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body)
  const productSchema = new productSchema(req.body)

  product.save((err)=>{
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })
})

router.post('/register', async (req,res) =>{
  console.log(req.body);
  var products = DB.collection('products');
  idx = await getNextSequence(),
  products.insertOne({
    index: idx,
    brand: req.body.brand,
    productName: req.body.productName,
    description : req.body.description,
    price : req.body.price,
    images : req.body.images,
    date : req.body.date,
    productKey: req.body.productKey,
    tokenIndex : req.body.tokenIndex,
    sell_receipt : req.body._sell_receipt
  }).then( (data)=>{
    res.json({success:true, msg:data})
  })
})

router.post('/receipt', async (req,res) =>{
  console.log(req.body);
  var products = DB.collection('products');
  data = await updateOldSellReceipt(req.body.tokenIndex, req.body._sell_receipt),
  res.json({success:true, msg:data})
})





//db에서 OldProduct 가져오기 
router.get('/getOldP', (req,res) =>{
  var products = DB.collection('products');

  
  let cusor;
  if(req.query.index){
    cursor =products.find({index:parseInt(req.query.index)});
  }
  else {
    cursor =products.find({});
  }
  

  let result=[];
  cursor.count().then(cnt =>{
    let arrLength=  cnt;
    if(cnt==0) {
      res.json(result);
    } else{
      cursor.each( function(err,doc){
        if (doc != null) {
          result.push(doc)
          if(result.length == arrLength){
            res.json(result)
    
          }
        } 
      })
    }
  }); 
})

module.exports = router;