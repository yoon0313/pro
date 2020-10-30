const express = require('express');
const router = express.Router();
const multer = require('multer')
const Mongodb_URI = require('../config/dev').mongoURI
const {Product} = require('../models/Product');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(Mongodb_URI);
var DB;
client.connect().then( res =>{
  DB = client.db('Cryptoberry')
  console.log(DB)
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

  product.save((err)=>{
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })
})

router.post('/register', (req,res) =>{
  console.log(req.body);
  var products = DB.collection('products');
  products.insertOne(req.body).then( (data)=>{
    res.json({success:true, msg:data})
  })

})
module.exports = router;
