import React , { Component } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from "react-router-dom";
import Axios from "axios";
import Caver from "caver-js";

const axios = require('axios').default;
const crypto = require('crypto');
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);
var ipfsClient = require('ipfs-http-client');//ipfs 클라이언트를 import 한다
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const yttContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const tsContract = new caver.klay.Contract(DEPLOYED_ABI_TOKENSALES, DEPLOYED_ADDRESS_TOKENSALES);


class NewDescriptPage extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("Product-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("Product-page");
  }

  constructor(props){
    super(props);

    var params = new URLSearchParams(props.location.search);
    
    this.state={
      productKey: '',
      brand: '',
      imgUrl: '',
      productName: '',
      dateCreated: '',
      tokenUri:'',
      price:'',
      productKey:null,
      items :[],
      sell_items : [],
      all_items: [],
      news:{
        id           :'',
        index        :'',
        brand        :'',
        productName  :'',
        image :'',
        tokenUri    :'',
        description  :'',
        price        :'',
        date         :''  
      },
      value:0,min:0,counter:0,
      index:params.get('index')
    };
    
    this.handleClickPlus=this.handleClickPlus.bind(this);
    this.handleClickMinus=this.handleClickMinus.bind(this);
    this.handleOnChange=this.handleOnChange.bind(this);

    Axios.get("http://localhost:5000/NewP/new/getNewP?index="+params.get('index'))
      .then(response => {
          if(response.status==200){
            this.setState({
              news:response.data[0]
            })
              
          }else{
              
          }
    })
  }

  handleClickPlus(){
    this.setState({
      value:this.state.value+1
    });
  }

  handleClickMinus(){
    if(this.state.value <=0) return;
    this.setState({
      value:this.state.value-1
    });
  }

  handleOnChange(e) {
    
    // e.target.value 숫자만 있는지 확인
    this.setState({
      value: e.target.value
    });
  }

  // selectChange(e){
  //   this.setState({
  //     selectedValue: e.target.value
  //   })
  // }

  ///////////////create token//////////////////////////
  handleItemChange = (e, _tokenIndex) => {
    var tokenIndex=_tokenIndex
    var itemIndex = this.state.items.findIndex(element => element.Id == tokenIndex)
    console.log(itemIndex);
    this.state.items[itemIndex].amount =  e.target.value;
    this.setState({
      items :  this.state.items
    })
  }

  getWallet = () => {
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0]
    } else {
      const walletFromSession = sessionStorage.getItem('walletInstance');
      caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
      return caver.klay.accounts.wallet[0];
    }
  }

  getERC721MetadataSchema = (productKey, brand, imgUrl) => {
    return {
      "title": "Asset Metadata",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": productKey
        },
        "description": {
          "type": "string",
          "description": brand
        },
        "image": {
          "type": "string",
          "description": imgUrl
        }
      }
    }
  }

  handleCreateToken = async () => {
    var now = new Date();
    var productKey = this.state.productKey;//유닉크해야한다.
    var brand = this.state.news.brand;
    var productName = this.state.news.productName;
    var dateCreated = now.toLocaleDateString();
    var tokenUri = this.state.news.tokenUri;  
    if (!productKey || !brand || !productName || !dateCreated ) {
      alert("조건이 맞지 않습니다")
      return;
    }
    try {
      const metaData = this.getERC721MetadataSchema(productKey, brand, tokenUri);
      var res = await ipfs.add(Buffer.from(JSON.stringify(metaData)));
      await this.mintYTT(productKey, productName, dateCreated, res[0].hash);
    } catch (err) {
      console.error(err);
    }
  }

  mintYTT = async (productKey, productName, dateCreated, hash) => {
    const sender = this.getWallet();// 함수를 호출하는 계정
    var feePayer;
    try { 
      feePayer = caver.klay.accounts.wallet.add('0x4e2fc35f9a305401b0f7dedf2dcaa97f3cb0bb9dcae12378d9f31d7644fc34a7')
    }
    catch(e){
      feePayer = caver.klay.accounts.wallet.getAccount('0xee345743f1c137207c9d8212502e3e975157a22b');
    }    
    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',//컨트랙 대납 타입
      from: sender.address,//sender계정이 호출한다
      to: DEPLOYED_ADDRESS,//전역상수/배포된 contract의 주소
      data: yttContract.methods.mintYTT(productKey, productName, dateCreated, "https://ipfs.infura.io/ipfs/" + hash).encodeABI(),
      gas: '500000',
      value: caver.utils.toPeb('0', 'KLAY'),
    }, sender.privateKey)//트렌젝션에 sender가 서명을 한다

    caver.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,//위의 서명이 끝난 transaction을 넘긴다
      feePayer: feePayer.address,//feepayer의 공개주소를 넘긴다
    })
    .then(function (receipt) {
      if (receipt.transactionHash) {//제대로 영수증을 받았다면
        console.log("https://ipfs.infura.io/ipfs/" + hash);//console.log로 보여준다
        alert(receipt.transactionHash);
        // location.reload();//새로고침
      }
    });
  }

  approve = () => {//판매승인
    const walletInstance = this.getWallet();//계정정보 불러온다
    yttContract.methods.setApprovalForAll(DEPLOYED_ADDRESS_TOKENSALES, true).send({
      from: walletInstance.address,//현재 로그인된 계정의 주소
      gas: '250000'
    }).then(function (receipt) {
      if (receipt.transactionHash) {
        alert("토큰등록 승인완료"+ receipt.transactionHash)
      }
    });
  }

  generateProductKey = () => {
    const productKey = crypto.createHmac('sha256', this.state.brand).update(new Date()+this.state.productName).digest('hex');
    this.setState({ productKey: productKey.substr(0,15)})
    console.log(productKey);
    console.log("key 생성완료");
  }
  ///////////////////////토큰 이미지.///////////////////////////
  displayMyTokensAndSale = async () => {       
    var walletInstance = this.getWallet()
    var balance = parseInt(await this.getBalanceOf(walletInstance.address));
    console.log(balance);
    if (balance === 0) {
      alert("현재 보유한 토큰이 없습니다.");
    } else {
      var isApproved = await this.isApprovedForAll(walletInstance.address, DEPLOYED_ADDRESS_TOKENSALES);
      this.state.items = [];//초기화
      this.state.sell_items = [];//초기화
      for (var i = 0; i < balance; i++) {
      (async () => {//빨리 렌더링하기 위해 쓰이는 방법
          var tokenIndex = await this.getTokenOfOwnerByIndex(walletInstance.address, i);
          var tokenUri = await this.getTokenUri(tokenIndex);
          var ytt = await this.getYTT(tokenIndex);
          var metadata = await this.getMetadata(tokenUri);
          var price = await this.getTokenPrice(tokenIndex);
          console.log(tokenIndex, tokenUri, price)
          // this.renderMyTokens(tokenIndex, ytt, metadata, isApproved, price);   
          if (parseInt(price) > 0) {
            this.renderSellTokens(tokenIndex, ytt, metadata, price);
          }

          if (parseInt(price) == 0) {
            this.renderMyTokens(tokenIndex, ytt, metadata, isApproved, price);  
          }
      })();      
      }
    }
  }

  renderMyTokens = (tokenIndex, ytt, metadata, isApproved, price) => {

  var _tokenIndex = tokenIndex;  
  var _url = metadata.properties.image.description;
  var _brand = metadata.properties.description.description;
  var _productKey = metadata.properties.name.description;
  var _productName = ytt[0];
  var _dateCreated = ytt[1];
  var _price = caver.utils.fromPeb(price, 'KLAY')

  var currentState = this.state;
  currentState.items.push({
    index : _tokenIndex,
    Url : _url,
    Id : _productKey,
    brand : _brand,
    productName : _productName,
    date : _dateCreated,
    amount : _price
  })
  this.setState(currentState);
  }

  renderSellTokens = (tokenIndex, ytt, metadata, price) => {   
    var _tokenIndex = tokenIndex;  
    var _url = metadata.properties.image.description;
    var _brand = metadata.properties.description.description;
    var _productKey = metadata.properties.name.description;
    var _productName= ytt[0];
    var _dateCreated = ytt[1];
    var _price = caver.utils.fromPeb(price, 'KLAY');

    // if (parseInt(price) > 0) {
      var sellState = this.state;
      sellState.sell_items.push({
        index : _tokenIndex,
        Url : _url,
        Id : _productKey,
        brand : _brand,
        productName: _productName,
        date : _dateCreated,
        amount : _price
      })
      this.setState(sellState);
    // } 
  }

  sellToken = async(index) => {    
    var tokenIndex=index
    var itemIndex = this.state.items.findIndex(element => element.index == tokenIndex)
    var amount = this.state.items[itemIndex].amount;
    console.log(tokenIndex, amount, typeof(tokenIndex))
    if (amount==null) 
      return;//수가0이하면 함수 종료
    
    var feePayer;
    try {
      var sender = this.getWallet();
      console.log(sender.address);
      
      try { 
        feePayer = caver.klay.accounts.wallet.add('0x4e2fc35f9a305401b0f7dedf2dcaa97f3cb0bb9dcae12378d9f31d7644fc34a7')
      }
      catch(e){
        feePayer = caver.klay.accounts.wallet.getAccount('0xee345743f1c137207c9d8212502e3e975157a22b');
      }
      console.log(feePayer.address);
      var { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: sender.address,
        to:   DEPLOYED_ADDRESS_TOKENSALES,
        data: tsContract.methods.setForSale(tokenIndex, caver.utils.toPeb(amount, 'KLAY')).encodeABI(),
        gas:  '500000',
        value: caver.utils.toPeb('0', 'KLAY'),
      }, sender.privateKey)

      caver.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(function(receipt){
        if (receipt.transactionHash) {         
          alert("토큰 등록 완료" + receipt.transactionHash);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  getBalanceOf = async (address) => {
    return await yttContract.methods.balanceOf(address).call();
  }

  getTokenOfOwnerByIndex = async (address, index) => {
    return await yttContract.methods.tokenOfOwnerByIndex(address, index).call();
  }

  getTokenUri = async (tokenIndex) => {
    return await yttContract.methods.tokenURI(tokenIndex).call();
  }

  getYTT = async (tokenIndex) => {
    return await yttContract.methods.getYTT(tokenIndex).call();
  }

  getMetadata = async (tokenUri) => {
    if(~tokenUri.indexOf("http")) {
      tokenUri = tokenUri;
    }
    else {
      tokenUri = "https://ipfs.infura.io/ipfs/" + tokenUri;
    }
    return new Promise(function (resolve,reject){
      axios({
        method: 'get',
        url: tokenUri,
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(error => reject(error));
    })
  }

  getTokenByIndex = async (index) => {
    return await yttContract.methods.tokenByIndex(index).call();
  }

  isApprovedForAll = async (owner, operator) => {
    return await yttContract.methods.isApprovedForAll(owner, operator).call();
  }

  getTokenPrice = async (tokenIndex) => {
    return await tsContract.methods.tokenPrice(tokenIndex).call();
  }

  getOwnerOf = async (tokenIndex) => {
    return await yttContract.methods.ownerOf(tokenIndex).call();
  }

  render() {

    var imageItems=[];
    if(!this.state.news.images|| this.state.news.images.length == 0){
      imageItems = []
    }
    else{
      this.state.news.images.forEach(element => {
        imageItems.push({
          src : element.binary,
          altText: element.metadata.name,
          caption: element.metadata.name
        })
      });
    }

    var walletInstance

    try{
      walletInstance= this.getWallet();
      
    }catch(e){
      walletInstance={
        address:'0'
      }
    }
    // var walletInstance= this.getWallet();
     

    var DOM_items = [];
    var sell_items = [];

    for(const item of this.state.items){
      DOM_items.push(
        <>
        <Card className="card-coin card-plain" >
         <img alt="..." className="img-center img-fluid" src={item.Url}/>      
          <Row>
            <Col className="text-center" md="12" style={{width:"230px"}}>
            <h4 className="text-uppercase">
              <Link to="product-page">
                <p style ={{color : "white"}}>
                  Light Coin
                </p>
              </Link>
            </h4>
            <hr className="line-primary" />
            </Col>
          </Row>
          <Row>
            <ListGroup>
              <ListGroupItem>index: {item.index}</ListGroupItem>
              <ListGroupItem>제품고유번호: {item.Id}</ListGroupItem>
              <ListGroupItem>브렌드: {item.brand}</ListGroupItem>
              <ListGroupItem>제품이름: {item.productName}</ListGroupItem>
              <ListGroupItem>제품제작일: {item.date}</ListGroupItem>
              <ListGroupItem>제품판매가격: {item.amount}</ListGroupItem>
              <ListGroupItem>제품가격: <input type="text" placeholder= "제품판매가격입력" name="amount" value={this.state.amount} onChange={(e) => this.handleItemChange(e, item.Id)}/>klay</ListGroupItem>
              <Button onClick = {this.approve}> 토큰 판매승인</Button>
              {this.state.isApproved&& <Button value={item.index} onClick={(e) => this.sellToken(item.index)}>토큰 등록</Button>}
              <Button value={item.index} onClick={(e) => this.sellToken(item.index)}>토큰 등록</Button>
            </ListGroup>
          </Row>
        </Card>
        </>
      )
    }
    //판매 중 토큰 검색//
    for(const item of this.state.sell_items){
      sell_items.push(
        <>
        <Card className="card-coin card-plain" >
         <img alt="..." className="img-center img-fluid" src={item.Url}/>      
          <Row>
            <Col className="text-center" md="12" style={{width:"230px"}}>
            <h4 className="text-uppercase">
              <Link to="product-page">
                <p style ={{color : "white"}}>
                  Light Coin
                </p>
              </Link>
            </h4>
            <hr className="line-primary" />
            </Col>
          </Row>
          <Row>
            <ListGroup>
              <ListGroupItem>index: {item.index}</ListGroupItem>
              <ListGroupItem>제품고유번호: {item.Id}</ListGroupItem>
              <ListGroupItem>브렌드: {item.brand}</ListGroupItem>
              <ListGroupItem>제품이름: {item.productName}</ListGroupItem>
              <ListGroupItem>제품제작일: {item.date}</ListGroupItem>
              <ListGroupItem>제품판매가격: {item.amount}</ListGroupItem>
            </ListGroup>
          </Row>
        </Card>
        </>
      )
    }

    if (walletInstance.address ==='0xda88c1bd96a03b391d1983c2330ff961c9a8c255'){ 
    // if (walletInstance){
            
      return (
        <>
        <IndexNavbar />
        <img alt="..." className="path" src={require("assets/img/blob.png")} />
        <img alt="..." className="shapes circle" src={require("assets/img/cercuri.png")} />
        <div className="wrapper">
          <div className="page-header" style={{display : 'inline'}}>
            <Row className="row-grid justify-content align-items text-left">
              <Col lg="12" md="6">
                <h1 className="text-white"></h1><br/>
                <h3 className="text-white mb-3"></h3><br/>
                <h3 className="text-white mb-3"></h3><br/>
                <div className="btn-wrapper"></div>
              </Col>
            </Row>
            <Row className="row-grid justify-content align-items text-left">
              <Col lg="12" md="6">
                <h1 className="text-white">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  Our products 
                </h1><br/>
                <h3 className="text-white mb-3">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  크립토 베리 에서는 본사에서 직접 받아온 제품만 판매합니다.
                </h3>
                <div className="btn-wrapper"></div>
              </Col>
            </Row>

            <div className="section">
              <Container>
                <Row>
                  <Col className="col-md-12 col-lg-6">
                    <div className="carousel slide">
                      <Row className="justify-content-between align-items-center">
                        <UncontrolledCarousel items={imageItems}/>
                      </Row>
                    </div>
                  </Col>
                  <Col className="mx-auto col-md-12 col-lg-6">
                    <h2 className="brandname">BRAND: {this.state.news.brand}</h2>
                    <h2> PRODUCT NAME: {this.state.news.productName} </h2>
                    <h2 className="main-price">PRICE: {this.state.news.price} KLAY</h2>
                    <h2 className="category">Description</h2>
                    <h2 className="description">{this.state.news.description}</h2><br/>
                    <div className="pick-size row">
                   <Col>
                   </Col>

                    <form name = "product_token">
                      <p>관리자모드: {walletInstance.address}</p>
                      {/* 토큰 URI: {this.state.products.tokenUri1}<br/> */}
                      <Button className="btn-simple btn btn-primary"  onClick={this.generateProductKey}> Generate key </Button>
                      <input placeholder="Product Key" value={this.state.productKey} label="Product key" readOnly/><br/>  
                      제품이름: {this.state.products.productName}<br/>           
                      브랜드이름: {this.state.products.brand}<br/>  
                      {/* <Button className="btn-simple btn btn-primary" style={{float: "right"}} onClick = {this.approve}> 토큰 판매승인</Button> */}
                      <Button className="btn-simple btn btn-primary" style={{float: "right"}} onClick={this.displayMyTokensAndSale}>토큰확인</Button>
                      <Button className="btn-simple btn btn-primary" style={{float: "right"}} onClick={this.handleCreateToken}>토큰생성</Button>
                    </form>
                   </div>
                   </Col>
                  </Row>
                 </Container>
                 <h4>-----------------------------생성한 토큰----------------------------------</h4>
                 <Container>
                  {DOM_items}
                 </Container>
                 
                 <h4>-----------------------------판매중 토큰----------------------------------</h4>
                 <Container>
                 {sell_items}
                 </Container>
               </div>
             </div>
           </div>
           <Footer />
       </>
     );
    }
    
    return (  
      <>
        <IndexNavbar />
        <img alt="..." className="path" src={require("assets/img/blob.png")} />
        <img alt="..." className="shapes circle" src={require("assets/img/cercuri.png")} />
        <div className="wrapper">
          <div className="page-header" style={{display : 'inline'}}>
            <Row className="row-grid justify-content align-items text-left">
              <Col lg="12" md="6">
                <h1 className="text-white"></h1><br/>
                <h3 className="text-white mb-3"></h3><br/>
                <h3 className="text-white mb-3"></h3><br/>
                <div className="btn-wrapper"></div>
              </Col>
            </Row>
            <Row className="row-grid justify-content align-items text-left">
              <Col lg="12" md="6">
                <h1 className="text-white">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  Our products 
                </h1><br/>
                <h3 className="text-white mb-3">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  크립토 베리 에서는 본사에서 직접 받아온 제품만 판매합니다.
                </h3>
                <div className="btn-wrapper"></div>
              </Col>
            </Row>

            <div className="section">
              <Container>
                <Row>
                  <Col className="col-md-12 col-lg-6">
                    <div className="carousel slide">
                      <Row className="justify-content-between align-items-center">
                        <UncontrolledCarousel items={imageItems}/>
                      </Row>
                    </div>
                  </Col>
                  <Col className="mx-auto col-md-12 col-lg-6">
                    <h2 className="brandname">{this.state.news.brand}</h2>
                    <h5>Wallet</h5>
                    <div className="stars stars-right">
                      <div className="stars text-warning">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star ml-1"></i>
                        <i className="fas fa-star ml-1"></i>
                        <i className="fas fa-star ml-1"></i>
                        <i className="far fa-star ml-1"></i>
                        <p className="d-inline ml-1">(8080 customer reviews)</p>
                      </div>
                    </div> <br/>
                    <h2 className="main-price">{this.state.news.price} KLAY</h2>
                    <h5 className="category">Description</h5>
                    <p className="description">{this.state.news.description}</p><br/>
                    <h5 className="category">참고 LINK</h5>
                    <a href="http://www.naver.com">www.naver.com</a>
                    <div className="pick-size row">
                      <Col className="col-md-4 col-lg-2">
                        <label>
                          &nbsp; &nbsp; 수량
                        </label>
                        <div className="input-group">
                          <div className="input-group-btn">
                            <button onClick={this.handleClickMinus} type="button" className="btn-round btn-simple btn btn-warning">
                              <i className="tim-icons icon-simple-delete"></i>
                            </button>
                          </div>
                        </div> 
                        <input id="myNumber" type="text" className="input-number form-control"  value={this.state.value} onChange={this.handleOnChange}/>
                        <div className="input-group">
                          <div className="input-group-btn">
                            <button onClick={this.handleClickPlus} type="button" className="btn-round btn-simple btn btn-warning">
                              <i className="tim-icons icon-simple-add"></i>
                            </button>
                          </div>
                        </div>          
                      </Col>

                      <Col className="col-sm-6 col-md-4 col-lg-4">
                        <label>Select color</label>
                        <select>
                          <option selected value="choice">==선택==</option>
                          <option value="Black">Black</option>
                          <option value="Brown">Brown</option>
                          <option value="Gray">Gray</option>
                          <option value="Navy">Navy</option>
                          <option value="gita">기타</option>
                        </select>
                      </Col>
                      <Col className="col-sm-6 col-md-4 col-lg-4">
                        <label>Select size</label>
                        <select>
                          <option selected value="choice">==선택==</option>
                          <option value="Extra Small">Extra Small</option>
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>
                          <option value="Extra Large">Extra Large</option>
                          <option value="gita">기타</option>
                        </select>
                      </Col>

                      <Col>
                     <Link to={{
                       pathname:"/order-page",
                       state:{
                        //  id:this.state.productKey,
                        brand:this.state.news.brand,
                        productName: this.state.news.productName,
                        price:this.state.news.price
                       }
                     }}>
                        <Button
                        className="btn-simple btn btn-primary" style={{float: "right"}} >
                          <i className="tim-icons icon-cart"></i>
                          구매하기
                        </Button>
                     </Link>
                     </Col>

                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
              <div className="section">
                <div className="container">
                  <Row>
                    <Col className="ml-auto mr-auto text-center col-md-6">
                      <h2 className="title">Not convinced yet?</h2>
                      <h4 className="description">정보가 더 필요한가요? 다른 사람이 우리 제품에 대해 말하는 것을 확인해보세요. 그들은 그들의 구매에 매우 만족합니다.</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-md-3" >
                      <div className="card-testimonial card">
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img alt="..." class="img img-raised" src={require("assets/img/girl11.jpg")}></img>"
                          </a>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-body">
                          <p className="card-description">크립토베리에서 10번 넘게 구매합니다. 히히</p><br/>
                          <p className="card-description">믿고 사셔도 좋아요 ㅎㅎ</p>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page">
                              <i className="tim-icons icon-single-02"></i>
                            </Link>
                          </button>
                          <h4 className="card-title">효정님</h4>
                          <p classNamee="category">@hyojung</p>
                        </div>
                      </div>
                    </Col>

                    <Col className="col-md-3">
                      <div className="card-testimonial card">
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img alt="..." class="img img-raised" src={require("assets/img/man1.jpg")}></img>"
                          </a>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-body">
                          <p className="card-description">명품샵 가기는 귀찮고 그렇다고</p><br/>
                          <p className="card-description">인터넷은 가짜 같은데, 여긴 그 생각을 깨줬습니당</p>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page">
                              <i className="tim-icons icon-single-02"></i>
                            </Link>
                          </button>
                          <h4 className="card-title">Olivia Harper</h4>
                          <p classNamee="category">@oliviaharper</p>
                        </div>
                      </div>
                    </Col>

                    <Col className="col-md-3">
                      <div className="card-testimonial card">
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img alt="..." class="img img-raised" src={require("assets/img/girl2.jpg")}></img>"
                          </a>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-body">
                          <p className="card-description">물건이 정말 좋고 예쁩니다!!! &nbsp; 진짜 최고^^</p><br/>
                          <p className="card-description">cryptoberry very nice!!!</p>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page">
                              <i className="tim-icons icon-single-02"></i>
                            </Link>
                          </button>
                          <h4 className="card-title">James Logan</h4>
                          <p classNamee="category">@jameslogan</p>
                        </div>
                      </div>
                    </Col>

                    <Col className="col-md-3">
                      <div className="card-testimonial card">
                        <div className="card-avatar">
                          <a href="#pablo">
                            <img alt="..." class="img img-raised" src={require("assets/img/man2.jpg")}></img>"
                          </a>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-body">
                          <p className="card-description">한국에 놀러왔더니 이런 사이트도 있고,</p><br/>
                          <p className="card-description">배송이 엄청 빨라서 좋네요</p>
                        </div>
                        <div className="icon icon-primary">
                          <i className="fa fa-quote-right"></i>
                        </div>
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page">
                              <i className="tim-icons icon-single-02"></i>
                            </Link>
                          </button>
                            <h4 className="card-title">DELE ALLI</h4>
                            <p classNamee="category">@delealli</p>
                        </div>
                      </div>
                    </Col>
                  </Row>  
                </div>
              </div>
            </div>
          </div>
          <div className="section related-products">
            <div className="container">
            <Col className="col-md-8">
              <h2 className="title">You may also like</h2>
              <h3 className="title">고객님을 위한 맞춘 추천 상품</h3>
            </Col>
          
            <Row>
            <Col className="col-md-6 col-lg-3">
                  <div className="card-product card">
                    <div className="card-image">
                      <a href="#pablo">
                      <Link to={`/new-descript-page?index=1`}><img alt="..." className="img-fluid rounded shadow-lg" src="data:image/jpeg;base64,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"/></Link>
                      </a>
                    </div>

                    <div className="card-body">
                    <h6 className="category text-warning">Trending</h6>
                    <h4 className="card-title"><a href="#pablo" className="text-white card-link">GUCCI</a></h4>
                    <div className="card-description">남성 지갑 판매량 1위 구찌 597606 96IWT 8745</div>
                    <div className="card-footer">
                      <div className="price-container">
                        <span className="price">0.12</span>
                      </div>
                      <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                        <i className="tim-icons icon-heart-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Col>

              <Col className="col-md-6 col-lg-3">
                <div className="card-product card">
                  <div className="card-image">
                  <a href="#pablo">
                  <Link to={`/new-descript-page?index=2`}><img alt="..." className="img-fluid rounded shadow-lg" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhMTExQVFhUXExoWFhUYFxcWFxoXGBcYGRgaGRoYHSggGhsmHRUYITEhJSkrLi8uGB8zODMsNygtLisBCgoKDg0OGhAQGi8dHR0rLS0tLS0tLS0tLS0tKy0tKy0tLy8rLS0tLS0tMC0tKystLSsrKy0tLS0rLS0rLSsrLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQIDBAYHAQj/xABIEAABAwIDBQUEBQcLBAMAAAABAAIRAyEEEjEFIkFRYQYTMnGBB5Gh8CNCscHRFFRicoLS4RckM0NSU3OSk6KylMLT8RUWhP/EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBgX/xAAoEQEBAAIBAgUEAgMAAAAAAAAAAQIRMRIhAwQFNIEyYXGxQVEiJMH/2gAMAwEAAhEDEQA/AOuIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICK3WrNYJc4NHMkBROK7UYZn9Zm/VBPx0+KjcTMbU0i1Gv27pCzabj+s5rPv5wvB2tquEtoW8qj+H6DT8x0UdcW6K29FqB7S4nhR9zHf97mjkvHdpcSP6n4U//Pz+HuTrh0NwRad/9oxA/qR5ZX/9pd89bI7tdVbc0J8m1x9tP5806odFbii0lvtEpgw6kR+2PvAWbhu3mEd4i9nUtke9sp1QuFbSi1Kv28oCuyjTY6pnMNqZmtYXROUaunhcCT6TK/8AylYjM2kyIn+kkka2hqncV6amEVuhWD2hzdCJCuKUCIiAiIgIiICIiAiIgIiICLxzoEnQarmvaztw55dRwphgs6qOOnhjh1H4KuWWlscbk2/bnajD4aQ52Z8eFuvGJPDRadtHtzXqSKYFJvPUx69PJafRJc45QXv1Jtx62A9fisyps2oDvROUEBozXk2kix0vlHG9lncrWsxke4rHPfd9RzvWR7+AtzCxm1ZiGl3kC/roJHyFMbP2MzvGTJc2S7Pw6Auub3tw81PMwTZ0B+PmFVO2mU8S4GACIuRut9Tmc08dY4++qntXEP3WMe4R4jXDGXJFtx03B4qar0QQWhs77y4tbJjMXZgdDwEazKgMTV+keATGbjbnrOhueA9VOxlTiXf1dH/qah49GL38gxR+pS/6h/pE0+HzKyNmU+7wtbFloeWPZSptd4c74lzh9aBEA2k3mFPtoYw0aApU6VSrUw/ePqnumubncS1tNriLNa28iDm4Kt8TV4TMfu1h9DFN1bTH/wCh330ViYnaGJpCSHRectebAEkx3YtY/N1N4lmIdhxXe2nktNVppgkPMNzMa6xvrAN7rXsZi4Y+9srp1tuu1jz4/erS7iLNGIxDwA5150u10+V7jrCt1HQbtgW1aR9wHH4rYmUmlriQQXNysAbZxGhmLHMSdVMuwrSBIGl4+37FGzbnWMfLQWkgtIc1wM5XC4INxMgX10uuodm9vCtRa61xMCYBvnaOgdmjkC1artvZdMODi0CaZv1Bk3udJv8Aio7ZFXuDkkyTmykXBgAi8dP8pVpUXu6FU7TjBk5m5qRcCYN2h3EcDvWIni3yW17M2jSxDBUpPDmnlqDyI4HouT46t3jC1x4EGDwOpseFj+yFruwdu1sFVzMdBBLXNPhIEyHDSOR1VurSvRK+hUUT2b29TxtEVKdiLPYdWuiYPTkVLLSXbOzQiIiBERAREQEREBEWHtjHjD0alV2jWyOp0A95CDSPab2jLf5pSMEiap6HRv4+i0TZWznV3QN2mPE7ryE8ePRYuLrPr1SSZfVfc66nXyEfBb1gm08PTa1t4FgLknmI1km5WFv8ujiaYOzaHdMaG5YcJ0c5wm8uvvWjkpjAURDibuLiHE30JAA6RoOEqxh9nkAEuhwbAiCG9Li4tHormGrhu4+A6Tf+1JOk6nUkBQh7tCmIa7R2YAGY1uZ4kdOixamKeQ4Bw3WzmbInUmDMMMDrdZGJrCpFNhkghxeLhoaeYPi6Lx+AIa4NcST4gYAdPAwLWtbkgyu6AZDRbgPtn3n3+7n20aw/Kq7eOaR/lbOgm0adTyW9txrHNMw08QTBEWv8/bfl/aF84ms5p/rXQR0MCD6KcZtn4nidGq2/Ym0qTaVbDYnMKNWDnaJNN7YIdHEWHu6qRqbdwmWm0VvpqVB9FmI7t8BjoAGXi4CeNpdzEc9obVBGV4IPNoEf5bX8lcOPoj63nuuHwhVy8PbfC3KbkTeMxrO7bh8PmLA/vKjyMpe4NyttwAE6zxN5tBdocTlpmmPHU94bxPSYjynosfE7Xi1Nsn+04QPPLx9VHtYSXPcS5xmTxV8cdRh43i9Pb+XZxRDmZSJBEEGw+bDioylinsaIIcJIAMufExJjURNgBw6rObjWNY1xcDLZsQS7TwjisSls8kBzjlu4hog5SdLkTx06+Sq1e4Rsl7nXcIEkWDCA4ZQTIBJkgnWVGbYoDKXRdlxz5R5EW9VIsqd25wfEuuKmgMBog8G8ANZWJtSq3KWAZnOGUNvMnnxA1UCOoVTHG1vn3g+q17beHLX5wLGzuNx/CFO1KJY6HGZaDNuMnl526DmrGIa13i0Nj5fhqrbFPYvtIcFiG1CT3bt2q3m0nXqWm49Qu/U3hwDmkEEAgjQg3BXzDiKeR7mTppfgfn7F2P2Rba77DOoOO9QIy/4bpy+4hw8oV8bq6Uzm5tvqIi0ZCIiAiIgIiIPHOgEnQXK557TNttdQpUmE77i4zIOUbotyMu15D03TbGIaKbmyMxIAEi8kWva4+C4z2z2g6tiKj3gAsaKZIPiyi5iYGpFoFhzWOeffpjbw8O3VVXZvCAtfXcJaHtaP1QQXenhB8ipyi0EmLOLhlaLizvE0wLeI+R6qx2ao/R0WOFg0vyjjUBkl03GsgDgegU5i6LXNcDoBMi0ReR7lWpZPz6qLxzoe8QCXBuWx00AFjBkzdKeJqNDQYMgXhxi078cZjlqeSydnMGTMZLnE5iYJLgYj00Hkgx9n0xmGUyG0y12bd4jKNL6O9/VSY1usHG07scN15dlmeEFxDuJFirFXFPIInKBqWh1wfFlJsLcL6lBju3mtbHhkuLRJBBnWCCCYNuXRaHtqDXrRp3r4tH1jwXVjSAAaBAGgHL5K5Ztwfziv/jP/AORVsOXN5r6YhzTXkLJheFqjPl970nHfl9/esYtVzJY+R+xXMqP0Pkr48PiepdvM5T8fqOgtIyy6ZczK0AWda0EtsczvhPBTd8oB1gTefnVWKFIOpNaRINMAzYXAn16rAp4ioxk+ISQ2ZL9YGn1ddOQWbZe2pAcwkNgtcBOknLr6A3j7VEYdl2RIeXB2WLtBG9eNI+I6KXwDMznOddwAAtDQwgGwNxJ1B6q3tOiCwuMgsGYOGoIHAHW3Dr7iWHtmiS0OAu028jrefL4qHm0jl93XzUrWrvjI4NlwiZMRA1trNviodhN58487GfUH3pBG4zCyx5a2MkHpxn4QfNTHsy2r3GOpSYbV+id+1GX/AHBvvKxHEg2Eh1i2wB1I53v01UBhaxpvDmm7HyD+q6x+Cuj7PqVFYwWJFWmyoNHsa4ftAH71fWrAREQEREBeL1WMTimsgE3cYaOZ+RPooysk3Uybuo0rH15cwPz1Kjny+kAwd299MSAeUlrZJuJHnzMYN73tpOgOdVIOkWO9YH9E6FdRwI/nLSXh1UE1KrGMcaWUlzXmcpggNeRJBLrHro3ZumKmLe7UM7w31BL4E+hcuTw53uTrzymtNhoMNJzA67ILGnSCYs4XmY1tpfVZuJxDQ0yJzCA3mTaPI2voqMcBlBI3c4zTpEGJ6ZssqNw7QXAtgOztytEkgAwSD/Zyhx8itGTKw+z3Nh2YB8AeEGI1DufC/wCir+BeA3I4Q4WdeSSbyDxnW33LMI6fN7FRWOIzPBaMxc3LwdlLQAW24HMT5FBkYp3eFrGeIOzF3AC48iTJESrTsE5rSGnMJlzbAO3g6x4D8Aq9mNGY5btDACRYTeOkga+izst+Z/HSyCy3ENc2RYa3tE8Dy9Vy7bTpr1yNO+f/AMit6cWEMFm5QC52pDhaH21LibzwlaHtSO+rREd6+I0jMdFfBzea+mMQL0hAirny9F6N7b5rwqmpofIqoql2h8itMeHwPU/d5/mfqOqUK7W02ucbZZPHhwjW3JYVLZxdDzDd5zmiAXDNJFzqLzHXosVmUtJJaNyGgXkhoMsvrLhpy0stgvlEzMX5rJsj8M8te4VBvOMh31SGgWgaRbUmZlU7RqNDC0jMXNytboSXDSeHG5VW02iWZgC3K8bx3c27Ek8cuaPmYzDtBc1zSM5qAhoBzgHUG/hyiUS9Zs97TnzNDyB9UR1kSLydeMKMxYADXQQ5sNqAmSD6CCSDPotoqDz+efvUDtNrcz5bLszct75S1oAHMElwMdUgisTTkHh1nl115qGx9Eh7TqHNsRN4sZnjoPRTNN0gdOPlcfDjHFR21DDOeR0+8QQfXL7irxF/t3L2d1s+zsMeTC30a4gfCFsa537Nu1VBuEZSq1mhwe4NB3TlMET6k3XRFpOGOXIiIpQIiIC13G03flhJMD8mIpTpnzgOPnD2jyJ5LYlre3ca7vu7aG2pl0uAgHNTE+jXvtxiFh491jGvgzdafgnGniaNJtJzB+Tuq4hpr1S5hzvc2HA3PjN4G+66huydJ4z1RfO9wyzAysDYLXOk2LyOtuqr7UbRrPw7aRjvap7yrUZlAOGbmytc5oBc4w2ROpiOKydg0S+hSazWKjnHgA927xmTkkfqlUwl01z1tLYep3zwT4QC5rReSLSeRAOl/EFkY2iCxx0y7wIvGW9hxHRWqMsqNDrjKWsItxkh3GYaL6WV/G1GhjgZOYFrW6ElwO6J0VlGKMU8Q0huYiZzWtBvA8UmFk4GmMgdJJdvFxABLiOhtwFli0cHUbvZm5yBbLawOt/FPHosrAPbkDRIygNdJkhw5wIPDTmgtYqnle1zfE6xB0IaCb8teHTRWH4pzt3wiQxxBkw6AYtBEnLM9eCvY4945rGAZhJcTcAOEXHGVZdh3U2geJoc0vAEOs6SQZ8MiY1gIJDuw1oAEACI6cOPl86cq2w0DEVwNO9f/wA3LqragcJFwRI1uCuWbYdNeuR/fPv+2VfBz+a+mMIL1eL1Vy5ei9F9tPzXhVDtD5KtUv0K0x4ef9T93n8fqOqU8MHUmsvGQARaLRI5H8ViU8Y5jZcA4SQHSGk3AAIiwtrrbyWfhqjW02uJAAbJ5C38fnjH0cI9wDhugFxbNzBktDgDBFyfd5rJsvYNneOc5+8W7rWi7Q0gGQfrTOsdOC82jRBaXSQWDMHATEAn1HQqvCVIe8PEPMED6pAaNOJjjMar3aD2im4OJOZpa0SJOa0CeKJRr8a9sNc0BzoiXgAwJk2seEDmF7gqQLe8O891y4iIOkAcOUaIzB1QQ8lubKN0zB1knkbj3KvAVBkAkhw8c6tcTMxNp+woILalDu6p1DXiR53/AI/7VGYunLT1HX5H8VP9oQHBobJe3M4xfKIEk8vDbyKgHPn5+Fvm6tBE4V7nUqzMgIIpvL8m8wMJaIcNBNQTOst5BfRfZfbVPF0Q5maWQxwdEghoM21BnXzXC9lbXq4J/ftbmotqDvWWh/eNfuHoWsqEcLLrXsrosGEfUpiGVMRUdT1/owcrBcA2g6gK2O9/ZTPhuSIi0ZCIiAoraGyS+oajXZXGkackSBJBDh1kfYpVWsS0ljg2MxaQ2bCSLT6qmeEzmqtjlcbuOU4utSOBxlRgllJlHCUSdcjS17zf6zsoJPQLJ7KUCygxp/u2E/rEHrrEWUQzDl+EZhYu/HfS8srGNa74ZlsVR3dOOUbmXMRIGU6SOc5dOhVcpJNRpLb3q5j2jckSC42JgE5TlBnQTz5BYOCaMzXNIkvEAXcGxob+HKJ9Qs3DDvXEviGjdZMje4kjXlpaCvcfThudpIc3Qga8Mp5i/HiqJZZF/n7VD4sCXzZxeW5pgtBFrSLZZKyX49wluWHQT4gbARI5/q20KycPhwBm1cbl3nrE8NbIMbZzILgIyw07vhDrz5Wy269b5NUbromcpjzAt5rFqg03jJcOBJp6DdGoPDUTa/2UPxRfut3QXZHO4jnEXBvE80GJ3bSWBtgQHEuMh8WEidZPHkOS0DaIHfVYuO9fHG2YxddU/JWNEZRHGwkxoTbXX3rl+1aeWtWAm1V46+Iq+Dm819MYYReooz5ej9G9t814qXaKshUu4q+PDz/qnu8/j9RvtFk05mAymIBOhDQ6QJMiSBHp0U+TYcJ+be4fBYeHwbXUaYiCKYLXAXaYEEEjmPiFTSx5DZeCdRmA3XGcoAkzPU21WTY2gwFzAQSCx8CYl27F5A0kx06LAoXLakyTUblky6DwIJjS8+qkaVPviTUFm7op63IBl3AnkRwKpxuGA32kNe24dFoANnQLiPeiV6qPnjxUFtA5XVDvZgWhpB0BaADE3lxI04RZSBx5AALHZjEC1zEkiXQBHA9Fbw2HDx3r4c834w2LQA644T1lBh7Op5XObYywEwc3EjU3gxppbqtdx2H7t7mcBoen/oiTzlbJiG904FnheYcwCJMEy3QTa82gKK2w8PyvDSCLEkaxBiJ1E+9TBEVaxFKsyJbUYGkcsr2va7jcFseRdzXYPZZWnBNb/ZykRyLGj/k1y5QaNufz8f4rpHsoxDCypTE5mMpgg8WzUgj3j3haYqZx0BERXZCIiAiIg5ts2oaWJx2HtHfmp5AmWx5yFViqJqPOUwAGhzr6guMCDfW/mFOdptltbUdiRZz2NY6LGWEkOnygfsqMwQhkfpOE68eepvKzza4reDfDnB9n2sPCWgajibkzpcqraLxkygy4kZRaTBDgfIcVax7gHEuzQ2mHCDB1MnUTGUW6qjAsIewky5wdMX4jnMEaW+5ZrPHUKjQ4iCTO7LnFtvqzqeMW1CzaNRpa3KbAQDbhw8+iu8fn54qFqGwylwc5zhqQ3xGRbQgA36lSMnHbz2hm8Q12a5AAMG5GhlsjpKs905gYH+HM3M8STYzedBmGs6c1k7OEGoOrTzMkCxdqfXormK/o3nWGOtEizTY+qC7nBvP2XHMR9y5dtyPyiv8A4r76/WK3zKczWMc+IBILiJEQIMaTwHJaBtMfTVdP6R2lhqVbDlzea+mMSEXoCQoz5ei9F9t814qSq145Xx4fA9U93n8fqOrbOcO6pkmNwdNANT8VG0qD3AQJaCYzSMwkxIi2uvRWqbXGlqS1tMa8wJIcIuNBz9VO8B/6A+YWbZg4B4zPBGU2GT9ENEQePppMK9i47t4JgFhFtTIjQanp/FWsc0F7ZLhuOMtG9q0W4xefRYbAXZXneb3gyzpBsIbFjqVCVsYeoSHuYDYbpOpOpEi2jbK/gXgsiby4kREOLiTI1iSpOp+Pu6KHxzQ19V0kRl0GsCd6AbXjogtbW0YBd2ezR5OadNBfXyUayhENqADNJLhe5DoBtrJN+g5rNwlJwqNL7udTdJNyILbi1gc2nQKvHtljp5T5RBkz71MQg6dOJadRaFsns8rd1jmjhUY5nwzj4sI9QoGrZ83IJIk62gX6zHvKysLXNKoyq3xMeHD0IN+lvtWkRe8dtRWsNXbUY17fC5ocPIiQrquxEREBERBF9oaYdSE3hw+9abSxJp7sEjMWsNgNfDc2i9+nv3jbQ+hcYJi8C5gcuq0anhalnEA/olxvJm+oDhI+Kyz5aYcL2Hoip9I/eJNhwZlMcZ3ufOFbrt7sh7IGYhrmx4pOoAjeueiu4KqMsTvSXOBEQXOJ0PCTYq3tGuIa0GX5wWtteLH0gm6rpd5U2gQLNMgSc2jRNs0HS3DhdVU8C0CXbzvrOMGZ6fD0WC+i4B5hpJBGsuAIgQYuYnWFmUsewiztLQ7URqCPvQW5NJ2VsuY4F2UeIRrHMefRe1MYXbrbZjlLzYDnGt/MRqrGJxQqPHdmYaQ4zDRmggSNTbhKszkDZhwBBc5vitJNuIm9r9FIkDgqYEZfXjblGnH515ztxmWvVBvDuUeVguhjaVMic4jnI+Qei532hxDXYiqQbZh/xbKnDlz+Zn+LCC8VAqhemqEz5ff9FsnltX+7/wAVLx2ioNYKk1grY8Ph+qT/AG8/j9R1KngwabIs7KCDc3sb3g3HFV08fugvaeVgS03gBp5zHL4LGwe1qbabCXjwNsLu0A0FysWm1xa2coABhrr/AKuYaCx1HMLNqk2N74y+zWy0NmHTxJI0sYiYuFTiMPk32ZQWXg+EgAg9BbjCx8LtBrC8PhpJnhlgANEH9nQwVVjNosLHMBlxEANiT6cPWNEGS3HC0h08spnSTHMQrVPDd79I/wCsBDQZAA0BIjNwN1iguzZ3BjuTS7TnBy24WWVs/GtyBs7w8QNocTNxPzZBiYqgaRzsu07rmm8SbFpMnid0alYmNxYILWgybXEZcxyy6fWOcKUx2KaQwNMuDwco1iCJ6C9ibSFG4vDnK9zmmXAjNI3fqguAvaZtKCvA7HFVzqbdRSe4XuS1pI156eo5KNpPkX8j8/Oq3vsThj39R+rW0ssxbM5zSAOdmn39Vo3aTD/kuKq0vqhxLP1TvN9wIHorzhEvfTons7x+eg6iTek636rrj4z7wtsXJuw208mKpmd1/wBG710+yfRdZV4zyncREUqiIiDwrWtsbCrVJNFzGEn6wzN9wg/FbMiaNuZYrsXtJzs3f4WYA8LxoSZ1N7rGp9gdpNIIr4eee/eedrrqyKNRO65cexG0/wC/w/8Av/dVip7O9oOma9C5JI3tTr9VdYRNQ3XKaXs92g0kjEURMf2uH7PVVO9n20DP85o31sf3V1RE1Ddck/kyx1pxVIxpY/gsat7JMW4lxxFKTrIeuyImkXvy4uPY/i/zmj/lf+K9/kfxX5zR/wAjvxXZ0TUaYeLnhNY3TjH8juJ/OqX+m795P5HMT+dUv9N37y7OiaimWVyu8u9ciZ7J8UBH5XT5f0bv3lfHsxxv56z/AE3fvLqyJo3XJ3ey/GEz+Ws0j+jcLa815T9luLERjKdpI+jOp9V1lE1Ddct/k4x355S/0z+Ktu9mGMMzjKVzJ+iPlzXVkTUN1zDC+zfGMMjG0tP7k8P2uqlcN2JxDfFimu5wyAt6RNQ3UVsbZHcUwzMCBy0UP2y7GtxpplrhTc07zsskt5ai88VtqKTbWuz3Y3D4aDlzvF8z94zzA0B8gtlREQIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIP/9k="/></Link>
                  </a>
                </div>

                <div className="card-body">
                  <h6 className="category text-warning">Popular</h6>
                  <h4 className="card-title">
                    <a href="#pablo" className="text-white card-link">SAINT LAURENT</a>
                  </h4>
                  <div className="card-description">여성 가방 판매량 1위 가죽 마틀라세 스몰 루루</div>
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price">0.13</span>
                    </div>
                    <button id="tooltip320714545" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                      <i className="tim-icons icon-heart-2"></i>
                    </button>
                  </div>
                </div>
                </div>
              </Col>

              <Col className="col-md-6 col-lg-3">
                <div className="card-product card">
                  <div className="card-image">
                    <a href="#pablo">
                      <Link to={`/new-descript-page?index=3`}><img alt="..." className="img-fluid rounded shadow-lg" src="data:image/jpeg;base64,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"/></Link>
                    </a>
                  </div>
                  
                  <div className="card-body">
                    <h6 className="category text-warning">Trending</h6>
                    <h4 className="card-title">
                      <a href="#pablo" className="text-white card-link">PATEK PHILIPPE</a>
                    </h4>
                    <div className="card-description">시계 브랜드 NO.1 파텍틸립을 만나보세요.</div>
                    <div className="card-footer">
                      <div className="price-container">
                        <span className="price">0.2</span>
                      </div>
                      <button id="tooltip300524105" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                        <i className="tim-icons icon-heart-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
                </Col>

<Col className="col-md-6 col-lg-3">
  <div className="card-product card">
    <div className="card-image">
      <a href="#pablo">
        <Link to={`/new-descript-page?index=4`}><img alt="..." className="img-fluid rounded shadow-lg" src="data:image/jpeg;base64,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"/></Link>
      </a>
    </div>
    <div className="card-body">
      <h6 className="category text-warning">Trending</h6>
      <h4 className="card-title">
        <a href="#pablo" className="text-white card-link">CHANEL</a>
      </h4>
      <div className="card-description">샤넬 신상 입고!! 한정판매 중입니다 서두르세요!!</div>
      <div className="card-footer">
        <div className="price-container">
          <span className="price">0.5</span>
        </div>
          <button id="tooltip755498009" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
            <i className="tim-icons icon-heart-2"></i>
          </button>
      </div>
    </div>
  </div>
</Col>
</Row>
</div>
</div>
<Footer />
</>
);
}
}

export default NewDescriptPage;