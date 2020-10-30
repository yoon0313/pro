const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const config = require("./config/key");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connect = mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
  
  app.use(cors())


// app.get('/api/products', (req,res)=>{
//     res.send([
//         {'id' : 1,
//         'pname': 'GUCCI Snake wallet',
//         'price': 0.15,
//     },
//     {'id' : 2,
//         'pname': 'MONTBLAC ballpen',
//         'price': 0.9,
//     }
//     ]);
// });

app.use('/OldP/products', require('./routes/product'))


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