import React , { Component } from "react";
import classnames from "classnames";

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
  Col,
  
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import gucci4 from 'assets/img/gucci4.jpg';




class NewPage extends React.Component {
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
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
              <Row>
          <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>
          <Col className="item"><h1>NEW PRODUCT</h1></Col>
          <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/></Col>
        </Row>

        {/* <Row>
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>
          <video loop="loop" autoPlay="autoplay" muted="muted" webkit-playsInline="webkit-playsinline" playsInline="playsinline" >
                  <source src ={require('assets/video/newproduct_nike_video.mp4')}></source>
                </video>
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>
        </Row> */}

        <Row>
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>


        {/* <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1280px-IMG_%28business%29.svg.png" width="560" height="315"></img> */}

        <iframe width="850" height="400" src="https://www.youtube.com/embed/ch6f2mrGUYk?amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/kQjepPDeUw0?amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>
        </Row>

       
        <div class="space-70"></div>
   

        <Row>
        <font size="100" color="white " > &nbsp; &nbsp; TOP 8</font>
        </Row>

        <div class="space-70"></div>

        <Row>
          {/* <ImageButton imagePath="assets/img/guccci.jpg" linkPage="/Product-page" itemName="GUCCI Snake wallet" itemPrice="41 ETH"></ImageButton> */}
          <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt=""
              className="img-fluid rounded shadow-lg"
              // src="{require('/src/assets/img/gucci.jpg)}"
              // src="%PUBLIC_URL%/img/gucci4.jpg"
              src={gucci4}
              style={{ width: "250px",height: "220px" }}
              
            />
          </button>
            <p>GUCCI Snake wallet</p>
            <h5>41 ETH</h5>
        </Col>



        

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://boheme.co.kr/web/product/big/201704/7400_shop1_396252.jpg"
              style={{ width: "250px",height: "220px" }}
              
            />
          </button>
            <p>MONTBLAC ballpen</p>
            <h5>9 ETH</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/grid_image_1/460x497/17f82f742ffe127f42dca9de82fb58b1/X/9/1591811105_B0040CNRB_M900_E01_GH.jpg"
              style={{ width: "250px" ,height: "220px"}}
              
            />
          </button>
            <p>Dior belt</p>
            <h5>17 ETH</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCCwbf48BOI_EgqTQqz-LqEOjmV50Jm_n1-A&usqp=CAU"
              style={{ width: "250px" ,height: "220px"}}
              
            />
          </button>
            <p>patekphilippe watch</p>
            <h5>555 ETH</h5>
        </Col>
        </Row>

          <Row>
        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://sineorb3.cafe24.com/Design/web19/web/product/big/TAG%20HEUER/CV2A1S.FC6236.jpg"
              style={{ width: "250px" ,height: "220px"}}
              
            />
          </button>
            <p>TAGHeuer watch</p>
            <h5>78 ETH</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://image.msscdn.net/images/goods_img/20200318/1357091/1357091_1_500.jpg"
              style={{ width: "250px" ,height: "220px"}}
              
            />
          </button>
            <p>maison tshirts</p>
            <h5>12 ETH</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/my-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://thum.buzzni.com/unsafe/640x640/center/smart/http://cdn.image.buzzni.com/2016/04/29/qD3ZLloooj.jpg"
              style={{ width: "250px" ,height: "220px"}}
              
            />
          </button>
            <p>prada backpack</p>
            <h5>28 ETH</h5>
        </Col>

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://img.lfmall.co.kr/file/product/prd/D307/2018/640/D307XX00081_00.jpg?2020-07-13T13:33:26.000+09:00"
              style={{ width: "250px" ,height: "220px"}}
              
            />
          </button>
            <p>Louis vuitton clutch</p>
            <h5>97 ETH</h5>
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
                  <div class="space-70"></div>
              </Container>
            </div>
            
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default NewPage;
