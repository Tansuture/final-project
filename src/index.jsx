import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {Header} from './components/Header'
import { MainPage } from './components/MainPage';
import { SignIn } from './components/SignInModal';
import { SignUp } from './components/SingUp';

import './user.css'


export const App =()=> {
 const [active,setActive]=useState(true)
    return (
      <>
      <div className="wrapper">
       <Header setActive={setActive} active={active}/>
        <SignIn setActive={setActive} active={active} />
        
        <Route  exact path ="/" component={MainPage}/>
        <Route path="/signUp"component={SignUp} />
      </div>
  
      </>
    )
  }


ReactDom.render(
  <BrowserRouter>
    <App />
   </BrowserRouter>,
  document.getElementById('root'),
);
