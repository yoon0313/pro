import React from "react";
import classnames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";
import { Link } from "react-router-dom";
import Axios from 'axios';

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
      inputFocus: false,
      news:[],
      products:[],
      value:0,min:0,counter:0
    };
  }

  componentDidMount(){
    this.callApi()
      .then(res => {
        console.log("dfdfdfed")
        this.setState({news: res});
      })
      .catch(err => console.log(err));

    this.callApi2()
      .then(res => {
        this.setState({products: res})
      })
      .catch(err => console.log(err));
  }
  callApi = async()=>{
    const response = await fetch('http://localhost:5000/NewP/new/getNewP');
    const body = await response.json();
    return body;
  }
  callApi2 = async()=>{
    const response2 = await fetch('http://localhost:5000/OldP/products/getOldP');
    const body2 = await response2.json();
    return body2;
  }

  //데이터 불러오기
  loadHandler = (event) =>{
    console.log(event)
  event.preventDefault();
  const body = {
    //로그인된 사람의 ID를 가져오기위해 
    description:this.state.description,
    price:this.state.price,
    images:this.state.file
    // tokens: Tokens[Token-1].value
  }

  //서버에서 가져오기
  Axios.get("hhttp://localhost:5000/NewP/new/getNewP", body)
      .then(response => {
          if(response.data.success){
              alert('상품 불러오기 성공 했습니다.')
              this.props.history.pull('/')
          }else{
              alert('상품 불러오기에 실패 했습니다.')
          }
      })

    //서버에서 가져오기
  Axios.get("hhttp://localhost:5000/OldP/products/getOldP", body2)
    .then(response => {
        if(response.data.success){
            alert('상품 불러오기 성공 했습니다.')
            //상품업로드 후 랜딩페이지로 돌아감
            this.props.history.pull('/')
        }else{
            alert('상품 불러오기에 실패 했습니다.')
        }
    })
  }

  render() {

    let Items = this.state.news.map( item=>{
      if (item._id ==='index') return( <></>)
      return(

          <Col className="mt-5 mt-sm-0" sm="3" xs="6">
            <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/new-descript-page?index='+item.index;}}>
            <img alt="..." className="img-fluid rounded shadow-lg" 
            src={item.tokenUri1}
            style={{ width: "250px" ,height: "220px" }} Link tag={Link} to="/new-descript-page"/>
            </button>
            <p>{item.brand}</p>
            <h5>{item.price}</h5>
          </Col>
      )});

      let Items2 = this.state.products.map( item2=>{
        if (item2._id ==='index') return( <></>)
        return(
  
          <Col className="mt-5 mt-sm-0" sm="3" xs="6">
            <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page?index='+item2.index;}}>
            <img alt="..." className="img-fluid rounded shadow-lg" 
            src={item2.images[0].binary}
            style={{ width: "250px" ,height: "220px" }} Link tag={Link} to="/old-descript-page"/>
            </button>
            <p>{item2.brand}</p>
            <h5>{item2.price}</h5>
          </Col>
                    
        )});

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
             {Items}
            </Row>
        <div/>
      
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
              {Items2}
            </Row>
          </div>

          <div className="space-70"></div>
 
      </Container>
      
    );
  }
}

export default Basics;