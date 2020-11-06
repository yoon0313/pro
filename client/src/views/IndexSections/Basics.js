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






class Basics extends React.Component {

 
 

  constructor(props) {
    super(props);
    this.state = {
      products:"",
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
    const response = await fetch('http://localhost:5000/api/products');
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
          <Link to={`/new-descript-page/${products[0].id}`}>
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
        <Link to={`/new-descript-page/${products[1].id}`}>
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
        <Link to={`/new-descript-page/${products[2].id}`}>
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
        <Link to={`/new-descript-page/${products[3].id}`}>
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
            <Link to={`/new-descript-page/${products[4].id}`}>
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
        <Link to={`/new-descript-page/${products[5].id}`}>
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
              <Link to={`/new-descript-page/${products[6].id}`}>
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
              <Link to={`/new-descript-page/${products[7].id}`}>
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