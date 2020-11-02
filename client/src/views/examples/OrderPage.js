
import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Link } from "react-router-dom";
import Caver from "caver-js";

const config = { rpcURL: 'https://api.baobab.klaytn.net:8651' }
const caver = new Caver(config.rpcURL);

// reactstrap components
import {
 
  Container,
  Row,
  Col
} from "reactstrap";



// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";




let ps = null;

class OrderPage extends React.Component {
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

    if (walletInstance) {
        return (
            <>
            <IndexNavbar />
    
            <div className="wrapper">
            <div className="section">
                <Container>
                    <Row>
                        <Col className="col-lg-4">
                        <h2 className="title">Order summary</h2>
                        <div className="card">
                            <div className="card-body">
                                <div className="align-items-center mb-3 media">
                                    <Col className="col-6 col-md-5">
                                        <img className="img-fluid rounded shadow"
                                        src={require("assets/img/lora.jpg")}>
                                        </img>
                                    
                                    <div className="media-body">
                                        <h2 className="h6">Shorts</h2>
                                        <small className="d-block text-secondary">Small</small>
                                    </div>
                                    
                                    <div className="text-right media-body">
                                        <span>$29</span>
                                    </div>
                                    </Col>
    
                                </div>
    
                                <div className="align-items-center media">
                                    <Col className="col-6 col-md-5">
                                        <img className="img-fluid rounded shadow"
                                        src={require("assets/img/lora.jpg")}>
                                        </img>
                                    
                                    <div className="media-body">
                                        <h2 className="h6">Shorts</h2>
                                        <small className="d-block text-secondary">Small</small>
                                    </div>
                                    
                                    <div className="text-right media-body">
                                        <span>$200</span>
                                    </div>
                                    </Col>
    
                                </div>
                                <hr className="line-info mb-5"></hr>
    
                                <div className="align-items-center media">
                                    <h3 className="h6 text-secondary mr-3">Subtotal</h3>
                                    <div className="text-right media-body">
                                        <span>$1038</span>
                                    </div>
                                </div>
                                <div className="align-items-center media">
                                    <h3 className="h6 text-secondary mr-3">Shipping</h3>
                                    <div className="text-right media-body">
                                        <span>$105</span>
                                    </div>
                                </div>
                                <hr class="line-info mb-3"></hr>
                                <div className="align-items-center media">
                                    <h3 className="h6">Total</h3>
                                    <div className="text-right media-body">
                                        <span className="font-weight-semi-bold">$1045.8</span>
                                    </div>
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
                                                    Wallet
                                                </label>
                                                <div>
                                 {walletInstance.address}
                                </div>
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
                        <button type="button" class="btn btn-info btn-sm" style={{float: "right"}} tag={Link} to="/order-complete-page">
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
                    <Col className="col-lg-4">
                    <h2 className="title">Order summary</h2>
                    <div className="card">
                        <div className="card-body">
                            <div className="align-items-center mb-3 media">
                                <Col className="col-6 col-md-5">
                                    <img className="img-fluid rounded shadow"
                                    src={require("assets/img/lora.jpg")}>
                                    </img>
                                
                                <div className="media-body">
                                    <h2 className="h6">Shorts</h2>
                                    <small className="d-block text-secondary">Small</small>
                                </div>
                                
                                <div className="text-right media-body">
                                    <span>$29</span>
                                </div>
                                </Col>

                            </div>

                            <div className="align-items-center media">
                                <Col className="col-6 col-md-5">
                                    <img className="img-fluid rounded shadow"
                                    src={require("assets/img/lora.jpg")}>
                                    </img>
                                
                                <div className="media-body">
                                    <h2 className="h6">Shorts</h2>
                                    <small className="d-block text-secondary">Small</small>
                                </div>
                                
                                <div className="text-right media-body">
                                    <span>$200</span>
                                </div>
                                </Col>

                            </div>
                            <hr className="line-info mb-5"></hr>

                            <div className="align-items-center media">
                                <h3 className="h6 text-secondary mr-3">Subtotal</h3>
                                <div className="text-right media-body">
                                    <span>$1038</span>
                                </div>
                            </div>
                            <div className="align-items-center media">
                                <h3 className="h6 text-secondary mr-3">Shipping</h3>
                                <div className="text-right media-body">
                                    <span>$105</span>
                                </div>
                            </div>
                            <hr class="line-info mb-3"></hr>
                            <div className="align-items-center media">
                                <h3 className="h6">Total</h3>
                                <div className="text-right media-body">
                                    <span className="font-weight-semi-bold">$1045.8</span>
                                </div>
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
                    <button type="button" class="btn btn-info btn-sm" style={{float: "right"}} tag={Link} to="/order-complete-page">
                        Order now

                    </button>
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