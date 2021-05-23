
import './Header.css'
import React from 'react'
import logo from './img/logo.png'
import { Link } from 'react-router-dom'
  export const Header = ({active,setActive}) => {
    return ( 
    <> 
    <div className="header">
    
    <ul className="list">
        <li>
            <Link  className="link" to="/">Главная</Link>
        </li>
        <li>
        <Link className="link" >FAQ</Link>
        </li>
        <img src={logo} className="header-img"/>
        <li>
        <Link className="link">Контакты</Link>
        </li>
        <li>
        <Link  className="link" onClick={()=>setActive(true)}>Вход</Link>
        </li>
       
    </ul>
    </div>
     </>
    )
}

