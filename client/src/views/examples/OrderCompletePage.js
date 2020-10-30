
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


const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

class OrderCompletePage extends React.Component {
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
                                        <Row className="justify-content-md-between">
                                            <Col className="mt-5 col-md-4">
                                                <h2 className="mt-3 text-left">Invoice no
                                                <br/>
                                                <small className="mr-2">#0453119</small>
                                                </h2>
                                            </Col>

                                            <Col className="mt-5 col-md-5 col-lg-4">
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
                                                
                                            </Col>

                                        </Row>

                                        <div className="card-body">
                                            <Row>
                                                <Col className="mt-5 col-12">
                                                    <div className="table-responsive">
                                                        <table className="text-right table">
                                                            <thead className="bg-default">
                                                                <tr>
                                                                    <th scope="col">Item</th>
                                                                    <th className="text-right" scope="col">Qty</th>
                                                                    <th className="text-right" scope="col">Rate</th>
                                                                    <th className="text-right" scope="col">Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Premium Support</td>
                                                                    <td>1</td>
                                                                    <td>$9.00</td>
                                                                    <td>$9.00</td>
                                                                </tr>
                                                                <tr>
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
                                                                </tr>
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <th className="h4">Total</th>
                                                                    <th className="text-rught h4" colSpan="3">$750</th>
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

export default OrderCompletePage;