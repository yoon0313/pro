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
    'image' : 'data:image/jpeg;base64,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',
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
  {
    'id' : 5,
    'image' : 'https://ccimg.hellomarket.com/images/2019/item/03/23/17/1642_1945942_1.jpg?size=s6',
    'pname' : 'Air Jordan',
    'price' : '0.07'
  },
  {
    'id' : 6,
    'image' : 'https://dnvefa72aowie.cloudfront.net/origin/article/202009/87CCC8EB306D3D8A8150DDE6780C8E2A6012EDAA7FC2624F0BE962873096DF63.jpg?q=82&s=300x300&t=crop',
    'pname' : 'Chanel',
    'price' : '0.28'
  },
  {
    'id' : 7,
    'image' : 'https://static.coupangcdn.com/image/vendor_inventory/a0eb/138700c90407fbea7cf6f82e1d9c972a774382528f4acf996057950397e0.jpg',
    'pname' : 'SAINT LAURENT',
    'price' : '0.45'
  },
  {
    'id' : 8,
    'image' : 'https://dnvefa72aowie.cloudfront.net/origin/article/201910/F05ECCF00B1A9BF3E731B8A12D6F4CB6A14D0506714DBB4A857E7D078EB4BF2F.jpg?q=95&s=1440x1440&t=inside',
    'pname' : 'Balenciaga ',
    'price' : '0.3'
  }

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
                  <Link to={`/new-descript-page?index=${products[0].id}`}>
                    <img alt="..." className="img-fluid rounded shadow-lg" src={products[0].image} style={{ width: "250px" ,height: "220px"}}/>
                  </Link>
                  <p>{products[0].pname}</p>
                  <h5>{products[0].price}</h5>
                </Col>

                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <Link to={`/new-descript-page?index=${products[1].id}`}>
                    <img alt="..." className="img-fluid rounded shadow-lg" src={products[1].image} style={{ width: "250px" ,height: "220px"}}/>
                  </Link>
                  <p>{products[1].pname}</p>
                  <h5>{products[1].price}</h5>
                </Col>

                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <Link to={`/new-descript-page?index=${products[2].id}`}>
                    <img alt="..." className="img-fluid rounded shadow-lg" src={products[2].image} style={{ width: "250px" ,height: "220px"}}/>
                  </Link>
                  <p>{products[2].pname}</p>
                  <h5>{products[2].price}</h5>
                </Col>

                <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                  <Link to={`/new-descript-page?index=${products[3].id}`}>
                    <img alt="..." className="img-fluid rounded shadow-lg" src={products[3].image} style={{ width: "250px" ,height: "220px"}}/>
                  </Link>
                  <p>{products[3].pname}</p>
                  <h5>{products[3].price}</h5>
                </Col>
              </Row>
            </Row>

          <div className="space-70"></div>

            <Row>
              <Col md="1">
                <h1> OLD</h1>
              </Col>
              <Col md="9">
                <Button className="btn-simple btn-round" color="info" type="button" Link tag={Link} to="/old-page">+ More</Button>
              </Col>
            </Row>


            <Row>
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <Link to={`/old-descript-page?index=${products[4].id}`}>
                  <img alt="..." className="img-fluid rounded shadow-lg" src={products[4].image} style={{ width: "250px" ,height: "220px"}}/>
                </Link>
                <p>{products[4].pname}</p>
                <h5>{products[4].price}</h5>
              </Col>
              
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <Link to={`/old-descript-page?index=${products[5].id}`}>
                  <img alt="..." className="img-fluid rounded shadow-lg" src={products[5].image} style={{ width: "250px" ,height: "220px"}}/>
                </Link>
                <p>{products[5].pname}</p>
                <h5>{products[5].price}</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <Link to={`/old-descript-page?index=${products[6].id}`}>
                  <img alt="..." className="img-fluid rounded shadow-lg" src={products[6].image} style={{ width: "250px" ,height: "220px"}}/>
                </Link>
                <p>{products[6].pname}</p>
                <h5>{products[6].price}</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <Link to={`/old-descript-page?index=${products[7].id}`}>
                  <img alt="..." className="img-fluid rounded shadow-lg" src={products[7].image} style={{ width: "250px" ,height: "220px"}}/>
                </Link>
                <p>{products[7].pname}</p>
                <h5>{products[7].price}</h5>
              </Col>
            </Row>
        </div>

        <div className="space-70"></div>
        
        </Container>
      
    );
  }
}

export default Basics;