
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';
import {Header} from './components/Header'
import { MainPage } from './components/MainPage';
import { SignIn } from './components/SignInModal';
import { SignUp } from './components/SingUp';
import axios from 'axios'
import StoreApi from './data/store'
import './user.css'
import { Report } from './components/Report';
import { StolenBikes } from './components/StolenBikes';
import { InDetail } from './components/Detail';
import { Employess } from './components/Employess';





export const App =()=> {

const [isLogin,setIsLogin]=useState()
const [active,setActive]=useState(false)
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [data,setData]=useState(null)
const [isError, setIsError] = useState(false);

const handleSubmit=(e)=>{
    e.preventDefault()
    setIsError(false);
  
    const data ={
        email:email,
        password:password
    }
    axios.post(' http://84.201.129.203:8888/api/auth/sign_in', data,{ headers }).then(res => {
        setData(res.data);
        setEmail('');
        setPassword('');
        setActive(false)
        setIsLogin(true)
        localStorage.setItem('token',res.data.token)

       
      }).catch(err => {
        setIsError(true);
        setEmail('');
        setPassword('');
      
      });
}

const headers={
  'Content-Type': 'application/json',
  // Authorization: 'Bearer '+localStorage.getItem('token')
}



    return (
   
      <>
    
      <div className="wrapper">
      <StoreApi.Provider value={{handleSubmit,isLogin,setIsLogin,data,setData,setEmail,email,setIsError,isError,setPassword,password}}>
       <Header setActive={setActive} active={active}/>
        <SignIn   setActive={setActive} active={active} />
        <Route  exact path ="/" component={MainPage}/>
        </StoreApi.Provider>
        <Route path = "/signUp"component={SignUp} />
        <Route path = "/report" component={Report}/>
        <Route path="/stolen" component={StolenBikes}/>
        <Route path="/detail" component={InDetail}/>
        <Route path="/employess" component={Employess}/>
       
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
