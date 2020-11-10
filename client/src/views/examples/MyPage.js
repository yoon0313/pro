import React , { Component } from "react";
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
import { Link } from "react-router-dom";
import Caver from "caver-js";

const axios = require('axios').default;
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);
var ipfsClient = require('ipfs-http-client');//ipfs 클라이언트를 import 한다
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const yttContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const tsContract = new caver.klay.Contract(DEPLOYED_ABI_TOKENSALES, DEPLOYED_ADDRESS_TOKENSALES);


class Mypage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: "",
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
  
  constructor(props) {
    super(props);
    this.displayMyTokensAndSale()
    this.state = {
      tabs: 1,
      file : [],
      image : require("assets/img/lora.jpg"),
      videoId: '',
      title: '',
      imgUrl: '',
      author: '',
      dateCreated: '',
      tokenUri:'',
      price:'',
      productKey:null,
      items :[],
      sell_items : [],
      all_items: [],
      DOM_items: []
    }
  }

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
  
  getWallet = () => {
    console.log("getWallet"+caver.klay.accounts.wallet.length);
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
          // console.log(tokenIndex, tokenUri, price)
          this.renderMyTokens(tokenIndex, ytt, metadata, isApproved, price);   
          if (parseInt(price) > 0) {
            this.renderSellTokens(tokenIndex, ytt, metadata, price);
          }

          // if (parseInt(price) == 0) {
          //   this.renderMyTokens(tokenIndex, ytt, metadata, isApproved, price);  
          // }
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
  
    // if (isApproved) {
    //   if (parseInt(price) > 0) {
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
  //   }
  // }

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

  render() {
    var walletInstance = this.getWallet();
    var DOM_items = [];
    var sell_items = [];
    //구매한 토큰(판매토큰 제외)
    for(const item of this.state.items){
      DOM_items.push(
        <>
        <Card className="card-coin card-plain" >
         <img alt="..." className="img-center img-fluid" src={item.Url}/>      
          <Row>
            <Col className="text-center" md="12" style={{width:"230px"}}>
            <h4 className="text-uppercase">
              {/* <Link to="product-page">
                <p style ={{color : "white"}}>
                  Light Coin
                </p>
              </Link> */}
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
       <IndexNavbar />
       <div className="wrapper">
           <div className="section">
               <div className="container">
                   <Row>
                   <Col className="col-md-3">
                    <div className="section">
                        <section className="text-center">
                            <div className="fileinput text-center">
                            <div className="thumbnail img-circle">
                            <img src={this.state.image} alt="..."></img>
                            </div>
                            <div>
                            <label type="button" for="ex_file" className="btn-round btn btn-default">
                              Add Photo
                              <input type="file" id="ex_file" style={{width:"0px",}} accept='image/jpg,impge/png,image/jpeg,image/gif' 
                                  onChange={this.handleFileOnChange}/>
                            </label>
                                 
                            </div>
                            </div>
                            <h3 className="title"> </h3>
                        </section>

                        <section>
                        <br/>
                        <ul role="tablist" class="flex-column nav-tabs-info nav">
                          <li className="nav-item">
                            <a href="#pablo" className="active nav-link">
                              <i className="tim-icons icon-single-02">
                              </i>
                             &nbsp;  General 
                            </a>
                          </li>
                          <hr className="line-info" />
                          <li className="nav-item">
                            <a href="#pablo" className="nav-link">
                              <i className="tim-icons icon-credit-card">

                              </i>
                             &nbsp;  Billing 
                            </a>
                          </li>
                          <hr className="line-info"/>
                          <li className="nav-item">
                          <a href="#pablo" className="nav-link">
                          <i className="tim-icons icon-lock-circle"></i>
                          &nbsp;  Security 
                          </a>
                          </li>

                          <hr className="line-info"/>
                          <li className="nav-item">
                          <a href="#pablo" className="nav-link">
                          <i className="tim-icons icon-volume-98"></i>
                          &nbsp;  Notifications 
                          </a>
                          </li>
                          
                        </ul>
                        </section>
                        <br/><br/><br/>
                        <section>
                          <div className="progress-container progress-info">
                            <span className="progress-badge">Cryptoberry에 오신걸 환영합니다</span>
                          </div>
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                            aria-valuemax="100" style={{width: "200%"}}>
                              {/* <span className="progress-value">100%</span> */}
                            </div>
                          </div>
                        </section>
                    </div>
                   </Col>
                  
                  <Col className="m1-auto col-md-8">
                    <div className="section">
                      <div className="tab-content">
                        <div className="tab-pane active">
                          <div>
                            <header>
                              <h2 className="text-uppercase">My Information</h2>

                            </header>
                            <hr className="line-info"/>
                            <br/>

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
                            <br/>

                            <Row>            
                              <Col className="align-self-center col-md-3">
                                <label className="labels" for="#firstName">갖고 있는 토큰</label>
                              </Col>
                            </Row>
                            <Col className="align-self-center row-md-3">
                              <Card className="card-coin card-plain" style={{ display: 'flex', overFlow: 'auto',paddingLeft: '20px', width: '720px',overflowX: "scroll"}}>
                                <br/> 
                                <Row>
                                  {/* 첫번째 토큰 */}                              
                                  <Col>
                                    {DOM_items}
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                            <br/>

                       <Row>            
                              <Col className="align-self-center col-md-3">
                                <label className="labels" for="#firstName">판매중인 토큰</label>
                              </Col>
                            </Row>
                            <Col className="align-self-center row-md-3">
                              <Card className="card-coin card-plain" style={{ display: 'flex', overFlow: 'auto',paddingLeft: '20px', width: '720px',overflowX: "scroll"}}>
                                <br/> 
                                <Row>
                                  {/* 판매중인 토큰 */}
                                  <Col>
                                    {sell_items}
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                            <br/>

                             <Row>            
                              <Col className="align-self-center col-md-3">
                                <label className="labels" for="#firstName">판매완료 된 토큰</label>
                              </Col>
                            </Row>
                            <Col className="align-self-center row-md-3">
                              <Card className="card-coin card-plain" style={{ display: 'flex', overFlow: 'auto',paddingLeft: '20px', width: '720px',overflowX: "scroll"}}>
                                <br/> 
                                <Row>
                                  {/* 세번째 토큰 */}      
                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/etherum.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                            <h4 className="text-uppercase">
                                            <Link to="OldProduct-page1">
                                                <p style ={{color : "white"}}>
                                              BRIGHT Coin
                                             </p>
                                            </Link>
                                              </h4>
                                            <hr className="line-warning" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Padding</ListGroupItem>
                                            Brand<ListGroupItem>Moncler</ListGroupItem>
                                          </ListGroup>
                                        </Row>
                             
                                    </Card>
                                  </Col>

                                </Row>
                              </Card>
                            </Col>
                            <br/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
          </div>
        </div>
       <Footer />
      </>
    );
  }
}

export default Mypage;