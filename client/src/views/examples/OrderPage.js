
import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";



// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";




let ps = null;

class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
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