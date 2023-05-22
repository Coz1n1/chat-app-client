import React, { useState} from 'react';
import Axios from 'axios'
import { NavLink } from 'react-router-dom';
import Logged from './Logged';

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [login, setLogin] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    Axios.defaults.withCredentials = true

    const onLog = () => {
        Axios.post('https://cors-anywhere.herokuapp.com/https://chat-app-server-production-4db6.up.railway.app/login', {
            username: username,
            userpassword: password,
        }).then((response) => {
            if (response.data.com) {
                setLogin(response.data.com)
                if (response.data.com === 'authorized') {
                    setIsAuth(!isAuth)
                }
            }
        });
    }

    const changeVisibility = () => {
        var a = document.getElementById("passCheck")
        if (a.type === 'password') {
            a.type = 'text'
        }
        else if (a.type === 'text') {
            a.type = 'password'
        }
    }

    return (
        <>
            <div className='login-main'>
                {isAuth ?
                    <Logged></Logged>
                    :
                    <>
                        <NavLink to={'/'}><img className='back-image' src={require('../images/back.png')} alt='back' /></NavLink>
                        <h1 className='header'>ChatApp</h1>
                        <div className='log-form'>
                            <h2 className='log-header'>Login</h2>
                            <label className='label'>User name: </label><br></br>
                            <input type='text' placeholder='Enter your name...' onChange={(e) => setUsername(e.target.value)} className='inp'></input><br></br>
                            <label className='label'>User password: </label><br></br>
                            <div className='pass-management'>
                                <span className='eye-icon' onClick={() => setIsActive(!isActive)}>
                                    {isActive ?
                                        <img src={require('../images/see.png')} alt='see' onClick={changeVisibility} id='myIcon' />
                                        :
                                        <img src={require('../images/see-off.png')} alt='see' onClick={changeVisibility} id='myIcon' />
                                    }
                                </span>
                                <input type='password' placeholder='Enter your password...' onChange={(e) => setPassword(e.target.value)} className='inp' id='passCheck'></input><br></br>
                            </div>
                            <button onClick={onLog} className='confirm'>Login</button>
                            <h2>{login}</h2>
                        </div>
                        <button className='under-login'>Do you want to create a new account?<NavLink to={'/register'} className='go-to-reg'>Register here</NavLink></button>
                    </>
                }

            </div>
        </>
    )
}