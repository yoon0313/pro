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
import Caver from "caver-js";

const config = {rpcURL: 'https://api.baobab.klaytn.net:8651'}
const caver = new Caver(config.rpcURL);


class OldPage extends React.Component {
  state = {
    squares1to6: "",
    squares7and8: "",
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

  constructor(props) {
    super(props);

    this.state = {
      inputFocus: false,
      products:[],
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
    const response = await fetch('http://localhost:5000/OldP/products/getOldP');
    //출력한 데이터를 json으로 만들어서 body라는 변수에 넣어줌
    const body = await response.json();
    return body;
  }

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

  getWallet = () => {
    console.log("getWallet"+caver.klay.accounts.wallet.length);
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0]
    } else {

      const walletFromSession = sessionStorage.getItem('walletInstance')
      try {
        caver.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        sessionStorage.removeItem('walletInstance')
      }
      return caver.klay.accounts.wallet[0]
    }
  }

  render() {
 
    let Items = this.state.products.map( item=>{
      if (item._id ==='index') return( <></>)
      return(

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
        <div className="card-profile card">
          <div className="card-image">
            <a href="#pablo">
            <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/old-descript-page?index='+item.index;}}>
              <img alt="..." className="img-fluid rounded shadow-lg" 
                src={item.images[0].binary}
                 style={{ width: "250px" ,height: "220px" }} Link tag={Link} to="/new-descript-page"/>
              </button>
            </a>
          </div>
          <div className="card-body">
            <hr className="line-success"></hr>
              
                <table className="tablesorter table">
                  <tbody>
                    <tr>
                    <td className="text-left" >
                          <i className="tim-icons icon-bag-16 text-success" ></i> &nbsp;
                          <p className="category text-success d-inline">Brand</p>
                        </td>
                        <td className="text-right">{item.brand}</td>
                      </tr>
                      <tr>
                      <td className="text-left">
                          <i class="tim-icons icon-money-coins text-success"/>&nbsp;&nbsp;
                          <p className="category text-success d-inline">Price</p>
                        </td>
                        <td className="text-right">{item.price} Klay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        
      </Col>
                  
      )});

      
    var walletInstance = this.getWallet();
    if (walletInstance) { 
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
                    {/* <Button
                    className="btn-simple btn btn-warning" style={{float: "right"}} Link tag={Link} to="/old-descript-page">
                    <font color="magenta">상품 더보기</font>
                    </Button> */}
                    </Col>
                  </Row>
                
                  <Row>
                  <font size="150" color="white " > &nbsp; &nbsp; TOP ITEM</font>
                  </Row>


                  <Row>
                    {Items}
                  </Row>
                    
                    {/* <Row>
                      <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                      <div className="square square-7" id="square7" style={{ transform: this.state.squares7and8 }}/>
                      <div className="square square-8" id="square8" style={{ transform: this.state.squares7and8 }}/>
                      </Col>
                    </Row> */}

                    <div className="square square-3" id="square3" style={{ transform: this.state.squares1to6 }}/>
                    <div className="square square-5" id="square5" style={{ transform: this.state.squares1to6 }}/>
                    <div className="square square-6" id="square6" style={{ transform: this.state.squares1to6 }}/>
                </Container>
              </div>
            </div>
          <Footer/>
        </div>
        
      </>
      );
    }
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
                  </Col>
                </Row>
              
                <Row>
                <font size="150" color="white " > &nbsp; &nbsp; TOP ITEM</font>
                </Row>


                <Row>
                  {Items}
                </Row>

                  <div className="square square-3" id="square3" style={{ transform: this.state.squares1to6 }}/>
                  <div className="square square-5" id="square5" style={{ transform: this.state.squares1to6 }}/>
                  <div className="square square-6" id="square6" style={{ transform: this.state.squares1to6 }}/>
              </Container>
            </div>
          </div>
        <Footer/>
      </div>
      
    </>
    );
  }
}

export default OldPage;