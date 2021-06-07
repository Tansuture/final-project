
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './InDetail.css'
import moment from 'moment'


export const InDetail = (props)=>{
 
const data =props.location.state
const [cases,setCases]=useState(data)
const [textValue,setTextValue]=useState(cases)


const handleSubmit=()=>{
    axios.put(`http://84.201.129.203:8888/api/cases/${cases._id}`,cases,{
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }).then(()=>loadData())
}

const loadData = async ()=>{
const response= await axios.get(`http://84.201.129.203:8888/api/cases/${data._id}`,{
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    })
    setCases(response.data)
  
}
const handleChange=(e)=>{
    const value=e.target.value
    setTextValue(value)
    const bike={...cases}
   bike.status=value
   bike.ownerFullName=value
   bike.color=value
   bike.type=value
   bike.date=value
    setCases(bike)

    

}

useEffect(() => {
    loadData();
    console.log(data)
  }, []);

    return(
        <>
        <h1 className="detail-title">Детальная страница велосипеда</h1>
        <div className="detail-form">

        <label className = "title">Имя Владельца:</label>
        <textarea onChange={handleChange} className="detail-field" value={textValue.ownerFullName}></textarea>
        <label className = "title"> Цвет:</label>
        <textarea  onChange={handleChange} className="detail-field" value={textValue.color}></textarea>
        <label className = "title">Дата Кражи: {moment(cases.date).format('L')}</label>
        <input  className="date" type ="date"></input>
        <label className = "title">Номер:</label>
        <textarea onChange={handleChange} className="detail-field" value={textValue.licenseNumber}></textarea>
        <label className = "title">Тип:</label>
        <textarea  onChange={handleChange} className="detail-field" value={textValue.type}></textarea>
        <p className = "immutable">Cоздано в {moment(cases.createdAt).format('L')}</p>
        <p className = "immutable">Изменено в {moment(cases.updateAt).format('L')}</p>
        <p className = "immutable"> Статус : {cases.status}</p>
        <button  onClick={handleSubmit} className="btn save-btn">Сохранить</button>
        </div>
        </>
    )
}