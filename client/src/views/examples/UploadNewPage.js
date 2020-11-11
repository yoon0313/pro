import React, { Component, PropTypes, useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Axios from 'axios';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  ListGroupItem,
  ListGroup,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

const axios = require('axios').default;

class UploadNewPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: ""
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      file : [],
      previewURL : [],
      items :[],    
      index:'',
      brand:'',
      productName:'',
      price:'',
      binary : "",
      description : "",
      date: new Date(),
      tokenUri:''
    }
  }
  
  handleFileOnChange = (event) => {
    event.preventDefault();
    if(this.state.previewURL.length >=3){
      alert("더 이상은 무리데쓰");
      return;
    }
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.state.file.push(file)
      this.state.previewURL.push(reader.result)
  
      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  state = {};
  
  handleFileOnChange = (event) => {
    event.preventDefault();
    
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.state.file.push(file)
      this.setState({image : reader.result});
    }
    reader.readAsDataURL(file);
  }
 

  handleOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //인호
   //컴포넌트 실행시
   componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
   
    //시간흐르게
    this.timerID = setInterval(
      () => this.tick(),
      1000)
  }

  //컴포넌트 실행안할시
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
    //시간흐르게
    clearInterval(this.timerID);
  }

  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };
  
  //시간 계속 흐르게하기
  tick() {
    this.setState({
        date: new Date()
    })
  }
  
  handleIndexOnChange = (event) => {
    event.preventDefault();
    this.setState({
        index : event.target.value
      })
  }

  handlePriceOnChange = (event) => {
    event.preventDefault();
    this.setState({
        price : event.target.value
      })
  }

  handleDescriptionOnChange = (event) => {
    event.preventDefault();
    this.setState({
        description : event.target.value
      })
  }

  handleBrandOnChange = (event) => {
    event.preventDefault();
    this.setState({
      brand : event.target.value
    })
  }

  handleProductNameOnChange = (event) => {
    event.preventDefault();
    this.setState({
      productName : event.target.value
    })
  }

  handleFileOnChange = (event) => {
    event.preventDefault();
    if(this.state.previewURL.length >=3){
      alert("사진은 최대 3장까지 업로드 가능합니다.");
      return;
    }
    let reader = new FileReader();
    let file = event.target.files[0];
    if(file.size >=5000000){
      alert("5MB 이상의 파일은 올릴수 없습니다.")

      return;
    }
    reader.onloadend = () => {
      this.state.file.push(
        {
          metadata:{
            name: file.name,
            lastModifieddate: file.lastModifieddate,
            size: file.size,
            type: file.type
          },
          binary : reader.result
        }
      )
      this.state.previewURL.push(
        reader.result
      )

      /*this.setState({
        file : file,
        previewURL : reader.result
      })*/
      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  handleTokenUriOnChange = (event) => {
    event.preventDefault();
    this.setState({
        tokenUri : event.target.value
      })
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
        description:this.state.description,
        brand:this.state.brand,
        images:this.state.file,
        date:this.state.date,
        productName:this.state.productName,
        price:this.state.price,
        index:this.state.index,
        tokenUri:this.state.tokenUri,
        binary:this.state.binary
    }
     //서버로 보내기
    Axios.post("http://localhost:5000/NewP/new/register", body)
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

  state = {
    };

  render() {
    let profile_preview =[];
      let i = 0;
      for(let i=0 ;i<3;i++){
        const element = this.state.previewURL[i];
        profile_preview.push(<img style={{maxWidth:'200px'}}  src={element}></img>)
      }

    return (
    <>
      <IndexNavbar/>
      <div className="section section-signup">
        <Container>
          <Row>
            <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>
            <Col className="item"><h2>NEW PRODUCT REGISTER</h2></Col>
            <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>                
          </Row>
          <br/>
          <br/>
            <Row className="row-grid justify-content-between align-items-center">
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: this.state.squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: this.state.squares7and8 }}
                  />
                </Col>
              </Row>
              <div
                className="square square-3"
                id="square3"
                style={{ transform: this.state.squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: this.state.squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: this.state.squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: this.state.squares1to6 }}
              />

                <Card className="card-register">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("assets/img/square-purple-1.png")}
                    />
                    <CardTitle tag="h4">register</CardTitle>
                  </CardHeader>
                  
                  <CardBody>
                    <Form onSubmit= {this.submitHandler}>
                      <div value={this.date}>
                      Posting Date :  {this.state.date.toLocaleString()}
                      </div>
                      <br/>
                      <Input
                            placeholder="brand"
                            type="String"
                            value={this.brand}
                            onChange={this.handleBrandOnChange}
                      />

                      <br/>
                      <Input
                            placeholder="productName"
                            type="String"
                            value={this.productName}
                            onChange={this.handleProductNameOnChange}
                      />

                      <br/>
                      {/* product 체크박스로 */}
                      
                      <Input
                            cols="100" rows="1000"
                            placeholder="description"
                            type="textarea"
                            onChange={this.handleDescriptionOnChange}
                            value={this.description}
                      />
                    
                      <br/>
                      <Input
                            placeholder="price"
                            type="String"
                            value={this.price}
                            onChange={this.handlePriceOnChange}
                      />
                      
                      <br/>
                      <Input
                            placeholder="tokenUri"
                            type="String"
                            value={this.tokenUri}
                            onChange={this.handleTokenUriOnChange}
                      />

                      {/* 여러 이미지 업로드 및 미리보기 출력 */}
                      <br/>
                      <div class="profile_img">                      
                        <input type='file' 
                            accept='image/jpg,impge/png,image/jpeg,image/gif' 
                            name='profile_img' 
                            
                            onChange={this.handleFileOnChange}>
                        </input>
                        {profile_preview}
                      </div>

                      
                      <FormGroup check className="text-left">
                        <Label check>
                          <Input type="checkbox" />
                          <span className="form-check-sign" />I agree to the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <div Button type="submit"onClick={this.submitHandler}
                    className="btn-round btn btn-primary" size="lg">                   
                      <font color="white">Post &nbsp;</font>
                    </div>
                  </CardFooter>
                </Card>
            </Row>          
        </Container>
      </div>
      </>
    )                    
  }
}

export default UploadNewPage;