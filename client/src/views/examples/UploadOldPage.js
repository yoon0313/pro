import React from "react";
import { Link } from "react-router-dom";
import OldNavbar from "components/Navbars/OldNavbar.js";
import { useState } from 'react';
import Axios from 'axios';
import {Typography, Button, Form, Input} from 'antd';



const {TextArea} =Input;

const Tokens= [
  {key:1, value:"Africa"},
  {key:2, value:"Asia"},
  {key:3, value:"America"},
  {key:4, value:"Europe"},
  {key:5, value:"Austrailia"},
  {key:6, value:"North America"},
  {key:7, value:"South America"},

]


function UploadOldPage(props){
  const [Title, setTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Price, setPrice] =  useState(0)
  const [Token, setToken] = useState(1) //드롭박스
  const [ Images, setImages] = useState([])

  const titleChangeHandler = (event) => {

    setTitle(event.currentTarget.value)

}

const descriptionChangeHandler = (event) => {

    setDescription(event.currentTarget.value)

}

const priceChangeHandler = (event) => {

    setPrice(event.currentTarget.value)

}

const  tokenChangeHandler = (event) => {

    setToken(event.currentTarget.value)

}

const updateImages = (newImages) => {
     
    setImages(newImages)


}

const submitHandler = (event) =>{
    // preventDefault를 해줘야 확인 버튼을 눌렀을때
    // 화면이 새로고침되지 않는다.
    event.preventDefault();


    //모든 입력칸이 채워지지않으면 submit할 수없게 조건문
    if(!Title || !Description || !Price || !Token || !Images){
        return alert("모든 값을 넣어주세요")
    }


    //서버에 채운 값을 request로 보낸다.
    //axious post를 하면 body를 적어줘야함
    const body = {
        //로그인된 사람의 ID를 가져오기위해 
        
        title:Title,
        description:Description,
        price:Price,
        images:Images,
        tokens: Tokens
    }

     //서버로 보내기
    Axios.post("http://localhost:5000/OldP/products/register", body)
        .then(response => {
            if(response.data.success){
                alert('상품 업로드에 성공 했습니다.')
                //상품업로드 후 랜딩페이지로 돌아감
                props.history.push('/')
            }else{
                alert('상품 업로드에 실패 했습니다.')
            }
        })

}

return(
    
  <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
      <OldNavbar/>
      <div style={{ textAlign:'center', marginBottom:'2rem'}}>
          <h2>여행 상품 업로드</h2>
      </div>


     <Form onSubmit={submitHandler}>
         {/* DropZone */}
         

         <br/>
         <br/>
         <label>이름</label>
         <Input onChange={titleChangeHandler} value={Title}/>
         <br/>
         <br/>
         <label>설명</label>
         <TextArea onChange={descriptionChangeHandler} value={Description}/>
         <br/>
         <br/>
         <label>가격($)</label>
         <Input type="number" onChange={priceChangeHandler} value={Price}/>
         <br/>
         <br/>
         <select onChange={tokenChangeHandler} value={Token}>
             {Tokens.map(item =>(
                   <option key={item.key} value={item.key}>{item.value}</option>
             ))}
         </select>
         <br/>
         <br/>
         
         <Button type="submit"onClick={submitHandler}>
             확인
         </Button>
     </Form>
  </div>
)

}


export default UploadOldPage;