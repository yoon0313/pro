import React, { Component, PropTypes, useState } from "react";
import classnames from "classnames";
// import { Link } from "react-router-dom";
import IndexNavbar  from "components/Navbars/IndexNavbar.js";
import Axios from 'axios';



// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
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
// import { response } from "express";



class UploadOldPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: ""
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
    // Axios.get('/OldP/products')
    // .then(response => {
    //   this.setState({textarea : response.data.description})
    // })
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
  

  // 여러 이미지 업로드 및 미리보기
  constructor(props) {
    super(props);
    this.state = {
      file : [],
      previewURL : [],
      description : "",
      price : "",
    }
  }

  handleDescriptionOnChange = (event) => {
    event.preventDefault();
    this.setState({
        description : event.target.value
      })
  }

  handlePriceOnChange = (event) => {
    event.preventDefault();
    this.setState({
      price : event.target.value
    })
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
      /*this.setState({
        file : file,
        previewURL : reader.result
      })*/
      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  submitHandler = (event) =>{
    // preventDefault를 해줘야 확인 버튼을 눌렀을때
    // 화면이 새로고침되지 않는다.
    event.preventDefault();




    //모든 입력칸이 채워지지않으면 submit할 수없게 조건문
    if(!this.state.description || !this.state.price || !this.state.file){
        return alert("모든 값을 넣어주세요")
    }


    //서버에 채운 값을 request로 보낸다.
    //axious post를 하면 body를 적어줘야함
    const body = {
        //로그인된 사람의 ID를 가져오기위해 
        
        description:this.state.description,
        price:this.state.price,
        images:this.state.file,
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
  state = {
    description : "",
    price : ""
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
        <IndexNavbar />
        <div className="section section-signup">
          <Container>
            <Row>
                  <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>
                  <Col className="item"><h2>OLD PRODUCT REGISTER</h2></Col>
                  <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>                
            </Row>
            
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
                { <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />}
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

                      {/* <div>
                      <select>
                      <option selected value="TokenBox">TokenBox &nbsp;&nbsp; </option>
                        <option value="Nike">Nike</option>
                        <option value="Gucci">Gucci</option>
                        <option value="Rolex">Rolex</option>
                        <option value="PRADA">PRADA</option>
                      </select>
                      <br/>
                      </div>
                      <br/> */}
                                      
                      <Input
                            placeholder="price"
                            type="number"
                            value={this.Price}
                            onChange={this.handlePriceOnChange}
                      />
                   

                      <br/>
                      {/* product 체크박스로 */}
                      
                      <Input
                            cols="100" rows="1000"
                            placeholder="description"
                            type="textarea"
                            onChange={this.handleDescriptionOnChange}
                            value={this.Description}
                      />
                    
                      


                      {/* 여러 이미지 업로드 및 미리보기 출력 */}

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
                  <Button type="submit"onClick={this.submitHandler}>
                      확인
                  </Button>
                  {/* <CardFooter>
                    <div Button type="submit" onClick={submitHandler}
                    className="btn-round btn btn-primary" size="lg">                   
                    <font color="white">register &nbsp;</font>
                    </div>  
                  </CardFooter> */}
                </Card>
              </Row>          
          </Container>
        </div>
        </>
      )                    
  }
}
export default UploadOldPage;