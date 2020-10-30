
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
  Col
} from "reactstrap";

// core components
import NewNavbar from "components/Navbars/NewNavbar.js";
import Footer from "components/Footer/Footer.js";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";


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
        <NewNavbar />
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
        <Row>
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>


        {/* <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1280px-IMG_%28business%29.svg.png" width="560" height="315"></img> */}

        <iframe width="850" height="400" src="https://www.youtube.com/embed/ch6f2mrGUYk?amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/kQjepPDeUw0?amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>
        </Row>

            <Row>
                <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/>
                  <div button class="btn-simple btn btn-success" style={{float: 'right'}}>
                    <Link to="Landing-page"> 
                    <font color="cyan">등록</font></Link></div>
                </Col>
            </Row>

              <Row>
              <font size="150" color="white" > &nbsp; &nbsp; &nbsp; ★</font>
              </Row>

        <Row>
        <font size="150" color="white " > &nbsp; &nbsp; TOP 8</font>
        </Row>


        <Row>
          {/* <ImageButton imagePath="assets/img/guccci.jpg" linkPage="/Product-page" itemName="GUCCI Snake wallet" itemPrice="41 ETH"></ImageButton> */}
          <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/new-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="https://t1.daumcdn.net/cfile/tistory/9996C04A5A55B3F91C"
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
              src="data:image/jpeg;base64,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"
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
              src="https://lh3.googleusercontent.com/proxy/BDv4nz9J8-8PACYntspVrQHLRIvpjgP0ixSqgsqzgXWiv3yDgg2Qa8Bk6smYL_aQZCmdfJVnsRGzDotqcR_BjHU8ZzsJ70fKhlzOrAFN5POuZrhrFYjWd9pnIN_tqPK3tA"
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

                
                
                {/* <div className="register-bg" /> */}
                {/* <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                /> */}
                {/* <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                /> */}
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                {/* <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                /> */}
                {/* <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                /> */}
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
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
