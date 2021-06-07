import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios';


export const SignUp = () => {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [surname,setSurname]=useState('')
    const [repassword,setRepassword]=useState('')
    const [data,setData]=useState(null)
    const [isError, setIsError] = useState(false);


const handleSubmit=(e)=>{
    e.preventDefault()
    setIsError(false);
  
    const data= {
        name,
        surname,
        email,
        password,
        repassword,
        clientId:"dGFuc3V0dXJlbXVyYXRvdmFAZ21haWwuY29t"
      };
      const headers={
        'Content-Type': 'application/json',
      
    }
   

    axios.post('http://84.201.129.203:8888/api/auth/sign_up',data,headers).then(res => {
        setData(res.data);
        setEmail('')
        setName('')
        setSurname('')
        setPassword('')
        setRepassword('')
      
      }).catch(err => {
        console.log(err)
        setIsError(true)
      });
}

     
    return (
        <>
         <h1 className="signUp-text">Регистрация</h1>
               
        <form  onSubmit={handleSubmit}className="signUp">
            <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Имя"/>
            <input  onChange={e => setSurname(e.target.value)} type="text"value={surname} placeholder="Фамилия"/>
            <input   onChange={e => setEmail(e.target.value)} type="text" value={email}placeholder="e-mail"/>
            <input   onChange={e => setPassword(e.target.value)} type="password"  value={password} placeholder="Пароль"/>
            <input  onChange={e => setRepassword(e.target.value)} type="password"value={repassword} placeholder="Потвердите Пароль"/>
            {isError && <small className="text-danger">Something went wrong. Please try again .</small>}
            <button className="signUp-btn">Зарегистрироваться</button>
        </form>
        </>
    )

    } 