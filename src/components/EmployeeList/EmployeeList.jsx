import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import './EmployessList.css'
export  const EmployeeList = () =>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)


    const handleApprove = (e) =>{
        e.preventDefault();
        const personIdx = + e.target.attributes.getNamedItem("approveperson").value
        const person = data[personIdx]
        const persons=[...data]
        const onePerson ={...persons[personIdx]}
        
         
        if(person.approved===false){
           person.approved=true
            axios.put(`http://84.201.129.203:8888/api/officers/${person._id}`,person,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then(()=>loadData())

        }

    }
    //для удаление сотрудника
    const handleDelete = (e) =>{
        e.preventDefault();

        const itemIdx = + e.target.attributes.getNamedItem("deleteperson").value
        const person = data[itemIdx]
       
        
    axios.delete(`http://84.201.129.203:8888/api/officers/${person._id}`,{
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }).then(()=>loadData())
    }

    //загрузка данных 
    const loadData = async ()=>{
        setLoading(true)
    
    const response= await axios.get('http://84.201.129.203:8888/api/officers',{
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


    return (
        <>
        {loading ?
        (  <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={300}
            timeout={4000} //3 secs
          />) :(
              <div className="wrap"> 
            <h1>Список сотрудников</h1>
            <table border="1">
            <thead>
                <tr>
                    <th>Имя </th>
                    <th>Фамилия</th>
                    <th>email</th>
                    <th>Одобрен</th>
                  
                </tr>
            </thead>
            <tbody>
                    {
                        data.map((person,index) =>
                            <tr key={person._id}>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.email}</td>
                                <td>{person.approved.toString()}</td>
                                <td><button  onClick={handleApprove} approveperson={index} className="approve-btn">Одобрить</button></td>
                                <td><button  onClick={handleDelete}  deleteperson={index} className="delete-btn">Удалить</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            </div>
          )
        }
   
        </>
    )
}