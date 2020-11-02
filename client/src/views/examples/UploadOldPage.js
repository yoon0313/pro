import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player'
import OldNavbar from "components/Navbars/OldNavbar.js";



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


class UploadOldPage extends React.Component {
  
  
  // 여러 이미지 업로드 및 미리보기
  constructor(props) {
    super(props);
    this.state = {
      file : [],
      previewURL : []
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
      /*this.setState({
        file : file,
        previewURL : reader.result
      })*/
      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  state = {
    //테마 적용
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

  render() {
    let profile_preview =[];
      let i = 0;
      for(let i=0 ;i<3;i++){
        const element = this.state.previewURL[i];
        profile_preview.push(<img style={{maxWidth:'200px'}}  src={element}></img>)
        
      }
      

        
    // if(this.state.file.length > 0){
    //   for (let i = 0; i < this.state.previewURL.length; i++) {
    //     const element = this.state.previewURL[i];
    //     profile_preview.push(<img className='profile_preview' src={element}></img>)
    //   }
    // }else if (this.state.file.length == 3){
    //   break;
    // style={{maxWidth:'200px'}} 
    // }
     
      

    return (
    <>
      <OldNavbar/>
      <div className="section section-signup">
        <Container>
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
          <Row>
                <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>
                <Col className="item"><h2>OLD PRODUCT REGISTER</h2></Col>
                <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>                
          </Row>
        
          <Row className="row-grid justify-content-between align-items-center">
            {/* <Col lg="6">
              <h3 className="display-3 text-white">
                중고품 등록 {" "}<br/>
                <span className="text-white">complete your form</span>
                </h3>
                <p className="text-white mb-3">
                당신의 물건을 파세요.. 설명설명
                </p>
                <div className="btn-wrapper">
                <Button color="primary" to="register-page" tag={Link}>
                Register Page
                </Button>
                </div>
              </Col> */}


              <Card className="card-register">
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require("assets/img/square-purple-1.png")}
                  />
                  <CardTitle tag="h4">Register</CardTitle>
                </CardHeader>

                <CardBody>
                  <Form className="form">
                    
                    {/* 제목 */}
                    <Input
                          placeholder="Title"
                          type="text"
                          onFocus={e => this.setState({ emailFocus: true })}
                          onBlur={e => this.setState({ emailFocus: false })}
                    />

                    {/* 물품 선택창 */}
                    <select>
                        <option selected value="Product">아래를 선택하세요</option>
                        <option value="nike">NIKE</option>
                        <option value="gucci">GUCCI</option>
                        <option value="tome browne">TOME BROWNE</option>
                    </select>

                    {/* 가격 */}
                    <Input
                          placeholder="price"
                          type="text"
                          onFocus={e => this.setState({ emailFocus: true })}
                          onBlur={e => this.setState({ emailFocus: false })}
                    />

                    {/* 자세한 설명 */}
                    <Input
                          cols="100" rows="1000"
                          placeholder="descriptions"
                          type="textarea"
                          onFocus={e => this.setState({ emailFocus: true })}
                          onBlur={e => this.setState({ emailFocus: false })}
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
                <CardFooter>
                  <Button className="btn-round" color= "primary" size="lg">
                    Get Started
                  </Button>
          
                    
                </CardFooter>
                  <div className="register-bg" />
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
              </Card>
          </Row>
        </Container>
      </div>
      </>
    );
  }
}
export default UploadOldPage;
