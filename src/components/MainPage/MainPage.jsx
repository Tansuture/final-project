
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import store from '../../data/store'
import './MainPage.css'
import message from './message.png'
import bike1 from './bike1.jpg'
import bike2 from './bike2.png'
import bike3 from './bike.3.jpg'
import bike from './bike.png'


export const MainPage = () =>{
    
  
  const {isLogin}=useContext(store)
  let bikes;
  if(isLogin){
      bikes = (
        <div className="auth-div">
        <Link  className="auth-title" to='/stolen'>Украденные Велосипеды</Link>
        <Link   className="auth-title"  to="/employess">Ответсвенные сотрудники</Link>
        </div>
      )
  }
  else null
    return(
        <>
     
     <Link  className="report-msg" to ="/report"> <img src={message} className="report-img"></img></Link>
        {bikes}
        <p className="main-title"><span className="highlighted">BIKE_TRACK </span>-ЭТО Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

       <div className="imgs">
        <img  className="bike-img"src={bike1}></img>
        <img  className="bike-img" src={bike2}></img>
        <img className="bike-img" src={bike3}></img>
  
        <img className="bike-img" src={bike}></img>
       
       </div>
        </>
    )
}
