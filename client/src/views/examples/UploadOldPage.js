import React, { Component, PropTypes, useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Caver from "caver-js";
import Axios from 'axios';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  ListGroupItem,
  ListGroup,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { FormContext } from "antd/lib/form/context";

const axios = require('axios').default;
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);
var ipfsClient = require('ipfs-http-client');//ipfs 클라이언트를 import 한다
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const yttContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const tsContract = new caver.klay.Contract(DEPLOYED_ABI_TOKENSALES, DEPLOYED_ADDRESS_TOKENSALES);

class UploadOldPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: ""
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };

  formatDate(date) {
    return date.getFullYear() + '년 ' + 
      (date.getMonth() + 1) + '월 ' + 
      date.getDate() + '일 ' + 
      date.getHours() + '시 ' + 
      date.getMinutes() + '분';
  }

  constructor(props) {
    super(props);
    this.displayMyTokensAndSale()
    let date = this.formatDate(new Date())
    this.state = {
      file          :[],
      previewURL    :[],
      items         :[],
      sell_items    :[],
      t_index       :'',
      t_productKey  :'',
      index         :'',
      productKey    :'',
      brand         :'',
      productName   :'',
      amount        :'',
      file          :[],
      previewURL    :[],
      binary        :"",
      brand         :"",
      description   :"",
      price         :"" ,
      productName   :"",
      date          :date,
      tokenIndex    :""
    }
  }
  
  
  handleFileOnChange = (event) => {
    event.preventDefault();
    if(this.state.previewURL.length >=3){
      alert("사진은 최대 3장까지 업로드 가능합니다");
      return;
    }
    
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.state.file.push(file)
      this.state.previewURL.push(reader.result)
  
      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  state = {};
  
  handleFileOnChange = (event) => {
    event.preventDefault();
    
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.state.file.push(file)
      this.setState({image : reader.result});
    }
    reader.readAsDataURL(file);
  }
  state = {};

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleValueChange = (e) => {
    let nextStage = {};
    nextStage[e.target.name] = e.target.value;
    this.setState(nextStage);
  }

  getWallet = () => {
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0]
    } else {
      const walletFromSession = sessionStorage.getItem('walletInstance')
      try {
        caver.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        sessionStorage.removeItem('walletInstance')
      }
      return caver.klay.accounts.wallet[0]
    }
  }

  displayMyTokensAndSale = async () => {       
    var walletInstance = this.getWallet()
    var balance = parseInt(await this.getBalanceOf(walletInstance.address));
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
    //가격없는 토큰들(중고판매하지 않고 있는 토큰들)
    // if(price == 0){
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
    // }
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
  
  getTotalSupply = async () => {
    return await yttContract.methods.totalSupply().call();
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

  submitHandler = () =>{
    // preventDefault를 해줘야 확인 버튼을 눌렀을때
    // 화면이 새로고침되지 않는다.
    //모든 입력칸이 채워지지않으면 submit할 수없게 조건문
    // if(!this.state.description || !this.state.amount ){
    //     return alert("모든 값을 넣어주세요")
    // }
    //서버에 채운 값을 request로 보낸다.
    //axious post를 하면 body를 적어줘야함
    const body = {
        //로그인된 사람의 ID를 가져오기위해 
        // price:this.state.price,
        // tokenIndex:this.state.tokenIndex,
        description:this.state.description,
        brand:this.state.brand,
        images:this.state.file,
        date:this.state.date,
        productName:this.state.productName,
        productKey:this.state.productKey,
        price:this.state.amount,
        tokenIndex:this.state.index
        // tokens: Tokens[Token-1].value
    }
     //서버로 보내기
    Axios.post("http://localhost:5000/OldP/products/register", body)
        .then(response => {
            if(response.data.success){
                alert('상품 업로드에 성공 했습니다.')
                //상품업로드 후 랜딩페이지로 돌아감
                this.props.history.push('/')
            }else{
                alert('상품 업로드에 실패 했습니다.')
            }
        })
  }

  sellToken = async(index) => {    
    var tokenIndex=index
    var amount = this.state.amount;

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

      this.submitHandler()
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
    // window.location.reload();
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

  //인호
   //컴포넌트 실행시
   componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
   

  }

  //컴포넌트 실행안할시
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
   
  }

  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };
  
  
  handleIndexOnChange = (event) => {
    event.preventDefault();
    this.setState({
        index : event.target.value
      })
  }

  handletokenIndexOnChange = (event) => {
    event.preventDefault();
    this.setState({
        tokenIndex : event.target.value
      })
  }
  
  handleproductKeyOnChange = (event) => {
    event.preventDefault();
    this.setState({
        productKey : event.target.value
      })
  }

  handleAmoutOnChange = (event) => {
    event.preventDefault();
    this.setState({
        amount : event.target.value
      })
  }

  handleDescriptionOnChange = (event) => {
    event.preventDefault();
    this.setState({
        description : event.target.value
      })
  }

  handleBrandOnChange = (event) => {
    event.preventDefault();
    this.setState({
      brand : event.target.value
    })
  }

  handlePriceOnChange = (event) => {
    event.preventDefault();
    this.setState({
      price : event.target.value
    })
  }

  handleProductNameOnChange = (event) => {
    event.preventDefault();
    this.setState({
      productName : event.target.value
    })
  }

  handleFileOnChange = (event) => {
    event.preventDefault();
    if(this.state.previewURL.length >=3){
      alert("사진은 최대 3장까지 업로드 가능합니다.");
      return;
    }
    let reader = new FileReader();
    let file = event.target.files[0];
    if(file.size >=5000000){
      alert("5MB 이상의 파일은 올릴수 없습니다.")

      return;
    }
    reader.onloadend = () => {
      this.state.file.push(
        {
          metadata:{
            name: file.name,
            lastModifieddate: file.lastModifieddate,
            size: file.size,
            type: file.type
          },
          binary : reader.result
        }
      )
      this.state.previewURL.push(
        reader.result
      )

      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  

  state = {
    };

  render() {
    var walletInstance = this.getWallet();
    let profile_preview =[];
      let i = 0;
      for(let i=0 ;i<3;i++){
        const element = this.state.previewURL[i];
        profile_preview.push(<img style={{maxWidth:'200px'}}  src={element}></img>)
      }
    var DOM_items = [];
    var sell_items = [];

    for(const item of this.state.items){

      DOM_items.push(
        <>
          <button type="button" className="card-coin card-plain" 
                  onClick={(e) => this.setState(this.state.index=item.index, 
                                                this.state.productKey = item.Id, 
                                                this.state.brand = item.brand, 
                                                this.state.productName = item.productName)}>
            <Col>
              <Card className="card-coin card-plain" >
                <img alt="..." className="img-center img-fluid" src={item.Url}/>      
                <Row>
                  <Col className="text-center" md="12" style={{width:"230px"}}>
                  <h4 className="text-uppercase">

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
                    {/* <ListGroupItem>제품판매가격: {item.amount}</ListGroupItem>
                    <ListGroupItem>제품가격: <input type="text" placeholder= "제품판매가격입력" name="amount" value={this.state.amount} onChange={(e) => this.handleItemChange(e, item.Id)}/>klay</ListGroupItem>
                    <Button onClick = {this.approve}> 토큰 판매승인</Button>
                    <Button value={item.index} onClick={(e) => this.sellToken(item.index)}>토큰 등록</Button> */}
                  </ListGroup>
                </Row>
              </Card>
            </Col>
          </button>
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

    return (
    <>
      <IndexNavbar/>
      <div className="section section-signup">
        <Container>
          {/* <Row>
            <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>
            <Col className="item"><h2>OLD PRODUCT REGISTER</h2></Col>
            <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>                
          </Row> */}
          <br/>
          <br/>
            <Row className="row-grid justify-content-between align-items-center">
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: this.state.squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: this.state.squares7and8 }}
                  />
                </Col>
              </Row>
              <div
                className="square square-3"
                id="square3"
                style={{ transform: this.state.squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: this.state.squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: this.state.squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: this.state.squares1to6 }}
              />

              <Card className="card-register">
                <CardHeader>
                <CardTitle tag="h4">register</CardTitle>
                  <CardImg
                    alt="..."
                    src={require("assets/img/square-purple-1.png")}
                  />
                  
                </CardHeader>
                 
                <CardBody>
                  <Form className="form">
                    <Row>
                      <Col className="align-self-center col-md-3">
                        <label className="labels" for="#firstName">User Address</label>
                      </Col>
                      <Col className="align-self-center col-md-8">
                        <div>
                          {walletInstance.address}
                        </div>
                      </Col>
                    </Row>
          
                    <Row>            
                      <Col className="align-self-center col-md-3">
                        <label className="labels" for="#firstName">판매가능한 토큰</label>
                      </Col>
                    </Row>
                    {/* 판매중인 카드 리스트 */}
                    <Col className="align-self-center ">
                      <Card className="card-coin card-plain" style={{ display: 'flex', overFlow: 'auto',paddingLeft: '20px', width: '720px'}}>
                        <br/> 
                        <Row>
                          <Col>
                            {DOM_items}
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <br/>

                    {/* Token Index:{this.state.tokenIndex}<br/>    */}
                    Index:{this.state.index} 
                    {/* <Input placeholder="Token Index" 
                          type="text"
                          onFocus={e => this.setState({ emailFocus: true })}
                          onBlur={e => this.setState({ emailFocus: false })}
                    /> */}
                    <br/>          
                    
                    Product Key: {this.state.productKey} <br/>    
                    {/* <Input placeholder="Product Key" 
                          type="text"
                          onFocus={e => this.setState({ emailFocus: true })}
                          onBlur={e => this.setState({ emailFocus: false })}
                    /> */}
                    <br/>   

                    Brand: {this.state.brand} <br/>    
                    <br/>          
                    
                    Pruduct Name: {this.state.productName} <br/>    
                    <br/>   
                    
                    {/* Price: <input type="text" placeholder= "제품판매가격입력" name="amount" value={this.state.amount} onChange={this.handleValueChange}/> klay */}
                    Price: <input type="text" placeholder= "제품판매가격입력" name="amount" value={this.state.amount} onChange={this.handleAmoutOnChange}/> klay

                    <br/>
                    <br/>
                    
                    Description: {this.state.description}
                    <Input cols="100" rows="1000"
                          placeholder="description"
                          type="textarea"
                          onChange={this.handleDescriptionOnChange}
                    />

                  <div class="profile_img">                      
                    <input type='file' 
                        accept='image/jpg,impge/png,image/jpeg,image/gif' 
                        name='profile_img' 
                        onChange={this.handleFileOnChange}>
                    </input>
                    {profile_preview}
                  </div>
                    
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input type="checkbox" />
                      <span className="form-check-sign" />I agree to the{" "}
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        terms and conditions
                      </a>
                      .
                    </Label>
                  </FormGroup>
                  </Form> 
                </CardBody>
                {/* <CardFooter>
                  <div Button className="btn-round btn btn-primary" size="lg">
                    <Link to="profile-page3"> 
                      <font color="white">판매하기 &nbsp;</font>
                    </Link>
                  </div>  
                </CardFooter> */}
                <Button onClick = {this.approve}> 중고 판매 승인</Button>
                <Button onClick={(e) => {this.sellToken(this.state.index)}} 
                  type="submit" >중고 판매 등록</Button>
                {/* <Button onClick={(e) => this.sellToken(this.state.index)}>중고 판매 등록</Button> */}
              </Card>
            </Row>          
        </Container>
      </div>
      </>
    )                    
  }
}

export default UploadOldPage;