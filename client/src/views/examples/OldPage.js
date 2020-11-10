import Axios from 'axios';
import React ,{ Component }  from "react";
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
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Link } from "react-router-dom";

class OldPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: ""
  };
  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
    fetch('/products')
    .then(res => res.json())
    .then(products => this.setState({ products }));
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
  //데이터 불러오기
  loadHandler = (event) =>{
  // preventDefault를 해줘야 확인 버튼을 눌렀을때
  // 화면이 새로고침되지 않는다.
  event.preventDefault();
  const body = {
    //로그인된 사람의 ID를 가져오기위해 
    description:this.state.description,
    price:this.state.price,
    images:this.state.file
    // tokens: Tokens[Token-1].value
  }
  //서버에서 가져오기
  Axios.get("http://localhost:5000/OldP/products/getOldP", body)
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
    return (
      <>
      <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
              <div className="content">
                <Container>
                  <Row>
                  <Col className="item">
                  <hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/>
                  </Col>
                  <Col className="item"><h1>OLD PRODUCT</h1></Col>
                  <Col className="item">
                  <hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/>
                  </Col>
                  </Row>
              
              <Row className="row-grid justify-content-between align-items-center text-left">
                <Col lg="6" md="6">
                  <h1 className="text-white">We keep your coin <br />
                  <span className="text-white">secured</span>
                  </h1>
                  <p className="text-white mb-3">
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet mornings of spring which I enjoy with my
                    whole heart. I am alone, and feel...
                  </p>
                  <div className="btn-wrapper mb-3">
                    <p className="category text-success d-inline">From 9.99%/mo</p>
                    <Button className="btn-link" color="success" href="#pablo" onClick={e => e.preventDefault()} size="sm">
                    <i className="tim-icons icon-minimal-right" />
                    </Button>
                  </div>
                  
                  <div className="btn-wrapper">
                    <div className="button-container">
                      <Button className="btn-icon btn-simple btn-round btn-neutral" color="default" href="#pablo"
                        onClick={e => e.preventDefault()}>
                      <i className="fab fa-twitter" />
                      </Button>
                      <Button className="btn-icon btn-simple btn-round btn-neutral" color="default" href="#pablo"
                        onClick={e => e.preventDefault()}>
                      <i className="fab fa-dribbble" />
                      </Button>
                      <Button
                        className="btn-icon btn-simple btn-round btn-neutral" color="default" href="#pablo"
                        onClick={e => e.preventDefault()}>
                      <i className="fab fa-facebook" />
                      </Button>
                    </div>
                  </div>
                </Col>
              
                <Col lg="4" md="5">
                <img alt="..." className="img-fluid" src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/etherum.73bbf767.png"/>
                </Col>

              </Row>
        
              <Row>
                <Col className="item">
                <hr style={{width: '100%', color: "white", backgroundColor:"white", height: 2, Align: "center"}}/>
                <Button
                className="btn-simple btn btn-success" style={{float: "right"}} Link tag={Link} to="/upload-old-page">
                <font color="cyan">등록</font>
                </Button>
                <Button
                className="btn-simple btn btn-warning" style={{float: "right"}} Link tag={Link} to="/old-descript-page">
                <font color="magenta">상품 더보기</font>
                </Button>
                </Col>
              </Row>
             
              <Row>
              <font size="150" color="white " > &nbsp; &nbsp; TOP ITEM</font>
              </Row>


            <Row>
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                <img alt="..." className="img-fluid rounded shadow-lg" 
                src="https://ccimg.hellomarket.com/images/2019/item/03/23/17/1642_1945942_1.jpg?size=s6"
                style={{ width: "250px" ,height: "220px" }} Link tag={Link} to="/old-descript-page"/>
                </button>
                <p>Air Jordan shoes</p>
                <h5>33 ETH</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                <img alt="..." className="img-fluid rounded shadow-lg" src="https://ccimg.hellomarket.com/images/2019/item/10/27/19/2533_4591886_1.jpg?size=s6" style={{ width: "250px",height: "220px" }} Link tag={Link} to="/old-descript-page"/>
                </button>
                <p>Moncler padding</p>
                <h5>44 ETH</h5>
              </Col>


              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                <img alt="..." className="img-fluid rounded shadow-lg" src="https://i.pinimg.com/originals/bd/93/a6/bd93a6e30f4a41fe7ce461dcf932d3df.jpg" style={{ width: "250px" ,height: "220px" }} Link tag={Link} 
                to="/old-descript-page"/>
                </button>
                <p>rolex watch</p>
                <h5>102 ETH</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                <img alt="..." className="img-fluid rounded shadow-lg" src="https://dnvefa72aowie.cloudfront.net/origin/article/202009/87CCC8EB306D3D8A8150DDE6780C8E2A6012EDAA7FC2624F0BE962873096DF63.jpg?q=82&s=300x300&t=crop"
                style={{ width: "250px",height: "220px" }} Link tag={Link} to="/old-descript-page"/>
                </button>
                <p>chanel bag</p>
                <h5>37 ETH</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                <img alt="..." className="img-fluid rounded shadow-lg" src="https://static.coupangcdn.com/image/vendor_inventory/a0eb/138700c90407fbea7cf6f82e1d9c972a774382528f4acf996057950397e0.jpg" style={{ width: "250px",height: "220px" }} Link tag={Link} to="/old-descript-page"/>
                </button>
                <p>SAINT LAURENT pouch</p>
                <h5>29 ETH</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                <img alt="..." className="img-fluid rounded shadow-lg" src="https://dnvefa72aowie.cloudfront.net/origin/article/201910/F05ECCF00B1A9BF3E731B8A12D6F4CB6A14D0506714DBB4A857E7D078EB4BF2F.jpg?q=95&s=1440x1440&t=inside" 
                style={{ width: "250px" ,height: "220px" }} Link tag={Link} to="/old-descript-page"/>
                </button>
                <p>balenciaga wallet</p>
                <h5>49 ETH</h5>
              </Col>

              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page';}}>
                 <img  alt="..." className="img-fluid rounded shadow-lg"
                  src="https://ccimg.hellomarket.com/images/2019/item/02/14/16/5437_1732784_1.jpg?size=s6"
                  style={{ width: "250px",height: "220px" }}
                  Link tag={Link} to="/old-descript-page"
                  />
                </button>
                  <p>kenzo hood</p>
                  <h5>22 ETH</h5>
              </Col>

              
              <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/old-descript-page';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src="data:image/jpeg;base64,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"
              style={{ width: "250px",height: "220px" }}
              Link tag={Link} to="/old-descript-page"
            />
          </button>
                  <p>valentino padding</p>
                  <h5>107 ETH</h5>
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
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                /> */}
               { <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />}
                {/* <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                /> */}
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
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default OldPage;