import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export const Employess = ()=>{
    const[isSubmit,setSubmit]=useState()
    const [data,setData]=useState()
    const [name,setName]=useState("")
    const [surName,setSurName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  

    const handleSubmit =(e)=>{
      
        e.preventDefault()
        const data = {
            firstName:name,
            lastName:surName,
            email,
            password,
            clientId:"dGFuc3V0dXJlbXVyYXRvdmFAZ21haWwuY29t"
        }
        axios.post('http://84.201.129.203:8888/api/officers',data,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then((res)=>{
          console.log('hell')
        })
    }


    return (
        
        <div>
         <h1 className="modal-text">Ответсвенные сотрудники</h1>
        <form  onSubmit={handleSubmit}className="report">
      
               <label >Имя</label>
                <input type="text" className="report-input"onChange={(e)=>setName(e.target.value)}  value={name} ></input>
             
               <label >Фамилия </label>
                <input type="text"className="report-input" onChange={(e)=>setSurName(e.target.value)} value={surName } ></input>
                
                <label >Email</label>
                <input type="email"className="report-input" onChange={(e)=>setEmail(e.target.value)}value={email}  />        
           
                <label >Пароль</label>
                <input type="password"className="report-input" onChange={(e)=>setPassword(e.target.value)}value={password} />        

              
        <button type="submit" className="signUp-btn">Отправить</button>
        {/* {isSubmit && <small className="report-text">Отправлено.</small>} */}
        <Link to="/">Список сотрудников</Link>
        </form>
        </div>
        
    )
}