import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './StolenBikes.css'
import {Link} from 'react-router-dom'
import moment from 'moment'


export const StolenBikes = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [inputValue,setInputValue] = useState()
    const [textValue,setTextValue] =useState()
  
    //для удаления сообщения
  const handleDelete=(e)=>{
    e.preventDefault();

    const itemIdx = + e.target.attributes.getNamedItem("deteleitem").value
    const item = data[itemIdx]
    

    axios.delete(`http://84.201.129.203:8888/api/cases/${item._id}`,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then(()=>loadData())
    }
   // чтобы взять данные из селектора и поменять статус
    const handleInputValue= e =>{
        const value = e.target.value
       setInputValue(value)

        const objectIdx = + e.target.selectedOptions[0].getAttribute('objectindex') ;
        const items = [...data]
        
        const item = {...items[objectIdx]}
        item.status = value
        items[objectIdx] = item
        setData(items)
   
    }
   
    //для изменения сообщения
    const handleChange=(e)=>{
        e.preventDefault()
      
        const itemIdx = + e.target.attributes.getNamedItem("itemindx").value
        const item = data[itemIdx]
     

        if(item.status === "done" && isEmpty(textValue)) {
            alert("Поле обязательное")
        }
        axios.put(`http://84.201.129.203:8888/api/cases/${item._id}`,item,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then(()=>loadData())
     
        
        
    }

    function isEmpty(str) {
        return (!str || str.length === 0 );
    }

    function isDone(item) {
        let is = (!isEmpty(item.resolution) && (item.status === "done"))
        return  is
    }

    
    const loadData = async ()=>{
        setLoading(true)
    
    const response= await axios.get('http://84.201.129.203:8888/api/cases',{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        })
        setData(response.data)
      
        setLoading(false)
    }

    useEffect(() => {
        loadData();
      }, []);
  

   
    return(
        
        <>
        <div className="card-wrapper">
          
        { loading ? (
           <h1>Loading</h1>
       ):
 
       (data.map((item, index)=>
       <div className="card" key={index}>
    
       <p className="item"> <span className="span">Имя Владельца: </span>{item.ownerFullName}</p>
       <p className="item">
           <span className="span">Статус: </span>
           <select  defaultValue={item.status} disabled = {
               item.status === "done" && item.resolution
           } onChange={handleInputValue}>
               <option  objectindex={index} value="new">Новый</option>
               <option  objectindex={index} value="in_progress">В процессе</option>
               <option objectindex={index} value="done">Завершен</option>
           </select>
      
           </p>
       <p className="item"><span className="span">Номер: </span>{item.licenseNumber}</p>
       <p className="item"><span className="span">Дата кражи: </span>{moment(item.date).format('L')}</p>
       <p className="item"><span className="span">Цвет: </span>{item.color}</p>
       <p className="item"><span className="span">Тип: </span>{item.type}</p>

      <textarea   disabled = {
          (!isEmpty(item.resolution) && (item.status === "done"))
      }  className="text"  onChange={(e)=> setTextValue(e.target.value)} value = { item.resolution } >
           </textarea>
         
         
      
      <div className="btn-container">
       <button   deteleitem={index} onClick={handleDelete} className='btn danger-btn'>УДАЛИТЬ</button>
       <button  className="change-btn"itemindx={index} onClick={ handleChange } disabled = {
          (!isEmpty(item.resolution) && (item.status === "done"))
        }
         >ИЗМЕНИТЬ</button>
        <Link
        to={{
          pathname: "/detail",
          state: item,
        }}><button className="btn detail-btn"> Подробно</button></Link>
         
       
    </div>
        
       </div>
        )
       )}

       </div>
    

        </>
    )
}