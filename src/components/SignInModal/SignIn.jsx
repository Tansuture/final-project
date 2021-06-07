import React, {useContext} from 'react'
import axios from 'axios';
import './SignIn.css'
import {Link} from 'react-router-dom';
import store from '../../data/store';
export const SignIn = ({active, setActive}) => {
    const {
        handleSubmit,
        data,
        setData,
        setEmail,
        email,
        setIsError,
        isError,
        setPassword,
        password
    } = useContext(store)

    return (

        <div
            className={active
            ? ' modal-window active'
            : 'modal-window'}
            onClick={() => setActive(false)}>

            <form
                className="signIn"
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}>
                <p className="modal-text">Вход на сайт</p>
                <Link to="/signUp" onClick={() => setActive(false)} className="auth-link">Регистрация</Link>
                <input
                    type="text"
                    placeholder="Enter your e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}></input>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"></input>
                {isError && <small className="text-danger">Something went wrong. Please try again .</small>}
                <button type="submit" className="signIn-btn btn">Вход</button>

            </form>
        </div>
    )
}
