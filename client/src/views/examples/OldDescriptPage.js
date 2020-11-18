import React, { Component, PropTypes, useState } from "react";
import Axios from 'axios';
import classnames from "classnames";

import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
  UncontrolledAlert
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Link } from "react-router-dom";
import Caver from "caver-js";

const axios = require('axios').default;
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);
var ipfsClient = require('ipfs-http-client');//ipfs 클라이언트를 import 한다
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const yttContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const tsContract = new caver.klay.Contract(DEPLOYED_ABI_TOKENSALES, DEPLOYED_ADDRESS_TOKENSALES);

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
    ownerAddress:'',
    products:{
      id           :'',
      tokenIndex   :'',
      index        :'',
      image        :'',
      brand        :'',
      productName  :'',
      productKey   :'',
      tokenUri     :'',
      description  :'',
      price        :'',
      date         :''  
    },
    
    index:params.get('index')
  };

  Axios.get("http://localhost:5000/OldP/products/getOldp?index="+params.get('index'))
    .then(response => {
        if(response.status==200){

          this.getOwnerOf(response.data[0].tokenIndex);
          this.setState({
            products:response.data[0]
          })
        }else{
        }
  })
}

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
  
  getOwnerOf = async (tokenIndex) => {
    yttContract.methods.ownerOf(tokenIndex).call().then( owner=>{
      this.setState({
        ownerAddress : owner
      })
    })
    
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
    var _tokenIndex = (this.state.products.tokenIndex);
   
    var ownerAddress = 0//this.getOwnerOf(_tokenIndex);
    var walletInstance = this.getWallet();
    if (walletInstance) {
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
                      <h3 className="brandname"><span data-notify="icon" className="tim-icons icon-bulb-63" />
                        <span>
                          <b className="text-primary"> Token Index : </b>
                        </span>{this.state.products.tokenIndex}
                      </h3>

                      <h3 className="brandname"><span data-notify="icon" className="tim-icons icon-tag" />
                        <span>
                          <b className="text-primary"> Product Key : </b>
                        </span>{this.state.products.productKey}
                      </h3>

                      <h3 className="brandname"><span data-notify="icon" className="tim-icons icon-calendar-60" />
                        <span>
                          <b className="text-primary"> Product Name : </b>
                        </span>{this.state.products.productName}
                      </h3>

                      <h3 className="brandname"><span data-notify="icon" className="tim-icons icon-coins" />
                        <span>
                          <b className="text-primary"> Brand : </b>
                        </span>{this.state.products.brand}
                      </h3>

                      <h3 className="main-price"><span data-notify="icon" className="tim-icons icon-coins" />
                        <span>
                          <b className="text-primary"> Price :  </b>
                        </span>{this.state.products.price} klay
                      </h3>
                      
                      <h3 className="Date"><span data-notify="icon" className="tim-icons icon-coins" />
                        <span>
                          <b className="text-primary"> 판매등록일 :  </b>
                        </span>{this.state.products.date} 
                      </h3>
                      
                      <h3 className="Description"><span data-notify="icon" className="tim-icons icon-coins" />
                        <span>
                          <b className="text-primary"> 판매자 주소 :  </b>
                        </span>{this.state.ownerAddress} 
                      </h3>

                      <h3 className="Description"><span data-notify="icon" className="tim-icons icon-coins" />
                        <span>
                          <b className="text-primary"> 구매자 주소 :  </b>
                        </span>{walletInstance.address} 
                      </h3>

                      <h3 className="brandname"><span data-notify="icon" className="tim-icons icon-coins" />
                        <span>
                          <b className="text-primary"> Description :  </b>
                        </span>{this.state.products.description} 
                      </h3>

                      <div className="pick-size row">
                        <Col className="col-md-4 col-lg-2">
                        </Col>

                        <Col>
                          <Link to={{pathname:"/order-page-old",
                                      state:{
                                        productKey:this.state.products.productKey,
                                        tokenIndex:this.state.products.tokenIndex,
                                        productName: this.state.products.productName,
                                        price:this.state.products.price,
                                        brand:this.state.products.brand,
                                      }
                                    }}>
                            <Button className="btn-simple btn btn-primary" style={{float: "right"}} >
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
    return (
      <>
      <IndexNavbar />
      <div className="space-70"></div>
          <div className="wrapper">
              <div className="section">
                  <Container>
                      <h4>로그인 후 확인 가능합니다.</h4>
                  </Container>
              </div>
          </div>
          <Footer />
      </>
    );
  }
}

export default OldDescriptPage;