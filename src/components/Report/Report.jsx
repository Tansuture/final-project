import axios from 'axios'
import React, { useState } from 'react'
import './Report.css'


 export const Report = () =>{
    
    const[isSubmit,setSubmit]=useState()
    const [licenseNumber,setLicense]=useState('')
    const [date,setDate]=useState()
    const[color,setColor]=useState('')
    const [type,setType]=useState('')
    const [ownerFullName,setName]=useState('')
    const [data,setData]=useState(null)
   


    const handleChange=(e)=>{
    
        setType(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data={
            licenseNumber,
            date,
            color,
            type:type,
            ownerFullName,
            status:"new",
            createdAt:new Date(),
            updateAt:new Date(),
            clientId:"dGFuc3V0dXJlbXVyYXRvdmFAZ21haWwuY29t"
        }
        axios.post(' http://84.201.129.203:8888/api/public/report',data).then(res=>{
            setData(res.data)
            setLicense('')
            setName('')
            setColor('')
            setType('')
            setDate('')
            setSubmit(true)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
          });
    }
  
    return(
        <div>
         <h1 className="modal-text">Сообщить о краже</h1>
        <form  onSubmit={handleSubmit}className="report">
      
               <label >Имя Владельца</label>
                <input type="text" className="report-input"onChange={(e)=>setName(e.target.value)}  value={ownerFullName} ></input>
             
               <label >Номер </label>
                <input type="text"className="report-input" onChange={(e)=>setLicense(e.target.value)} value={ licenseNumber} ></input>
                
                <label >Дата Кражи</label>
                <input type="date"className="report-input" onChange={(e)=>setDate(e.target.value)}value={date}  />        
           
                <label >Цвет</label>
                <input type="text"className="report-input" onChange={(e)=>setColor(e.target.value)}value={color} />        

                
                <label  className="type">Тип</label>
                <select  onChange={handleChange}>
                    <option value="sport">Sport</option>
                    <option value="general">General</option>
                </select>
        <button type="submit" className="signUp-btn">Отправить</button>
        {isSubmit && <small className="report-text">Отправлено.</small>}
        </form>
        </div>
    )

}

