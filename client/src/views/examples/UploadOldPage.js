import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";


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
  state = {
    squares1to6: "",
    squares7and8: ""
  };
  componentDidMount() {
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
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
  
      console.log(this.state.previewURL)
      this.forceUpdate()
    }
    reader.readAsDataURL(file);
  }

  state = {};
  
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
                    <Form className="form">
                    
                      <Input
                            placeholder="Title"
                            type="text"
                            onFocus={e => this.setState({ emailFocus: true })}
                            onBlur={e => this.setState({ emailFocus: false })}
                      />
                   
          
                      <Row>
                          <Col>
                          <div>
                          <br/>

                          </div>
                          </Col>
                      </Row>

                      <div>
                      <select>
                      <option selected value="TokenBox">TokenBox &nbsp;&nbsp; </option>
                        <option value="Nike">Nike</option>
                        <option value="Gucci">Gucci</option>
                        <option value="Rolex">Rolex</option>
                        <option value="PRADA">PRADA</option>
                      </select>
                      <br/>
                      </div>
                      <br/>
                                      
                      <Input
                            placeholder="price"
                            type="text"
                            onFocus={e => this.setState({ emailFocus: true })}
                            onBlur={e => this.setState({ emailFocus: false })}
                            
                      />
                   

                      <br/>
                      {/* product 체크박스로 */}
                      
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
                    <div Button className="btn-round btn btn-primary" size="lg">
                    <Link to="profile-page3"> 
                    <font color="white">판매하기 &nbsp;</font>
                      </Link>
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
export default UploadOldPage;