import Axios from 'axios';
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
import { Link } from "react-router-dom";




class NewPage extends React.Component {
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

  constructor(props) {
    super(props);

    this.state = {
      inputFocus: false,
      news:[],
      value:0,min:0,counter:0
    };
  }

  componentDidMount(){
    this.callApi()
      //body로 담은 고객 목록을 받아서 
      //이 목록을 state로 설정해주는것
      //결과적으로 body가 res라는 변수이름으로 바뀌고
      //그것을 customers 변수값에 넣어줌
      .then(res => this.setState({news: res}))
      //만약 오류가 발생하는경우 콘솔창에 오류를 보여준다.
      .catch(err => console.log(err));
  }

  callApi = async()=>{
    //접속하고자 하는 api주소를 넣어줌
    const response = await fetch('http://localhost:5000/NewP/new/getNewP');
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
  Axios.get("http://localhost:5000/NewP/new/getNewP", body)
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


  // -------------------------------------------------------------------------------------

  render() {

    let Items = this.state.news.map( item=>{
      if (item._id ==='index') return( <></>)
      return(

        <Col className="mt-5 mt-sm-0" sm="3" xs="6">
          <div className="card-profile card">
            <div className="card-image">
              <a href="#pablo">
              <button type="button" onClick={(e) => {e.preventDefault(); window.location.href='/new-descript-page?index='+item.index;}}>
                <img alt="..." className="img-fluid rounded shadow-lg" 
                  src={item.images[0].binary}
                   style={{ width: "250px" ,height: "220px" }} Link tag={Link} to="/new-descript-page"/>
                </button>
              </a>
            </div>
            <div className="card-body">
              <hr className="line-primary"></hr>
                
                  <table className="tablesorter table">
                    <tbody>
                      <tr>
                        <td className="text-left" >
                          <i className="tim-icons icon-bag-16  text-primary" ></i> &nbsp;
                          <p className="category text-primary d-inline">Brand</p>
                        </td>
                        <td className="text-right">{item.brand}</td>
                      </tr>
                      <tr>
                      <td className="text-left">
                          <i class="tim-icons icon-money-coins text-primary"/>&nbsp;&nbsp;
                          <p className="category text-primary d-inline">Price</p>
                        </td>
                        <td className="text-right">{item.price} Klay</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          
        </Col>
    
                  
      )});


    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
              <Row>
                <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 1, Align: "center"}}/></Col>
                <Col className="item"><h1>NEW PRODUCT</h1></Col>
                <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 1, Align: "center"}}/></Col>
              </Row>

   

        <Row>
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>



        <iframe width="850" height="400" src="https://www.youtube.com/embed/ch6f2mrGUYk?amp;autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <Col className="item"><hr style={{width: '100%', height: 2, Align: "center"}}/></Col>
        </Row>

       
        <div class="space-70"></div>

          <Row>
            <Col className="item"><hr style={{width: '100%', color: "white", backgroundColor:"white", height: 1, Align: "center"}}/></Col>
          </Row>

        <Row>
        <font size="100" color="white " > &nbsp; &nbsp; TOP 8</font>
        </Row>

        <div class="space-70"></div>

               <Row>
                  {Items}
                </Row>

                <Row>
                    <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div className="square square-7" id="square7" style={{ transform: this.state.squares7and8 }}/>
                    <div className="square square-8" id="square8" style={{ transform: this.state.squares7and8 }}/>
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
