import React from "react";
import classnames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import { Link } from "react-router-dom";
import Caver from "caver-js";
import {
    Button,
    Card,
    Container,
    Row,
    Col,
    ListGroupItem,
    ListGroup,
    UncontrolledCarousel
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

let ps = null;

const axios = require('axios').default;
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);
var ipfsClient = require('ipfs-http-client');//ipfs 클라이언트를 import 한다
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const yttContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const tsContract = new caver.klay.Contract(DEPLOYED_ABI_TOKENSALES, DEPLOYED_ADDRESS_TOKENSALES);

class OrderPage extends React.Component {

  constructor(props) {
      super(props)
      this.displayAllSellTokens()
      this.state = {
        // accessType: 'keystore', // || 'privateKey'
        // keystore: '',
        // keystoreMsg: '',
        // password: '',
        // privateKey: '',
        // productKey: '',
        // brand: '',
        // imgUrl: '',
        // productName: '',
        // dateCreated: '',
        // tokenUri:'',
        items :[],
        item_index :'',
        sell_items : [],
        all_items: [],
        allSell_items: [],
        t_index: 0,
        t_productKey: 0,
        s_productName:props.location.state.productName,
        s_brand:props.location.state.brand,
        s_price:props.location.state.price,
        sell_receipt:''
      }
      console.log(props.location.state);
  }
  // state = {};
//   handleChange = (e) => {
//       this.setState({
//         [e.target.name]: e.target.value,
//       })
//   }

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

  // displayMyTokensAndSale = async () => {       
  //     var walletInstance = this.getWallet()
  //     var balance = parseInt(await this.getBalanceOf(walletInstance.address));
  //     console.log(balance);
  //     if (balance === 0) {
  //       alert("현재 보유한 토큰이 없습니다.");
  //     } else {
  //       var isApproved = await this.isApprovedForAll(walletInstance.address, DEPLOYED_ADDRESS_TOKENSALES);
  //       this.state.items = [];//초기화
  //       this.state.sell_items = [];//초기화
  //       for (var i = 0; i < balance; i++) {
  //       (async () => {//빨리 렌더링하기 위해 쓰이는 방법
  //           var tokenIndex = await this.getTokenOfOwnerByIndex(walletInstance.address, i);
  //           var tokenUri = await this.getTokenUri(tokenIndex);
  //           var ytt = await this.getYTT(tokenIndex);
  //           var metadata = await this.getMetadata(tokenUri);
  //           var price = await this.getTokenPrice(tokenIndex);
  //           console.log(tokenIndex, tokenUri, price)
  //           this.renderMyTokens(tokenIndex, ytt, metadata, isApproved, price);   
            
  //           if (parseInt(price) > 0) {
  //             this.renderSellTokens(tokenIndex, ytt, metadata, price);
  //           }
  //       })();      
  //       }
  //     }
  // }

  displayAllSellTokens = async () => {   
    var totalSupply = parseInt(await this.getTotalSupply());
    if (totalSupply === 0) {
        console.log("발행된 토큰이 없습니다");
    } else {
      for (var i = 0; i < totalSupply; i++) {
        (async () => {
          var tokenIndex = await this.getTokenByIndex(i);
          var tokenUri = await this.getTokenUri(tokenIndex);
          var ytt =  await this.getYTT(tokenIndex);
          var metadata = await this.getMetadata(tokenUri);
          var price = await this.getTokenPrice(tokenIndex); 
          var owner = await this.getOwnerOf(tokenIndex);
        //   this.renderAllTokens(tokenIndex, ytt, metadata, price,owner);//
          if (parseInt(price) > 0) 
            this.renderAllSellTokens(tokenIndex, ytt, metadata, price);
        })();
      }
    }
  }

  renderAllSellTokens = (tokenIndex, ytt, metadata, price) => {   
      var _tokenIndex = tokenIndex;  
      var _url = metadata.properties.image.description;
      var _brand = metadata.properties.description.description;
      var _productKey = metadata.properties.name.description;
      var _productName = ytt[0];
      var _dateCreated = ytt[1];
      var _price = caver.utils.fromPeb(price, 'KLAY');
    
      if (parseInt(price) > 0) {
        var allSellState = this.state;
        allSellState.allSell_items.push({
          index : _tokenIndex,
          Url : _url,
          Id : _productKey,
          brand : _brand,
          productName : _productName,
          date : _dateCreated,
          amount : _price
        })
        this.setState(allSellState);
      } 
  }
  
  // renderSellTokens = (tokenIndex, ytt, metadata, price) => {   
  //     var _tokenIndex = tokenIndex;  
  //     var _url = metadata.properties.image.description;
  //     var _brand = metadata.properties.description.description;
  //     var _productKey = metadata.properties.name.description;
  //     var _productName = ytt[0];
  //     var _dateCreated = ytt[1];
  //     var _price = caver.utils.fromPeb(price, 'KLAY');
    
  //     if (parseInt(price) > 0) {
  //       var sellState = this.state;
  //       sellState.sell_items.push({
  //         index : _tokenIndex,
  //         Url : _url,
  //         Id : _productKey,
  //         brand : _brand,
  //         productName: _productName,
  //         date : _dateCreated,
  //         amount : _price
  //       })
  //       this.setState(sellState);
  //     } 
  // }

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
      
  buyToken = async (tokenIndex) => {
      var price = await this.getTokenPrice(tokenIndex);
      var feePayer;
      if (price <= 0) 
        return;

      try {
        let odpage=this;
        const sender = this.getWallet();
        try { 
          feePayer = caver.klay.accounts.wallet.add('0x4e2fc35f9a305401b0f7dedf2dcaa97f3cb0bb9dcae12378d9f31d7644fc34a7')
        }
        catch(e){
          feePayer = caver.klay.accounts.wallet.getAccount('0xee345743f1c137207c9d8212502e3e975157a22b');
        }
        const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
                                                                  type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
                                                                  from: sender.address,
                                                                  to:   DEPLOYED_ADDRESS_TOKENSALES,
                                                                  data: tsContract.methods.purchaseToken(tokenIndex).encodeABI(),
                                                                  gas:  '500000',
                                                                  value: price,
                                                                }, sender.privateKey)
        caver.klay.sendTransaction({senderRawTransaction: senderRawTransaction,feePayer: feePayer.address,})
        .then(function(receipt){
          if (receipt.transactionHash) {         
            alert(receipt.transactionHash);
            odpage.props.history.push({
              pathname:"/order-complete-page",
              state:{
                tokenIndex: odpage.state.t_index,
                productKey:odpage.state.t_productKey,
                brand:odpage.state.s_brand,
                productName: odpage.state.s_productName,
                sell_receipt:receipt.transactionHash,
              }
            })
          }
        });
      } catch (err) {
        console.error(err);
      }
  }

  render() {

    var walletInstance = this.getWallet();
    var allSell_items = [];
    var allSell_items_metadata = []

    for(const item of this.state.allSell_items){
        // if (item.brand == this.state.s_brand && item.productName== this.state.s_productName&& item.amount == "0.1"){
        if (item.brand == this.state.s_brand && item.productName== this.state.s_productName && item.amount == this.state.s_price){
            
          allSell_items_metadata.push(item);
          this.state.t_index = allSell_items_metadata[0].index
          this.state.t_productKey = allSell_items_metadata[0].Id
          allSell_items.push(
          <>
          <Card className="card-coin card-plain" >
            <img alt="..." className="img-center img-fluid" src={item.Url}/>      
            <Row>
              <Col className="text-center" md="12" style={{width:"230px"}}>
              <h4 className="text-uppercase">
                <Link to="product-page">
                </Link>
              </h4>
              <hr className="line-primary" />
              </Col>
            </Row>
            <Row>
              <ListGroup>
                <ListGroupItem>index: {item.index} </ListGroupItem>
                <ListGroupItem>제품고유번호: {item.Id}</ListGroupItem>
                <ListGroupItem>브랜드: {item.brand}</ListGroupItem>
                <ListGroupItem>제품이름: {item.productName}</ListGroupItem>
                <ListGroupItem>제품제작일: {item.date}</ListGroupItem>
                <ListGroupItem>제품가격: {item.amount} klay</ListGroupItem>
              </ListGroup>
            </Row>
          </Card>
          </>
        )}
    }
    if (walletInstance) {
        return (
            <>
            <IndexNavbar />
            {/* <p>{allSell_items_metadata[0]}</p> */}
            <p>"index번호는"{ allSell_items_metadata.length >0 ? allSell_items_metadata[0].index : -1}</p>
            <div className="wrapper">
            <div className="section">
                <Container>
                    <Row>
                        <Col className="col-lg-4">
                        <h2 className="title">Order summary</h2>
                        <div className="card">
                            <div className="card-body">
                                {allSell_items[0]}
                                <hr class="line-info mb-3"></hr>
                                <div className="align-items-center media">
                                    {/* <h3 className="h6">Total</h3>
                                    <div className="text-right media-body">
                                        <span className="font-weight-semi-bold">0.1 klay</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        </Col>
                        {/* -------------오른쪽---------- */}
                        <Col className="col-lg-8">
                            <form className="js-validate">
                                <Container>
                                    <h3 className="title">Billing address</h3>
                                    <Row>
                                        <Col className="col-md-6">
                                            <label class="labels">
                                                First Name
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input aria-label="길동" name="firstName" placeholder="길동" type="text" className="form-control"></input>
                                        </Col>
                                        <Col className="col-md-6">
                                        <label class="labels">
                                                Last Name
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input aria-label="홍" name="lastName" placeholder="홍" type="text" className="form-control"></input>
                                        </Col>
                                    </Row>
                                        <br/>    
                                    <Row>
                                        <Col className="col-md-6">
                                            <div className="js-form-message mb-6">
                                                <label className="labes">
                                                    Email address
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input aria-label="abc@naver.com" name="emailAddress" placeholder="abc@naver.com" type="email" className="form-control"></input>
                                            </div>
                                        </Col>
    
                                        <Col className="col-md-6">
                                        <div className="js-form-message mb-6">
                                                <label className="labes">
                                                    Phone number
                                                    <span className="text-danger">*</span>
                                                    ( 숫자만 기입해주세요)
                                                </label>
                                                <input aria-label="01011112222" name="phonNumber" placeholder="01011112222" type="text" className="form-control"></input>
                                            </div>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col className="col-md-8">
                                            <div className="js-form-message mb-6">
                                                <label className="labels">
                                                    Address
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input aria-label="서울시 구로구" name="Address" placeholder="서울시 구로구" type="text" className="form-control"></input>
                                            </div>
                                        </Col>
                                        <Col className="col-md-4">
                                        <div className="js-form-message mb-6">
                                                <label className="labels">
                                                    Postcode
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <input aria-label="12345" name="postcode" placeholder="12345" type="text" className="form-control"></input>
                                            </div>
                                        </Col>
                                    </Row>
    
                                    <h3 className="title">Payment</h3>
                                    <div className="tab-content tab-space">
                                        <div className="tab-pane active">
                                            <Row>
                                                <Col className="col-md-12">
                                                    <div className="js-form-message">
                                                    <label className="labels">
                                                    My Wallet
                                                </label>
                                                <div>
                                                {walletInstance.address}
                                                </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <br/>
                                           
                                        </div>
                                        <div className="tab-pane"></div>
                                    </div>
                                </Container>
                            </form>
                        </Col>
                    </Row>
                    <Link to={{
                       pathname:"/order-complete-page",
                       state:{
                         tokenIndex: this.state.t_index,
                         productKey:this.state.t_productKey,
                         brand:this.state.s_brand,
                         productName: this.state.s_productName,
                        //  sell_receipt:receipt.transactionHash,
                         sell_receipt: this.state.sell_receipt,

                       }
                     }}>
                        <button type="button" class="btn btn-info btn-sm" style={{float: "right"}} onClick={(e) => this.buyToken(allSell_items_metadata[0].index)}>
                            Order now
                        </button>
                     </Link>
                </Container>
                </div>
                <div class="space-70"></div>      
              <Footer />
            </div>
         </>
        )
    }


    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
        <div className="section">
            <Container>
                <Row>
                    <p1>로그인 후 이용할 수 있습니다.</p1>
                    {/* -------------오른쪽---------- */}
                    <Col className="col-lg-8">
                        <form className="js-validate">
                            <Container>
                                <h3 className="title">Billing address</h3>
                                <Row>
                                    <Col className="col-md-6">
                                        <label class="labels">
                                            First Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input aria-label="길동" name="firstName" placeholder="길동" type="text" className="form-control"></input>
                                    </Col>
                                    <Col className="col-md-6">
                                    <label class="labels">
                                            Last Name
                                            <span className="text-danger">*</span>
                                        </label>
                                        <input aria-label="홍" name="lastName" placeholder="홍" type="text" className="form-control"></input>
                                    </Col>
                                </Row>
                                    <br/>    
                                <Row>
                                    <Col className="col-md-6">
                                        <div className="js-form-message mb-6">
                                            <label className="labes">
                                                Email address
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input aria-label="abc@naver.com" name="emailAddress" placeholder="abc@naver.com" type="email" className="form-control"></input>
                                        </div>
                                    </Col>

                                    <Col className="col-md-6">
                                    <div className="js-form-message mb-6">
                                            <label className="labes">
                                                Phone number
                                                <span className="text-danger">*</span>
                                                ( 숫자만 기입해주세요)
                                            </label>
                                            <input aria-label="01011112222" name="phonNumber" placeholder="01011112222" type="text" className="form-control"></input>
                                        </div>
                                    </Col>

                                </Row>
                                <br/>
                                <Row>
                                    <Col className="col-md-8">
                                        <div className="js-form-message mb-6">
                                            <label className="labels">
                                                Address
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input aria-label="서울시 구로구" name="Address" placeholder="서울시 구로구" type="text" className="form-control"></input>
                                        </div>
                                    </Col>
                                    <Col className="col-md-4">
                                    <div className="js-form-message mb-6">
                                            <label className="labels">
                                                Postcode
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input aria-label="12345" name="postcode" placeholder="12345" type="text" className="form-control"></input>
                                        </div>
                                    </Col>
                                </Row>

                                <h3 className="title">Payment</h3>
                                <div className="tab-content tab-space">
                                    <div className="tab-pane active">
                                        <Row>
                                            <Col className="col-md-12">
                                                <div className="js-form-message">
                                                <label className="labels">
                                                Wallet
                                                
                                            </label>
                                            <input aria-label="0x89d7g98s7d8g7d8s6g..." name="wallet" placeholder="0x89d7g98s7d8g7d8s6g..." type="text" className="form-control"></input>
                                                </div>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col className="col-md-12">
                                                <div className="js-form-message">
                                                <label className="labels">
                                                Password
                                                
                                            </label>
                                            <input aria-label="*****" name="password" placeholder="*****" type="text" className="form-control"></input>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="tab-pane"></div>
                                </div>
                            </Container>
                        </form>
                    </Col>
                </Row>
                <Link to="/order-complete-page">
                {/* <button type="button" class="btn btn-info btn-sm" style={{float: "right"}} tag={Link} to="/order-complete-page">
                    Order now
                </button> */}
                </Link>
            </Container>
        </div>
        <div class="space-70"></div>
        <Footer />
        </div>
      </>
    );
  }
}

export default OrderPage;