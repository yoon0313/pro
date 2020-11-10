const express = require('express');
const router = express.Router();
const multer = require('multer')
const Mongodb_URI = require('../config/dev').mongoURI
const {New} = require('../models/New');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(Mongodb_URI);
var DB;
let getNextSequence
client.connect().then( res =>{
  DB = client.db('Cryptoberry')
  console.log(DB)

  getNextSequence = async function(){
    let pd = DB.collection('new')
    var ret = await pd.findOneAndUpdate(
      { _id: "index" },
      { $inc: { seq: 1 } },
      {
        returnOriginal: false
      })
    return ret.value.seq;
  }
  console.log(getNextSequence)
})

//=================================
//             New
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
  const news = new New(req.body)
  const newSchema = new newSchema(req.body)

  news.save((err)=>{
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })
})

router.post('/register', async (req,res) =>{
  console.log(req.body);
  var news = DB.collection('new');
  idx = await getNextSequence(),
  news.insertOne({
    index: idx,
    brand: req.body.brand,
    productName: req.body.productName,
    price : req.body.price,
    tokenUri1: req.body.tokenUri1,
    tokenUri2: req.body.tokenUri2,
    tokenUri3: req.body.tokenUri3
  }).then( (data)=>{
    res.json({success:true, msg:data})
  })
})


//db에서 OldProduct 가져오기 
router.get('/getNewP', (req,res) =>{
  var news = DB.collection('new');

  
  let cusor;
  if(req.query.index){
    cursor = news.find({index:parseInt(req.query.index)});
  }
  else {
    cursor =news.find({});
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