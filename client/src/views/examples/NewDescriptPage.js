
import React , { Component } from "react";


import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel
} from "reactstrap";

// core components
import NewNavbar from "components/Navbars/NewNavbar.js";
import Footer from "components/Footer/Footer.js";
import 'pure-react-carousel/dist/react-carousel.es.css';

import { Link } from "react-router-dom";

const carouselItems = [
  {
    src: require("assets/img/gucci2.jpg"),
    altText: "Slide 1",
    caption: "2018 프리폴 컬렉션"
  },
  {
    src: require("assets/img/gucci3.jpg"),
    altText: "Slide 2",
    caption: "cryptoberry는 정품만 취급합니다"
  },
  {
    src: require("assets/img/gucci.jpg"),
    altText: "Slide 3",
    caption: "정품이 아닐시 1000% 보상"
  }
];

let ps = null;



class NewDescriptPage extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("Product-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("Product-page");
  }

  constructor(props){
  super(props);
    
  this.state={
    value:0,min:0,counter:0
  };
  this.handleClickPlus=this.handleClickPlus.bind(this);
  this.handleClickMinus=this.handleClickMinus.bind(this);
  this.handleOnChange=this.handleOnChange.bind(this);
  
}
handleClickPlus(){
  this.setState({
    value:this.state.value+1
  });
}

handleClickMinus(){
  if(this.state.value <=0) return;
  this.setState({
    value:this.state.value-1
  });
}

handleOnChange(e) {
  
  // e.target.value 숫자만 있는지 확인
  this.setState({
    value: e.target.value
  });
}

  selectChange(e){
    this.setState({
      selectedValue: e.target.value
    })
  }
  render() {
    return (

      <>
       
      
  
       <NewNavbar />

           <img
              alt="..."
              className="path"
              src={require("assets/img/blob.png")}
            />

            <img
              alt="..."
              className="shapes circle"
              src={require("assets/img/cercuri.png")}
            />
       

       
        
       <div className="wrapper">
          <div className="page-header" style={{display : 'inline'}}>

         


         
          <Row className="row-grid justify-content align-items text-left">
                <Col lg="12" md="6">
                  <h1 className="text-white">
                  </h1><br/>
                  <h3 className="text-white mb-3">
                  </h3><br/>
                  <h3 className="text-white mb-3">
                  </h3><br/>
                  <div className="btn-wrapper">
                    </div>
                </Col>

              </Row>

          

          <Row className="row-grid justify-content align-items text-left">
                <Col lg="12" md="6">
                  <h1 className="text-white">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  Our products 
                  </h1><br/>
                  <h3 className="text-white mb-3">
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  크립토 베리 에서는 본사에서 직접 받아온 제품만 판매합니다.
                  </h3>
                  <div className="btn-wrapper">
                    </div>
                </Col>

              </Row>

              <div className="section">
                <Container>
                  <Row>

                  <Col className="col-md-12 col-lg-6">
                  <div className="carousel slide">
                  <Row className="justify-content-between align-items-center">
                    <UncontrolledCarousel items={carouselItems} />
                  </Row>
                  </div>
                  

                  </Col>

                  
                  
                  <Col className="mx-auto col-md-12 col-lg-6">
                    <h2 className="title">GUCCI Snake wallet</h2>

                    <div className="stars stars-right">
                      <div className="stars text-warning">
                        <i className="fas fa-star">

                        </i>

                        <i className="fas fa-star ml-1">

                        </i>

                        <i className="fas fa-star ml-1">
                          
                        </i>

                        <i className="fas fa-star ml-1">
                          
                        </i>

                        <i className="far fa-star ml-1">
                          
                        </i>
                        <p className="d-inline ml-1">(76 customer reviews)</p>
                      </div>
                    </div>
                  <br/>
                  <h2 className="main-price">41 ETH</h2>
                  <h5 className="category">Description</h5>
                  <p className="description">GG 수프림 캔버스 지갑. 구찌 하우스의 시그니처 디테일로 끊임없이 활용되는 강렬한 컬러의 킹스네이크 프린트. 친환경 소재.</p><br/>

                 

                  <div className="pick-size row">
                  <Col className="col-md-4 col-lg-2">
                    <label>
                      &nbsp; &nbsp; 수량
                    </label>
                    <div className="input-group">
                      <div className="input-group-btn">
                        <button onClick={this.handleClickMinus} type="button" className="btn-round btn-simple btn btn-warning">
                          <i className="tim-icons icon-simple-delete">
                            
                          </i>
                        </button>
                      </div>

                      

                    </div> 

                   
                    <input id="myNumber" type="text" className="input-number form-control"  value={this.state.value} onChange={this.handleOnChange}/>
                    

                    <div className="input-group">
                    <div className="input-group-btn">
                      <button onClick={this.handleClickPlus} type="button" className="btn-round btn-simple btn btn-warning">
                        <i className="tim-icons icon-simple-add">
                          
                        </i>
                      </button>
                      
                      
                    </div>    

                    
                    </div>          
                  </Col>

                  <Col className="col-sm-6 col-md-4 col-lg-4">
                  <label>Select color</label>
                  {/* <div className="react-select react-select-warning css-2b097c-container">
                    <div className="react-select__control css-yk16xz-control">
                    <div className="react-select__value-container react-select__value-container--has-value css-1hwfws3">
                    <div className="react-select__placeholder css-1wa3eu0-placeholder"></div>
                    <div> */}
                    {/* <div className="react-select__placeholder css-1wa3eu0-placeholder"></div>
                    <div className="react-select__single-value css-1uccc91-singleValue">Black</div>
                    <div className="react-select__single-value css-1uccc91-singleValue">Gray</div>
                    <div className="react-select__single-value css-1uccc91-singleValue">White</div> */}
                    <select>
                      <option selected value="choice">==선택==</option>
                      <option value="Black">Black</option>
                      <option value="Brown">Brown</option>
                      <option value="Gray">Gray</option>
                      <option value="Navy">Navy</option>
                      <option value="gita">기타</option>
                    </select>
                    {/* </div>
                   

                        <div className="css-1g6gooi">
                          <div className="react-select__input" style={{display: "inline-block"}}>
                          <input autocapitalize="none" autocomplete= "off" autocorrect="off" id="react-select-2-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" value="" style={{ boxSizing: "content-box", width: "2px", background: "0px center", border: "0px", fontSize: "inherit", opacity: "1", outline: "0px", padding: "0px", color: "inherit"}}/>
                          <div style={{position: "absolute",
                            top: "0px",
                            left: "0px",
                            visibility: "hidden",
                            height: "0px",
                            overflow: "scroll",
                            whiteSpace: "pre",
                            fontSize: "14px",
                            fontFamily: "Poppins sans-serif",
                            fontWeight: "400",
                            fontStyle: "normal",
                            letterSpacing: "normal",
                            textTransform: "none"}}></div>

                          </div>
                        </div>
                      </div> */}
                      
                      {/* <div className="react-select__indicators css-1wy0on6">
                        <span className="react-select__indicator-separator css-1okebmr-indicatorSeparator"></span>
                      <div aria-hidden="true" class="react-select__indicator react-select__dropdown-indicator css-tlfecz-indicatorContainer">
                        <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" 
                        focusable="false" class="css=19bqh2r">
                          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                        </svg>

                      </div>
                      </div>
                      
                    </div>
                  </div> */}
                  </Col>

                  <Col className="col-sm-6 col-md-4 col-lg-4">
                    <label>Select size</label>
{/* 
                  <div className="react-select react-select-warning css-2b097c-container">

                  <div className="react-select__control css-yk16xz-control">
                  <div className="react-select__value-container react-select__vlaue-container--has-value css-1hwfws3"> */}
                  {/* <div className="react-select__single-value css-1uccc91-singleValue">Extra Small</div>
                  <div className="react-select__single-value css-1uccc91-singleValue">Small</div>
                  <div className="react-select__single-value css-1uccc91-singleValue">Medium</div>
                  <div className="react-select__single-value css-1uccc91-singleValue">Large</div>
                  <div className="react-select__single-value css-1uccc91-singleValue">Extra Large</div> */}

                  <select>
                      <option selected value="choice">==선택==</option>
                      <option value="Extra Small">Extra Small</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
                      <option value="gita">기타</option>
                    </select>
                 
                

                  {/* </div>
                  </div>
                  </div> */}

                  {/* <div className="react-select__indicators css-1wy0on6">
                    <span className="react-select__indicators-separator css-1okebmr-
                    indicatorSeparator"></span>
                  <div aria-hidden="true" className="react-select__indicator react-select__dropdown-indicator css-tlfecz-indicatorContainer">
                  <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true"
                  focusable="false" class="css-19bqh2r">
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                  </svg>
                  

                    
                  </div>
                  
                  

                  </div> */}
                  
                      
                  </Col>

                  

                  <Col>
                  
                  <Button
                className="btn-simple btn btn-primary" style={{float: "right"}} Link tag={Link} to="/order-page">
                <i className="tim-icons icon-cart"></i>
	구매하기
              </Button>

                  
                  </Col>

                  </div>
                  </Col>
                  
                  

                   {/* <div className="justify-content-start row">
                  <button className="m1-39 btn btn-primary" style={{float: 'right'}}>
                     구매하기 &nbsp;
                    <i class="tim-icons icon-cart">
                      
                    </i>
                  </button>

                  </div>  */}
                  </Row>
                 
                </Container>

                
              </div>
              
            </div>
            
            <div className="section">
             
                <div className="container">
                  <Row>
                    <Col className="ml-auto mr-auto text-center col-md-6">
                      <h2 className="title">Not convinced yet?</h2>
                      
                      <h4 className="description">정보가 더 필요한가요? 다른 사람이 우리 제품에 대해 말하는 것을 확인해보세요. 그들은 그들의 구매에 매우 만족합니다.</h4>
                    </Col>
                  </Row>
                
                  <Row>
                <Col className="col-md-3" >
                  <div className="card-testimonial card">
                  <div className="card-avatar">
                        <a href="#pablo">
                          <img alt="..." class="img img-raised" src={require("assets/img/girl11.jpg")}></img>"
                        </a>
                      </div>

                      <div className="icon icon-primary">
                      <i className="fa fa-quote-right"></i>
                      </div>

                      <div className="card-body">
                  <p className="card-description">크립토베리에서 10번 넘게 구매합니다. 히히</p><br/>
                  <p className="card-description">믿고 사셔도 좋아요 ㅎㅎ</p>
                </div>
                <div className="icon icon-primary">
                  <i className="fa fa-quote-right">
                    
                  </i>
                </div>
                <div className="card-footer">

                <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                <Link to="profile-page">
                      <i className="tim-icons icon-single-02">

                      </i>
                      </Link>
                    </button>
                  <h4 className="card-title">효정님</h4>
                  <p classNamee="category">@hyojung</p>

                    </div>
                    </div>
                    
                  </Col>


                <Col className="col-md-3">
                  <div className="card-testimonial card">
                  <div className="card-avatar">
                        <a href="#pablo">
                          <img alt="..." class="img img-raised" src={require("assets/img/man1.jpg")}></img>"
                        </a>
                      </div>

                      <div className="icon icon-primary">
                      <i className="fa fa-quote-right"></i>
                      </div>

                      <div className="card-body">
                  <p className="card-description">명품샵 가기는 귀찮고 그렇다고</p><br/>
                  <p className="card-description">인터넷은 가짜 같은데, 여긴 그 생각을 깨줬습니당</p>
                </div>
                <div className="icon icon-primary">
                  <i className="fa fa-quote-right">
                    
                  </i>
                </div>
                <div className="card-footer">

                <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                <Link to="profile-page">
                      <i className="tim-icons icon-single-02">

                      </i>
                      </Link>
                    </button>
                  <h4 className="card-title">Olivia Harper</h4>
                  <p classNamee="category">@oliviaharper</p>

                </div>
                  </div>

                </Col>
                

                <Col className="col-md-3">
                  <div className="card-testimonial card">
                  <div className="card-avatar">
                        <a href="#pablo">
                          <img alt="..." class="img img-raised" src={require("assets/img/girl2.jpg")}></img>"
                        </a>
                      </div>

                      <div className="icon icon-primary">
                      <i className="fa fa-quote-right"></i>
                      </div>

                      <div className="card-body">
                  <p className="card-description">물건이 정말 좋고 예쁩니다!!! &nbsp; 진짜 최고^^</p><br/>
                  <p className="card-description">cryptoberry very nice!!!</p>
                </div>
                <div className="icon icon-primary">
                  <i className="fa fa-quote-right">
               
                  </i>
                </div>
                <div className="card-footer">

                <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                <Link to="profile-page">
                      <i className="tim-icons icon-single-02">

                      </i>
                      </Link>
                    </button>
                  <h4 className="card-title">James Logan</h4>
                  <p classNamee="category">@jameslogan</p>

                </div>
                  </div>
            
                </Col>

                <Col className="col-md-3">
                  <div className="card-testimonial card">
                  <div className="card-avatar">
                        <a href="#pablo">
                          <img alt="..." class="img img-raised" src={require("assets/img/man2.jpg")}></img>"
                        </a>
                      </div>

                      <div className="icon icon-primary">
                      <i className="fa fa-quote-right"></i>
                      </div>

                      <div className="card-body">
                  <p className="card-description">한국에 놀러왔더니 이런 사이트도 있고,</p><br/>
                  <p className="card-description">배송이 엄청 빨라서 좋네요</p>
                </div>
                <div className="icon icon-primary">
                  <i className="fa fa-quote-right">
                    
                  </i>
                </div>
                <div className="card-footer">

                <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                <Link to="profile-page">
                      <i className="tim-icons icon-single-02">

                      </i>
                      </Link>
                    </button>
                  <h4 className="card-title">DELE ALLI</h4>
                  <p classNamee="category">@delealli</p>

                

                </div>
                  </div>

                </Col>
                
                </Row>
                
                </div>
            </div>
          </div>

          
          

         <div className="section related-products">
          <div className="container">
          <Col className="col-md-8">
            <h2 className="title">You may also like</h2>
            <h3 className="title">고객님을 위한 맞춘 추천 상품</h3>
          </Col>
          
          <Row>
            <Col className="col-md-6 col-lg-3">
              <div className="card-product card">
                <div className="card-image">
                  <a href="#pablo">
                  <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/Product-page2';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={require("assets/img/ballpen3.jpg")}
              
            />
          </button>
                  </a>
                </div>
                <div className="card-body">
                  <h6 className="category text-warning">Trending</h6>
                  <h4 className="card-title">
                    <a href="#pablo" className="text-white card-link">monblanc ballpen</a>
                  </h4>
                  <div className="card-description">
                    마이스터스튁 클래식 볼펜은 고급 블랙 레진 캡과 배럴로 대표되는 특별한 디자인 아이콘입니다.
                  </div>
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price">9 ETH</span>
                    </div>
                    <button id="tooltip449471879" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                      <i className="tim-icons icon-heart-2">

                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="col-md-6 col-lg-3">
              <div className="card-product card">
                <div className="card-image">
                <a href="#pablo">
                  <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/product-page2';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={require("assets/img/dior2.jpg")}
              
            />
          </button>
                  </a>
                </div>
                <div className="card-body">
                  <h6 className="category text-warning">Popular</h6>
                  <h4 className="card-title">
                    <a href="#pablo" className="text-white card-link">Dior Belt</a>
                  </h4>
                  <div className="card-description">
                  블랙 Christian Dior 앰보싱 나일론 Saddle 벨트입니다.
                원피스,코트 바지 위에 코디 하실 수 있습니다.
                  </div>
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price">17 ETH</span>
                    </div>
                    <button id="tooltip320714545" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                      <i className="tim-icons icon-heart-2">
                        
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="col-md-6 col-lg-3">
              <div className="card-product card">
                <div className="card-image">
                <a href="#pablo">
                  <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/product-page2';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={require("assets/img/patek2.jpg")}
              
            />
          </button>
                  </a>
                </div>
                <div className="card-body">
                  <h6 className="category text-warning">Trending</h6>
                  <h4 className="card-title">
                    <a href="#pablo" className="text-white card-link">patekphilippe watch</a>
                  </h4>
                  <div className="card-description">
                  세계 시계 브랜드 NO.1을 자부할 수 있는 시계업계 원탑 파텍틸립을 만나보세요.
                  </div>
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price">555 ETH</span>
                    </div>
                    <button id="tooltip300524105" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                      <i className="tim-icons icon-heart-2">
                        
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="col-md-6 col-lg-3">
              <div className="card-product card">
                <div className="card-image">
                <a href="#pablo">
                  <button type="button" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/product-old';
          }}>
            <img
              alt="..."
              className="img-fluid rounded shadow-lg"
              src={require("assets/img/tagheuer2.jpg")}
              
            />
          </button>
                  </a>
                </div>
                <div className="card-body">
                  <h6 className="category text-warning">Trending</h6>
                  <h4 className="card-title">
                    <a href="#pablo" className="text-white card-link">TAGHeuer watch</a>
                  </h4>
                  <div className="card-description">
                  대한민국 국가대표 축구선수 손흥민이 착용하는 시계!!! 한정판매 중입니다 서두르세요!!
                  </div>
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="price">78 ETH</span>
                    </div>
                    <button id="tooltip755498009" className="btn-simple btn-icon btn-round pull-right btn btn-warning">
                      <i className="tim-icons icon-heart-2">
                        
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            
          </Row>


          </div>
         </div>


             
          <Footer />
        
        
      </>
    );
  }
}

export default NewDescriptPage;
