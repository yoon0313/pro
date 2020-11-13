import React from "react";
import classnames from "classnames";
import PerfectScrollbar from "perfect-scrollbar";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import Caver from "caver-js";
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);

let ps = null;

class OrderCompletePageOld extends React.Component {

    constructor(props) {
        super(props)
        this.submitHandler(props.location.state.tokenIndex,props.location.state.sell_receipt)
        this.state = {
            tokenIndex:props.location.state.tokenIndex,
            productKey:props.location.state.productKey,
            productName:props.location.state.productName,
            brand:props.location.state.brand,
            price:props.location.state.price,
            sell_receipt:props.location.state.sell_receipt
        }
    }

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };

  getWallet = () => {
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0]
    } else {
      const walletFromSession = sessionStorage.getItem('walletInstance');
      caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
      return caver.klay.accounts.wallet[0];
    }
  }

  submitHandler = (tokenIndex,sell_receipt) =>{

    const body = {
        tokenIndex:tokenIndex,
        sell_receipt:sell_receipt     
    }
     //서버로 보내기
    Axios.post("http://localhost:5000/OldP/products/receipt", body)
        .then(response => {
            if(response.data.success){
                alert('sell_receipt update완료')
                //상품업로드 후 랜딩페이지로 돌아감
                this.props.history.push('/')
            }else{
                alert('sell_receipt update 실패')
            }
        })
  }

  render() {
    var walletInstance = this.getWallet();
    if (walletInstance) {
    return (
      <>
        <IndexNavbar />
        <div className="space-70"></div>
            <div className="wrapper">
                <div className="section">
                    <Container>
                        <Row>
                            <div className="ml-auto mr-auto col-md-10">
                                <div className="card-invoice card">
                                    <div className="text-center card-header" data-color-icon="warning">
                                        <Row className="justify-content-between">
                                            <Col className="text-left col-md-4">
                                                <img alt="..." className="mb-2" src={require("assets/img/yunjoungIcon.png")}>
                                                </img>
                                                <h4>St. Independence Embankment, 050105 Bucharest, Romaia</h4>
                                                <small className="d-block text-muted">tel: 01087226597</small>
                                            </Col>
                                            <Col className="text-left mt-3 col-md-5 col-lg-3">
                                                <h3 className="mb-1">Biled to :</h3>
                                                <span className="d-block"> Yunjoung Kim</span>
                                                <p>
                                                    Bld Mihail Kogalnicewnu, nr.8
                                                    <br/>
                                                    7652 Bucharest,
                                                    <br/>
                                                    Romania
                                                </p>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <h2>계정주소: {walletInstance.address} </h2>
                                        <h2 className="mt-3 text-left">#Transaction Hash</h2>
                                        <h4><small className="mr-2">{this.state.sell_receipt}</small></h4>
                                        <Row className="justify-content-md-between">
                                            {/* <Col className="mt-5 col-md-4">
                                                <h2 className="mt-3 text-left">#Transaction Hash</h2>
                                                <br/>
                                                <h4><small className="mr-2">{this.state.sell_receipt}</small></h4>
                                            </Col> */}
                                            {/* <Col className="mt-5 col-md-5 col-lg-4">
                                                <Row className="mt-5">
                                                    <Col className="col-md-6">
                                                        Invoice date:
                                                    </Col>
                                                    <Col className="col-md-6">06/03/2020</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="col-md-6">Due date:</Col>
                                                        <Col className="col-md-6">11/03/2020</Col>
                                                    </Row>
                                            </Col> */}
                                        </Row>
                                        <div className="card-body">
                                            <Row>
                                                <Col className="mt-5 col-12">
                                                    <div className="table-responsive">
                                                        <table className="text-right table">
                                                            <thead className="bg-default">
                                                                <tr>
                                                                    <th scope="col">Token Index</th>
                                                                    <th className="text-right" scope="col">Product Key</th>
                                                                    <th className="text-right" scope="col">Brand</th>
                                                                    <th className="text-right" scope="col">Product Name</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{this.state.tokenIndex}</td>
                                                                    <td>{this.state.productKey}</td>
                                                                    <td>{this.state.brand}</td>
                                                                    <td>{this.state.productName}</td>
                                                                </tr>
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <th className="h4">Total</th>
                                                                    <th className="text-rught h4" colSpan="3">{this.state.price} klay</th>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="line-info ml-auto"/>
                                        <div className="text-right card-footer">
                                            <Col className="col-md-5">
                                                <h4>Thank you!</h4>
                                                <p className="description">
                                                    IF you encounter any issue related to the invoice you can contact us at:
                                                </p>
                                                <h5 className="d-block">
                                                    email:
                                                    <small className="text-muted">s_holmes25@naver.com</small>
                                                </h5>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                                {/* printing */}
                                <div className="ml-auto col-md-3">
                                    <button type="button" className="btn-print mt-5 btn btn-info"> 
                                    <i className="tim-icons icon-laptop">
                                        </i>
                                        Print
                                    </button>
                                </div>
                            </div>
                        </Row>
                    </Container>
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
                          <Row>
                              <div className="ml-auto mr-auto col-md-10">
                                  <div className="card-invoice card">
                                      <div className="text-center card-header" data-color-icon="warning">
                                          <Row className="justify-content-between">
                                              <Col className="text-left col-md-4">
                                                  <img alt="..." className="mb-2" src={require("assets/img/yunjoungIcon.png")}>
                                                  </img>
                                                  <h4>St. Independence Embankment, 050105 Bucharest, Romaia</h4>
                                                  <small className="d-block text-muted">tel: 01087226597</small>
                                              </Col>
                                              <Col className="text-left mt-3 col-md-5 col-lg-3">
                                                  <h3 className="mb-1">Biled to :</h3>
                                                  <span className="d-block"> Yunjoung Kim</span>
                                                  <p>
                                                      Bld Mihail Kogalnicewnu, nr.8
                                                      <br/>
                                                      7652 Bucharest,
                                                      <br/>
                                                      Romania
                                                  </p>
                                              </Col>
                                          </Row>
                                          <br/>
                                          <h2>     ּ :  </h2>
                                          <h2 className="mt-3 text-left">#Transaction Hash</h2>
                                          <h4><small className="mr-2">none</small></h4>
                                          <Row className="justify-content-md-between">
                                              {/* <Col className="mt-5 col-md-4">
                                                  <h2 className="mt-3 text-left">#Transaction Hash</h2>
                                                  <br/>
                                                  <h4><small className="mr-2">{this.state.sell_receipt}</small></h4>
                                              </Col> */}
                                              {/* <Col className="mt-5 col-md-5 col-lg-4">
                                                  <Row className="mt-5">
                                                      <Col className="col-md-6">
                                                          Invoice date:
                                                      </Col>
                                                      <Col className="col-md-6">06/03/2020</Col>
                                                      </Row>
                                                      <Row>
                                                          <Col className="col-md-6">Due date:</Col>
                                                          <Col className="col-md-6">11/03/2020</Col>
                                                      </Row>
                                              </Col> */}
                                          </Row>
                                          <div className="card-body">
                                              <Row>
                                                  <Col className="mt-5 col-12">
                                                      <div className="table-responsive">
                                                          <table className="text-right table">
                                                              <thead className="bg-default">
                                                                  <tr>
                                                                      <th scope="col">Token Index</th>
                                                                      <th className="text-right" scope="col">Product Key</th>
                                                                      <th className="text-right" scope="col">Brand</th>
                                                                      <th className="text-right" scope="col">Product Name</th>
                                                                  </tr>
                                                              </thead>
                                                              <tbody>
                                                                  <tr>
                                                                      {/* <td>{this.state.tokenIndex}</td>
                                                                      <td>{this.state.productKey}</td>
                                                                      <td>{this.state.brand}</td>
                                                                      <td>{this.state.productName}</td> */}
                                                                  </tr>
                                                                  {/* <tr>
                                                                      <td>Cryptoberry</td>
                                                                      <td>3</td>
                                                                      <td>$100.00</td>
                                                                      <td>$100.00</td>
                                                                  </tr>
                                                                  <tr>
                                                                  <td>Ipad</td>
                                                                      <td>3</td>
                                                                      <td>$67.00</td>
                                                                      <td>$67.00</td>
                                                                  </tr> */}
                                                              </tbody>
                                                              <tfoot>
                                                                  <tr>
                                                                      <th className="h4">Total</th>
                                                                      <th className="text-rught h4" colSpan="3"></th>
                                                                  </tr>
                                                              </tfoot>
                                                          </table>
                                                      </div>
                                                  </Col>
                                              </Row>
                                          </div>
                                          <hr className="line-info ml-auto"/>
                                          <div className="text-right card-footer">
                                              <Col className="col-md-5">
                                                  <h4>Thank you!</h4>
                                                  <p className="description">
                                                      IF you encounter any issue related to the invoice you can contact us at:
                                                  </p>
                                                  <h5 className="d-block">
                                                      email:
                                                      <small className="text-muted">s_holmes25@naver.com</small>
                                                  </h5>
                                              </Col>
                                          </div>
                                      </div>
                                  </div>
                                  {/* printing */}
                                  <div className="ml-auto col-md-3">
                               
                                      <button type="button" className="btn-print mt-5 btn btn-info"> 
                                      <i className="tim-icons icon-laptop">
                                          </i>
                                          Print
                                      </button>
                                  </div>
                              </div>
                          </Row>
                      </Container>
                  </div>
              </div>
            <Footer />
        </>
    );
  }
}
export default OrderCompletePageOld;