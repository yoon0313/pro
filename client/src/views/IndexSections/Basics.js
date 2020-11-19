import React from "react";
import classnames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";
import { Link } from "react-router-dom";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

const products = [
  {
    'id' : 1,
    'image' : 'https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1566920705/597606_96IWT_8745_001_080_0000_Light--GG.jpg',
    'pname' : 'GUCCI',
    'price' : '0.12'
  },
  {
    'id' : 2,
    'image' : 'https://saint-laurent.dam.kering.com/m/6a1c3b723cf798e1/Medium-619740BWR0W1000_A.jpg',
    'pname' : 'SAINT LAURENT',
    'price' : '0.13'
  },
  {
    'id' : 3,
    'image' : 'https://cdn2.chrono24.com/images/uhren/16654191-cj197gqmg5d3ibwfht51t1n3-Zoom.jpg',
    'pname' : 'PATEK PHILIPPE',
    'price' : '0.2'
  },
  {
    'id' : 4,
    'image' : 'https://www.chanel.com/images/t_fashionselector/q_auto,f_auto,fl_lossy,dpr_auto/w_972/stole-pink-white-wool-wool-packshot-default-aa7401b04957nb268-8832611483678.jpg',
    'pname' : 'CHANEL',
    'price' : '0.5'
  },
]

const products2 = [
  {
    'id' : 1,
    'image' : './src/assets/img/air jordan old.jpg',
    'pname' : 'Air Jordan',
    'price' : '0.07'
  },
  {
    'id' : 2,
    'image' : './src/assets/img/bal.jpg',
    'pname' : 'balenciaga',
    'price' : '0.11'
  },
  {
    'id' : 3,
    'image' : './src/assets/img/chanel old.jpg',
    'pname' : 'CHANEL',
    'price' : '0.2'
  },
  {
    'id' : 4,
    'image' : './src/assets/img/monc old.jpg',
    'pname' : 'Moncler',
    'price' : '0.3'
  },
]


class Basics extends React.Component {
  state={
    products:""
  }
  constructor(props) {
    super(props);
    this.state = {
      inputFocus: false
    };
  }


  render() {

    return (
      <Container>
        <div id="images">

          <Row>
            <Col md="1">
              <h1>NEW</h1>
            </Col>
            <Col md="9">
              <Button className="btn-simple btn-round" color="primary" type="button" Link tag={Link} to="/new-page">+ More</Button>
            </Col>
          </Row>

          <Row>
            <Row>
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <div className="card-profile card">
                  <div className="card-image">
                    <a href="#pablo">
                      <Link to={`/new-descript-page?index=${products[0].id}`}>
                        <img alt="..." className="img-fluid rounded shadow-lg" src={products[0].image} style={{ width: "250px" ,height: "220px"}}/>
                      </Link>
                    </a>
                  </div>
                  <div className="card-body">
                    <hr className="line-primary"></hr>
                      <table className="tablesorter table">
                        <tbody>
                          <tr>
                            <td className="text-left" >
                              <i className="tim-icons icon-bag-16 text-primary " ></i> &nbsp;
                              <p className="category text-primary d-inline">Brand</p>
                            </td>
                            <td className="text-right">{products[0].pname}</td>
                          </tr>
                          <tr>
                            <td className="text-left">
                              <i class="tim-icons icon-money-coins text-primary"/>&nbsp;&nbsp;
                              <p className="category text-primary d-inline">Price</p>
                            </td>
                            <td className="text-right" >{products[0].price} Klay</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </Col>
        

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <div className="card-profile card">
                  <div className="card-image">
                    <a href="#pablo">
                      <Link to={`/new-descript-page?index=${products[1].id}`}>
                        <img alt="..." className="img-fluid rounded shadow-lg" src={products[1].image} style={{ width: "250px" ,height: "220px"}}/>
                      </Link>
                    </a>
                  </div>
                  <div className="card-body">
                    <hr className="line-primary"></hr>
                      <table className="tablesorter table">
                        <tbody>
                          <tr>
                            <td className="text-left" >
                              <i className="tim-icons icon-bag-16 text-primary " ></i> &nbsp;
                              <p className="category text-primary d-inline">Brand</p>
                            </td>
                            <td className="text-right">{products[1].pname}</td>
                          </tr>
                          <tr>
                            <td className="text-left">
                              <i class="tim-icons icon-money-coins text-primary"/>&nbsp;&nbsp;
                              <p className="category text-primary d-inline">Price</p>
                            </td>
                            <td className="text-right">{products[1].price} Klay</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <div className="card-profile card">
                  <div className="card-image">
                    <a href="#pablo">
                      <Link to={`/new-descript-page?index=${products[2].id}`}>
                        <img alt="..." className="img-fluid rounded shadow-lg" src={products[2].image} style={{ width: "250px" ,height: "220px"}}/>
                      </Link>
                    </a>
                  </div>
                  <div className="card-body">
                    <hr className="line-primary"></hr>
                      <table className="tablesorter table">
                        <tbody>
                          <tr>
                            <td className="text-left" >
                              <i className="tim-icons icon-bag-16 text-primary " ></i> &nbsp;
                              <p className="category text-primary d-inline">Brand</p>
                            </td>
                            <td className="text-right">{products[2].pname}</td>
                          </tr>
                          <tr>
                            <td className="text-left">
                              <i class="tim-icons icon-money-coins text-primary"/>&nbsp;&nbsp;
                              <p className="category text-primary d-inline">Price</p>
                            </td>
                            <td className="text-right">{products[2].price} Klay</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <div className="card-profile card">
                  <div className="card-image">
                    <a href="#pablo">
                      <Link to={`/new-descript-page?index=${products[3].id}`}>
                        <img alt="..." className="img-fluid rounded shadow-lg" src={products[3].image} style={{ width: "250px" ,height: "220px"}}/>
                      </Link>
                    </a>
                  </div>
                  <div className="card-body">
                    <hr className="line-primary"></hr>
                      <table className="tablesorter table">
                        <tbody>
                          <tr>
                            <td className="text-left" >
                              <i className="tim-icons icon-bag-16 text-primary " ></i> &nbsp;
                              <p className="category text-primary d-inline">Brand</p>
                            </td>
                            <td className="text-right">{products[3].pname}</td>
                          </tr>
                          <tr>
                            <td className="text-left">
                              <i class="tim-icons icon-money-coins text-primary"/>&nbsp;&nbsp;
                              <p className="category text-primary d-inline">Price</p>
                            </td>
                            <td className="text-right">{products[3].price} Klay</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            </Row>

          <div className="space-70"></div>
            <Row>
              <Col md="1">
                <h1> OLD</h1>
              </Col>
              <Col md="9">
                <Button className="btn-simple btn-round" color="success" type="button" Link tag={Link} to="/old-page">+ More</Button>
              </Col>
            </Row>

            <Row>
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <div className="card-profile card">
                    <div className="card-image">
                      <a href="#pablo">
                        <Link to={`/old-descript-page?index=${products2[0].id}`}>
                          <img alt="..." className="img-fluid rounded shadow-lg" src={products2[0].image} style={{ width: "250px" ,height: "220px"}}/>
                        </Link>
                      </a>
                    </div>
                    <div className="card-body">
                      <hr className="line-success"></hr>
                        <table className="tablesorter table">
                          <tbody>
                            <tr>
                              <td className="text-left" >
                                <i className="tim-icons icon-bag-16 text-success " ></i> &nbsp;
                                <p className="category text-success d-inline">Brand</p>
                              </td>
                              <td className="text-right">{products2[0].pname}</td>
                            </tr>
                            <tr>
                              <td className="text-left">
                                <i class="tim-icons icon-money-coins text-success"/>&nbsp;&nbsp;
                                <p className="category text-success d-inline ">Price</p>
                              </td>
                              <td className="text-right">{products2[0].price} Klay</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </Col>
              
                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <div className="card-profile card">
                    <div className="card-image">
                      <a href="#pablo">
                        <Link to={`/old-descript-page?index=${products2[1].id}`}>
                          <img alt="..." className="img-fluid rounded shadow-lg" src={products2[1].image} style={{ width: "250px" ,height: "220px"}}/>
                        </Link>
                      </a>
                    </div>
                    <div className="card-body">
                      <hr className="line-success"></hr>
                        <table className="tablesorter table">
                          <tbody>
                            <tr>
                              <td className="text-left" >
                                <i className="tim-icons icon-bag-16 text-success " ></i> &nbsp;
                                <p className="category text-success d-inline">Brand</p>
                              </td>
                              <td className="text-right">{products2[1].pname}</td>
                            </tr>
                            <tr>
                              <td className="text-left">
                                <i class="tim-icons icon-money-coins text-success"/>&nbsp;&nbsp;
                                <p className="category text-success d-inline">Price</p>
                              </td>
                              <td className="text-right">{products2[1].price} Klay</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </Col>

                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <div className="card-profile card">
                    <div className="card-image">
                      <a href="#pablo">
                        <Link to={`/old-descript-page?index=${products2[2].id}`}>
                          <img alt="..." className="img-fluid rounded shadow-lg" src={products2[2].image} style={{ width: "250px" ,height: "220px"}}/>
                        </Link>
                      </a>
                    </div>
                    <div className="card-body">
                      <hr className="line-success"></hr>
                        <table className="tablesorter table">
                          <tbody>
                            <tr>
                              <td className="text-left" >
                                <i className="tim-icons icon-bag-16  text-success" ></i> &nbsp;
                                <p className="category text-success d-inline">Brand</p>
                              </td>
                              <td className="text-right">{products2[2].pname}</td>
                            </tr>
                            <tr>
                              <td className="text-left">
                                <i class="tim-icons icon-money-coins text-success"/>&nbsp;&nbsp;
                                <p className="category text-success d-inline">Price</p>
                              </td>
                              <td className="text-right">{products2[2].price} Klay</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </Col>

                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <div className="card-profile card">
                    <div className="card-image">
                      <a href="#pablo">
                        <Link to={`/old-descript-page?index=${products2[3].id}`}>
                          <img alt="..." className="img-fluid rounded shadow-lg" src={products2[3].image} style={{ width: "250px" ,height: "220px"}}/>
                        </Link>
                      </a>
                    </div>
                    <div className="card-body">
                      <hr className="line-success"></hr>
                        <table className="tablesorter table">
                          <tbody>
                            <tr>
                              <td className="text-left" >
                                <i className="tim-icons icon-bag-16 text-success" ></i> &nbsp;
                                <p className="category text-success d-inline">Brand</p>
                              </td>
                              <td className="text-right">{products2[3].pname}</td>
                            </tr>
                            <tr>
                              <td className="text-left">
                                <i class="tim-icons icon-money-coins text-success"/>&nbsp;&nbsp;
                                <p className="category text-success d-inline">Price</p>
                              </td>
                              <td className="text-right">{products2[3].price} Klay</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </Col>
            </Row>
        </div>

        <div className="space-70"></div>
        
        </Container>
      
    );
  }
}

export default Basics;