import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { NavLink } from 'react-router-dom'


export default function Register() {
    const nameRef = useRef()
    const passRef = useRef()
    const [reg, isReg] = useState()
    const [isActive,setIsActive] = useState()

    Axios.defaults.withCredentials = true

    const onSub = () => {
        let uName = nameRef.current.value
        let uPass = passRef.current.value

        if (uName !== '' && uPass !== '') {
            Axios.post('https://chat-app-server-production-4db6.up.railway.app/register', {
                username: uName,
                userpassword: uPass,
            }).then((response) => {
                console.log(response.data)
                if (response.data === "exists") {
                    isReg(<h2 className='response-failed'>User already exists</h2>)
                } else if (response.data === "registered") {
                    isReg(<h2><a href='/chatting' className='response-succeed'>Success! You can login now</a></h2>)
                }
            });
        } else {
            isReg(<h2>Fill in all blanks</h2>)
        }
    };

    const changeVisibility = () => {
        let a = document.getElementById("regCheck")
        if(a.type==='password'){
            a.type = 'text'
        }
        else if(a.type==='text'){
            a.type='password'
        }
    }

    return (
        <>
            <div className='register-main'>
                <NavLink to={'/'}><img className='back-image' src={require('../images/back.png')} alt='back' /></NavLink>
                <h1 className='header'>ChatApp</h1>
                <div className='reg-form'>
                    <h2 className='reg-header'>Create your account:</h2>
                    <label className='label'>User name: </label><br></br>
                    <input type='text' placeholder='Enter your name...' ref={nameRef} className='inp'></input><br></br>
                    <label className='label'>User password: </label><br></br>
                    <div className='pass-management'>
                        <span className='eye-icon' onClick={() => setIsActive(!isActive)}>
                            {isActive ?
                                <img src={require('../images/see.png')} alt='see' onClick={changeVisibility} id='myIcon' />
                            :
                                <img src={require('../images/see-off.png')} alt='see' onClick={changeVisibility} id='myIcon' />
                            }
                        </span>
                        <input type='password' placeholder='Enter your password...' ref={passRef} className='inp' id='regCheck'></input><br></br>
                    </div>
                    {reg}
                    <button type='submit' onClick={onSub} className='confirm'>Register</button>
                </div>
                <button className='under-register'>Already have an account?<NavLink to={'/chatting'} className='go-to-reg'>Login here</NavLink></button>
            </div>
        </>
    )
}
