
import React , { Component } from "react";

import { Line } from "react-chartjs-2";
import Caver from "caver-js";

const config = { rpcURL: 'https://api.baobab.klaytn.net:8651' }
const caver = new Caver(config.rpcURL);

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

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Link } from "react-router-dom";



class Mypage extends React.Component {
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
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
      file : [],
      image : require("assets/img/lora.jpg")
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
      // const walletFromSession = sessionStorage.getItem('walletInstance');
      // console.log(walletFromSession)
      // caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
      const walletFromSession = sessionStorage.getItem('walletInstance')
      try {
        caver.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // If value in sessionStorage is invalid wallet instance,
        // remove it from sessionStorage.
        sessionStorage.removeItem('walletInstance')
      }
      return caver.klay.accounts.wallet[0]
    }
  }
  render() {
    var walletInstance = this.getWallet();
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

                            {/* 갖고있는 토큰 사진 넣기 */}
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
                                    <Card className="card-coin card-plain" >

                    
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/ripp.png")}
                                        />      
                                                                                         
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
                                            product<ListGroupItem>Wallet</ListGroupItem>
                                            Brand<ListGroupItem>Gucci</ListGroupItem>
                                            
                                          </ListGroup>

                                      
                                        </Row>
                                        
                                   
                                    </Card>
                                  </Col>
                                  {/* 두번째 토큰 */}
                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/ripp.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px" }}>
                                            <h4 className="text-uppercase">
                                            <Link to="product-page2">
                                                <p style ={{color : "white"}}>
                                              DARK Coin
                                             </p>
                                            </Link>
                                            </h4>
                                            <hr className="line-success" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Fountain pen</ListGroupItem>
                                            Brand<ListGroupItem>Monblanc</ListGroupItem>
                                            
                                          </ListGroup>
                                        </Row>
                                    
                                    </Card>
                                  </Col>
                                  {/* 세번째 토큰 */}      
                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/bitcoin.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                            <h4 className="text-uppercase">
                                            <Link to="product-page">
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
                                          product<ListGroupItem>T-shirts</ListGroupItem>
                                            Brand<ListGroupItem>Gucci</ListGroupItem>
                                          </ListGroup>
                                        </Row>
                             
                                    </Card>
                                  </Col>
                                  {/* 네번째 토큰 */}    
                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/bitcoin.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                            <h4 className="text-uppercase">
                                            <Link to="product-page">
                                                <p style ={{color : "white"}}>
                                              LIGHT Coin
                                             </p>
                                            </Link>
                                            </h4>
                                            <hr className="line-primary" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Wallet</ListGroupItem>
                                            Brand<ListGroupItem>LuiVuitton</ListGroupItem>
                                          </ListGroup>
                                        </Row>
                                 
                                    </Card>
                                  </Col>

                                  

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
                                            <Link to="product-page">
                                                <p style ={{color : "white"}}>
                                              DARK Coin
                                             </p>
                                            </Link>
                                              </h4>
                                            <hr className="line-success" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Bag</ListGroupItem>
                                            Brand<ListGroupItem>Chanel</ListGroupItem>
                                          </ListGroup>
                                        </Row>
                                       
                                    </Card>
                                  </Col>

                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/ripp.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                          <h4 className="text-uppercase">
                                            <Link to="product-page">
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
                                          product<ListGroupItem>Belt</ListGroupItem>
                                            Brand<ListGroupItem>Hermes</ListGroupItem>
                                          </ListGroup>
                                        </Row>
           
                                    </Card>
                                  </Col>

                              
                              
                                </Row>

                                
                              </Card>
                            </Col>
                            <br/>

                       {/* 갖고있는 토큰 사진 넣기 */}
                       <Row>            
                              <Col className="align-self-center col-md-3">
                                <label className="labels" for="#firstName">판매중인 토큰</label>
                              </Col>
                            </Row>
                            <Col className="align-self-center row-md-3">
                              <Card className="card-coin card-plain" style={{ display: 'flex', overFlow: 'auto',paddingLeft: '20px', width: '720px',overflowX: "scroll"}}>
                                <br/> 
                                <Row>
                                  {/* 첫번째 토큰 */}                              
                                  <Col>
                                    <Card className="card-coin card-plain" >

                    
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/bitcoin.png")}
                                        />      
                                                                                         
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                            <h4 className="text-uppercase" >
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
                                            product<ListGroupItem>Wallet</ListGroupItem>
                                            Brand<ListGroupItem>Gucci</ListGroupItem>
                                            
                                          </ListGroup>

                                      
                                        </Row>
                                        
                                   
                                    </Card>
                                  </Col>
                                  {/* 두번째 토큰 */}
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
                                            <Link to="product-page2">
                                                <p style ={{color : "white"}}>
                                              DARK Coin
                                             </p>
                                            </Link>
                                            </h4>
                                            <hr className="line-success" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Fountain</ListGroupItem>
                                            Brand<ListGroupItem>Monblanc</ListGroupItem>
                                            
                                          </ListGroup>
                                        </Row>
                                    
                                    </Card>
                                  </Col>
                                
                                 

                                </Row>

                                
                              </Card>
                            </Col>
                            <br/>

                             {/* 갖고있는 토큰 사진 넣기 */}
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
                                  {/* 네번째 토큰 */}    
                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/bitcoin.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                            <h4 className="text-uppercase">
                                            <Link to="product-page">
                                                <p style ={{color : "white"}}>
                                              LIGHT Coin
                                             </p>
                                            </Link>
                                            </h4>
                                            <hr className="line-primary" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Wallet</ListGroupItem>
                                            Brand<ListGroupItem>LuiVuitton</ListGroupItem>
                                          </ListGroup>
                                        </Row>
                                 
                                    </Card>
                                  </Col>

                                  

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
                                            <Link to="product-page">
                                                <p style ={{color : "white"}}>
                                              DARK Coin
                                             </p>
                                            </Link>
                                              </h4>
                                            <hr className="line-success" />
                                          </Col>
                                        </Row>
                                        <Row>
                                          <ListGroup>
                                          product<ListGroupItem>Bag</ListGroupItem>
                                            Brand<ListGroupItem>Chanel</ListGroupItem>
                                          </ListGroup>
                                        </Row>
                                       
                                    </Card>
                                  </Col>

                                  <Col>
                                    <Card className="card-coin card-plain">                                  
                                        <img
                                          alt="..."
                                          className="img-center img-fluid"
                                          src={require("assets/img/ripp.png")}
                                        />                                                                
                                        <Row>
                                          <Col className="text-center" md="12" style={{width:"230px"}}>
                                          <h4 className="text-uppercase">
                                            <Link to="product-page">
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
                                          product<ListGroupItem>Belt</ListGroupItem>
                                            Brand<ListGroupItem>Hermes</ListGroupItem>
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