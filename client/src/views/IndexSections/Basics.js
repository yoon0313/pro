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
    'image' : 'https://t1.daumcdn.net/cfile/tistory/9996C04A5A55B3F91C',
    'pname' : 'GUCCI',
    'price' : '0.12'
  },
  {
    'id' : 2,
    'image' : 'https://boheme.co.kr/web/product/big/201704/7400_shop1_396252.jpg',
    'pname' : 'MONTBLAC ballpen',
    'price' : '0.11'
  },
  {
    'id' : 3,
    'image' : 'https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/grid_image_1/460x497/17f82f742ffe127f42dca9de82fb58b1/X/9/1591811105_B0040CNRB_M900_E01_GH.jpg',
    'pname' : 'Dior belt',
    'price' : '0.03'
  },
  {
    'id' : 4,
    'image' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCCwbf48BOI_EgqTQqz-LqEOjmV50Jm_n1-A&usqp=CAU',
    'pname' : 'patekphilippe watch',
    'price' : '0.21'
  },
  {
    'id' : 5,
    'image' : 'https://ccimg.hellomarket.com/images/2019/item/03/23/17/1642_1945942_1.jpg?size=s6',
    'pname' : 'Air Jordan shoes',
    'price' : '0.07'
  },
  {
    'id' : 6,
    'image' : 'https://dnvefa72aowie.cloudfront.net/origin/article/202009/87CCC8EB306D3D8A8150DDE6780C8E2A6012EDAA7FC2624F0BE962873096DF63.jpg?q=82&s=300x300&t=crop',
    'pname' : 'chanel bag',
    'price' : '0.28'
  },
  {
    'id' : 7,
    'image' : 'https://static.coupangcdn.com/image/vendor_inventory/a0eb/138700c90407fbea7cf6f82e1d9c972a774382528f4acf996057950397e0.jpg',
    'pname' : 'SAINT LAURENT pouch',
    'price' : '0.45'
  },
  {
    'id' : 8,
    'image' : 'https://dnvefa72aowie.cloudfront.net/origin/article/201910/F05ECCF00B1A9BF3E731B8A12D6F4CB6A14D0506714DBB4A857E7D078EB4BF2F.jpg?q=95&s=1440x1440&t=inside',
    'pname' : 'balenciaga wallet',
    'price' : '0.3'
  }

]


axios.get('/api/products');

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
  componentDidMount(){
    this.callApi()
      //body로 담은 고객 목록을 받아서 
      //이 목록을 state로 설정해주는것
      //결과적으로 body가 res라는 변수이름으로 바뀌고
      //그것을 customers 변수값에 넣어줌
      .then(res => this.setState({products: res}))
      //만약 오류가 발생하는경우 콘솔창에 오류를 보여준다.
      .catch(err => console.log(err));
  }
  
  callApi = async()=>{
    //접속하고자 하는 api주소를 넣어줌
    const response = await fetch('/api/products');
    //출력한 데이터를 json으로 만들어서 body라는 변수에 넣어줌
    const body = await response.json();
    return body;
  }


  render() {



    return (
        <Container>
          
         
          <div id="images">

          <Row>
            <Col md="1">
            <h1>
              NEW
            </h1>
            </Col>
            <Col md="9">
              <Button
                className="btn-simple btn-round"
                color="primary"
                type="button"
                Link tag={Link} to="/new-page"
              >
                + More
              </Button>
            </Col>
          </Row>
          
            <Row>

            <Row>
        
         
          <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <Link to={`/new-descript-page?id=${products[0].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[0].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>
          
            <p>{products[0].pname}</p>
            <h5>{products[0].price}</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
        <Link to={`/new-descript-page?id=${products[1].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[1].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>

        
            <p>{products[1].pname}</p>
            <h5>{products[1].price}</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
        <Link to={`/new-descript-page?id=${products[2].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[2].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>
            <p>{products[2].pname}</p>                                                                                                                                                                                                                                                                                                                             
            <h5>{products[2].price}</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
        <Link to={`/new-descript-page?id=${products[3].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[3].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>
            <p>{products[3].pname}</p>
            <h5>{products[3].price}</h5>
        </Col>

        </Row>

        
      
            </Row>

          {/* ---------------------------------------- */}
          <div className="space-70"></div>
          <Row>
            <Col md="1">
            <h1>
              OLD
            </h1>
            </Col>
            <Col md="9">
              <Button
                className="btn-simple btn-round"
                color="info"
                type="button"
                Link tag={Link} to="/old-page"
              >
                + More
              </Button>
            </Col>
          </Row>


            <Row>
            <Col className="mt-5 mt-sm-0" sm="3" xs="6">
            <Link to={`/new-descript-page?id=${products[4].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[4].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>
            <p>{products[4].pname}</p>
            <h5>{products[4].price}</h5>
        </Col>
              
        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
        <Link to={`/new-descript-page?id=${products[5].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[5].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>
                  <p>{products[5].pname}</p>
                  <h5>{products[5].price}</h5>

              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <Link to={`/new-descript-page?id=${products[6].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[6].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
            </Link>
                  <p>{products[6].pname}</p>
                  <h5>{products[6].price}</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <Link to={`/new-descript-page?id=${products[7].id}`}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={products[7].image}
              style={{ width: "250px" ,height: "220px"}}
              
            />
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