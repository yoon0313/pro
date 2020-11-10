const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const config = require("./config/key");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors')


//파일용량 제한 늘리기
app.use(bodyParser.json({
  limit : "10mb"
}));
app.use(bodyParser.urlencoded({
  limit:"10mb",
  extended: false
}));

const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
  
  app.use(cors())



  
app.get('/OldP/products', (req,res)=>{
  
// const[Products, setProducts] = useState([])
// axios.get('OldP/product/products')
// .then (response =>{
//   if(response.data.success){
//       setProducts(response.data.productInfo)
//   }else{
//       alert("상품을 가져오는데 실패했습니다.")
//   }
// })
    res.send(
      
    )
      // db.producta.find(){
      //   "id" : id......0
      // }
    // {'id' : products.product.find({writer}),
    // 'pname': 'GUCCI Snake wallet',
    // 'price': 0.15,
    // },
    // {'id' : 2,
    // 'pname': 'MONTBLAC ballpen',
    // 'price': 0.9,
    // }
    //     ]);
    
});

//Old Table
app.use('/OldP/products', require('./routes/product'))

//New Table
app.use('/NewP/new', require('./routes/new'))

app.get('/api/hello', (req, res)=>{
    res.send({message: 'Hello Express!'});
});

if (process.env.NODE_ENV === "production") {

    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`))