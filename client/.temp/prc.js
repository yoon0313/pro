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
import Axios from 'axios';
const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);

let ps = null;

class OrderCompletePageOld extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tokenIndex:props.location.state.tokenIndex,
            productKey:props.location.state.productKey,
            productName:props.location.state.productName,
            brand:props.location.state.brand,
            price:props.location.state.price,
            sell_receipt:props.location.state.sell_receipt
        }
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
            tokenIndex:this.state.index,
            sell_receipt:this.state.sell_receipt
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

  render() {
    var walletInstance = this.getWallet();
    if (walletInstance) {
    return (
      <>
        <IndexNavbar />
        {/* <p>tokenIndex:{this.state.tokenIndex}</p>
        <p>productKey: {this.state.productKey}</p>
        <p>brand: {this.state.brand}</p>
        <p>productName:{this.state.productName}</p>
        <p>sell_receipt:{this.state.sell_receipt}</p> */}
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
                                                                <tr>
                                                                    <td>{this.state.description}</td>
                                                                    <td>{this.state.price}</td>
                                                                    <td>{this.state.images}</td>
                                                                    <td>{this.state.date}</td>
                                                                    <td>{this.state.tokenIndex}</td>
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
                                    <button type="submit" onClick={this.submitHandler}
                                        className="btn-print mt-5 btn btn-info"> 
                                        <i className="tim-icons icon-laptop">
                                          post
                                        </i>
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
                                      <button type="submit" onClick={this.submitHandler}
                                        className="btn-print mt-5 btn btn-info"> 
                                      <i className="tim-icons icon-laptop">
                                          post
                                          </i>
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