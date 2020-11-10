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
  componentDidMount() {
    document.body.classList.toggle("Product-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("Product-page");
  }

  constructor(props) {
    super(props);

    this.state = {
      inputFocus: false,
      products:{
        id           :'',
        index        :'',
        images       :'',
        brand    :'',
        productName  :'',
        tokenuri     :'',
        description  :'',
        price        :'',
        date         :''  
      },
      value:0,min:0,counter:0
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
    const response = await fetch('http://localhost:5000/OldP/products/register');
    //출력한 데이터를 json으로 만들어서 body라는 변수에 넣어줌
    const body = await response.json();
    return body;
  }

  render() {

    //수정하기
    var display=[];
    if(!this.state.products.images||this.state.products.brand){
      display = []
    }
    else{
      this.state.products.images.forEach(element => {
        display.push({
          src : element.binary,
        })
      });
    }

axios.get('http://localhost:5000/OldP/products/register');

    return (
      
    <Container>
      <div id="images">
        <Row>
          <Col md="1"><h1>NEW</h1></Col>
          <Col md="9">
            <Button className="btn-simple btn-round" color="primary" type="button" Link tag={Link} to="/new-page">
              + More
            </Button>
          </Col>
        </Row>
          
        <Row view={display}>
          {/* <Row>
            <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <Link to={`/new-descript-page?index=${this.state.products.id}`}>
                <img alt="..." className="img-fluid rounded shadow-lg" src={this.state.products.image} style={{ width: "250px" ,height: "220px"}}/>
              </Link>
              <p>{this.state.products.brandname}</p>
              <h5>{this.state.products.price}</h5>
            </Col>
          </Row> */}
        </Row>

        

        <div className="space-70"></div>
          <Row>
            <Col md="1">
              <h1>OLD</h1>
            </Col>
            <Col md="9">
              <Button className="btn-simple btn-round" color="info" type="button"Link tag={Link} to="/old-page">
              + More
              </Button>
            </Col>
          </Row>


          <Row>
            <Col className="mt-5 mt-sm-0" sm="3" xs="6">
              <Link to={`/old-descript-page?index=${this.state.products.id}`}>
                <img alt="..." className="img-fluid rounded shadow-lg" src={this.state.products.image} style={{ width: "250px" ,height: "220px"}}/>
              </Link>
              <p>{this.state.products.brandname}</p>
              <h5>{this.state.products.price}</h5>
            </Col>
          </Row>
      </div>
      
      <div className="space-70"></div>  
        </Container>
      
    );
  }
}

export default Basics;