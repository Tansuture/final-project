import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './SignIn.css'
import { Link } from 'react-router-dom';
export const SignIn = ({active, setActive}) => {
    const [email, setEmail] = useState(state)
    const [password, setPassword] = useState(state)

    const state = {
        email: '',
        password: ''
    }

    const handlePassword = (e) => {
        const password = e.target.value
        setPassword(password)

    }
    const handleEmail = (e) => {
        const email = e.target.value
        setEmail(email)

    }
 
        //     axios({
        //         method: 'post',
        //         url: ' http://84.201.129.203:8888/api/auth/sign_in',
        //         data: {
        //             "email": 'tansuturemuratova@gmail.com',
        //             "password": '123456'
        //         }
    
        //     }).then((response) => {
        //         console.log(response.data.token)
        //         localStorage.setItem('token', response.data.token);
        //     }).catch(error => console.log(error))
        // }
   
    return (

        <div
            className={active
            ? ' modal-window active'
            : 'modal-window'}
            onClick={() => setActive(false)}>

            <form onClick={e => e.stopPropagation()}>
                <p className="modal-text">Вход на сайт</p>
                 <Link to="/signUp" onClick={()=>setActive(false)} className="auth-link">Регистрация</Link>
                <input
                    type="text"
                    placeholder="Enter your e-mail"
                    value={email}
                    onChange={handleEmail}></input>
                <input type="password" placeholder="Enter your password"  onChange={handlePassword}value={password}></input>
                <button className="signIn-btn">Вход</button>

            </form>
        </div>

    )
}