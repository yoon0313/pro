import React, { Component, PropTypes, useState } from "react";
import Axios from 'axios';
import classnames from "classnames";

import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from "react-router-dom";

class OldDescriptPage extends React.Component {
  state = {products: []}
  componentDidMount() {
    document.body.classList.toggle("Product-page");
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }
  componentWillUnmount() {
    document.body.classList.toggle("Product-page");
  }

  constructor(props){
  super(props);

  var params = new URLSearchParams(props.location.search);
  
  this.state={
    productKey  : '',
    brand       : '',
    imgUrl      : '',
    productName : '',
    dateCreated : '',
    tokenUri    : '',
    price       : '',
    productKey  : null,
    items       : [],
    sell_items  : [],
    all_items   : [],
    products:{
      id           :'',
      tokenIndex   :'',
      index        :'',
      image        :'',
      brandname    :'',
      productName  :'',
      tokenuri     :'',
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

  Axios.get("http://localhost:5000/OldP/products/getOldp?index="+params.get('index'))
    .then(response => {
        if(response.status==200){
          this.setState({
            products:response.data[0]
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
    var brand = this.state.products.brand;
    var productName = this.state.products.productName;
    var dateCreated = now.toLocaleDateString();
    var tokenUri = this.state.products.tokenUri1;  
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
    if(!this.state.products.images|| this.state.products.images.length == 0){
      imageItems = []
    }
    else{
      this.state.products.images.forEach(element => {
        imageItems.push({
          src : element.binary,
          altText: element.metadata.name,
          caption: element.metadata.name
        })
      });
    }
    
    return (

      <>
  
       <IndexNavbar />
          <img alt="..." className="path" src={require("assets/img/blob.png")}/>
          <img alt="..." className="shapes circle" src={require("assets/img/cercuri.png")}/>
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
              <h1 className="text-white">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Our products </h1><br/>
              <h3 className="text-white mb-3">
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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
              <h2 className="brandname">Index: {this.state.products.tokenIndex}</h2>
              <h2 className="brandname">Product Key: {this.state.products.productKey}</h2>
              <h2 className="brandname">Brand: {this.state.products.brand}</h2>
              <div className="stars stars-right">
                <div className="stars text-warning">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star ml-1"></i>
                  <i className="fas fa-star ml-1"></i>
                  <i className="fas fa-star ml-1"></i>
                  <i className="far fa-star ml-1"></i>
                  <p className="d-inline ml-1">(8080 customer reviews)</p>
                </div>
              </div><br/>
              <h2 className="main-price">Price: {this.state.products.price} klay</h2>
              <h5 className="category">Description</h5>
              <p className="description">{this.state.products.description}</p><br/>
              
          <div className="pick-size row">
            <Col className="col-md-4 col-lg-2">
              <label>&nbsp; &nbsp; 수량</label>
                <div className="input-group">
                  <div className="input-group-btn">
                    <button onClick={this.handleClickMinus} type="button" className="btn-round btn-simple btn btn-warning">
                      <i className="tim-icons icon-simple-delete"></i>
                    </button>
                  </div>
                </div> 

                <input id="myNumber" type="text" className="input-number form-control"  value={this.state.value}/>
                  <div className="input-group">
                    <div className="input-group-btn">
                      <button onClick={this.handleClickPlus} type="button" className="btn-round btn-simple btn btn-warning">
                      <i className="tim-icons icon-simple-add"></i>
                      </button>
                    </div>    
                  </div>          
            </Col>

            <Col>
              <Button className="btn-simple btn btn-primary" style={{float: "right"}} Link tag={Link} to="/order-page">
              <i className="tim-icons icon-cart"></i> 구매하기</Button>                  
            </Col>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
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
                          <a href="#pablo"><img alt="..." class="img img-raised" src={require("assets/img/girl11.jpg")}></img>"</a>
                        </div>

                        <div className="icon icon-primary"><i className="fa fa-quote-right"></i></div>

                        <div className="card-body">
                        <p className="card-description">크립토베리에서 10번 넘게 구매합니다. 히히</p><br/>
                        <p className="card-description">믿고 사셔도 좋아요 ㅎㅎ</p>
                        </div>
                    
                        <div className="icon icon-primary">
                        <i className="fa fa-quote-right"></i>
                        </div>
                    
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page"><i className="tim-icons icon-single-02"></i></Link>
                          </button>
                          <h4 className="card-title">효정님</h4>
                          <p classNamee="category">@hyojung</p>
                        </div>
                      </div>
                   </Col>

                   <Col className="col-md-3" >
                      <div className="card-testimonial card">
                        <div className="card-avatar">
                          <a href="#pablo"><img alt="..." class="img img-raised" src={require("assets/img/man1.jpg")}></img>"</a>
                        </div>

                        <div className="icon icon-primary"><i className="fa fa-quote-right"></i></div>

                        <div className="card-body">
                        <p className="card-description">명품샵 가기는 귀찮고 그렇다고</p><br/>
                        <p className="card-description">인터넷은 가짜 같은데, 여긴 그 생각을 깨줬습니당</p>
                        </div>
                    
                        <div className="icon icon-primary">
                        <i className="fa fa-quote-right"></i>
                        </div>
                    
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page"><i className="tim-icons icon-single-02"></i></Link>
                          </button>
                          <h4 className="card-title">Olivia Harper</h4>
                          <p classNamee="category">@oliviaharper</p>
                        </div>
                      </div>
                   </Col>
      
                   <Col className="col-md-3" >
                      <div className="card-testimonial card">
                        <div className="card-avatar">
                          <a href="#pablo"><img alt="..." class="img img-raised" src={require("assets/img/girl2.jpg")}></img>"</a>
                        </div>

                        <div className="icon icon-primary"><i className="fa fa-quote-right"></i></div>

                        <div className="card-body">
                        <p className="card-description">물건이 정말 좋고 예쁩니다!!! &nbsp; 진짜 최고^^</p><br/>
                        <p className="card-description">cryptoberry very nice!!!</p>
                        </div>
                    
                        <div className="icon icon-primary">
                        <i className="fa fa-quote-right"></i>
                        </div>
                    
                        <div className="card-footer">
                          <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                            <Link to="profile-page"><i className="tim-icons icon-single-02"></i></Link>
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
                      <Link to={`/new-descript-page?index=1`}><img alt="..." className="img-fluid rounded shadow-lg" src="https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1566920705/597606_96IWT_8745_001_080_0000_Light--GG.jpg"/></Link>
                      </a>
                    </div>

                    <div className="card-body">
                    <h6 className="category text-warning">Trending</h6>
                    <h4 className="card-title"><a href="#pablo" className="text-white card-link">monblanc ballpen</a></h4>
                    
                    <div className="card-description">
                      마이스터스튁 클래식 볼펜은 고급 블랙 레진 캡과 배럴로 대표되는 특별한 디자인 아이콘입니다.
                    </div>
                    <div className="card-footer">
                      <div className="price-container">
                        <span className="price">9 ETH</span>
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
                  <Link to={`/new-descript-page?index=2`}><img alt="..." className="img-fluid rounded shadow-lg" src="https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1566920705/597606_96IWT_8745_001_080_0000_Light--GG.jpg"/></Link>
                  </a>
                </div>

                <div className="card-body">
                  <h6 className="category text-warning">Popular</h6>
                  <h4 className="card-title">
                    <a href="#pablo" className="text-white card-link">Dior Belt</a>
                  </h4>
                  <div className="card-description">
                    블랙 Christian Dior 앰보싱 나일론 Saddle 벨트입니다.
                    원피스,코트 바지 위에 코디 하실 수 있습니다.
                  </div>
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price">17 ETH</span>
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
                      <Link to={`/new-descript-page?index=3`}><img alt="..." className="img-fluid rounded shadow-lg" src="https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1566920705/597606_96IWT_8745_001_080_0000_Light--GG.jpg"/></Link>
                    </a>
                  </div>
                  
                  <div className="card-body">
                    <h6 className="category text-warning">Trending</h6>
                    <h4 className="card-title">
                      <a href="#pablo" className="text-white card-link">patekphilippe watch</a>
                    </h4>
                    <div className="card-description">
                    세계 시계 브랜드 NO.1을 자부할 수 있는 시계업계 원탑 파텍틸립을 만나보세요.
                    </div>
                    <div className="card-footer">
                      <div className="price-container">
                        <span className="price">555 ETH</span>
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
                      <Link to={`/new-descript-page?index=4`}><img alt="..." className="img-fluid rounded shadow-lg" src="https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1566920705/597606_96IWT_8745_001_080_0000_Light--GG.jpg"/></Link>
                    </a>
                  </div>
                  <div className="card-body">
                    <h6 className="category text-warning">Trending</h6>
                    <h4 className="card-title">
                      <a href="#pablo" className="text-white card-link">TAGHeuer watch</a>
                    </h4>
                    <div className="card-description">
                    대한민국 국가대표 축구선수 손흥민이 착용하는 시계!!! 한정판매 중입니다 서두르세요!!
                    </div>
                    <div className="card-footer">
                      <div className="price-container">
                        <span className="price">78 ETH</span>
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

export default OldDescriptPage;